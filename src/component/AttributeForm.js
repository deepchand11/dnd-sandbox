
import React from 'react'
import TextFieldForm from './forms/textField/Form';

const AttributeForm = ({state,formType}) => {
  
  switch (formType) {
    case "textField":
      return <TextFieldForm state={state}/>
    default:
      return <div>Select a component</div>;
  }
 
}

export default AttributeForm