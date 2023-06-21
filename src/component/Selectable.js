import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useLayoutContext } from '../layout.context';
import { PencilFill } from 'react-bootstrap-icons';
import { deselectedAttributes, selectedAttributes } from '../layout.actions';

const Selectable = ({ children, locking, data, ...props }) => {
  const [select, setSelect] = useState(false);
  const { dispatch } = useLayoutContext();
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      setSelect(!select);
      dispatch(selectedAttributes(data));
      // dispatch(deselectComponent())
      console.log(data)
    },
    [dispatch],
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

export default Selectable