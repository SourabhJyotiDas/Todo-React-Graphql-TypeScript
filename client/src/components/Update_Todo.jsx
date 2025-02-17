import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_TODO_DETAILS } from "../graphql/query/query";
import LoadingPage from "./Loader";
import { UPDATE_TODO } from "../graphql/mutation/mutation";

export default function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch todo details
  const {
    loading: TodoDetailsLoading,
    error: TodoDetailsError,
    data: TodoDetailsData,
    refetch: TodoDetailsRefetch,
  } = useQuery(gql(GET_TODO_DETAILS), {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Update mutation
  const [updateTodo, { loading: updateLoading }] = useMutation(gql(UPDATE_TODO));

  // Effect to update state once data is fetched
  useEffect(() => {
    if (TodoDetailsData?.todoDetails) {
      setTitle(TodoDetailsData.todoDetails.title || "");
      setDescription(TodoDetailsData.todoDetails.description || "");
      setDueDate(TodoDetailsData.todoDetails.dueDate || "");
    }
  }, [TodoDetailsData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateTodo({
        variables: { id, title, description, dueDate },
      });

      toast.success(data.updateTodo.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/"); // Redirect after update
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (TodoDetailsLoading) return <LoadingPage />;

  if (TodoDetailsError) {
    toast.error(TodoDetailsError.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    TodoDetailsRefetch();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 w-80 transition-transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-100 text-center mb-4">
          ✏️ Update Todo
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              id="title"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="relative">
            <textarea
              id="description"
              rows="3"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          {/* Due Date Input */}
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updateLoading}
            className={`cursor-pointer w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-lg transition hover:scale-105 hover:from-green-400 hover:to-teal-400 active:scale-95 ${
              updateLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {updateLoading ? "Updating..." : "✅ Update Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}
