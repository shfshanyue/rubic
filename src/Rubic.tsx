import React, { useState, useReducer } from 'react'
import Cube from './Cube'

import './Rubic.scss'

import { initCoords, getActualCoord } from './utils'
import { Coord } from './type'

function operate (state: Coord[], action: any) {
  return state.map(({ coord, rotate }) => {
    const [_x, _y, _z] = coord
    const [rotateX, rotateY, rotateZ] = rotate
    getActualCoord({ coord, rotate})
    return { coord, rotate }
  })
}


const Rubic = () => {
  const [coords, dispatch] = useReducer(operate, Array.from(initCoords()))

  
  // operation: L
  // [{
  //   coord: [0, 0, 0],
  //   rotate: [90, 90, 90]
  // }, {
  //   coord: [0, 0, 1],
  //   rotate: [90, 90, 90]
  // }, ...27]

  return (
    <div className="rubic">
      {
        Array.from(coords, ({ coord, rotate }) => {
          const [x, y, z] = coord
          return <Cube key={`coordinate-${x}-${y}-${z}`} coord={coord} rotate={rotate} />
        })
      }
    </div>
  )
}

export default Rubic
