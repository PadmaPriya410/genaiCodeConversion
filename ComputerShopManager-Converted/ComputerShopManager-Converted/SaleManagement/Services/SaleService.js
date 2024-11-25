const sqlite3 = require("sqlite3").verbose();

class SaleService {
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
        const saleTableQuery = `CREATE TABLE IF NOT EXISTS SaleTransaction (
                                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                            StockItemId INTEGER,
                                            Quantity INTEGER,
                                            SaleDate TEXT,
                                            FOREIGN KEY (StockItemId) REFERENCES StockItem (Id)
                                        );`;
        db.run(saleTableQuery, [], (err) => {
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

  AddSaleTransaction(saleTransaction) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this._connectionString, (err) => {
        if (err) {
          reject(err);
          return;
        }

        this.GetStockQuantity(saleTransaction.StockItemId, db)
          .then((currentStock) => {
            if (currentStock < saleTransaction.Quantity) {
              db.close();
              resolve(
                `Insufficient stock. Available: ${currentStock}, Requested: ${saleTransaction.Quantity}.`
              );
              return;
            }
            this.DeductStock(
              saleTransaction.StockItemId,
              saleTransaction.Quantity,
              db
            )
              .then(() => {
                const insertQuery =
                  "INSERT INTO SaleTransaction (StockItemId, Quantity, SaleDate) VALUES (?, ?, ?);";
                db.run(
                  insertQuery,
                  [
                    saleTransaction.StockItemId,
                    saleTransaction.Quantity,
                    saleTransaction.SaleDate,
                  ],
                  (err) => {
                    if (err) {
                      reject(err);
                      return;
                    }
                    db.close();
                    resolve(
                      "Sale transaction added successfully and stock updated."
                    );
                  }
                );
              })
              .catch((error) => reject(error));
          })
          .catch((error) => reject(error));
      });
    });
  }

  GetStockQuantity(stockItemId, db) {
    return new Promise((resolve, reject) => {
      const query = "SELECT Quantity FROM StockItem WHERE Id = ?;";
      db.get(query, [stockItemId], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row ? parseInt(row.Quantity) : 0);
      });
    });
  }

  DeductStock(stockItemId, quantityToDeduct, db) {
    return new Promise((resolve, reject) => {
      const updateQuery =
        "UPDATE StockItem SET Quantity = Quantity - ? WHERE Id = ?;";
      db.run(updateQuery, [quantityToDeduct, stockItemId], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}

module.exports = SaleService;
