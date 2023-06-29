export const addField = (id, item, path) => {
    return {
        type: "ADD_FIELD",
        payload: {
            id,
            item,
            path
        }
    };
}

export const updateField = (id, item, path) => {
    return {
        type: "UPDATE_FIELD",
        payload: {
            id,
            item,
            path
        }
    };
}

export const addComponent = (id, item, path) => {
    return {
        type: "ADD_COMPONENT",
        payload: {
            id,
            item,
            path
        }
    };
}

export const updateComponent = (item) => {
    return {
        type: "UPDATE_COMPONENT",
        payload: {
            item
        }
    };
}

export const updateAttributes = (comp, item,path) => {
    return {
        type: "UPDATE_ATTRIBUTES",
        payload: {
            comp,
            item
        }
    };
}

export const selectComponent = (id) => {
    return {
        type: "SELECT_COMPONENT",
        payload: {
            id
        }
    };
}

export const selectLayout = (index) => {
    return {
        type: "SELECT_LAYOUT",
        payload: {
            index
        }
    };
}

export const deselectComponent = (id) => {
    return {
        type: "DESELECT_COMPONENT",
        payload: {id}
    };
}
export const selectedAttributes = (item) => {
    return {
        type: "SELECTED_COMPONENT_ATTRIBUTES",
        payload: {
            item
        }
    };
}

export const deselectedAttributes = () => {
    return {
        type: "DESELECTED_COMPONENT_ATTRIBUTES"
    };
}