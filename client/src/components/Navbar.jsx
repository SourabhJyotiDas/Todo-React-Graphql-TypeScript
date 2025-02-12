import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { logout } from "../graphql/mutation/mutation";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <nav className="bg-gray-800 p-4 font-mono">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold tracking-wide uppercase drop-shadow-lg">
          Taskify
        </h1>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link to="/" className="text-gray-300 hover:text-white">
                Todos
              </Link>
              <Link
                to="/create-todo"
                className="text-gray-300 hover:text-white">
                Create
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white">
                <FaUserAstronaut className="text-xl" />
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
