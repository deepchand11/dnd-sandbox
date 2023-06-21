import template from "./templateData"

function layoutReducer(state, action) {
    switch (action.type) {
        case 'ADD_FIELD': {
            const { id, item, path } = action.payload
            const newField = addLayoutReducer(id,item,path,state)
            console.log(newField)
            return newField
        }
        case 'UPDATE_FIELD': {
            const { id, item, path } = action.payload
           const updatedState =  updateLayoutReducer(id,item,path,state)
            return updatedState
        }
        case 'ADD_COMPONENT': {
            const { id, item, path } = action.payload
            const newComponent = addComponentReducer(id, item, path)
            return {
                ...state,
                components: {
                    ...state.components,
                    [id]: newComponent
                }
            }
        }
        case 'UPDATE_COMPONENT': {
            const { item } = action.payload
            const upComponent = updateComponentReducer(state, item);
            return {
                ...state,
                components: {
                    ...state.components,
                    [item.id]: upComponent
                }
            }
        }
        case 'SELECT_COMPONENT': {
            const { selected } = action.payload
            return {
                ...state,
                selected
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

    return {
        id,
        path: path,
        type: item.component,
        attributes: item.attributes,
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
    const uComponent = JSON.parse(JSON.stringify(state.components[item.id]));
    uComponent.attributes = {
        ...uComponent.attributes,
        ...item.attributes
    }
    uComponent.data = {
        ...uComponent.data,
        _attributes: {
            ...uComponent.data._attributes,
            ...item.attributes
        }
    }
    return uComponent;
}

const addLayoutReducer = (id,item,path,state) => {
    const currPath = path.split('-');
    let questionLayout = state.layout.homework.homeworkQuestion;
    let qlayout = questionLayout[currPath[1]];
    const components = state.components;
    const fields = qlayout[item.component] || [];
    qlayout[item.component]  = [
        ...fields,
        components[id].data
    ];
    
    return state;

}

const updateLayoutReducer = (id,item,path,state) => {
    const currPath = path.split('-');
    let questionLayout = state.layout.homework.homeworkQuestion;
    let qlayout = questionLayout[currPath[1]];
    const components = state.components;
    const fields = qlayout[item.component];
    
    qlayout[item.component]  = fields.map(field => {
        if (field._attributes.ID === components[id].data._attributes.ID) {
            field._attributes = {
                ...field._attributes,
                ...components[id].data._attributes
            }
        }
        return field
    })
    
    return state;

}