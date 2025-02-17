import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
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
import { AppContext } from "./context/AppContext";
import { loggedInUser } from "./graphql/query/query";
import "./index.css";
import TodoDetails from "./components/TodoDetails";
import UpdateTodo from "./components/Update_Todo";

function App() {
  const { user, setUser } = useContext(AppContext);

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
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={user ? <Card /> : <Login />} />
          <Route path="/:id" element={user ? <TodoDetails /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/create-todo"
            element={user ? <CreateTodo /> : <login />}
          />
          <Route
            path="/todo/update/:id"
            element={user ? <UpdateTodo /> : <login />}
          />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route
            path="/update-profile"
            element={user ? <UpdateUserDetails /> : <Login />}
          />
          <Route
            path="/update-password"
            element={user ? <UpdatePassword /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
