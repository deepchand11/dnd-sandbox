import React from "react";
import { useDrag } from "react-dnd";
import { ArrowsMove } from 'react-bootstrap-icons';

const SideBarItem = ({ data }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'sidebarItem',
    item: data,
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
  });


  return (
    <div className="sideBarItem" ref={dragPreview} style={{ opacity: isDragging ? '0.4' : '1' }}>
      {data.component} <span className="moveIcon" ref={drag} ><ArrowsMove/></span>
    </div>
  );
};
export default SideBarItem;
