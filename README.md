# Carpark

A Parking Charge Calculator

### Features

* Calculates Short term parking!

* Calculates Long term parking!


### To run

To install run the following in the folder

```

    cd carpark
    npm install

```

To run the tests

```

    # For Javascript
    npm run test:js

    # For Typescript
    npm run test:ts

```

### Usage

```javascript


  const Carpark = require('../lib/carpark');

  const carPark = new Carpark();

  const start = '07/09/2017 16:50:00';
  const end = '09/09/2017 19:15:00';

  // calculate(start, end, mode)
  
  // Mode can be 'short', 'shortterm' / 'long', 'longterm'

  console.log(carPark.calculate(start, end, 'short'));

```



### Current Test Results

##### Javascript

```
Carpark Calculator
    ✓ Should return 0.00 outside of a chargeable period
    ✓ A specific short stay should cost £12.28
    ✓ A specific long stay should cost £22.50
    ✓ A very specific long stay should cost £15.00
    ✓ A single day of long stay should cost £7.50
    ✓ A single week of long stay should cost £52.50


  6 passing (8ms)
```

##### Typescript

```
Carpark Calculator
    ✓ Should return 0.00 outside of a chargeable period
    ✓ A specific short stay should cost £12.28
    ✓ A specific long stay should cost £22.50
    ✓ A very specific long stay should cost £15.00
    ✓ A single day of long stay should cost £7.50
    ✓ A single week of long stay should cost £52.50


  6 passing (6ms)
```
