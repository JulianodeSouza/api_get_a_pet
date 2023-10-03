const mongoose = require("mongoose");
const { Schema } = mongoose;

const Pet = mongoose.model({
  photo: String,
  name: { type: String, required: true },
  weigth: Number,
  age: Number,
  color: String,
  available: Boolean,
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
});
