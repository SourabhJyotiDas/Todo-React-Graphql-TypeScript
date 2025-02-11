import React from "react";
import { Link } from "react-router-dom"; // Import useHistory for redirection
import { useMutation, gql } from "@apollo/client";
import { logout } from "../graphql/mutation/mutation";
import { toast } from "react-toastify";
import LoadingPage from "./Loader";

export default function Navbar() {
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
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
