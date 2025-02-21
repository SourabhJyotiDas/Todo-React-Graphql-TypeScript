import React, { useState } from "react";
import {gql,useMutation} from "@apollo/client"
import { UPDATE_USER_PASSWORD } from "../graphql/mutation/mutation";
import LoadingPage from "./Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [handleChangePassowrd, { loading, data, error, reset }] = useMutation(
    gql(UPDATE_USER_PASSWORD)
  );

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwords;

    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Password length validation
    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    handleChangePassowrd({
      variables: { oldPassword, newPassword },
    });

    // Reset messages and submit the form
    setErrorMessage("");
  };

  
  if (loading) return <LoadingPage />;

  if (data) {
    toast.success(data?.updateUserPassword?.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
    navigate("/profile");
  }

  if (error) {
    toast.error(error.message, {
      position: "bottom-right",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 text-gray-200 transition hover:scale-[1.02]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
          Update Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold mb-2" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <button
            type="submit"
            className="w-full cursor-pointer p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition hover:scale-105 active:scale-95"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
