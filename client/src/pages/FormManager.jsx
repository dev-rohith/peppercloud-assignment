import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPencilAlt, FaRegSave, FaRegWindowClose } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useForm } from "../context/FormContext";
import FormEditor from "../components/FormEditor";
import AddFormField from "../components/AddFormField";
import api from "../api/api";
import { IoMdArrowBack } from "react-icons/io";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import FormFeed from "../components/FormFeed";

const FormManager = () => {
  const { form, setEditId, handleRemoveField, handleSetCurrentForm } =
    useForm();
  const [isAddField, setIsAddField] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [clientErrors, setClientErrors] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  //to work drag and drop in mobiles and what ever using Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (id) {
      const fetchForm = async () => {
        try {
          const response = await fetch(`${api}/form/${id}`, { method: "GET" });
          const data = await response.json();
          handleSetCurrentForm(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchForm();
    }
    return () => {
      handleSetCurrentForm({
        title: "",
        fields: [],
      });
    };
  }, [id]);

  const handleEditFormField = (position) => {
    setIsEditTitle(false);
    setEditId(position);
  };

  const runClientValidations = (formData) => {
    const errors = {};
    if (!formData.title) {
      errors.title = "Form Title is required";
    }
    if (formData.fields.length === 0) {
      errors.fields = "At least one field is required";
    }
    if (formData.fields.length > 0) {
      formData.fields.forEach((field) => {
        if (!field.title) {
          errors.fields = `${field.position} Field title is required`;
        }
      });
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
  };

  const handleSaveForm = async () => {
    const errors = runClientValidations(form.currentForm);
    if (errors) {
      console.log(errors);
      setClientErrors(errors);
      return;
    }
    setClientErrors({});
    try {
      const resule = await fetch(`${api}/form`, {
        method: "POST",
        body: JSON.stringify(form.currentForm),
        headers: { "Content-Type": "application/json" },
      });
      const data = await resule.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleUpdateForm = async () => {
    const errors = runClientValidations(form.currentForm);
    if (errors) {
      console.log(errors);
      setClientErrors(errors);
      return;
    }
    setClientErrors({});
    try {
      const resule = await fetch(`${api}/form/${id}`, {
        method: "PUT",
        body: JSON.stringify(form.currentForm),
        headers: { "Content-Type": "application/json" },
      });
      await resule.json();
      //just navigating back to home page after update
      navigate("/");
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const getTaskPosition = (id) =>
      form.currentForm.fields.findIndex((field) => field.position === id);

    const oldIndex = getTaskPosition(active.id);
    const newIndex = getTaskPosition(over.id);

    console.log("oldIndex", oldIndex, "newIndex", newIndex);

    const newFields = arrayMove(form.currentForm.fields, oldIndex, newIndex);

    const fieldsWithUpdatedPositions = newFields.map((field, index) => ({
      ...field,
      position: index + 1,
    }));

    handleSetCurrentForm({
      ...form.currentForm,
      fields: fieldsWithUpdatedPositions,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h4 className="text-center text-2xl font-semibold mb-6 text-gray-800">
        Create New Form
      </h4>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="w-full md:w-1/2 lg:w-2/5">
          <div className="border border-gray-300  shadow-md min-h-60 h-max p-6 bg-gray-50">
            <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-gray-200">
              <h4 className="font-bold text-gray-800 text-lg">
                {form?.currentForm.title || "Untitled Form"}
              </h4>
              <FaPencilAlt
                onClick={() => setIsEditTitle(!isEditTitle)}
                className="text-violet-700 cursor-pointer hover:text-violet-500 transition-all duration-200"
                size={16}
              />
            </div>

            {clientErrors.title && (
              <p className="text-red-500 text-sm">{clientErrors.title}</p>
            )}
            {clientErrors.fields && (
              <p className="text-red-500 text-sm">{clientErrors.fields}</p>
            )}

            {form?.currentForm.fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <IoDocumentTextOutline className="text-4xl mb-4" />
                <p className="text-center">
                  No fields added yet. Click "Add Field" to get started.
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <FormFeed
                  fields={form?.currentForm.fields}
                  handleEditFormField={handleEditFormField}
                  handleRemoveField={handleRemoveField}
                />
              </DndContext>
            )}

            <button
              onClick={id ? handleUpdateForm : handleSaveForm}
              className="w-full mt-4 text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4  font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaRegSave />
              {id ? "Update Form" : "Save Form"}
            </button>

            <button
              onClick={() => setIsAddField(!isAddField)}
              className=" mt-4 w-full text-center text-center bg-violet-600 hover:bg-violet-700 text-white py-2 px-4  font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAddField ? (
                <>
                  <FaRegWindowClose />
                  Close Add Field
                </>
              ) : (
                <>
                  <MdOutlinePostAdd />
                  Add Field
                </>
              )}
            </button>
          </div>

          {isAddField && (
            <div className="mt-4 bg-white border border-gray-200  shadow-md p-4">
              <AddFormField />
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5 mt-6 md:mt-0">
          <FormEditor isEditTitle={isEditTitle} />
        </div>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        className="absolute flex items-center gap-2 top-4 right-20 group bg-pink-500 px-6 py-1 border  text-white hover:bg-pink-600 cursor-pointer"
      >
        <IoMdArrowBack className="group-hover:-translate-x-0.5 group-hover:scale-110 transition-all " />
        Back
      </button>
    </div>
  );
};
export default FormManager;
