const mongoose = require("mongoose");
const app = require("./app/app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.DB_URI;

mongoose
  .connect(DB)
  .then((data) => {
    console.log(data.connection.host);
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server Error:", err.message);
});
