import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, deleteUser, updateUser } from "../../services/useServices";
import { useNavigate } from "react-router-dom";
import API from "../../services/api"; 
import "./userList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState({ message: "", type: "" }); 
  const [permissions, setPermissions] = useState([]); 
  const navigate = useNavigate();
  const hasCheckedPermissions = useRef(false);

  useEffect(() => {
    if (hasCheckedPermissions.current) return;

    hasCheckedPermissions.current = true;

    const checkPermissionsAndFetchUsers = async () => {
      try {
        const roleId = localStorage.getItem("roleId").replace(/"/g, "");
        const response = await API.get(`/roles/${roleId}`);
        const userPermissions = response?.data?.permissions || [];

        if (!userPermissions.includes("read")) {
          
          setAlerts({
            message:
              "Access denied. You do not have permission to view this page.",
            type: "danger",
          });

          setLoading(false);

          
          setTimeout(() => {
            navigate("/dashboard"); 
          }, 2000);

          return;
        }

      
        setPermissions(userPermissions);

      
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error checking permissions or fetching users:", error);
        setAlerts({
          message: "An error occurred while checking permissions.",
          type: "danger",
        });
        setLoading(false);
      }
    };

    checkPermissionsAndFetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!permissions.includes("delete")) {
      setAlerts({
        message: "Access denied. You do not have permission to delete users.",
        type: "danger",
      });
      setTimeout(() => setAlerts({ message: "", type: "" }), 2000);
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setAlerts({ message: "User deleted successfully!", type: "success" });

      setTimeout(() => {
        setAlerts({ message: "", type: "" });
      }, 2000);
    }
  };

  const toggleStatus = async (user) => {
    if (!permissions.includes("update")) {
      setAlerts({
        message: "Access denied. You do not have permission to update users.",
        type: "danger",
      });
      setTimeout(() => setAlerts({ message: "", type: "" }), 2000);
      return;
    }

    const updatedUser = { ...user, status: !user.status };
    await updateUser(user.id, updatedUser);
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    setAlerts({ message: "User status updated!", type: "success" });

    setTimeout(() => {
      setAlerts({ message: "", type: "" });
    }, 2000);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {/* Display Alert Message */}
      {alerts.message && (
        <div
          className={`alert alert-${alerts.type} alert-dismissible fade show`}
          role="alert"
        >
          {alerts.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlerts({ message: "", type: "" })}
          ></button>
        </div>
      )}
      <h2 className="text-center mb-4">User List</h2>
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roleName}</td>
              <td>
                <span
                  className={`badge ${
                    user.status ? "bg-success" : "bg-danger"
                  }`}
                >
                  {user.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                {permissions.includes("update") && (
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => toggleStatus(user)}
                  >
                    Toggle Status
                  </button>
                )}
                {permissions.includes("delete") && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
