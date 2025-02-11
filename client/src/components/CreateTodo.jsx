import React, { useState } from "react";
// import { useMutation ,gql} from "@apollo/client";

export default function CreateTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [handleSubmit,{}]=useMutation(gql(createUser))


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAdd({ title, description, date: new Date().toISOString().split("T")[0] });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 w-80 transition-transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-100 text-center mb-4">
          ✨ Create New Todo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              id="title"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="title"
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400">
              Title
            </label>
          </div>

          {/* Description Input */}
          <div className="relative">
            <textarea
              id="description"
              rows="3"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
            <label
              htmlFor="description"
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400">
              Description
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-lg transition hover:scale-105 hover:from-blue-400 hover:to-purple-400 active:scale-95">
            ➕ Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}
