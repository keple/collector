

export class RefinedSchedule {
  private _name;

  private _time;

  private _thumbnailUrl;
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  get thumbnailUrl() {
    return this._thumbnailUrl;
  }

  set thumbnailUrl(value) {
    this._thumbnailUrl = value;
  }

}