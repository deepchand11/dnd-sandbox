import template from "../utils/templateData"

function layoutReducer(state, action) {
    switch (action.type) {
        
        case 'ADD_COMPONENT': {
            const { id, item, path } = action.payload;
            const newComponent = addComponentReducer(id, item, path);
            const newState = addToLayoutReducer(newComponent,state);
            return {
                ...state,
                ...newState,
                components: {
                    ...state.components,
                    [id]: newComponent
                }
            }
        }
        case 'UPDATE_COMPONENT': {
            const { item } = action.payload
            const upComponent = updateComponentReducer(state, item);
            const newState = updateToLayoutReducer(upComponent,state)
            return {
                ...state,
                ...newState,
                components: {
                    ...state.components,
                    [item.compID]: upComponent
                },
                attributes: {
                    ...upComponent
                }
            }
        }
        case 'UPDATE_ATTRIBUTES': {
            const { comp, item } = action.payload;
            const upComponent = updateComponentAttributes( comp.id, state, item);
            const newState = updateToLayoutReducer(upComponent,state);
            return {
                ...state,
                ...newState,
                components: {
                    ...state.components,
                    [comp.id]: upComponent
                },
                attributes: {
                    ...upComponent
                }
            }
        }
        case 'SELECT_COMPONENT': {
            const { id } = action.payload;
            // let newObj = Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({[k]: v * v})));
            const selectedComponent = Object.entries(state.components).map(([k, v]) => {
                if(k===id){
                    v.selected = true;
                }else {
                    v.selected = false;
                }
                return {[k]: v}
            })
            const newObj = Object.assign({}, ...selectedComponent);
            console.log(newObj);
            return {
                ...state,
                components: {
                   ...newObj 
                },
                attributes: {
                    ...newObj[id]
                }
            }
        }
        case 'DESELECT_COMPONENT': {
            const { selected } = action.payload
            return {
                ...state,
                selected
            }
        }
        case 'SELECTED_COMPONENT_ATTRIBUTES': {
            const { item } = action.payload
            return {
                ...state,
                attributes: {
                    ...item
                }
                
            }
        }
        case 'DESELECTED_COMPONENT_ATTRIBUTES': {
            
            return {
                ...state,
                attributes: {}
                
            }
        }
        case 'SELECT_LAYOUT': {
            const { index } = action.payload
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export { layoutReducer }

const addComponentReducer = (id, item, path) => {
    // const newLayoutValues = Object.assign({}, template[item.component]);
    //deep cloning working for nested nodes but function in the object can not be cloned. Use lodash.cloneDeep()
    const newLayoutData = JSON.parse(JSON.stringify(template[item.component]));
    const newText = newLayoutData.text._cdata || newLayoutData.text
    

    return {
        id,
        path: path,
        type: item.component,
        attributes: {
            ...item.attributes,
            text: newText
        },
        selected: false,
        data: {
            ...newLayoutData,
            _attributes: {
                ID: id,
                ...newLayoutData._attributes,
                ...item.attributes
            }
        }
    };
}

const updateComponentReducer = (state, item) => {
    const uComponent = JSON.parse(JSON.stringify(state.components[item.compID]));
    const {text, ...newAttributes} = item.attributes
    uComponent.attributes = {
        ...item.attributes
    }
    uComponent.data = {
        ...uComponent.data,
        _attributes: {
            ...uComponent.data._attributes,
            ...newAttributes
        }
    }
    return uComponent;
}
const updateComponentAttributes = (id, state, item) => {
    const uComponent = JSON.parse(JSON.stringify(state.components[id]));
    const {text, ...newAttributes} = item
    uComponent.attributes = {
        ...item
    }
    if(item.text !== ""){
        uComponent.data.text._cdata = item.text
    }
    uComponent.data = {
        ...uComponent.data,
        _attributes: {
            ...uComponent.data._attributes,
            ...newAttributes
        }
    }
    return uComponent;
}


const addToLayoutReducer = (cmp,state) => {
    const {path,type,id} = cmp;
    const currPath = path.split('-');
    let questionLayout = state.layout.homework.homeworkQuestion;
    let qlayout = questionLayout[currPath[1]];
    // const components = state.components;
    const fields = qlayout[type] || [];
    qlayout[type]  = [
        ...fields,
        cmp.data
    ];
    
    return state;

}

const updateToLayoutReducer = (item,state) => {
    const currPath = item.path.split('-');
    let questionLayout = state.layout.homework.homeworkQuestion;
    let qlayout = questionLayout[currPath[1]];
    const components = state.components;
    const fields = qlayout[item.type];
    
    qlayout[item.type]  = fields.map(field => {
        if (field._attributes.ID === components[item.id].data._attributes.ID) {
            field._attributes = {
                // ...field._attributes,
                // ...components[item.id].data._attributes
                ...item.data._attributes
            }
        }
        return field
    })
    
    return state;

}
