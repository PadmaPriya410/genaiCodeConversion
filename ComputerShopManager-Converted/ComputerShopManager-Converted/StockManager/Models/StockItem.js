class StockItem {
  constructor(Id, Name, Quantity, Price) {
    (this.Id = Id), (this.Name = Name);
    this.Quantity = Quantity;
    this.Price = Price;
  }
}

module.exports = StockItem;
