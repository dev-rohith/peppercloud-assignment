const Form = require("../models/Form");

exports.getFroms = async (req, res) => {
  try {
    const forms = await Form.find().select("title");

    res.status(200).json(forms);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createForm = async (req, res) => {
  const data = req.body;
  try {
    const updatedForm = await Form.create(data);
    res.status(200).json(updatedForm);
  } catch (error) {
    console.log("error", error) + 6;
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrentForm = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await Form.findById(id);
    res.status(200).json(form);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateForm = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(id);
  try {
    const updatedForm = await Form.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updatedForm);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteForm = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedForm = await Form.findByIdAndDelete(id);
    res.status(200).json(deletedForm);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};
