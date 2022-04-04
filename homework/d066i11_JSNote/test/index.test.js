global.expect = require('chai').expect;
global.FILL_ME_IN = 'Fill this value in';

describe('Bare Minimum Requirements', function () {
  require('../koans/01_Introduction.js');
  require('../koans/02_Types-part1.js');
  require('../koans/03_LetConst.js');
  require('../koans/04_Scope.js');
  require('../koans/05_ArrowFunction.js');
  require('../koans/06_Types-part2.js');
  require('../koans/07_Array.js');
  require('../koans/08_Object.js');
  require('../koans/09_SpreadSyntax.js');
  require('../koans/10_Destructuring.js');
});
