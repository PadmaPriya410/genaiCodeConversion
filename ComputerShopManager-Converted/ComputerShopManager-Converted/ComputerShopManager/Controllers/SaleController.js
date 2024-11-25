const express = require("express");
const router = express.Router();
const SaleService = require("../../SaleManagement/Services/SaleService"); // Adjust path as needed
const SaleTransaction = require("../../SaleManagement/Services/SaleTransaction"); // Adjust path as needed
const Logger = require("./Logger"); // Replace with the actual path to your Logger.js file

const saleService = new SaleService();
const logger = new Logger("database"); // 'database' indicates we're logging to a DB.

router.use(express.json());

router.post("/sale", async (req, res) => {
  try {
    const { Id, StockItemId, Quantity, SaleDate } = req.body;

    if (
      typeof StockItemId !== "number" ||
      !Number.isInteger(StockItemId) ||
      Quantity < 0
    ) {
      const validationError = new Error(
        "Invalid ID: ID must be a non-negative integer."
      );
      await logger.logError("Validation Error", validationError, req.path, {
        requestBody: req.body,
      });
      throw validationError;
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

    const saleTransaction = new SaleTransaction(
      null,
      req.body.StockItemId,
      req.body.Quantity,
      req.body.SaleDate
    ); // Assuming SaleDate is sent as a string
    const result = await saleService.AddSaleTransaction(saleTransaction);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error adding sale transaction:", error);
    await logger.logError(
      // Always log the error, regardless of type
      "Error adding sale transaction",
      error,
      req.path,
      { requestBody: req.body }
    );
    res.status(500).json({ error: "Failed to add sale transaction" });
  }
});

module.exports = router;
