import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserCreation from "./pages/UserCreation";
import UserList from "./pages/UserList";
import RoleManagement from "./pages/RoleManagement";
import RoleCreation from "./pages/RoleCreation";
import RoleList from "./pages/RoleList";
import Login from "./pages/Login";
import PrivateRoute from "./services/PrivateRoute";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/user-signup"
            element={
              <PrivateRoute requiredRole="admin">
                <UserCreation />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard" element={<Home />} />
          <Route
            path="/user-list"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-role"
            element={
              <PrivateRoute requiredRole="admin">
                <RoleManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/role-creation"
            element={
              <PrivateRoute requiredRole="admin">
                <RoleCreation />
              </PrivateRoute>
            }
          />
          <Route
            path="/role-list"
            element={
              <PrivateRoute requiredRole="admin">
                <RoleList />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
