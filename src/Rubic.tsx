import React from 'react'
import Cube from './Cube'

import './Rubic.scss'

import { accord } from './utils'

const Rubic = () => {
  return (
    <div className="rubic">
      {
        Array.from(accord(), ([ x, y, z ]) =>
          <Cube key={`coordinate-${x}-${y}-${z}`} x={x} y={y} z={z} />
        )
      }
    </div>
  )
}

export default Rubic
