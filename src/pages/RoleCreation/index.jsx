import React, { useState } from "react";
import { createRole } from "../../services/useServices";

const RoleCreation = () => {
  const [roleName, setRoleName] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = { name: roleName };
    await createRole(newRole);
    setAlert({ message: "Role created successfully!", type: "success" });
    setRoleName("");
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 2000);
  };

  return (
    <div className="container mt-5" style={{ height: "92.2vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add New Role</h4>
            </div>
            <div className="card-body">
              {alert.message && (
                <div
                  className={`alert alert-${alert.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlert({ message: "", type: "" })}
                  ></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="roleName" className="form-label">
                    Role Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    placeholder="Enter role name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Role
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCreation;
