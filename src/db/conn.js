const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://admin:senha@0.0.0.0:27017/get-a-pet");

  console.log("Realizou conexão");
}

main().catch((e) => {
  console.log("#### ERRO NA CONEXÃO ####");
  console.log(e);
});

module.exports = mongoose;
