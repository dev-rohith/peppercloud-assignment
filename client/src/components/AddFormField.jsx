import { MdEmail, MdTextFields, MdShortText } from "react-icons/md";
import { BsCalculator, BsCalendarDate, BsTelephone } from "react-icons/bs";
import { FiInfo, FiLink } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

import { useForm } from "../context/FormContext";

const AddFormField = () => {
  const { handleAddField } = useForm();

  const handleSelectField = (type) => {
    if (!type) return;
    handleAddField(type);
  };

  return (
    <div className="w-full">
      <div className="border border-gray-300  shadow-sm p-5 bg-white">
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <FiInfo className="mr-2 text-pink-500" />
          Click on the field to add new field to the form
        </p>

        <h3 className="text-center font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          Form Fields
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="  mb-3">
              <MdEmail className="text-2xl text-pink-500" />
            </div>
            <button
              onClick={() => handleSelectField("email")}
              className="w-full bg-pink-500 text-white px-3 py-2  cursor-pointer hover:bg-pink-600 hover:-translate-y-0.5 transform transition duration-200 shadow-sm text-sm"
            >
              Email Field
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-3">
              <MdTextFields className="text-2xl text-pink-500" />
            </div>
            <button
              onClick={() => handleSelectField("text")}
              className="w-full bg-pink-500 text-white px-3 py-2  cursor-pointer hover:bg-pink-600 hover:-translate-y-0.5 transform transition duration-200 shadow-sm text-sm"
            >
              Text Field
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-3">
              <BsCalculator className="text-2xl text-pink-500" />
            </div>
            <button
              onClick={() => handleSelectField("number")}
              className="w-full bg-pink-500 text-white px-3 py-2  cursor-pointer hover:bg-pink-600 hover:-translate-y-0.5 transform transition duration-200 shadow-sm text-sm"
            >
              Number Field
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-3">
              <BsCalendarDate className="text-2xl text-pink-500" />
            </div>
            <button
              onClick={() => handleSelectField("date")}
              className="w-full bg-pink-500 text-white px-3 py-2  cursor-pointer hover:bg-pink-600 hover:-translate-y-0.5 transform transition duration-200 shadow-sm text-sm"
            >
              Date Field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddFormField;
