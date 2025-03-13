import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import api from "../api/api";

const FormView = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchForm = async () => {
        try {
          const response = await fetch(`${api}/form/${id}`, { method: "GET" });
          if (!response.ok) throw new Error("Failed to fetch form data");
          const data = await response.json();
          setForm({
            ...data,
            fields: data.fields.map((field) => ({
              ...field,
              value: field.value || "",
            })),
          });
        } catch (error) {
          console.error("Error fetching form:", error);
        }
      };
      fetchForm();
    }
  }, [id]);

  const validateField = (id, value, type) => {
    let errorMsg = "";

    if (!value.trim()) {
      errorMsg = "This field is required";
    } else {
      switch (type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) errorMsg = "Enter a valid email address";
          break;
        case "number":
          if (isNaN(value)) errorMsg = "Enter a valid number";
          break;
        case "date":
          if (isNaN(Date.parse(value))) errorMsg = "Enter a valid date";
          break;
        default:
          break;
      }
    }

    return errorMsg;
  };

  const handleChange = (id, newValue, type) => {
    setForm((prevForm) => ({
      ...prevForm,
      fields: prevForm.fields.map((field) =>
        field._id === id ? { ...field, value: newValue } : field
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    form.fields.forEach((field) => {
      if (["email", "text", "date", "number"].includes(field.type)) {
        const errorMsg = validateField(field._id, field.value, field.type);
        if (errorMsg) newErrors[field._id] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", form);

      setErrors({});
    }
  };

  if (!form) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <form
      className="relative max-w-3xl mx-auto mt-15 p-6 bg-white shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl text-center font-bold text-gray800 mb-4">
        {form.title}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {form.fields.map((field) => (
          <div key={field._id} className="border p-4 bg-gray-50">
            <label className="block font-medium text-gray-700">
              {field.title}
            </label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) =>
                handleChange(field._id, e.target.value, field.type)
              }
              className={`mt-1 block w-full px-3 py-2 border bg-gray-100 text-gray-900 
              ${errors[field._id] ? "border-red-500" : "border-gray-300"}`}
            />
            {errors[field._id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field._id]}</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={()=>{navigate('/')}}
        type="button"
        className="absolute flex items-center gap-2 top-2 right-6 group bg-pink-500 pl-3 pr-4 border  text-white hover:bg-pink-600 cursor-pointer"
      >
        <IoMdArrowBack className="group-hover:-translate-x-0.5 group-hover:scale-110 transition-all " />
        Back
      </button>
      <button
        type="submit"
        className="w-full mx-auto mt-4 px-4 py-2 bg-violet-600 text-white font-semibold hover:bg-violet-700 hover:-translate-y-0.5 transform transition duration-200 cursor-pointer"
      >
        Submit Form
      </button>
    </form>
  );
};

export default FormView;
