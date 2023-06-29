import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { COMPONENT } from '../utils/constants'
import Drag from './Drag'
import ResizeRotate from './ResizeRotate'
import Selectable from './Selectable'

function getStyles(attr, isDragging) {
  const {x,y,rotate,width,height} = attr;
  const transform = `rotate(${rotate}deg)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    border: "0px dashed black",
    backgroundColor: "transparent",
    cursor: "move",
    top: y,
    left: x,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: height,
    width: width,
  }
}

const Draggable = ({children, type, data, ID }) => {
  
  
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: COMPONENT,
    item: { compID: ID, id: data._attributes.ID,type: COMPONENT, component: type },
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
  });
  return (
    <div ref={dragPreview}   className="component" style={getStyles(data._attributes,isDragging)}>
      <Selectable ID={ID} data={data}>
      {children}
      <Drag ref={drag}/>
      </Selectable>
      {/* <ResizeRotate size={size} setSize={setSize}/> */}
    </div>
  )
}

export default Draggable