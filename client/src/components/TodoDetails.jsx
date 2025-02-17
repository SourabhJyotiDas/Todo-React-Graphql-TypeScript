import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_TODO_DETAILS } from "../graphql/query/query";
import { DELETE_TODO } from "../graphql/mutation/mutation"; // Import the delete mutation
import LoadingPage from "./Loader";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Fetch todo details
  const { loading, error, data } = useQuery(gql(GET_TODO_DETAILS), {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  // Delete mutation
  const [deleteTodo, { loading: deleteLoading }] = useMutation(
    gql(DELETE_TODO),
    {
      variables: { id },
      onCompleted: () => {
        toast.success("Todo deleted successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/"); // Redirect after deletion
      },
      onError: (err) => {
        toast.error(err.message, { position: "bottom-right", autoClose: 2000 });
      },
    }
  );

  if (loading) return <LoadingPage />;
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

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/todo/update/${todo._id}`}
            className="text-blue-400 hover:underline">
            ✏️ Update
          </Link>

          {/* Delete Button - Triggers Modal */}
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-200">
              Confirm Deletion
            </h3>
            <p className="text-gray-400 mt-2">
              Are you sure you want to delete this todo?
            </p>

            {/* Modal Buttons */}
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTodo();
                  setShowModal(false);
                }}
                disabled={deleteLoading}
                className={` cursor-pointer px-4 py-2 text-white rounded-lg transition ${
                  deleteLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}>
                {deleteLoading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
