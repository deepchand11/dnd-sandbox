import React from 'react'
import { Form } from 'react-bootstrap'

const CustomInput = ({ form, field, handleChange }) => {
    return (
        <>
            <Form.Group className="mb-3" controlId={field.name}>
                {field.label && <Form.Label>{field.label}</Form.Label>}
                <Form.Control name={field.name} size="sm" type={field.type} placeholder={field.placeholder} value={form ? form[field.name] : ''} onChange={handleChange} />
            </Form.Group>
        </>
    )
}

export default CustomInput