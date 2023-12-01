const userService = require("../src/controllers/user");

const mockUser = Promise.resolve({
  firstname: "Carlos",
  lastname: "Silva",
  email: "teste@gmail.com",
  cpf: "00000000000",
});

describe("Service user deve", () => {
  let service;

  beforeEach(async () => {
    jest.clearAllMocks();
    service = new userService();
  });

  it("listar um usuário", async () => {
    // Cria um mock do método
    const findUserMock = jest.spyOn(service, "findUser");

    // Cria o resultado esperado
    const resultExpected = {
      firstname: "Carlos",
      lastname: "Silva",
      cpf: "00000000000",
      email: "teste@gmail.com",
    };

    // Define o comportamento esperado do mock
    findUserMock.mockReturnValue(mockUser);

    // Chama o método a ser testado
    const result = await service.findUser(1);

    // Verificações
    expect(result).toEqual(resultExpected);
    expect(findUserMock).toHaveBeenCalledTimes(1);
  });
});
