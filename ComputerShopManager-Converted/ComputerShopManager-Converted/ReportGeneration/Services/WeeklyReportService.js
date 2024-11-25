const sqlite3 = require("sqlite3").verbose();
const StockReport = require("./StockReport"); // Adjust path as needed
const SaleReport = require("./SaleReport"); // Adjust path as needed

class WeeklyReportService {
  constructor() {
    // this._connectionString = 'Data Source=ComputerShopManager.db;Version=3;';
    this._connectionString = "ComputerShopManager.db";
  }

  GenerateStockReport() {
    return new Promise((resolve, reject) => {
      const stockReport = [];
      const db = new sqlite3.Database(this._connectionString, (err) => {
        if (err) {
          reject(err);
          return;
        }
        const query = "SELECT Id, Name, Quantity, Price FROM StockItem;";
        db.all(query, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          rows.forEach((row) => {
            stockReport.push(
              new StockReport(
                parseInt(row.Id),
                row.Name,
                parseInt(row.Quantity),
                parseFloat(row.Price)
              )
            );
          });
          db.close();
          resolve(stockReport);
        });
      });
    });
  }

  GenerateSalesReport() {
    return new Promise((resolve, reject) => {
      const salesReport = [];
      const db = new sqlite3.Database(this._connectionString, (err) => {
        if (err) {
          reject(err);
          return;
        }
        const query = `SELECT SaleTransaction.Id, StockItem.Name, SaleTransaction.Quantity, SaleTransaction.SaleDate
                                 FROM SaleTransaction
                                 JOIN StockItem ON SaleTransaction.StockItemId = StockItem.Id;`;
        db.all(query, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          rows.forEach((row) => {
            salesReport.push(
              new SaleReport(
                parseInt(row.Id),
                row.Name,
                parseInt(row.Quantity),
                new Date(row.SaleDate)
              )
            );
          });
          db.close();
          resolve(salesReport);
        });
      });
    });
  }
}

module.exports = WeeklyReportService;
