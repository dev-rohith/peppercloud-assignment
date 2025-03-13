const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORMS":
      return { ...state, formList: action.payload };

    case "DELETE_FORM":
      return {
        ...state,
        formList: state.formList.filter((form) => form._id !== action.payload),
      };

    case "SET_CURRENT_FORM":
      return {
        ...state,
        currentForm: action.payload,
      };

    case "SET_TITLE":
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          title: action.payload,
        },
      };

    case "SET_EDIT_ID":
      return {
        ...state,
        editId: action.payload,
      };

    case "ADD_FIELD":
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: [...state.currentForm.fields, action.payload],
        },
      };

    case "SET_FIELD_TITLE":
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields.map((field) => {
            if (field.position === action.payload.position) {
              return {
                ...field,
                title: action.payload.data,
              };
            }
            return field;
          }),
        },
      };

    case "SET_FIELD_PLACEHOLDER":
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields.map((field) => {
            if (field.position === action.payload.position) {
              return {
                ...field,
                placeholder: action.payload.data,
              };
            }
            return field;
          }),
        },
      };

    case "REMOVE_FIELD":
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields
            .filter((field) => field.position !== action.payload)
            .map((field, index) => {
              //i am chaining on filetered array to update position for better experience
              return {
                ...field,
                position: index + 1,
              };
            }),
        },
      };

    default:
      return state;
  }
};

export default formReducer;
