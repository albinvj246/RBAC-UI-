import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get(`/users?email=${email}`);
      const user = response?.data?.[0];

      if (!user) {
        setError("Invalid email or password!");
        setSuccess(false);
        return;
      }

      if (!user.status) {
        setError("Your account is inactive. Please contact support.");
        setSuccess(false);
        return;
      }

      if (user.password === password) {
        const roleResponse = await API.get(`/roles/${user.roleId}`);
        const role = roleResponse?.data;

        localStorage.setItem("user", JSON.stringify(user.roleName));
        localStorage.setItem("roleId", JSON.stringify(role?.id));
        localStorage.setItem("status", JSON.stringify(user?.status));

        setSuccess(true);
        setError("");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Invalid email or password!");
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
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
        className="p-5 bg-white rounded shadow w-100"
        style={{ maxWidth: "400px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-center text-primary mb-4">Login</h3>
        {success && (
          <motion.div
            className="alert alert-success text-center"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Login successful! Redirecting...
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
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <motion.input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{ scale: 1.05 }}
              style={{ transition: "box-shadow 0.3s, scale 0.3s" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <motion.input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              whileFocus={{ scale: 1.05 }}
              style={{ transition: "box-shadow 0.3s, scale 0.3s" }}
            />
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
