const getUserById = async (id) => {
    // Mock fetching user, replace with database call
    return { id, name: "John Doe" };
  };
  
  const createUser = async (data) => {
    // Mock creating user, replace with database call
    return { id: "newUserId", ...data };
  };
  
  export default { getUserById, createUser };
  