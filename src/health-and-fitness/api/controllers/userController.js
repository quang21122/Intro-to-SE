import userService from "../services/userService.js";

const getUser = async (req, res) => {
  const { username } = req.query;
  const user = await userService.getUser(username);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  // Get the username and data from the request body
  const { username, oldPassword, newPassword} = req.body;
  // Update the user document by username
  await userService.updateUser(username, oldPassword, newPassword);
  return res.status(200).json({ message: "PUT user" });
};

const deleteUser = async (req, res) => {
  // Get the username from the request body
  const { username } = req.body;
  // Delete the user document by username
  await userService.deleteUser(username);
  return res.status(200).json({ message: "DELETE user" });
} 
export default { getUser, createUser, updateUser, deleteUser };
