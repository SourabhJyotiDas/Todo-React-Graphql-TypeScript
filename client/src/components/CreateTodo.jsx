import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { createTodo } from "../graphql/mutation/mutation";
import LoadingPage from "./Loader";
import { toast } from "react-toastify";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [handleCreateUser, { loading, data, error, reset }] = useMutation(
    gql(createTodo)
  );

  const submitHandler = (e) => {
    e.preventDefault();
    handleCreateUser({ variables: { title, description } });
  };

  if (loading) return <LoadingPage />;

  if (data) {
    toast.success(data?.createNewTodo?.message, {
      position: "bottom-right",
      autoClose: 2000,
    });
    reset();
    setTitle("");
    setDescription("");
  }

  if (error) {
    toast.error(error.message, {
      position: "bottom-right",
      autoClose: 2000,
    });
    reset();
    setTitle("");
    setDescription("");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 w-80 transition-transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-100 text-center mb-4">
          ✨ Create New Todo
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Title Input */}
          <div>
            <input
              type="text"
              id="title"
              className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div>
            <textarea
              id="description"
              rows="3"
              className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-lg transition hover:scale-105 hover:from-blue-400 hover:to-purple-400 active:scale-95"
          >
            ➕ Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}
