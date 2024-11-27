import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 4px 15px rgba(0, 123, 255, 0.5)" },
  };

  return (
    <div
      className="container-fluid bg-dark"
      style={{ height: "92.3vh", overflow: "hidden" }}
    >
      <div className="row align-items-center justify-content-center text-center py-5">
        <motion.div
          className="col-md-8 col-lg-6 p-4 bg-white rounded shadow"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="display-4 fw-bold text-primary mb-3"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-muted fs-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Welcome to your personalized dashboard. Manage tasks, view
            analytics, and stay updated all in one place.
          </motion.p>
          <motion.button
            className="btn btn-primary btn-lg px-5 mt-3"
            variants={buttonVariants}
            whileHover="hover"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
