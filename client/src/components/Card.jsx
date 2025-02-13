import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Todos } from "../graphql/query/query";
import TodoCard from "./TodoCard";
import { toast } from "react-toastify";
import LoadingPage from "./Loader";

export default function TodoList() {

  const { loading, data, error, refetch } = useQuery(gql(Todos), {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <LoadingPage />;

  if (error) {
    toast.error(error.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-900 min-h-screen">
      <h2 className="w-full text-center text-3xl font-bold text-gray-100 mb-6">
        📋 Premium Todo List
      </h2>

      {data?.Todos.map((todo, index) => (
        <TodoCard key={index} {...todo} />
      ))}
    </div>
  );
}
