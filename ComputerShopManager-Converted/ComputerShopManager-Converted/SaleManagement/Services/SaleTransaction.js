class SaleTransaction {
    constructor(Id, StockItemId, Quantity, SaleDate) {
        this.Id = Id;
        this.StockItemId = StockItemId;
        this.Quantity = Quantity;
        this.SaleDate = SaleDate;
    }
}

module.exports = SaleTransaction;