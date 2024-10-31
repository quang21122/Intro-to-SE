import userService from "../services/userService.js";

const getUser = async (req, res) => {
  const { username } = req.query;
  const user = await userService.getUser(username);

  if (user.error) {
    return res.status(user.status).json({ error: user.error });
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);

  if (newUser.error) {
    return res.status(newUser.status).json({ error: newUser.error });
  }

  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  // Get the username and data from the request body
  const { username, oldPassword, newPassword} = req.body;
  // Update the user document by username
  await userService.updateUser(username, oldPassword, newPassword);

  if (updateUser.error) {
    return res.status(updateUser.status).json({ error: updateUser.error });
  }

  return res.status(200).json({ message: "PUT user" });
};

const deleteUser = async (req, res) => {
  const { username } = req.query;
  console.log(username);
  // Delete the user document by username
  await userService.deleteUser(username);

  if (deleteUser.error) {
    return res.status(deleteUser.status).json({ error: deleteUser.error });
  }

  return res.status(200).json({ message: "DELETE user" });
} 

export default { getUser, createUser, updateUser, deleteUser };
