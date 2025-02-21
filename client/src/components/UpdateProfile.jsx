import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_USER_DETAILS } from "../graphql/mutation/mutation";
import LoadingPage from "./Loader"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateUserDetails = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const [userDetails, setUserDetails] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const [handleUpdateProfile, { loading, data, error, reset }] = useMutation(
    gql(UPDATE_USER_DETAILS)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    const { username, email, phone } = userDetails;

    // Basic validation
    if (!username || !email) {
      setErrorMessage("All fields are required.");
      return;
    }

    handleUpdateProfile({
      variables: { username, email, phone },
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    // Reset messages and submit the form
    setErrorMessage("");
    setSuccessMessage("User details updated successfully!");

    // Call API or perform the update logic here
  };

  if (loading) return <LoadingPage />;

  if (data) {
    toast.success(data?.updateUserDetails?.message, {
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
          Update User Details
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-300 font-semibold mb-2"
              htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-300 font-semibold mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-300 font-semibold mb-2"
              htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">{successMessage}</div>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition hover:scale-105 active:scale-95">
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
