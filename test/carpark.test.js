const Carpark = require('../lib/carpark');

describe('Carpark Calculator', () => {
  let carPark;

  beforeEach(() => {
    carPark = new Carpark();
  });

  it('Should return 0.00 outside of a chargeable period', (done) => {
    const start = '09/09/2017 05:20:00';
    const end = '09/09/2017 19:15:00';

    expect(carPark.calculate(start, end, 'short')).toBe(0);
    done();
  });

  it('A specific short stay should cost £12.28', (done) => {
    const start = '07/09/2017 16:50:00';
    const end = '09/09/2017 19:15:00';

    expect(carPark.calculate(start, end, 'short')).toBe(12.28);
    done();
  });

  it('A specific long stay should cost £22.50', (done) => {
    const start = '07/09/2017 07:50:00';
    const end = '09/09/2017 05:20:00';

    expect(carPark.calculate(start, end, 'long')).toBe(22.5);
    done();
  });

  it('A very specific long stay should cost £15.00', (done) => {
    const start = '24/10/2020 10:00:00';
    const end = '25/10/2020 10:00:00';

    expect(carPark.calculate(start, end, 'long')).toBe(15.0);
    done();
  });

  it('A single day of long stay should cost £7.50', (done) => {
    const start = '24/10/2020 10:00:00';
    const end = '24/10/2020 23:59:00';

    expect(carPark.calculate(start, end, 'long')).toBe(7.5);
    done();
  });

  it('A single week of long stay should cost £52.50', (done) => {
    const start = '24/10/2020 10:00:00';
    const end = '30/10/2020 10:00:00';

    expect(carPark.calculate(start, end, 'long')).toBe(52.5);
    done();
  });

  describe('Error Handling', () => {
    it('Returns 0.0 for less than 3 arguments', () => {
      expect(carPark.calculate()).toBe(0.0);
    });

    it('Returns 0.0 for end time before start time', () => {
      const end = '24/10/2020 10:00:00';
      const start = '30/10/2020 10:00:00';

      expect(carPark.calculate(start, end, 'long')).toBe(0.0);
    });
  });
});
