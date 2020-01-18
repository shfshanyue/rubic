import React from 'react'
import classNames from 'classnames'
import './Cube.scss'

type Props = {
  x: number;
  y: number;
  z: number;
}

const Cube: React.FC<Props> = ({ x, y, z }) => {
  return (
    <div className={`cube cube-${x}-${y}-${z}`}>
      <div className={classNames('face', 'face-l', { 'face-inside' : x !== 1 })} />
      <div className={classNames('face', 'face-r', { 'face-inside' : x !== 3 })} />
      <div className={classNames('face', 'face-b', { 'face-inside' : y !== 1 })} />
      <div className={classNames('face', 'face-f', { 'face-inside' : y !== 3 })} />
      <div className={classNames('face', 'face-u', { 'face-inside' : z !== 1 })} />
      <div className={classNames('face', 'face-d', { 'face-inside' : z !== 3 })} />
    </div>
  )
}

export default Cube
