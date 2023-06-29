  const textField = [
  {
    label: "ID",
    type: "text",
    name: "ID",
    placeholder: "ID",
    value: "",
    validations: [
      {
        type: "minLength",
        value: 10,
        message: "Min. 3 characters"
      },
      {
        type: "required",
        message: "ID is required"
      }
    ]
  },
    {
      label: "x",
      type: "number",
      name: "x",
      placeholder: "x - right/left",
      value: "",
      validations: [
        {
          type: "minLength",
          value: 3,
          message: "Min. 3 characters"
        },
        {
          type: "required",
          message: "Username is required"
        }
      ]
    },
    {
      label: "y",
      type: "number",
      name: "y",
      placeholder: "y - top/bottom",
      value: "",
      validations: [
        {
          type: "minLength",
          value: 3,
          message: "Min. 3 characters"
        },
        {
          type: "required",
          message: "Username is required"
        }
      ]
    },
    {
      label: "Text",
      type: "text",
      name: "text",
      placeholder: "text",
      value: "",
      validations: [
        {
          type: "minLength",
          value: 10,
          message: "Min. 3 characters"
        },
        {
          type: "required",
          message: "text is required"
        }
      ]
    },
  ];
  export default textField;