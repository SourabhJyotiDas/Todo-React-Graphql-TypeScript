import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { gql, useMutation } from "@apollo/client";
import { deleteAccount, logout } from "../graphql/mutation/mutation";
import { AppContext } from "../context/AppContext";
import LoadingPage from "./Loader";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null); // Track which action is being confirmed

  // Logout mutation
  const [handleLogout, { loading, data, error, reset }] = useMutation(
    gql(logout)
  );

  const [
    handleDeleteAccount,
    {
      loading: deleteAccountLoading,
      data: deleteAccountData,
      error: deleteAccountError,
      reset: deleteAccountReset,
    },
  ] = useMutation(gql(deleteAccount));

  if (loading || deleteAccountLoading) return <LoadingPage />;

  if (error || deleteAccountError) {
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
    deleteAccountReset();
  }

  if (data) {
    toast.success(data?.logoutUser?.message, {
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
    setUser(null);
    navigate("/login");
  }

  if (deleteAccountData) {
    toast.success(deleteAccountData?.deleteUserAccount?.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setUser(null);
    deleteAccountReset();
    navigate("/login");
  }

  // Handle modal open and setting action
  const handleOpenModal = (action) => {
    setActionToConfirm(action);
    setIsModalOpen(true);
  };

  // Handle confirmation actions
  const handleConfirmAction = () => {
    if (actionToConfirm === "logout") {
      handleLogout();
    } else if (actionToConfirm === "deleteAccount") {
      handleDeleteAccount();
    }
    setIsModalOpen(false); // Close the modal after action is confirmed
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal if the action is canceled
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl transition hover:scale-[1.02] text-gray-200">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <RiUser3Line className="h-30 w-30" />
        </div>

        {/* Profile Info */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold flex items-center justify-center">
            {user?.username}
          </h2>
          <p className="text-gray-400 text-sm">
            @{user?.username.toLowerCase().replace(/\s/g, "")}
          </p>
          <p className="mt-2 text-gray-300">{user?.email}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col space-y-3">
          <Link
            to="/update-profile"
            className="w-full py-2 bg-blue-500 text-white text-center font-semibold rounded-lg shadow-lg hover:scale-105 transition hover:bg-blue-600 active:scale-95">
            Update Profile
          </Link>

          <Link
            to="/update-password"
            className="w-full py-2 bg-purple-500 text-white text-center font-semibold rounded-lg shadow-lg hover:scale-105 transition hover:bg-purple-600 active:scale-95">
            Update Password
          </Link>

          <div className="flex items-center justify-between space-x-3">
            <button
              onClick={() => handleOpenModal("logout")}
              className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200">
              Logout
            </button>
            <button
              onClick={() => handleOpenModal("deleteAccount")}
              className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg- bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg  w-96">
            <h3 className="text-xl font-semibold">Are you sure?</h3>
            <div className="mt-4 flex space-x-4 justify-center">
              <button
                onClick={handleConfirmAction}
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
