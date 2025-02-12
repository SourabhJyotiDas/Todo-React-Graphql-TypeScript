import { gql, useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { loggedInUser } from "../graphql/query/query";

// Create Context
export const AppContext = createContext();

// Create Provider
export const AppProvider = ({ children }) => {
  const { loading, data } = useQuery(gql(loggedInUser));

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.userDetails) {
      setUser(data?.userDetails);
    }
  }, [data?.userDetails, user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
