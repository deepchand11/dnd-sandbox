import React, { useState } from 'react';
import { useLayoutContext } from '../context/layout.context';
import {  selectedAttributes } from '../context/layout.actions';

const SelectableLayout = ({ children, index, ...props }) => {
  const [select, setSelect] = useState(false);
  const { state, dispatch } = useLayoutContext();
  const attrComp = state.layout.homework.homeworkQuestion[index];
  // Create a ref that we add to the element for which we want to detect outside clicks

  const handleClick = 
    (e) => {
      e.stopPropagation();
      setSelect(!select);
      dispatch(selectedAttributes(attrComp._attributes));
    }
    
    

  

  






  return (
    <div className={`selectable ${select ? "active" : ""}`}  {...props} onClick={handleClick}>
    
      {children}
      
    </div>
  )
}

export default SelectableLayout