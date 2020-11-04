declare class Carpark {
  private _startDT;
  private _endDT;
  private _dayLength;
  private _hourLength;
  private _validDays;
  private _validStart;
  private _validEnd;
  private _longPrice;
  private _shortPrice;
  private _secondPrice;
  /**
   * Check if a specific timestamp is a valid date
   * @param workTime
   */
  private _isValidTime;
  /**
   * Calculate short term parking costs
   */
  private _calcShortTerm;
  /**
   * Calculate long term parking costs
   * @returns {number}
   * @private
   */
  private _calcLongTerm;
  /**
   * The public calculate method
   * @param start
   * @param end
   * @param mode
   * @returns {number}
   */
  calculate(start: string, end: string, mode?: string): number;
}
export default Carpark;
