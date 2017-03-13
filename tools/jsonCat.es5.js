'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var file = _fs2.default.readFileSync(process.argv[2], { encoding: 'ascii' });
var json = JSON.parse(file);

json = json.reduce(function (acc, val, idx) {
  if (idx % 2 == 1) {
    // update pushed item
    var index = Math.floor(idx / 2);
    var data = acc[index].z + '.' + val.z;
    acc[index].z = parseFloat(data);

    if (Math.abs(acc[index].z) < 20) acc[index].z *= -1;else console.log(acc[index].z);
  } else {
    // push self to acc
    acc.push(val);
  }

  return acc;
}, []);

var sums = json.reduce(function (acc, val, idx) {
  acc.x += val.x;
  acc.y += val.y;
  acc.c++;

  return acc;
}, { x: 0.0, y: 0.0, c: 0 });

var xMid = sums.x / sums.c;
var yMid = sums.y / sums.c;

console.log('xMid', xMid, 'yMid', yMid, 'count', sums.c);

var xMax = 0.0;
var xMin = 0.0;
var yMax = 0.0;
var yMin = 0.0;

json = json.map(function (val, idx) {
  val.x -= xMid;
  val.y -= yMid;

  if (xMax < val.x) xMax = val.x;
  if (xMin > val.x) xMin = val.x;
  if (yMax < val.y) yMax = val.y;
  if (yMin > val.y) yMin = val.y;

  return val;
});

console.log('xMax', xMax, 'xMin', xMin, 'yMax', yMax, 'yMin', yMin);

console.log(JSON.stringify(json));
