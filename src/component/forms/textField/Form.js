import React, { useEffect, useState } from 'react';

import textFieldData from './data';
import { valueDataType } from '../../../utils/common';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomInput from '../../inputs/CustomInput';



const TextFieldForm = ({ state,form, setForm }) => {



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


    return (
        <>
            <Form>
                <Row>
                    {textFieldData.map((f, i) => (
                        <Col xs={12} md={6} lg={6} key={`textField${i}`}>
                            <CustomInput form={form} field={f} handleChange={handleChange}/>
                        </Col>
                    ))}
                </Row>
            </Form>
        </>
    )
}

export default TextFieldForm