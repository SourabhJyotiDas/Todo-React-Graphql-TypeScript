import { gql, useQuery } from "@apollo/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Card from "./components/Card";
import CreateTodo from "./components/CreateTodo";
import ForgotPassword from "./components/ForgotPassword";
import LoadingPage from "./components/Loader";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import UpdatePassword from "./components/UpdatePassword";
import UpdateUserDetails from "./components/UpdateProfile";
import { loggedInUser } from "./graphql/query/query";
import "./index.css";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const { loading, data } = useQuery(gql(loggedInUser));

  useEffect(() => {
    if (data?.userDetails) {
      setUser(data?.userDetails);
    }
  }, [data?.userDetails]);

  if (loading) return <LoadingPage />;

  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser} />
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
