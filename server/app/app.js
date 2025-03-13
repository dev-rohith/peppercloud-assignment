const express = require("express");
const Form = require("./models/Form");
const cors = require("cors");
const {
  getFroms,
  createForm,
  updateForm,
  deleteForm,
  getCurrentForm,
} = require("./controllers/formController");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/", getFroms);

app.get("/api/form/:id", getCurrentForm);

app.post("/api/form", createForm);

app.put("/api/form/:id", updateForm);

app.delete("/api/form/:id", deleteForm);

module.exports = app;
