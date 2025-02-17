import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_TODO_DETAILS } from "../graphql/query/query";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Fetch todo details
  const { loading, error, data } = useQuery(gql(GET_TODO_DETAILS), {
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

  // Convert timestamps to readable format
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="relative bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg w-96">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-100">{todo.title}</h2>
        <p className="text-sm text-gray-300 mt-2">{todo.description}</p>

        {/* Status */}
        <span
          className={`mt-3 inline-block px-3 py-1 text-xs font-medium uppercase rounded-lg ${
            todo.status === "completed"
              ? "bg-green-600 text-white"
              : todo.status === "inprogress"
              ? "bg-blue-600 text-white"
              : "bg-yellow-500 text-gray-900"
          }`}>
          {todo.status}
        </span>

        {/* Dates Section */}
        <div className="mt-4 text-sm text-gray-400 space-y-2">
          <p>
            📅 <strong>Due Date:</strong> {formatDate(todo.dueDate)}
          </p>
          <p>
            🕒 <strong>Created:</strong> {formatDate(todo.createdAt)}
          </p>
          <p>
            🔄 <strong>Last Updated:</strong> {formatDate(todo.updatedAt)}
          </p>
        </div>

        {/* Action Links */}
        <div className="mt-4 flex justify-between">
          <Link
            to={`/todo/update/${todo._id}`}
            className="text-blue-400 hover:underline">
            ✏️ Update
          </Link>
          <Link
            to={`/todo/delete/${todo.id}`}
            className="text-red-400 hover:underline">
            🗑️ Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
