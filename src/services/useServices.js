import API from "./api";

//user endpoints

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await API.get("/users");
    return response?.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Create a new user
export const createUser = async (data) => {
  try {
    const response = await API.post("/users", data);
    return response?.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Update a user
export const updateUser = async (id, data) => {
  try {
    const response = await API.put(`/users/${id}`, data);
    return response?.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Role endpoints

// Fetch all roles
export const fetchRoles = async () => {
  try {
    const response = await API.get("/roles");
    return response?.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};

//fetch role by id
export const fetchRoleById = async (roleId) => {
  try {
    const response = await API.get(`/roles/${roleId}`);
    console.log("resss",response);
    return response?.data; // Returns the role data
  } catch (error) {
    console.error(`Error fetching role with ID ${roleId}:`, error);
    return null; // Return null or handle appropriately if an error occurs
  }
};

// Create a new role
export const createRole = async (data) => {
  try {
    const response = await API.post("/roles", data);
    return response?.data;
  } catch (error) {
    console.error("Error creating role:", error);
  }
};

// Update a role
export const updateRole = async (id, data) => {
  try {
    const response = await API.put(`/roles/${id}`, data);
    return response?.data;
  } catch (error) {
    console.error("Error updating role:", error);
  }
};

// Delete a role
export const deleteRole = async (id) => {
  try {
    const response = await API.delete(`/roles/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error deleting role:", error);
  }
};
