import React from 'react';
import Draggable from './component/Draggable';
import Selectable from './component/Selectable';

const TextField = ({type, data}) => {
  const text = data.text._cdata || data.text
  return (
      <Draggable type={type} data={data}>
        
          <div>{text}</div>
       
      </Draggable>
    
  )
}

export default TextField