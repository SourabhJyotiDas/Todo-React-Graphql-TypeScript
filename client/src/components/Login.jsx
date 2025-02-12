import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory for redirection
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { login } from "../graphql/mutation/mutation";
import LoadingPage from "./Loader";

export default function Login() {
  const { setUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [handleCreateUser, { loading, data, error, reset }] = useMutation(
    gql(login)
  );

  if (loading) return <LoadingPage />;

  if (data) {
    toast.success(data?.loginUser?.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setUser(data.loginUser.user);
    reset();
    navigate("/");
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

  const submitHandler = (e) => {
    e.preventDefault();
    handleCreateUser({ variables: { email, password } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-xl transition-transform hover:scale-105 duration-300">
        <h1 className="text-white text-3xl font-bold tracking-wide uppercase drop-shadow-lg text-center">
          Taskify
        </h1>

        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full bg-gray-700/70 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full bg-gray-700/70 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-300 transition">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
