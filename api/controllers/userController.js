import userService from "../services/userService.js";

const getUser = async (req, res) => {
  const { userId, email } = req.query;
  let user;
  if (!userId && !email) {
    return res.status(400).json({ error: "userId or email is required" });
  }
  else if (!userId && email) {
    user = await userService.getUserByEmail(email);
    if (user.error) {
      return res.status(user.status).json({ error: user.error });
    }
  }
  else {
    user = await userService.getUser(userId);
    if (user.error) {
      return res.status(user.status).json({ error: user.error });
    }
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
  const { userId } = req.query;

  // Get the username and data from the request body
  const data = req.body;
  // Update the user document by username
  const newUser = await userService.updateUser(userId, data);

  if (newUser.error) {
    return res.status(newUser.status).json({ error: newUser.error });
  }

  return res.status(200).json({ message: "PUT user" });
};

const deleteUser = async (req, res) => {
  const { userId } = req.query;
  // Delete the user document by username
  await userService.deleteUser(userId);

  if (deleteUser.error) {
    return res.status(deleteUser.status).json({ error: deleteUser.error });
  }

  return res.status(200).json({ message: "DELETE user" });
} 

export default { getUser, createUser, updateUser, deleteUser };
