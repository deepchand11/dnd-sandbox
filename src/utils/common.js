const valueDataType = (e,val) => {
    const type = e.target.type
switch (type) {
    case 'number':
    return Number(val);
    default:
        return val;
}
}

export {
    valueDataType
}