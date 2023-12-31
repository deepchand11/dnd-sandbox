import React, { useCallback } from 'react'
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import { nanoid } from 'nanoid'
import { COMPONENT, SIDEBAR_ITEM, SIDEBAR_ITEMS } from '../utils/constants';
import DropZone from '../component/DropZone';
import SideBarItem from '../component/SideBarItem';
import { useLayoutContext } from '../context/layout.context';
import { addComponent, updateComponent } from '../context/layout.actions';
import CustomTag from '../component/CustomTag';
import SelectableLayout from '../component/SelectableLayout';
import AttributeForm from '../component/AttributeForm';
import XMLViewer from '../component/XMLDisplay';
import XMLDisplay from '../component/XMLDisplay';



const LayoutContainer = () => {
    const { state, dispatch } = useLayoutContext();
 
    const layout = state.layout.homework.homeworkQuestion;
    const components = state.components;
    console.log(state.layout)
    // const selectedAttributes = state.attributes;
    const handleDrop = useCallback(
        (dropZone, item) => {
            
            if (item.type === SIDEBAR_ITEM) {
                
                const comp_id = nanoid(10);
                item.attributes.ID = comp_id
            
                dispatch(addComponent(comp_id, item, dropZone.path));

            
            }
            if (item.type === COMPONENT) {
                
                dispatch(updateComponent(item))
                
                
            }
            



        }, [layout, components]);

    // const renderComponents = (data, path) => {
    //     //make a util function to remove attribute object
    //     const arr = Object.keys(data).filter(e => e !== '_attributes')
    //     return arr.map(comp => {
        
    //         return data[comp].map((c1, index) => <Component key={c1._attributes.ID} type={comp} data={c1} />)
    //     })
        
    // }
{/* <Component key={c1.id} type={c1.type} data={c1.data} /> */}
    const renderingComp = (path) => {
        const comps = Object.values(components).filter(comp => comp.path === path)
       return comps.map((c1, i) => <CustomTag key={c1.id} type={c1.type} ID={c1.id} data={c1.data} />)
    }

    return (

        <Container fluid className="d-flex">
            <Row className="flex-fill">
                <Col sm={2} className="h-100 bg-light">
                    <div className="sideBar">
                        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
                            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
                        ))}
                    </div>
                </Col>
                <Col sm={7}>
                <div id="container" className='canvas'>
                        <Tabs
                            defaultActiveKey="Q1"
                            id="uncontrolled-tab-example"
                            className=""
                        >
                            {layout.map((q, index) => {
                                const currentPath = `q-${index}`;
                                return (

                                    <Tab key={`q-${index}`} eventKey={`Q${index + 1}`} title={`Q${index + 1}`}>
                                        <SelectableLayout style={{height:"100%"}} index={index} data={q}>
                                            <DropZone onDrop={handleDrop} data={{ path: currentPath }} components={components} />
                                            <div className='droppableCanvas'>
                                                <p className="pagetitle">{q._attributes.questiontitle}</p>
                                                {renderingComp(currentPath)}
                                            </div>
                                        </SelectableLayout>
                                    </Tab>


                                )
                                

                            })}
                        </Tabs>
                        <XMLDisplay/>
                    </div>
                </Col>
                <Col sm={3} className="bg-light">
               
                <AttributeForm state={state.attributes}  formType={state.attributes.type}/>
                
                </Col>
            </Row>
        </Container >

    )
}

export default LayoutContainer