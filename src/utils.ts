import { Coord } from './type'

export function* initCoords () {
  for (let x = 1; x <= 3; x++) {
    for (let y = 1; y <= 3; y++) {
      for (let z = 1; z <= 3; z++) {
        yield {
          coord: [ x, y, z ],
          rotate: [0, 0, 0]
        }
      }
    }
  }
}

export function getActualCoord (coord: Coord) {
  return coord 
}

const OPERATIONS = {
  // 0 代表任意值，比如 L 代表 x=1 平面的所有方块
  L: [1, 0, 0],
  M: [2, 0, 0],
  U: [3, 0, 0],
  E: [],
  D: [],
  B: [],
  S: [],
  F: []
}