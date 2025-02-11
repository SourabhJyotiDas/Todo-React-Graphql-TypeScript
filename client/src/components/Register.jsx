import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use for React Router
import { useMutation, gql } from "@apollo/client";
import { createUser } from "../graphql/mutation/mutation";
import { toast } from "react-toastify";
import LoadingPage from "./Loader";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [handleCreateUser, { loading, data, error, reset }] = useMutation(
    gql(createUser)
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

  // if (data) {
  //   toast.success(data?.createNewUser?.message, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   // reset();
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Trigger");
    handleCreateUser({ variables: { username, email, password } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl transition hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Taskify
        </h2>

        <form className="mt-6 space-y-6" onSubmit={submitHandler}>
          {/* Name Input */}
          <div className="relative">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="name"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-400">
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
              placeholder="Your Email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-400">
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
              placeholder="Your Password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-400">
              Password
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition hover:from-blue-400 hover:to-purple-400 active:scale-95">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
