import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // For verified badge
import { RiUser3Line } from "react-icons/ri";

export default function Profile() {
  const user = {
    profilePic: "https://via.placeholder.com/150", // Replace with actual profile pic
    name: "John Doe",
    email: "johndoe@example.com",
    joinedAt: "March 10, 2022",
    isVerified: true, // Change to false for unverified users
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl transition hover:scale-[1.02] text-gray-200">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <RiUser3Line  className="h-30 w-30"/>
        </div>

        {/* Profile Info */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold flex items-center justify-center">
            {user.name}
            {user.isVerified && (
              <FaCheckCircle className="ml-2 text-blue-400" />
            )}
          </h2>
          <p className="text-gray-400 text-sm">
            @{user.name.toLowerCase().replace(/\s/g, "")}
          </p>
          <p className="mt-2 text-gray-300">{user.email}</p>
          <p className="text-gray-400 text-sm">Joined: {user.joinedAt}</p>
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
        </div>
      </div>
    </div>
  );
}
