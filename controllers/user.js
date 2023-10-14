const modelUser = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/token");

module.exports = class UserController {
  async findUsers() {
    const allUsers = await modelUser.find().exec();

    return allUsers;
  }

  async findUser(userId) {
    const user = await modelUser
      .findOne({ _id: userId }, { password: 0 })
      .exec();

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async login(userData) {
    if (!userData.email || !userData.password)
      throw new Error("Informe o e-mail e a senha");

    const user = await modelUser.findOne({ email: userData.email });

    if (!user) throw new Error("E-mail ou senha inválidos");

    const checkPassword = await bcrypt
      .compare(userData.password, user.password)
      .catch((error) => {
        throw new Error(error);
      });

    if (!checkPassword) throw new Error("Senha inválida");

    const token = createToken(user);
    let name = user.firstname + " " + user.lastname;
    const data = {
      name: name,
      cpf: user.cpf,
      email: user.email,
      token,
    };

    return data;
  }

  async createUser(user) {
    if (user.password.length < 8) {
      throw new Error("Senha deve ter mais de 8 caracteres");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt
      .hash(user.password, salt)
      .catch((error) => {
        throw new Error(error);
      });
    user.password = encryptPassword;

    const newUser = await modelUser.create(user);

    return newUser;
  }
};
