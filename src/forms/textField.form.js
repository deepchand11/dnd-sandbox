export const textField = [
    {
      label: "x",
      type: "text",
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
      type: "text",
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
    }
  ];
  