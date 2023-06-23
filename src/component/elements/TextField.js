import React from 'react';
import Draggable from '../Draggable';

const TextField = ({type, ID, data}) => {
  console.log("TextField",ID, data)
  const text = data.text._cdata || data.text
  return (
      <Draggable type={type} data={data} ID={ID}>
        
          <div>{text}</div>
       
      </Draggable>
    
  )
}

export default TextField