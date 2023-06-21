import React, { useCallback, useEffect, useRef } from "react";

const ResizeRotate = ({ size, setSize }) => {
    //For initial data, useref is used because there is no need to re render
    const oriPos = useRef({
        Top: 0, // coordinates of elements
        left: 0,
        Cx: 0, // coordinates of the mouse
        cY: 0
    });
    const isDown = useRef(false);
    const direction = useRef();

    function transform(direction, oriPos, e) {
        const style = { ...oriPos.current };
        const startSize = size;
        const startPosition = { x: oriPos.current.cX, y: oriPos.current.cY };

        switch (direction.current) {
            case "rotate":
                //First calculate the center point of the lower element, X and y as the coordinate origin
                const x = style.width / 2 + style.left;
                const y = style.height / 2 + style.top;
                //Current mouse coordinates
                const x1 = e.clientX;
                const y1 = e.clientY;
                //Using trigonometric function in high school
                setSize(currentSize => ({
                    ...currentSize,
                    rotate: Math.atan2(y1 - y, x1 - x) * (180 / Math.PI) - 90
                }));
                break;
            case 'resize':
                setSize(currentSize => ({
                    ...currentSize,
                    width: startSize.width - startPosition.x + e.pageX,
                    height: startSize.height - startPosition.y + e.pageY
                }));
                break;
            default:
                return false;
        }
    }
    const handleonMouseDown = useCallback((dir, e) => {

        //Prevent event bubbling
        e.stopPropagation();
        //Save direction.

        direction.current = dir;
        isDown.current = true;
        //Then the mouse coordinates are
        const cY = e.clientY; //  Clientx relative to visualization area
        const cX = e.clientX;
        oriPos.current = {
            ...size,
            cX,
            cY
        };
        console.log(oriPos);

    }, [])
    const handleonMouseUp = useCallback((e) => {
        console.log('handleonMouseUp')
        isDown.current = false;

    }, [])
    const handleonMouseMove = useCallback((e) => {
        if (!isDown.current) return;
        transform(direction, oriPos, e);


    }, [])

    useEffect(() => {
        window.addEventListener("mousemove", handleonMouseMove);
        window.addEventListener("mouseup", handleonMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleonMouseUp);
            window.removeEventListener("mousemove", handleonMouseMove);
        };
    }, []);
    return (
        <div className="controls">
            <div className="resizable" onMouseDown={(e) => handleonMouseDown("resize", e)} />
            <div className="rotate" onMouseDown={(e) => handleonMouseDown("rotate", e)} />
        </div>
    )
}

export default ResizeRotate