import { useEffect, useState } from "react";
import { useForm } from "../context/FormContext";
import { ImPencil2 } from "react-icons/im";

const FormEditor = ({ isEditTitle }) => {
  const {
    handleFormTitleChange,
    form,
    handleFieldTitleChange,
    handleFieldPlaceHolderChange,
  } = useForm();
  const [field, setField] = useState(null);

  useEffect(() => {
    if (form.editId) {
      const currentField = form.currentForm.fields.find(
        (field) => field.position === form.editId
      );
      setField(currentField);
    }
  }, [form.editId, form]);

  return (
    <div className="w-full lg:w-72 border border-gray-300  shadow-md h-auto min-h-80 p-6 bg-white">
      <h3 className="text-center font-semibold uppercase text-gray-700 pb-3 mb-4 border-b border-gray-200">
        Form Editor
      </h3>

      {isEditTitle ? (
        <div className="space-y-2 mb-4 animate-fadeIn">
          <div className="mb-1">
            <label
              htmlFor="formTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Form Title
            </label>
            <input
              id="formTitle"
              value={form.currentForm.title}
              onChange={(e) => handleFormTitleChange(e.target.value)}
              type="text"
              className="w-full border border-gray-300  p-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all duration-200"
              placeholder="Enter form title"
            />
          </div>
        </div>
      ) : !field ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <ImPencil2 className="w-8 h-8" />
          <p className="text-center text-sm">
            Select a field to edit or click "Add Field" to create a new one
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="text-center capitalize font-medium mb-3 bg-violet-100 text-violet-800 py-1.5 px-3 ">
            Editing {field.type} Field
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="fieldTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Field Title
              </label>
              <input
                id="fieldTitle"
                onChange={(e) =>
                  handleFieldTitleChange(field.position, e.target.value)
                }
                type="text"
                value={field.title}
                className="w-full border border-gray-300  p-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all duration-200"
                placeholder="Enter field title"
              />
            </div>

            {field.type !== "date" && (
              <div>
                <label
                  htmlFor="placeholder"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Field Placeholder
                </label>
                <input
                  id="placeholder"
                  onChange={(e) =>
                    handleFieldPlaceHolderChange(field.position, e.target.value)
                  }
                  type="text"
                  value={field.placeholder}
                  className="w-full border border-gray-300  p-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all duration-200"
                  placeholder="Enter placeholder text"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FormEditor;
