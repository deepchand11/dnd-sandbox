import React, { forwardRef } from 'react'
import { ArrowsMove } from 'react-bootstrap-icons';

const Drag = forwardRef((props, ref) => <div ref={ref} className="draggable"><ArrowsMove/></div>);

export default Drag