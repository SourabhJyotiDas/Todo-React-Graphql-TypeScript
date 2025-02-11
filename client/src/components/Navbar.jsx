import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory for redirection
import { toast } from "react-toastify";
import { logout } from "../graphql/mutation/mutation";
import LoadingPage from "./Loader";

import { useApolloClient } from "@apollo/client";

export default function Navbar({ user, setUser }) {
  const client = useApolloClient();
  const navigate = useNavigate();

  const [handleLogout, { loading, data, error, reset }] = useMutation(
    gql(logout)
  );

  if (loading) return <LoadingPage />;

  if (error) {
    toast.error(error.message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  }

  if (data) {
    toast.success(data?.logoutUser?.message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
    setUser(null);
    navigate("/login"); // ✅ Navigate to /dashboard
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">Taskify</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/create-todo" className="text-gray-300 hover:text-white">
            Create New Todo
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
