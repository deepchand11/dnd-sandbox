
import React from 'react'
import TextFieldForm from './forms/textField/Form';
import TextInputForm from './forms/textInput/Form';
import { Row } from 'react-bootstrap';

 

const AttributeForm = ({state,formType}) => {
  
  const formTemplate = (formType) => {
    switch (formType) {
    case "textField":
      return <TextFieldForm state={state}/>;
      case "textInput":
        return <TextInputForm state={state}/>
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
     
      </div>
      
    </div>
    </Row>
    
  )
 
}

export default AttributeForm