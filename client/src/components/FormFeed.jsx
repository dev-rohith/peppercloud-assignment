import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import FormFieldItem from "./FormFieldItem";

const FormFeed = ({ fields, handleRemoveField, handleEditFormField }) => {
  const itemIds = fields.map((field) => field.position);

  //i know i am doing props drilling because i not cosider this situation in the first place
  //for only two levels of props drilling so dont confuse here i am following exactly how demo video is doing.
  // i maintaining sink so not using the memo because of the same reason.

  return (
    <div className="grid grid-cols-1 gap-4 bg-pink-100 p-4">
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {fields.map((field) => (
          <FormFieldItem
            id={field.position}
            key={field.position}
            field={field}
            handleEditFormField={handleEditFormField}
            handleRemoveField={handleRemoveField}
          />
        ))}
      </SortableContext>
    </div>
  );
};
export default FormFeed;
