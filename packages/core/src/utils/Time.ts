export class Time {
  static millisecond = 1
  static second = 1e3
  static minute = 60 * this.second
  static hour = 60 * this.minute
  static day = 24 * this.hour
  static week = 7 * this.day
}
