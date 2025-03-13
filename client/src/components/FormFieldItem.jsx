import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

const FormFieldItem = ({id, field, handleRemoveField, handleEditFormField }) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

  return (
    <div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={style}
     className="bg-white  border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <label
            htmlFor={field.position}
            className="text-gray-700 font-semibold text-sm"
          >
            {field.title}
          </label>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 ll">
            Position: {field.position}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <input
            id={field.position}
            type={field.type}
            placeholder={field.placeholder}
            className="border border-gray-300 p-2 w-full  text-gray-700 focus:ring-2 focus:ring-violet-300 focus:border-violet-500 outline-none transition-all duration-200"
            disabled
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleEditFormField(field.position)}
              className="p-2  hover:bg-gray-100 text-violet-700 transition-colors duration-200"
            >
              <FaPencilAlt size={14} />
            </button>
            <button
              onClick={() => handleRemoveField(field.position)}
              className="p-2  hover:bg-gray-100 text-red-600 transition-colors duration-200"
            >
              <MdDelete size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormFieldItem;
