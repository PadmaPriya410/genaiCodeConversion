class SaleReport {
    constructor(SaleId, ItemName, QuantitySold, SaleDate) {
        this.SaleId = SaleId;
        this.ItemName = ItemName;
        this.QuantitySold = QuantitySold;
        this.SaleDate = SaleDate;
    }
}

module.exports = SaleReport;