import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { COMPONENT } from '../utils/constants'
import Drag from './Drag'
import ResizeRotate from './ResizeRotate'
import Selectable from './Selectable'

function getStyles(size,left, top, isDragging, select) {
  const transform = `translate3d(${left}px, ${top}px, 0) rotate(${size.rotate}deg)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    border: "0px dashed black",
    borderWidth:select? 1:0,
    backgroundColor: "transparent",
    cursor: "move",
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: size.height,
    width: size.width,
  }
}

const Draggable = ({children, type, data, ID }) => {
  const {x,y} = data._attributes;
  const defaultState = { width: 'auto', height: 'auto', rotate:0, left:x, top:y  };
  const [size, setSize] = useState(defaultState);
  const [select, setSelect] = useState(false)
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: COMPONENT,
    item: { id: data._attributes.ID,type: COMPONENT, component: type },
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    }),
    end(item, monitor) {
      console.log(data)
      
    }
  });
  return (
    <div ref={dragPreview}   className="component" style={getStyles(size,x,y,isDragging,select)}>
      <Selectable ID={ID} data={data}>
      {children}
      <Drag ref={drag}/>
      </Selectable>
      {/* <ResizeRotate size={size} setSize={setSize}/> */}
    </div>
  )
}

export default Draggable