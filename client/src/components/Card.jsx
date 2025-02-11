import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { getUsers } from "../graphql/query/query";

export default function TodoList() {
  // const { loading, data, error } = useQuery(gql(getUsers));
  // console.log(data)

  const [handleClick, { loading, data, error }] = useLazyQuery(gql(getUsers));  //when button clicks
  // console.log(data)

  const todos = [
    {
      title: "🏪 Buy Groceries",
      description: "Milk, Bread, Eggs, Fruits",
      date: "2025-02-10",
    },
    {
      title: "💻 Complete Project",
      description: "Finish the React component for the dashboard",
      date: "2025-02-12",
    },
    {
      title: "📚 Read a Book",
      description: "Read 'Atomic Habits' for at least 30 minutes",
      date: "2025-02-14",
    },
    {
      title: "🏋️ Workout Session",
      description: "Go to the gym and do a full-body workout",
      date: "2025-02-15",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-900 min-h-screen">
      <h2 className="w-full text-center text-3xl font-bold text-gray-100 mb-6">
        📋 Premium Todo List
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Get all Users on Console
        </button>
      </h2>

      {todos.map((todo, index) => (
        <TodoCard key={index} {...todo} />
      ))}
    </div>
  );
}

const TodoCard = ({ title, description, date }) => {
  const [status, setStatus] = useState("pending");

  return (
    <div className="cursor-pointer relative bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg w-72 transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      <p className="text-sm text-gray-300 mt-2">{description}</p>
      <p className="text-xs text-gray-400 mt-2">📅 {date}</p>

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
    </div>
  );
};
