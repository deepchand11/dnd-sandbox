import { nanoid } from 'nanoid'

export const VERSION = "v2.5.6";

export const SIDEBAR_ITEM = "sidebarItem";
export const COMPONENT = "component";


export const SIDEBAR_ITEMS = [
    {
        id: nanoid(10),
        type: SIDEBAR_ITEM,
        // component: template.textField
        component: 'textField'

    },
    {
        id: nanoid(10),
        type: SIDEBAR_ITEM,
        // component: template.textInput
        component: "textInput"

    }
]
