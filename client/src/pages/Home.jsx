import { useEffect } from "react";
import api from "../api/api";
import { useForm } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { form, handlegetCurrentForms, removeDeletedForm } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(api, { method: "GET" });
        const data = await response.json();
        handlegetCurrentForms(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchForms();
  }, []);

  const handleDeleteForm = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${api}/form/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      removeDeletedForm(data._id);
      // console.log("deleted", data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(form?.formList);

  return (
    <>
      <div className="text-center mt-8 ">
        <h1 className="font-bold text-2xl uppercase">Home</h1>
        <p className="text-gray-600 text-xl">This is an simple form builder</p>
        <button
          onClick={() => {
            navigate("/form/create");
          }}
          className="bg-green-600 text-white font-semibold px-3 py-1 mt-2 cursor-pointer hover:bg-green-700 hover:-translate-y-0.5 transform transition duration-200"
        >
          CREATE NEW FORM
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-center text-lg font-semibold mt-8">Your Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 justify-center">
          {form?.formList.map((form, index) => (
            <div
              key={form._id || index}
              className="border border-gray-300 w-max shadow-md p-4 bg-white"
            >
              <h3 className="font-semibold text-lg">{form.title}</h3>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    navigate(`/form/${form._id}/edit`);
                  }}
                  className="bg-blue-600 text-white w-20 py-1 cursor-pointer hover:bg-blue-700 hover:-translate-y-0.5 transform transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteForm(form._id);
                  }}
                  className="bg-red-600 text-white w-20 py-1 cursor-pointer hover:bg-red-700 hover:-translate-y-0.5 transform transition duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigate(`/form/${form._id}`);
                  }}
                  className="bg-green-600 text-white w-20 py-1 cursor-pointer hover:bg-green-700 hover:-translate-y-0.5 transform transition duration-200"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
