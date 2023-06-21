import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { COMPONENT } from '../constants'
import Drag from './Drag'
import ResizeRotate from './component/ResizeRotate'

function getStyles(size,left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0) rotate(${size.rotate}deg)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    border: "0px dashed black",
    padding: "0.5rem 1rem",
    backgroundColor: "transparent",
    cursor: "move",
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: size.height,
    width: size.width,
  }
}

const DraggableComp = ({children, type, data }) => {
  const {x,y} = data._attributes;
  const [size, setSize] = useState({ width: 150, height: 80, rotate:0, left:x, top:y  });
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: COMPONENT,
    item: { id: data._attributes.ID,type: COMPONENT, component: type },
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
  });
  return (
    <div ref={dragPreview}  className="component" style={getStyles(size,x,y,isDragging)}>
      {children}
      <Drag ref={drag}/>
      <ResizeRotate size={size} setSize={setSize}/>
    </div>
  )
}

export default DraggableComp