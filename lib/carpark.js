/*

The following charges are used:

Short Stay
£1.10 per hour between 8am and 6pm on weekdays, free outside of these times.
Visits need not be whole hours and can last more than one day.

Long Stay
£7.50 per day or part day including weekends, so the minimum charge will be for one day.


A stay entirely outside of a chargeable period will return £0.00
A short stay from 07/09/2017 16:50:00 to 09/09/2017 19:15:00 would cost £12.28
Thursday => Saturday ( 1504803000 => 1504984500)

Thursday: 1h 10m = 1.28
Friday: 10h = 11.00
Saturday:  free

A long stay from 07/09/2017 07:50:00 to 09/09/2017 05:20:00 would cost £22.50
Thursday => Saturday ( 1504770600 => 1504934400)

Thursday: 1 = 7.5
Friday: 1
Saturday: 1
Total: 22.50

---

hour = 3600 seconds



1604414190894

 */

const fecha = require('fecha');

class Carpark {
  #_startDT;
  #_endDT;
  #_dayLength = 60 * 60 * 24;
  #_hourLength = 60 * 60;
  #_validDays = [1, 2, 3, 4, 5]; // Monday, Tuesday, Wednesday, Thursday, Friday
  #_validStart = this.#_hourLength * 8; // 8AM // 08:00
  #_validEnd = this.#_hourLength * 18; // 6PM // 18:00
  #_longPrice = 7.5;
  #_shortPrice = 1.1;
  #_secondPrice = this.#_shortPrice / this.#_hourLength;

  /**
   * Check if a specific timestamp is a valid date
   * @param workTime
   * @returns {boolean}
   * @private
   */
  _isValidTime(workTime) {
    const day = new Date(workTime * 1000).getDay();

    if (this.#_validDays.indexOf(day) > -1) {
      const dayBase = ~~(workTime / this.#_dayLength) * this.#_dayLength;
      const dayPosition = workTime - dayBase;

      return dayPosition >= this.#_validStart && dayPosition < this.#_validEnd - 1;
    } else {
      return false;
    }
  }

  /**
   * Calculate short term parking costs
   * @returns {number}
   * @private
   */
  _calcShortTerm() {
    let startSeconds = this.#_startDT.getTime() / 1000;
    let endSeconds = this.#_endDT.getTime() / 1000;
    let workTime, total;
    let validHours = 0;
    let startHourPart = 0;

    // Calculate Start Hour
    let startBaseHour = ~~(startSeconds / this.#_hourLength) * this.#_hourLength;

    // Calculate End Hour
    let endBaseHour = ~~(endSeconds / this.#_hourLength) * this.#_hourLength;

    // Check if the very first portion of the hour is valid
    if (this._isValidTime(startSeconds)) {
      startHourPart = this.#_hourLength - (startSeconds - startBaseHour);
    }

    // Go to the next hour after the initial start
    workTime = startBaseHour + this.#_hourLength;

    // If there's more of an hours worth of time then loop through the next hours
    if (endBaseHour - workTime > this.#_hourLength) {
      do {
        validHours = validHours + (this._isValidTime(workTime) ? 1 : 0);
        workTime = workTime + this.#_hourLength;
      } while (workTime <= endBaseHour);
    }

    // Sum it all
    total = startHourPart * this.#_secondPrice + validHours * this.#_shortPrice;

    return total;
  }

  /**
   * Calculate long term parking costs
   * @returns {number}
   * @private
   */
  _calcLongTerm() {
    // convert to time stamps and make them second based
    const startSeconds = this.#_startDT.getTime() / 1000;
    const endSeconds = this.#_endDT.getTime() / 1000;

    // Very start of the first day
    const startBaseSeconds = ~~(startSeconds / this.#_dayLength) * this.#_dayLength;

    // Very end of the second day
    const endBaseSeconds = ~~(endSeconds / this.#_dayLength) * this.#_dayLength + this.#_dayLength;

    // Subtract the start seconds from the end seconds
    const distance = endBaseSeconds - startBaseSeconds;

    // divide them by number of seconds in a day and multiply by cost

    return (distance / this.#_dayLength) * this.#_longPrice;
  }

  /**
   * The public calculate method
   * @param start
   * @param end
   * @param mode
   * @returns {number}
   */
  calculate(start, end, mode = 'longterm') {
    let workVal = 0.0;
    this.#_startDT = fecha.parse(start, 'DD/MM/YYYY HH:mm:ssZ');
    this.#_endDT = fecha.parse(end, 'DD/MM/YYYY HH:mm:ssZ');

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

module.exports = Carpark;
