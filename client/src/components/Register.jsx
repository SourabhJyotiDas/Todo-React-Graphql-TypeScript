import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use for React Router
import { useMutation, gql } from "@apollo/client";
import { register } from "../graphql/mutation/mutation";
import { toast } from "react-toastify";
import LoadingPage from "./Loader";
import { AppContext } from "../context/AppContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const [handleCreateUser, { loading, data, error, reset }] = useMutation(
    gql(register)
  );

  if (loading) return <LoadingPage />;

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

  if (data) {
    toast.success(data?.createNewUser?.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setUser(data?.createNewUser?.user);
    navigate("/create-todo");
    reset();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    handleCreateUser({ variables: { username, email, password } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl transition hover:scale-[1.02]">
        <h1 className="text-white text-3xl font-bold tracking-wide uppercase drop-shadow-lg text-center">
          Taskify
        </h1>
        <form className="mt-6 space-y-4" onSubmit={submitHandler}>
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">Name</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full bg-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full bg-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full bg-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account? {" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
