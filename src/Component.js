import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { COMPONENT } from "./constants";
import ResizeDiv from "./ResizeDiv";
import ResizeRotate from "./component/ResizeRotate";

function getStyles(size,left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0) rotate(${size.rotate}deg)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    border: "1px dashed black",
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



const DragDiv = forwardRef((props,ref) => {
  return (<div
    ref={ref}
    
    className="draggable"

  >
    
  </div>)
});

const Component = ({ type, data }) => {
  

  const {x,y} = data._attributes;
  const [size, setSize] = useState({ width: 150, height: 80, rotate:0, left:x, top:y  });
 
  // const div = useCallback(node => {
  //   if (node !== null) {
  //     setWidth(node.getBoundingClientRect().width);
  //   }
  // }, []);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: COMPONENT,
    item: { id: data._attributes.ID,type: COMPONENT, component: type },
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    }),
    // end:(item, monitor) => {
    //   console.log(item)
    // },
    // canDrag: ( item, monitor) => {
    //   // if()
    //   return true
    // }
  });
  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true })
  // }, [])

  // useEffect(() => {
  //   containerRef.current = { widthX };
  // }, [widthX]);

  // const handleMouseMove = (event)=>{
  //   if(!isResizing)
  //       return
  //   console.log(event)
  //   console.log(containerRef.current)
  // }


  // useEffect(() => {
  //   function handleMouseMove(event) {
  //     // Now we read the dragging/position state from the
  //     // ref, which should always hold the latest state
  //     const { isDragging, position } = ref.current;
  //     if (isDragging) {
  //       const newX = position.x + event.movementX;
  //       const newY = position.y + event.movementY;
  //       setPosition({ x: newX, y: newY });
  //     }
  //   }
  //   window.addEventListener("mousemove", handleMouseMove);

  //   function handleMouseUp() {
  //     setIsDrag(false);
  //   }
  //   window.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, []);

  // drag(ref);



  return (
    // <ResizeDiv size={size} setSize={setSize}>
    <div ref={dragPreview}  className="component" style={getStyles(size,x,y,isDragging)}>
    {/* <div
      ref={ref}
      
      className="draggable"
      // onMouseDown={() => setIsDrag(true)}
    ><small>{data._attributes.ID}</small>
      <div>{type}</div>
      
    </div> */}
    <small>{data._attributes.ID}</small>
      <div>{type}</div>
    <DragDiv ref={drag} id={data._attributes.ID} type={type} />
    <ResizeRotate size={size} setSize={setSize}/>
    </div>
    // </ResizeDiv>
  );
};
export default Component;
