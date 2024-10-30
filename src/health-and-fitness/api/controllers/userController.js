import userService from "../services/userService";

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.query.id);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

export default { getUser, createUser };
