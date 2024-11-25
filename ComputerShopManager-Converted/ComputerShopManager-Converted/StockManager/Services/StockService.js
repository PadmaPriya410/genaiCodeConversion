const sqlite3 = require("sqlite3").verbose();

class StockService {
  constructor() {
    // this._connectionString = "Data Source=ComputerShopManager.db;Version=3;";
    this._connectionString = "ComputerShopManager.db";
    this.InitializeDatabase();
  }

  InitializeDatabase() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this._connectionString, (err) => {
        if (err) {
          reject(err);
          return;
        }
        const tableQuery = `CREATE TABLE IF NOT EXISTS StockItem (
                                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        Name TEXT NOT NULL,
                                        Quantity INTEGER,
                                        Price REAL
                                    );`;
        db.run(tableQuery, [], (err) => {
          if (err) {
            reject(err);
            return;
          }
          db.close();
          resolve();
        });
      });
    });
  }

  AddStockItem(stockItem) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this._connectionString, (err) => {
        if (err) {
          reject(err);
          return;
        }
        const insertQuery =
          "INSERT INTO StockItem (Name, Quantity, Price) VALUES (?, ?, ?);";
        db.run(
          insertQuery,
          [stockItem.Name, stockItem.Quantity, stockItem.Price],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            db.close();
            resolve();
          }
        );
      });
    });
  }
}

module.exports = StockService;
