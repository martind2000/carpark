import Carpark from '../ts-lib/carpark-calc';

import { expect } from 'chai';
// const expect = require('expect.js');

describe('Carpark Calculator', () => {
  let carPark: Carpark;

  beforeEach(() => {
    carPark = new Carpark();
  });

  it('Should return 0.00 outside of a chargeable period', () => {
    const start = '09/09/2017 05:20:00';
    const end = '09/09/2017 19:15:00';

    expect(carPark.calculate(start, end, 'short')).to.equal(0);
  });

  it('A specific short stay should cost £12.28', () => {
    const start = '07/09/2017 16:50:00';
    const end = '09/09/2017 19:15:00';

    expect(carPark.calculate(start, end, 'short')).to.equal(12.28);
  });

  it('A specific long stay should cost £22.50', () => {
    const start = '07/09/2017 07:50:00';
    const end = '09/09/2017 05:20:00';

    expect(carPark.calculate(start, end, 'long')).to.equal(22.5);
  });

  it('A very specific long stay should cost £15.00', () => {
    const start = '24/10/2020 10:00:00';
    const end = '25/10/2020 10:00:00';

    expect(carPark.calculate(start, end, 'long')).to.equal(15.0);
  });

  it('A single day of long stay should cost £7.50', () => {
    const start = '24/10/2020 10:00:00';
    const end = '24/10/2020 23:59:00';

    expect(carPark.calculate(start, end, 'long')).to.equal(7.5);
  });

  it('A single week of long stay should cost £52.50', () => {
    const start = '24/10/2020 10:00:00';
    const end = '30/10/2020 10:00:00';

    expect(carPark.calculate(start, end, 'long')).to.equal(52.5);
  });

  describe('Error Handling', () => {
    // Returns 0.0 for less than 3 arguments test not required.

    it('Returns 0.0 for end time before start time', () => {
      const end = '24/10/2020 10:00:00';
      const start = '30/10/2020 10:00:00';

      expect(carPark.calculate(start, end, 'long')).to.equal(0.0);
    });
  });
});
