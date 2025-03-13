const { Schema, model } = require("mongoose");

//each individual field
const FieldSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  position: { type: Number, required: true },  //position is important and also i implemented dnd id as position 
  placeholder: { type: String, required: true },
});
  
//I could also do the section but i decided to submit

// //if fileds are converted into the sections
// const SectionSchema = new Schema({
//   name: { type: String, required: true },
//   position: { type: Number, required: true },
//   fields: [FieldSchema],
// });

//form schema
const FormSchema = new Schema({
  title: { type: String, required: true },
  fields: {
    type: [FieldSchema],
    default: [],
  },
  // sections: {
  //   type: [SectionSchema],
  //   default: [],
  // },

}); //i am not using timestamps here not dealing with that one.

module.exports = model("Form", FormSchema);
