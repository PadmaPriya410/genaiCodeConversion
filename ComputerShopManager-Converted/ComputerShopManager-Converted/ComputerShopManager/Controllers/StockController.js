const express = require("express");
const router = express.Router();
const StockService = require("../../StockManager/Services/StockService"); // Adjust path as needed
const StockItem = require("../../StockManager/Models/StockItem"); // Adjust path as needed
const Logger = require("./Logger"); // Replace with the actual path to your Logger.js file

const stockService = new StockService();
const logger = new Logger("database"); // 'database' indicates we're logging to a DB.

router.post("/add", async (req, res) => {
  try {
    const { Id, Name, Quantity, Price } = req.body;

    // Input validation:
    if (typeof Name !== "string" || !/^[a-zA-Z0-9\s]+$/.test(Name)) {
      const validationError = new Error(
        "Invalid Name: Name must be a string containing only letters and spaces."
      );
      await logger.logError("Validation Error", validationError, req.path, {
        requestBody: req.body,
      }); // Log validation error
      throw validationError; // Re-throw to be caught by the outer catch block for the response
    }

    if (
      typeof Quantity !== "number" ||
      !Number.isInteger(Quantity) ||
      Quantity < 0
    ) {
      const validationError = new Error(
        "Invalid Quantity: Quantity must be a non-negative integer."
      );
      await logger.logError("Validation Error", validationError, req.path, {
        requestBody: req.body,
      });
      throw validationError;
    }
    if (typeof Price !== "number" || Price < 0) {
      const validationError = new Error(
        "Invalid Price: Price must be a non-negative number."
      );
      await logger.logError("Validation Error", validationError, req.path, {
        requestBody: req.body,
      });
      throw validationError;
    }

    const stockItem = new StockItem(
      req.body.Id,
      req.body.Name,
      req.body.Quantity,
      req.body.Price
    );
    await stockService.AddStockItem(stockItem);
    res.status(200).json({ message: "Stock item added successfully." });
  } catch (error) {
    // This catch block will handle both validation errors and database errors.
    if (!(error instanceof Error && error.message.startsWith("Invalid "))) {
      // Check if it wasn't already logged as a validation error
      await logger.logError("Error adding stock item", error, req.path, {
        requestBody: req.body,
      });
    }
    res
      .status(500)
      .json({ error: error.message || "Failed to add stock item" });
  }
});

module.exports = router;
