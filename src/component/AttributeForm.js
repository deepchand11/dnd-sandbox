import React, { useEffect, useState } from 'react';
import  textField  from '../forms/textField.form';
import { useLayoutContext } from '../context/layout.context';
import { updateAttributes } from '../context/layout.actions';
import { valueDataType } from '../utils/common';

const getFormData = (form) => {
    switch (form) {
        case 'textField':
            return textField;
        default:
            return [];
    }
}

const AttributeForm = ({state,formData}) => {
    const [form, setForm] = useState(null);
    const path = state.path;

    const { dispatch } = useLayoutContext();


    useEffect(() => {
        if(state.attributes){
            setForm(state.attributes)
        }
        

    }, [state]);
    
    const data = getFormData(formData);
    
    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

    
        setForm({
          ...form,
            [name]: valueDataType(e,value)
        });
        
        
      };

      const handleUpdate = () => {

        dispatch(updateAttributes(state,form))
      }
    
  return (
    <div>
        {data.map((f,i)=>(
            <div key={i}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              type={f.type}
              maxLength="20"
              name={f.name}
              value={form ? form[f.name]: ''}
              onChange={handleChange}
            />
          </div>
        ))}
        {/* {path} */}
        {data && <button onClick={handleUpdate}>Update</button>}
        {/* <pre>
            <code>{JSON.stringify(state,null,2)}</code>
        </pre> */}

    </div>
  )
}

export default AttributeForm