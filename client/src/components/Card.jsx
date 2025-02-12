import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { getUsers } from "../graphql/query/query";
import TodoCard from "./TodoCard";

export default function TodoList() {

  const [handleClick, { loading, data, error }] = useLazyQuery(gql(getUsers)); //when button clicks

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
      </h2>

      {todos.map((todo, index) => (
        <TodoCard key={index} {...todo} />
      ))}
    </div>
  );
}