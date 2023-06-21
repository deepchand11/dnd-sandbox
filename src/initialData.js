import { VERSION } from './constants'
import template from './templateData';
const initialData = {
    layout: {
        "homework": {
            "_attributes": {
                "version": VERSION,
                "xmlns": "http://www.mymaths.co.uk/XMLSchema",
                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "xsi:schemaLocation": "http://www.mymaths.co.uk/XMLSchema file:orinoco.xsd",
                "title": ""
            },
            "homeworkQuestion": [
                {
                    "_attributes": {
                        "questionmarks": "12",
                        "questiontitle": "Q1 – Dividing numbers"
                    },
                   
                },
                {
                    "_attributes": {
                        "questionmarks": "12",
                        "questiontitle": "Q2 – Dividing numbers"
                    },
                   
                }
            ]
        }
    },
    components: {
        // component0: { id: "component0", component:'textInput',type: "component", path:'q-0', value: template.textInput },
        // component1: { id: "component1", component:'textField', type: "component", path:'q-0', value: template.textField }
    },
    attributes: {},
    selected: false
};
 // "textField": [{
                    //     "_attributes": {
                    //         "ID": "component1",
                    //         "x": "20",
                    //         "y": "125",
                    //     },
                    //     "text": {
                    //         "_cdata": "Work out these calculations"
                    //     }
                    // }],
                    // "textInput": [{
                    //     "_attributes": {
                    //         "ID": "component0",
                    //         "width": "60",
                    //         "height": "23",
                    //         "x": "263",
                    //         "y": "125",
                    //         "cssstyle": "inputTextLeft",
                    //         "strokecolour": "0xCCCCCC",
                    //         "strokeweight": "1",
                    //         "padding": "-2",
                    //         "paddingleft": "0",
                    //         "restrict": "0-9\\.",
                    //         "maxcharacters": "5",
                    //         "autofocus": "autofocus",
                    //         "tick": "true",
                    //         "answer": "true",
                    //         "answerstyle": "inputTextAnswerLeft",
                    //         "tickpositionx": "65",
                    //         "tickpositiony": "-5"
                    //     }
                    // }]
export default initialData;