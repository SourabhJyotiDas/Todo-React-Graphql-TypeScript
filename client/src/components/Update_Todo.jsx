import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
// import { updateTodo } from "../graphql/mutation/mutation";
import LoadingPage from "./Loader";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [dueDate, setDueDate] = useState(todo?.dueDate || "");

  // Fetch todo details
  const {
    loading: TodoDetailsLoading,
    error: TodoDetailsError,
    data: TodoDetailsData,
  } = useQuery(gql(GET_TODO_DETAILS), {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  //   const [handleUpdateTodo, { loading, data, error, reset }] = useMutation(
  //     gql(updateTodo)
  //   );

  useEffect(() => {
    if (todo) {
      // setTitle(todo.title);
      // setDescription(todo.description);
      // setDueDate(todo.dueDate);
    }
  }, [todo]);

  const submitHandler = (e) => {
    e.preventDefault();
    //  handleUpdateTodo({ variables: { id: todo.id, title, description, dueDate } });
  };

  //   if (loading) return <LoadingPage />;

  //   if (data) {
  //     toast.success(data?.updateTodo?.message, {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     reset();
  //   }

  //   if (error) {
  //     toast.error(error.message, {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     reset();
  //   }

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
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
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
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          {/* Due Date Input */}
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              className="peer w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-lg transition hover:scale-105 hover:from-green-400 hover:to-teal-400 active:scale-95">
            ✅ Update Todo
          </button>
        </form>
      </div>
    </div>
  );
}
