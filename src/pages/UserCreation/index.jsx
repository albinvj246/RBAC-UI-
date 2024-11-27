import React, { useState, useEffect } from "react";
import { createUser, fetchRoles } from "../../services/useServices";
import { motion } from "framer-motion";
import "./userCreation.css";

const UserCreation = () => {
  const [name, setName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  useEffect(() => {
    const loadRoles = async () => {
      const data = await fetchRoles();
      setRoles(data);
    };
    loadRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !roleId || !email || !password) {
      setError("All fields are required!");
      setSuccess(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      setSuccess(false);
      return;
    }

    const newUser = { name, roleId, roleName, email, status, password };
    try {
      await createUser(newUser);
      setSuccess(true);
      setError("");
      setName("");
      setRoleId("");
      setRoleName("");
      setEmail("");
      setPassword("");
      setStatus(true);
    } catch (err) {
      setError("Failed to create user. Please try again.");
      setSuccess(false);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    const selectedRole = roles.find((r) => r.id === selectedRoleId);
    setRoleId(selectedRoleId);
    setRoleName(selectedRole?.name || "");
  };

  const alertVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ height: "92.2vh" }}
    >
      <motion.div
        className="p-4 bg-white rounded shadow-lg w-100"
        style={{ maxWidth: "500px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h4 className="text-center text-primary mb-4">Add New User</h4>


        {success && (
          <motion.div
            className="alert alert-success text-center"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            User created successfully!
          </motion.div>
        )}

        {error && (
          <motion.div
            className="alert alert-danger text-center"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select custom-select"
              id="role"
              value={roleId}
              onChange={handleRoleChange}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select custom-select"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary w-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add User
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserCreation;
