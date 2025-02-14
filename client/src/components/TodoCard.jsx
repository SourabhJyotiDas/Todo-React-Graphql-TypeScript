import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_TODO_STATUS } from "../graphql/mutation/mutation";
import { toast } from "react-toastify";
import LoadingPage from "./Loader";

const TodoCard = ({ title, description, date, _id, status, refetch }) => {
  const [trigger, { loading, data, error, reset }] = useMutation(
    gql(UPDATE_TODO_STATUS)
  );

  if (loading) return <LoadingPage />;

  if (data) {
    toast.success(data?.chnageTodoStatus?.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    refetch();
  }

  const handleStatusChange = (e) => {
    trigger({ variables: { chnageTodoStatusId: _id, status: e.target.value } });
  };

  return (
    <div className=" relative bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg w-72 transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      <p className="text-sm text-gray-300 mt-2">{description}</p>

      {/* Status Checkbox Options */}
      <div className="mt-4 space-y-2">
        {["pending", "in-progress", "completed"].map((item) => (
          <div className="flex items-center gap-2" key={item}>
            <input
              type="checkbox"
              id={item}
              value={item}
              className={`w-4 h-4 rounded cursor-pointer transition ${
                item === status ? "border-2 border-blue-500" : "opacity-50"
              } ${
                item === "pending"
                  ? "bg-yellow-400"
                  : item === "in-progress"
                  ? "bg-blue-400"
                  : "bg-green-400"
              }`}
              checked={status === item}
              onChange={handleStatusChange} // You will need a handler for the change
            />
            <label htmlFor={item} className="text-sm text-gray-300 capitalize">
              {item}
            </label>
          </div>
        ))}
      </div>

      <Link to={`/${_id}`}>
        <button className="my-5 cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg">
          Details
        </button>
      </Link>
    </div>
  );
};

export default TodoCard;
