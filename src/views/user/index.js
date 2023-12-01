const router = require("express").Router();
const UserService = require("../../controllers/user");
const { verifyToken } = require("../../services/token");

router.post("/login", async (req, res) => {
  try {
    const userService = new UserService();
    const loginUser = await userService.login(req.body);

    res.json(loginUser);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message || error });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const userService = new UserService();
    const user = await userService.findUser(userId);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message || error });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const userService = new UserService();
    const allUsers = await userService.findUsers();

    res.json(allUsers);
  } catch (error) {
    res.json({ error: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const userService = new UserService();
    const user = await userService.createUser(req.body);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message || error });
  }
});

module.exports = router;
