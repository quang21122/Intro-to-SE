import userService from "../services/userService.js";

// const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     // Call the service to handle Firebase Authentication
//     const result = await userService.signInService(email, password);
//     if (result.error) {
//       return res.status(401).json({ error: result.error });
//     }

//     // Successful sign-in, send the response
//     return res.status(200).json({
//       message: "Sign-in successful",
//       userId: result.userId,
//       token: result.token // If you are sending a token (like a JWT or Firebase ID token)
//     });
//   } catch (error) {
//     console.error("Sign-in error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// const signUp = async (req, res) => {
//   const { email, password, username } = req.body;

//   if (!email || !password || !username) {
//     return res.status(400).json({ error: "Email, password, and username are required" });
//   }

//   try {
//     // Call the service to handle Firebase Authentication
//     const result = await userService.signUpService(email, password, username);
//     if (result.error) {
//       return res.status(500).json({ error: result.error });
//     }

//     // Successful sign-up, send the response
//     return res.status(201).json({
//       message: "Sign-up successful",
//       userId: result.id,
//       email: result.email,
//       username: result.username
//     });
//   } catch (error) {
//     console.error("Sign-up error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

const getUser = async (req, res) => {
  const { userId } = req.query;
  const user = await userService.getUser(userId);

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
  const newUser = await userService.updateUser(username, oldPassword, newPassword);

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
