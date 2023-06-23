import React from 'react'
import TextField from './elements/TextField';

const TextInput = () => {
    return (<div>textInput</div>)
}


const Foo = () => {
    return (<div>Foo</div>)
}
const CustomTag = ({ type, children, ...props }) => {
const components = {
    textField: TextField,
    textInput: TextInput,
    foo: Foo
};
const Tag = components[type] ? components[type] : components['foo'];
  return (
    <Tag type={type}{...props}/>
  )
}

export default CustomTag