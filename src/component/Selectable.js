import React, { useCallback } from 'react';
import { useLayoutContext } from '../context/layout.context';
import {  selectComponent } from '../context/layout.actions';

const Selectable = ({ children, locking,comp, data,ID, ...props }) => {
  
  const { state, dispatch } = useLayoutContext();
  const selectComp = state.components[ID];
  

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      
      dispatch(selectComponent(ID));
    },
    []
  );

  
  








  return (
    <div className={`selectable selectable-comp ${selectComp.selected ? "active" : ""}`}  {...props} onClick={handleClick}>
      {children}
      
    </div>
  )
}

export default Selectable