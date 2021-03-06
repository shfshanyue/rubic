import React from 'react'
import classNames from 'classnames'
import './Cube.scss'

type Props = {
  coord: number[];
  rotate: number[];
}

const Cube: React.FC<Props> = ({ coord, rotate }) => {
  const [x, y, z] = coord
  // 
  // cube-x-y-z: 定位各个方块的 3D 位置
  // face: 方块的六个面，构成一个方块
  return (
    <div className={`cube-container layer-x-${x} layer-y-${y} layer-z-${z}`}>
      <div className={`cube cube-${x}-${y}-${z}`}>
        <div className={classNames('face', 'face-l', { 'face-inside' : x !== 1 })} />
        <div className={classNames('face', 'face-r', { 'face-inside' : x !== 3 })} />
        <div className={classNames('face', 'face-u', { 'face-inside' : y !== 1 })} />
        <div className={classNames('face', 'face-d', { 'face-inside' : y !== 3 })} />
        <div className={classNames('face', 'face-b', { 'face-inside' : z !== 1 })} />
        <div className={classNames('face', 'face-f', { 'face-inside' : z !== 3 })} />
      </div>
    </div>
  )
}

export default Cube
