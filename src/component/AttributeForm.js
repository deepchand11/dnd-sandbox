
import React, { useState } from 'react'
import TextFieldForm from './forms/textField/Form';
import TextInputForm from './forms/textInput/Form';
import { Button, Row } from 'react-bootstrap';
import { useLayoutContext } from '../context/layout.context';
import { updateAttributes } from '../context/layout.actions';

 

const AttributeForm = ({state,formType}) => {

  const [form, setForm] = useState(null);
  const { dispatch } = useLayoutContext();

  const handleUpdate = () => {

    dispatch(updateAttributes(state, form))
}
  
  const formTemplate = (formType) => {
    switch (formType) {
    case "textField":
      return <TextFieldForm state={state} form={form} setForm={setForm}/>;
      case "textInput":
        return <TextInputForm state={state} form={form} setForm={setForm}/>
    default:
      return <div>Select a component</div>;
  }
  }
  
  

  return(
   
    <Row>
    <div className='attrWrap'>
      <div className='attrHeader'><h5>Attributes</h5></div>
      <div className='attrBody'>{formTemplate(formType)}</div>
      <div className='attrFooter'>
      <Button onClick={handleUpdate} variant="primary" type="button">Update</Button>
      </div>
      
    </div>
    </Row>
    
  )
 
}

export default AttributeForm