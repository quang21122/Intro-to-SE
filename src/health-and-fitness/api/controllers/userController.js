import userService from "../services/userService.js";

const getUser = async (req, res) => {
  return res.status(200).json({ message: "GET user" });
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

export default { getUser, createUser };
