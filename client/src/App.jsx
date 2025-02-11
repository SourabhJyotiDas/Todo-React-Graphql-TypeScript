import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./components/Card";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar";
import CreateTodo from "./components/CreateTodo";
import Profile from "./components/Profile";
import UpdateUserDetails from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, gql, useQuery } from "@apollo/client";
import LoadingPage from "./components/Loader";
import { loggedInUser } from "./graphql/query/query";

function App() {
  const { loading, data, error } = useQuery(gql(loggedInUser));
  console.log(data);
  console.log("error----", error);

  if (loading) return <LoadingPage />;

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-todo" element={<CreateTodo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateUserDetails />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
