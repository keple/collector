export class Product {

  private _title;
  private _price;


  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    this._price = value;
  }
}