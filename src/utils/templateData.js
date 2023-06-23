// const template = {
//     "textField": {
//         type: "textField",
//         content: "Some text",
//         value: {
//             "_attributes": {
//                 "x": "0",
//                 "y": "0",
//             },
//             "text": {
//                 "_cdata": "Work out these calculations"
//             }
//         }
//     },
//     "textInput": {
//         type: "textInput",
//         content: "Some input",
//         value: {
//             "_attributes": {
//                 "x": "0",
//                 "y": "0",
//             }
//         }
//     }
// }
const template = {
        "textField": {
            "_attributes": {
                "x": "0",
                "y": "0",
            },
            "text": {
                "_cdata": "Text placeholder"
            }
        },
        "textInput": {
            "_attributes": {
                "x": "0",
                "y": "0",
            }
        },
        "textNewInput": {
            "_attributes": {
                "x": "0",
                "y": "0",
            },
            "text": {
                "_cdata": "Text placeholder"
            }
        }
    }
/*
comp1: {
    id:"comp1",
    type: "textInput",
    value: {
            "_attributes": {
                "x": "0",
                "y": "0",
            }
        }
}
*/
// component0: { id: "component0", type: "textInput", content: "textinput" },
export default template;