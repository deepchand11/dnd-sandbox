import React from 'react';
import Draggable from '../Draggable';

const TextInput= ({type, ID, data}) => {
  // console.log("TextField",ID, data)
  
  return (
      <Draggable type={type} data={data} ID={ID}>
        <div className='textField'></div>
      </Draggable>
    
  )
}

export default TextInput