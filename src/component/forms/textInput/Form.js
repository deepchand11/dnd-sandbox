import React, { useEffect, useState } from 'react';

import textFieldData from './data';
import { useLayoutContext } from '../../../context/layout.context';
import { valueDataType } from '../../../utils/common';
import { updateAttributes } from '../../../context/layout.actions';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



const TextInputForm = ({ state }) => {
    const [form, setForm] = useState(null);


    const { dispatch } = useLayoutContext();


    useEffect(() => {
        if (state.attributes) {
            setForm(state.attributes)
        }


    }, [state]);



    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;


        setForm({
            ...form,
            [name]: valueDataType(e, value)
        });


    };

    const handleUpdate = () => {

        dispatch(updateAttributes(state, form))
    }

    return (
        <>
            <Form>
                <Row>
                    {textFieldData.map((f, i) => (
                        <Col xs={12} md={6} lg={6} key={`textField${i}`}>
                            <Form.Group className="mb-3" controlId={f.name}>
                                <Form.Label>{f.label}</Form.Label>
                                <Form.Control name={f.name} size="sm" type={f.type} placeholder={f.placeholder} value={form ? form[f.name] : ''} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    ))}
                    <Col lg={12}>
                        <Button onClick={handleUpdate} variant="primary" type="button">Update</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default TextInputForm