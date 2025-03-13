import { createContext, useContext, useReducer } from "react";
import formReducer from "../reducers/formReducer";

const FormContext = createContext();

//global state is not needed intendly doing this to show that i know how to use useReducer with context
const formInitialState = {
  formList: [], // i am only fetching the forms with only title what if more forms with details payload becomes more
  currentForm: {
    title: "",
    fields: [],
  },
  editId: null,
};

const FormProvider = ({ children }) => {
  const [form, formDispatch] = useReducer(formReducer, formInitialState);

   //all core functionalities is here for the most of major functionalities

  const handlegetCurrentForms = (data) => {
    formDispatch({ type: "SET_FORMS", payload: data });
  };

  const handleFormTitleChange = (title) => {
    console.log("title", title);
    formDispatch({ type: "SET_TITLE", payload: title });
  };

  const handleAddField = (type) => {
    const formatedField = {
      position: form.currentForm.fields.length + 1,
      type: type,
      title: "Title",
      placeholder: "Placeholder",
    };
    formDispatch({ type: "ADD_FIELD", payload: formatedField });
  };

  const setEditId = (position) => {
    formDispatch({ type: "SET_EDIT_ID", payload: position });
  };

  const handleFieldTitleChange = (position, data) => {
    formDispatch({ type: "SET_FIELD_TITLE", payload: { position, data } });
  };

  const handleFieldPlaceHolderChange = (position, data) => {
    formDispatch({
      type: "SET_FIELD_PLACEHOLDER",
      payload: { position, data },
    });
  };

  const handleRemoveField = (position) => {
    formDispatch({ type: "REMOVE_FIELD", payload: position });
  };

  const removeDeletedForm = async (id) => {
    formDispatch({ type: "DELETE_FORM", payload: id });
  };

  const handleSetCurrentForm = async (data) => {
    formDispatch({ type: "SET_CURRENT_FORM", payload: data });
  };

  return (
    <FormContext.Provider
      value={{
        form,
        handlegetCurrentForms,
        handleFormTitleChange,
        handleAddField,
        setEditId,
        handleFieldTitleChange,
        handleFieldPlaceHolderChange,
        handleRemoveField,
        removeDeletedForm,
        handleSetCurrentForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;

const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export { useForm };
