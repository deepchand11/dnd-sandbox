import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useLayoutContext, useSelector } from '../context/layout.context';
import { PencilFill } from 'react-bootstrap-icons';
import { deselectedAttributes, selectedAttributes } from '../context/layout.actions';

const SelectableLayout = ({ children, locking, data,ID, ...props }) => {
  const [select, setSelect] = useState(false);
  const { state, dispatch } = useLayoutContext();
  const attrComp = state.layout
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      setSelect(!select);
      dispatch(selectedAttributes(attrComp));
      // dispatch(deselectComponent())
      console.log(attrComp)
    },
    [],
  )

  const handleOutSideClick = useCallback(
    (e) => {
      e.stopPropagation();
        setSelect(false);
        dispatch(deselectedAttributes());
      
    },
    [dispatch],
  )

  // const elemRef = useOutsideClick(handleOutSideClick)

  useOnClickOutside(ref, handleOutSideClick);






  return (
    <div ref={ref} className={`selectable ${select ? "active" : ""}`}  {...props} onClick={handleClick}>
     
      {/* <button className='editable' onClick={handleClick}> <PencilFill /></button> */}
      {children}
      
    </div>
  )
}

export default SelectableLayout