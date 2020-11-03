import { parse } from 'fecha';

class Carpark {
  private _startDT: Date;
  private _endDT: Date;
  private _dayLength: number = 60 * 60 * 24;
  private _hourLength: number = 60 * 60;
  private _validDays: number[] = [1, 2, 3, 4, 5]; // Monday, Tuesday, Wednesday, Thursday, Friday
  private _validStart: number = this._hourLength * 8; // 8AM // 08:00
  private _validEnd: number = this._hourLength * 18; // 6PM // 18:00
  private _longPrice = 7.5;
  private _shortPrice = 1.1;
  private _secondPrice: number = this._shortPrice / this._hourLength;

  /**
   * Check if a specific timestamp is a valid date
   * @param workTime
   */
  private _isValidTime(workTime: number): boolean {
    const day = new Date(workTime * 1000).getDay();

    if (this._validDays.indexOf(day) > -1) {
      const dayBase: number = ~~(workTime / this._dayLength) * this._dayLength;
      const dayPosition: number = workTime - dayBase;

      return dayPosition >= this._validStart && dayPosition < this._validEnd - 1;
    } else {
      return false;
    }
  }

  /**
   * Calculate short term parking costs
   */
  private _calcShortTerm(): number {
    const startSeconds: number = this._startDT.getTime() / 1000;
    const endSeconds: number = this._endDT.getTime() / 1000;
    let workTime: number;

    let validHours = 0;
    let startHourPart = 0;

    // Calculate Start Hour
    const startBaseHour: number = ~~(startSeconds / this._hourLength) * this._hourLength;

    // Calculate End Hour
    const endBaseHour: number = ~~(endSeconds / this._hourLength) * this._hourLength;

    // Check if the very first portion of the hour is valid
    if (this._isValidTime(startSeconds)) {
      startHourPart = this._hourLength - (startSeconds - startBaseHour);
    }

    // Go to the next hour after the initial start
    workTime = startBaseHour + this._hourLength;

    // If there's more of an hours worth of time then loop through the next hours
    if (endBaseHour - workTime > this._hourLength) {
      do {
        validHours = validHours + (this._isValidTime(workTime) ? 1 : 0);
        workTime = workTime + this._hourLength;
      } while (workTime <= endBaseHour);
    }

    // Sum it all
    return startHourPart * this._secondPrice + validHours * this._shortPrice;
  }

  /**
   * Calculate long term parking costs
   * @returns {number}
   * @private
   */
  private _calcLongTerm(): number {
    // convert to time stamps and make them second based
    const startSeconds: number = this._startDT.getTime() / 1000;
    const endSeconds: number = this._endDT.getTime() / 1000;

    // Very start of the first day
    const startBaseSeconds: number = ~~(startSeconds / this._dayLength) * this._dayLength;

    // Very end of the second day
    const endBaseSeconds: number = ~~(endSeconds / this._dayLength) * this._dayLength + this._dayLength;

    // Subtract the start seconds from the end seconds
    const distance: number = endBaseSeconds - startBaseSeconds;

    // divide them by number of seconds in a day and multiply by cost

    return (distance / this._dayLength) * this._longPrice;
  }

  /**
   * The public calculate method
   * @param start
   * @param end
   * @param mode
   * @returns {number}
   */
  calculate(start: string, end: string, mode: string = 'longterm'): number {
    let workVal = 0.0;
    this._startDT = parse(start, 'DD/MM/YYYY HH:mm:ssZ');
    this._endDT = parse(end, 'DD/MM/YYYY HH:mm:ssZ');

    switch (mode.toLowerCase()) {
      case 'short':
      case 'shortterm':
        workVal = this._calcShortTerm();
        break;

      case 'long':
      case 'longterm':
        workVal = this._calcLongTerm();
        break;

      default:
    }

    return parseFloat(workVal.toFixed(2));
  }
}

export default Carpark;
