import React, { useState, useEffect } from "react";
import API from "../../services/api";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const response = await API.get("/roles");
      setRoles(response?.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setPermissions(role.permissions || []);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/roles/${editingRole.id}`, { permissions });

      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...role, permissions } : role
        )
      );

      const currentUserRole = JSON.parse(localStorage.getItem("user"));
      if (editingRole.name === currentUserRole) {
        localStorage.setItem("permissions", JSON.stringify(permissions));
      }

      setEditingRole(null);
      setPermissions([]);

      alert("Role permissions updated successfully!");
    } catch (error) {
      console.error("Error updating role permissions:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await API.delete(`/roles/${id}`);
        setRoles(roles.filter((role) => role.id !== id));
        alert("Role deleted successfully!");
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="container mt-5" style={{ height: "92.2vh" }}>
      <h2 className="text-center mb-4">Role Management</h2>
      <div className="row">
        <div className="col-md-6">
          {editingRole && (
            <>
              <h4>Edit Permissions for Role: {editingRole.name}</h4>
              <form onSubmit={handleUpdateRole}>
                <div className="mb-3">
                  <label className="form-label">Permissions</label>
                  <div>
                    {["create", "read", "update", "delete"].map((perm) => (
                      <div key={perm} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={perm}
                          id={`perm-${perm}`}
                          checked={permissions.includes(perm)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPermissions([...permissions, perm]);
                            } else {
                              setPermissions(
                                permissions.filter((p) => p !== perm)
                              );
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`perm-${perm}`}
                        >
                          {perm}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Permissions
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditingRole(null);
                    setPermissions([]);
                  }}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </div>
        <div className="col-md-6">
          <h4>Existing Roles</h4>
          <ul className="list-group">
            {roles.map((role) => (
              <li
                key={role.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {role.name}
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditRole(role)}
                  >
                    Edit Permissions
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
