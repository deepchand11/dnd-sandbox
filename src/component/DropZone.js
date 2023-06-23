import { getByLabelText } from '@testing-library/react';
import React from 'react'
import { useDrop } from "react-dnd";
import { COMPONENT, SIDEBAR_ITEM } from "../utils/constants";
import template from '../utils/templateData';

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT];

const DropZone = ({ data, onDrop, components }) => {

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ACCEPTS,
        drop: (item, monitor) => {
            let itemAttributes ;
            let canvasX = 0 
            let canvasY = 0
            if(item.type === COMPONENT){
                itemAttributes = JSON.parse(JSON.stringify(components[item.id].attributes))
                
            }else{
                const canvas = document.querySelector(".droppableCanvas").getBoundingClientRect();
                canvasX = canvas.x;
                canvasY = canvas.y;
                itemAttributes = {x:0,y:0}
            }
            const {x,y} = itemAttributes;
           
            const delta = monitor.getDifferenceFromInitialOffset();

          
            
        let left = Math.round(x + delta.x - canvasX)
        let top = Math.round(y + delta.y - canvasY)

        itemAttributes = {
            ...itemAttributes,
            x: left,
            y: top
        }

        item.attributes = {...itemAttributes}

        // console.log(left, top)
      onDrop(data, item);
    //   return false
        },
        // canDrop: (item, monitor) => {
        //     // if(item.attributes && (item.attributes.x < 0 || item.attributes.y < 0)) return false
        //     console.log('canDrop', item)
        //     if(item.attributes && (item.attributes.x > 0 || item.attributes.y > 0)) return true;
        // },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    const isActive = canDrop;
    const styleBg ={ backgroundColor: isActive ? '#f3f3f3':'white' }
    return (
        <div
            className='canvas gridline'
            ref={drop}
            role={"Canvas Drop"}
            style={styleBg}
        />
           

    )
}

export default DropZone