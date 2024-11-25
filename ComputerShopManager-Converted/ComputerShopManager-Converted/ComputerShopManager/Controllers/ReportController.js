const express = require("express");
const router = express.Router();
const WeeklyReportService = require("../../ReportGeneration/Services/WeeklyReportService"); // Adjust path as needed

const reportService = new WeeklyReportService();

router.get("/report/stock", async (req, res) => {
  try {
    const report = await reportService.GenerateStockReport();
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating stock report:", error);
    res.status(500).json({ error: "Failed to generate stock report" });
  }
});

router.get("/report/sales", async (req, res) => {
  try {
    const report = await reportService.GenerateSalesReport();
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating sales report:", error);
    res.status(500).json({ error: "Failed to generate sales report" });
  }
});

module.exports = router;
