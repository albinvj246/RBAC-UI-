import React, { useState, useEffect } from "react";
import { fetchRoles, updateRole, deleteRole } from "../../services/useServices";

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadRoles = async () => {
      const data = await fetchRoles();
      setRoles(data);
    };
    loadRoles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await deleteRole(id);
      setRoles(roles.filter((role) => role.id !== id));
      alert("Role deleted successfully!");
    }
  };

  return (
    <div className="container mt-5" style={{ height: "92.2vh" }}>
      <h2 className="text-center mb-4">Role List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
