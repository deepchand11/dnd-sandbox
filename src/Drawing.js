import { useCallback, useRef, useState } from "react";

//Southeast, northwest, northeast, northwest, Southeast, Southwest
const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];

function Drawing() {
  // const data = useState()
  const wrapStyle = {
    left: 100,
    top: 100,
    width: 500,
    height: 500
  };
  const [style, setStyle] = useState({
    left: 100,
    top: 100,
    width: 100,
    height: 100
  });
  //For initial data, useref is used because there is no need to re render
  const oriPos = useRef({
    Top: 0, // coordinates of elements
    left: 0,
    Cx: 0, // coordinates of the mouse
    cY: 0
  });
  const isDown = useRef(false);
  const direction = useRef();
  /**
   *Element change. Methods are placed outside the component or elsewhere.
   *@ param direction // move / 'e', 'W','s', 'n', 'ne', 'NW', 'se', 'SW'
   *Attribute width height top left of @ param oristyle element
   *@ param oripos coordinates recorded when the mouse is pressed
   *@ param e event
   */
  function transform(direction, oriPos, e) {
    const style = { ...oriPos.current };
    const offsetX = e.clientX - oriPos.current.cX;
    const offsetY = e.clientY - oriPos.current.cY;
    switch (direction.current) {
      //Drag move
      case "rotate":
        //First calculate the center point of the lower element, X and y as the coordinate origin
        const x = style.width / 2 + style.left;
        const y = style.height / 2 + style.top;
        //Current mouse coordinates
        const x1 = e.clientX;
        const y1 = e.clientY;
        //Using trigonometric function in high school
        style.transform = `rotate(${
          Math.atan2(y1 - y, x1 - x) * (180 / Math.PI) - 90
        }deg)`;
        break;
      case "move":
        //Element current position + offset
        const top = oriPos.current.top + offsetY;
        const left = oriPos.current.left + offsetX;
        //Limit the height of the sketchpad that must be moved within this range - the height of the element
        style.top = Math.max(0, Math.min(top, wrapStyle.height - style.height));
        style.left = Math.max(0, Math.min(left, wrapStyle.width - style.width));
        break;
      //East
      case "e":
        //Drag right to add width
        style.width += offsetX;
        return style;
      //West
      case "w":
        //Increase the width and move the position to the left synchronously
        style.width -= offsetX;
        style.left += offsetX;
        return style;
      //South
      case "s":
        style.height += offsetY;
        return style;
      //North
      case "n":
        style.height -= offsetY;
        style.top += offsetY;
        break;
      //East
      case "ne":
        style.height -= offsetY;
        style.top += offsetY;
        style.width += offsetX;
        break;
      //West
      case "nw":
        style.height -= offsetY;
        style.top += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
      //East
      case "se":
        style.height += offsetY;
        style.width += offsetX;
        break;
      //West
      case "sw":
        style.height += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
    default:
        return false
    }
    return style;
  }
  //Mouse pressed

  //Mouse movement

  //The mouse is raised
  const onMouseDown = useCallback((dir, e) => {
    //Prevent event bubbling
    e.stopPropagation();
    //Save direction.
    console.log(dir);
    direction.current = dir;
    isDown.current = true;
    //Then the mouse coordinates are
    const cY = e.clientY; //  Clientx relative to visualization area
    const cX = e.clientX;
    oriPos.current = {
      ...style,
      cX,
      cY
    };
  }, []);
  const onMouseMove = useCallback((e) => {
    //Determine whether the mouse is pressed
    if (!isDown.current) return;
    let newStyle = transform(direction, oriPos, e);
    setStyle(newStyle);
  }, []);
  const onMouseUp = useCallback((e) => {
    console.log(e, "onMouseUp");
    isDown.current = false;
  }, []);
  return (
    <div
      className="drawing-wrap"
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseDown={(e) => onMouseDown("move", e)}
    >
      <div className="drawing-item" style={style}>
        {points.map((item) => (
          <div
            onMouseDown={(e) => onMouseDown(item, e)}
            className={`control-point point-${item}`}
          ></div>
        ))}
        <div
          className="control-point control-rotator"
          onMouseDown={(e) => onMouseDown("rotate", e)}
        ></div>
      </div>
    </div>
  );
}
export default Drawing;
