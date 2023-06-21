import React, { useCallback, useState } from 'react'
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import { nanoid } from 'nanoid'
import { COMPONENT, SIDEBAR_ITEM, SIDEBAR_ITEMS } from './constants';
import DropZone from './DropZone';
import SideBarItem from './SideBarItem';
import initialData from "./initialData";
import Component from './Component';
import template from './templateData';
import useWindowSize from './hooks/useWindowResize';
import { useLayoutContext } from './layout.context';
import { addComponent, addField, updateComponent, updateField } from './layout.actions';

const Layout = () => {
    const { state, dispatch } = useLayoutContext();
    console.log(state)
    const layout = state.layout.homework.homeworkQuestion;
    // const homeworkQuestions = Object.keys(initialData.layout.homework.homeworkQuestion[0]);
    const components = state.components;
    // const [layout, setLayout] = useState(initialLayout);
    // const [components, setComponents] = useState(initialComponents);

    // const updateLayout = (key, value, index) => {
    //     const item = layout[index];

    //     const fields = item[key] || [];
    //     // const updatedField = [
    //     //     ...field,
    //     //     value
    //     // ]
    //     let updatedField = null;
    //     if (components[value._attributes.ID]) {

    //         updatedField = fields.map(field => {
    //             if (field._attributes.ID === value._attributes.ID) {
    //                 field._attributes = {
    //                     ...field._attributes,
    //                     ...value._attributes
    //                 }
    //             }
    //             return field
    //         })

    //     } else {
    //         updatedField = [
    //             ...fields,
    //             value
    //         ]
    //     }

    //     item[key] = updatedField
    //     setLayout([
    //         ...layout.slice(0, index),
    //         item,
    //         ...layout.slice(index + 1, layout.length)
    //     ]);
    // };
    const handleDrop = useCallback(
        (dropZone, item) => {
            // console.log("dropZone", dropZone);
            // console.log("item", item);
            // console.log("template", template);
            // const path = dropZone.path.split('-')
            if (item.type === SIDEBAR_ITEM) {
                // component0: { id: "component0", type: "textInput",path:'q-0', value: template.textInput },
                const comp_id = nanoid(10);
                // const newLayoutValues = Object.assign({}, template[item.component]);
                //deep cloning working for nested nodes but function in the object can not be cloned. Use lodash.cloneDeep()
                // const newLayoutValues = JSON.parse(JSON.stringify(template[item.component]));

                // newLayoutValues._attributes = {
                //     ID: comp_id,
                //     ...item.attributes
                // }
                // const newComponent = {
                //     id: comp_id,
                //     path: dropZone.path,
                //     type: item.component,
                //     value: newLayoutValues
                // };

                // setComponents({
                //     ...components,
                //     [newComponent.id]: newComponent
                // });

                dispatch(addComponent(comp_id, item, dropZone.path))

                dispatch(addField(comp_id, item, dropZone.path))

                // updateLayout(item.component, newLayoutValues, path[1])
                // return;
            }
            if (item.type === COMPONENT) {
                // const uComponent = JSON.parse(JSON.stringify(components[item.id]));
                // uComponent.value._attributes = {
                //     ...uComponent._attributes,
                //     ...item.attributes
                // }
                // const compPositions = JSON.parse(JSON.stringify(template[item.component]));
                // //Only position is updating
                // compPositions._attributes = {
                //     ID: item.id,
                //     ...compPositions._attributes,
                //     ...item.attributes
                // }

                // setComponents({
                //     ...components,
                //     [item.id]: uComponent
                // });
                dispatch(updateComponent(item))
                dispatch(updateField(item.id, item, dropZone.path))
                // updateLayout(item.component, compPositions, path[1])
                // return
            }



        }, [layout, components]);

    const renderComponents = (data, path) => {
        //make a util function to remove attribute object
        const arr = Object.keys(data).filter(e => e !== '_attributes')
        return arr.map(comp => {
            return data[comp].map((c1, index) => <Component key={c1._attributes.ID} type={comp} data={c1} />)
        })

    }

    return (
        <Container fluid>
            <Row>
                <Col md={1} lg={1} style={{ height: '85vh' }}>
                    <div className="sideBar">
                        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
                            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
                        ))}
                    </div>
                </Col>
                <Col md={8} lg={8}>
                    <div id="container" className='canvas'>
                        <Tabs
                            defaultActiveKey="Q1"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            {layout.map((q, index) => {
                                const currentPath = `q-${index}`;
                                return (

                                    <Tab key={`q-${index}`} eventKey={`Q${index + 1}`} title={`Q${index + 1}`}>
                                        <DropZone onDrop={handleDrop} data={{ path: currentPath }} components={components} />
                                        <div className='droppableCanvas'>
                                            {renderComponents(q, currentPath)}
                                        </div>
                                    </Tab>


                                )
                                // <React.Fragment key={`q${ind}`}>

                                // </React.Fragment>

                            })}
                        </Tabs>
                    </div>
                </Col>
                <Col md={3} lg={3}>
                    <div className='attr-form'>Attributes</div>
                </Col>
            </Row>
            <Row>
                <Col style={{ height: '10vh' }}>Trash</Col>
            </Row>
        </Container>
    )
}

export default Layout