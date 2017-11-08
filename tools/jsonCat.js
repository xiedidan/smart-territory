import fs from 'fs'
let file = fs.readFileSync(process.argv[2], {encoding: 'ascii'})
let json = JSON.parse(file)

json = json.reduce((acc, val, idx) => {
  if (idx % 2 == 1) {
    // update pushed item
    let index = Math.floor(idx / 2)
    let data = acc[index].z + '.' + val.z
    acc[index].z = parseFloat(data)

    if (Math.abs(acc[index].z) < 20)
      acc[index].z *= -1
    else
      console.log(acc[index].z)
  }
  else {
    // push self to acc
    acc.push(val)
  }

  return acc
},[])

let sums = json.reduce((acc, val, idx) => {
  acc.x += val.x
  acc.y += val.y
  acc.c++

  return acc
}, {x: 0.0, y: 0.0, c:0})

let xMid = sums.x / sums.c
let yMid = sums.y / sums.c

console.log('xMid', xMid, 'yMid', yMid, 'count', sums.c)

let xMax = 0.0
let xMin = 0.0
let yMax = 0.0
let yMin = 0.0

json = json.map((val, idx) => {
  val.x -= xMid
  val.y -= yMid

  if (xMax < val.x)
    xMax = val.x
  if (xMin > val.x)
    xMin = val.x
  if (yMax < val.y)
    yMax = val.y
  if (yMin > val.y)
    yMin = val.y

  return val
})

console.log('xMax', xMax, 'xMin', xMin, 'yMax', yMax, 'yMin', yMin)

console.log(JSON.stringify(json))
