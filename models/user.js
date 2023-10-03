const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "users",
  new Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    street: String,
    city: String,
    neighborhood: String,
    uf: String,
    cep: String,
    number: Number,
    complement: String,
    image: String,
   
  })
);

module.exports = User;
