export class ScheduleInfo {
  private _date
  private _time
  private _name


  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
  toString () {
    return "date : "+this._date + " time : " + this._time + " name : " + this._name
  }
}