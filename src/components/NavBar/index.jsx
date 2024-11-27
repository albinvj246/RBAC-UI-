import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("roleId");
    localStorage.removeItem("status");
    navigate("/dashboard");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-uppercase" to="/dashboard">
          <i className="fas fa-users-cog me-2"></i> User Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                {/* User List */}
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/user-list">
                    <i className="fas fa-list me-2"></i>User List
                  </Link>
                </li>

                {/* Admin-Only Links */}
                {user === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/user-signup">
                        <i className="fas fa-user-plus me-2"></i>Add User
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/role-creation">
                        <i className="fas fa-shield-alt me-2"></i>Create Role
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/role-list">
                        <i className="fas fa-clipboard-list me-2"></i>Role List
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/manage-role">
                        <i className="fas fa-cogs me-2"></i>Set Permission
                      </Link>
                    </li>
                  </>
                )}

                {/* Admin-Only Links */}
                {user === "manager" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/user-signup">
                        <i className="fas fa-user-plus me-2"></i>Add User
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/role-list">
                        <i className="fas fa-clipboard-list me-2"></i>Role List
                      </Link>
                    </li>
                  </>
                )}

                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-light"
                    onClick={handleLogout}
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </li>
              </>
            )}

            {/* Login Link */}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
