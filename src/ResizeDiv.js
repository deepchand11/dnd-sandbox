import React, { useCallback, useEffect, useRef, useState } from "react";

const ResizeDiv = ({size, setSize}) => {

//   useEffect(() => {
//     ref.current = { width, isResizing };
//   }, [width, isResizing]);


  // useEffect(() => {
  //   function handleMouseDown(event) {
  //       setIsResizing(true);
  //       setWidthX(event.clientX)
  //     // Now we read the dragging/position state from the
  //     // ref, which should always hold the latest state
  //   //   const { isResizing } = ref.current;
  //   //   if (isResizing) {
  //   //     // const newX = position.x + event.movementX;
  //   //     // const newY = position.y + event.movementY;
  //   //     const cwidth = event.cilentX
  //   //     console.log(cwidth)
  //   //     // setWidth()
  //   //     // setPosition({ x: newX, y: newY });
  //   //   }
  //   console.log(event.clientX)
  //   }
  //   function handleMouseMove(event) {
  //       // if(!isResizing)
  //       // return
  //   //   console.log(width + widthX)
  //   }
  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("mousedown", handleMouseDown);
    

  //   function handleMouseUp() {
  //     setIsResizing(false);
  //   }
  //   window.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     window.removeEventListener("mousedown", handleMouseDown);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);
  const onMouseDown = useCallback((dir, e)=>{

  },[])
  const onMouseMove = useCallback((dir, e)=>{
    
  },[])
  const onMouseUp = useCallback((dir, e)=>{
    
  },[])
  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    
    function onMouseMove(mouseMoveEvent) {
      setSize(currentSize => ({
        ...currentSize, 
        width: startSize.width - startPosition.x + mouseMoveEvent.pageX, 
        height: startSize.height - startPosition.y + mouseMoveEvent.pageY 
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      document.body.removeEventListener("mouseup", onMouseUp);
    }
    
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  return (
    <div className="controls">
    <div className="resizable" onMouseDown={handler}/>
    {/* <div className="rotate" onMouseDown={(e) => onMouseDown("rotate", e)}></div> */}
    </div>
  )
}

export default ResizeDiv