import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { GET_TODO_DETAILS } from "../graphql/query/query";

// Define mutations for update & delete

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");

  // Fetch todo details
  const { loading, error, data } = useQuery(GET_TODO_DETAILS, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error(error.message, { position: "bottom-right", autoClose: 2000 });
    return null;
  }

  const todo = data?.todoDetails;
  if (!todo) return <p>No Todo Found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-100">{todo.title}</h2>
        <p className="text-sm text-gray-300 mt-2">{todo.description}</p>
        <p className="text-xs text-gray-400 mt-2">📅 {todo.dueDate}</p>

        {/* Status Radio Buttons */}
        <div className="mt-4 space-y-2">
          {["pending", "inprogress", "completed"].map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <div
                className={`w-4 h-4 rounded-full cursor-pointer transition ${
                  item === status ? "scale-125" : "opacity-50"
                } ${
                  item === "pending"
                    ? "bg-yellow-400"
                    : item === "inprogress"
                    ? "bg-blue-400"
                    : "bg-green-400"
                }`}
                onClick={() => setStatus(item)}></div>
              <span className="text-sm text-gray-300 capitalize">{item}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        {/* <div className="mt-6 flex gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TodoDetails;
