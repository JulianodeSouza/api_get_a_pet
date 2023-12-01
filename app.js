require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db/conn");

const userRoutes = require("./views/user");

app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));

// body read form-encoded
app.use(express.urlencoded({ extended: true }));

// body read application/json
app.use(express.json());

// folder images
app.use(express.static("public"));

app.use("/internal/users", userRoutes);

app.listen(5000, () => {
  console.log("############### Aplicação UP 🚀 ###############");
});
