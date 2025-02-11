import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
