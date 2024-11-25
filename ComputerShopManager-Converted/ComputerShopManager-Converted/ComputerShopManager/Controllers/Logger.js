const sqlite3 = require("sqlite3").verbose();

class Logger {
  constructor(logDestination = "console") {
    // Default to console logging
    this.logDestination = logDestination;
  }

  async logError(message, error, endpoint = "", additionalInfo = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp: timestamp,
      endpoint: endpoint,
      message: message,
      error: error ? error.stack || error.toString() : null, // Capture stack trace if available
      ...additionalInfo, // Include any additional provided info
    };

    if (this.logDestination === "console") {
      console.error(logEntry);
    } else if (this.logDestination === "cloud") {
      // Integrate with cloud logging service here (e.g., Google Cloud Logging, etc.)
      // Example (using a hypothetical cloud logging function):
      // await cloudLogging.log(logEntry);
    } else if (this.logDestination === "database") {
      try {
        const db = new sqlite3.Database("ComputerShopManager.db", (err) => {
          // Or your DB file path
          if (err) {
            console.error("Error opening database for logging:", err);
            return; // Important! Prevents the following code from executing on DB error
          }

          const logEntry = {
            timestamp: new Date().toISOString(),
            endpoint: endpoint,
            message: message,
            error: error ? error.stack || error.toString() : null,
            ...additionalInfo,
          };

          const insertQuery = `INSERT INTO logs (timestamp, endpoint, message, error, additionalInfo) VALUES (?, ?, ?, ?, ?)`;
          db.run(
            insertQuery,
            [
              logEntry.timestamp,
              logEntry.endpoint,
              logEntry.message,
              logEntry.error,
              JSON.stringify(logEntry.additionalInfo), // Store additional info as JSON
            ],
            (err) => {
              if (err) {
                console.error("Error inserting log into database:", err);
              }
              db.close(); // Close the database connection in the callback
            }
          );
        });
      } catch (dbError) {
        // Handle database errors carefully!  Don't let logging errors take down the app.
        console.error("Error logging to database:", dbError); // Fallback to console
      }
    } else {
      // Handle other destinations (e.g., file, database) or throw an error if invalid
      console.error("Invalid log destination:", this.logDestination);
      console.error(logEntry); //still log it
    }
  }

  async logInfo(message, endpoint = "", additionalInfo = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp: timestamp,
      endpoint: endpoint,
      message: message,
      ...additionalInfo,
    };

    if (this.logDestination === "console") {
      console.info(logEntry); // or console.log
    } else if (this.logDestination === "cloud") {
      // Integrate with cloud logging service's info level logging
      //   await cloudLogging.logInfo(logEntry) //example
    } else {
      console.error("Invalid log destination:", this.logDestination);
      console.info(logEntry); //still log it
    }
  }
}

module.exports = Logger;

// Example Usage:
// const logger = new Logger(); // Or new Logger('cloud') for Cloud Logging
// try {
//    //some code that might throw an error
// } catch (error) {
//    await logger.logError('Error in myEndpoint', error, '/myEndpoint');
// }

// await logger.logInfo('Successfully executed.', '/myEndpoint', { userId: 123 });
