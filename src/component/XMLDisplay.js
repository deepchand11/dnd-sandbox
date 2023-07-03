import React, { useState } from 'react';
import { xml2json, js2xml } from "xml-js";
import { useLayoutContext } from '../context/layout.context';
import { Button, Card } from 'react-bootstrap';
import XMLViewer from "react-xml-viewer";


window.Buffer = window.Buffer || require("buffer").Buffer;

const XMLDisplay = () => {
    const { state } = useLayoutContext();
    const [xml, setXml] = useState(null);
    const handleConvert = () => {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const result = js2xml(state.layout, options);
        const resultStr = `<?xml version="1.0" encoding="UTF-8"?>
        ${result}`;
        setXml(resultStr);
    }
    const customTheme = {
        attributeKeyColor: "#0074D9",
        attributeValueColor: "#2ECC40"
      };
    return (
        <Card className='xml-viewer'>
            <Card.Header>XML View</Card.Header>
            <Card.Body>
                <Card.Text>
                {xml && <XMLViewer xml={xml} theme={customTheme} collapsible />}
                </Card.Text>

            </Card.Body>
            <Card.Footer><Button variant="primary" onClick={handleConvert}>Generate XML</Button></Card.Footer>
        </Card>
    )
}

export default XMLDisplay