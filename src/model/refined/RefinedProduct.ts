export class RefinedProduct {
  private _title;
  private _price;
  private _state;

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

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
  }
}