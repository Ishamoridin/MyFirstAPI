const { Router } = require(`express`);
const userRouter = Router();
const { hashPass, comparePass, validateUser } = require('../middleware');
const { createUser, readUsers, updateUser, deleteUser, loginUser } = require(`./userControllers`)
userRouter.post("/createUser", validateUser, hashPass, createUser);
userRouter.get("/readUsers", readUsers);
userRouter.post("/login", comparePass, loginUser);
userRouter.patch("/updateUser", updateUser);
userRouter.delete("/deleteUser", deleteUser);
module.exports = userRouter