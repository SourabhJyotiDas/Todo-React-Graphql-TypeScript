import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/AppContext";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include", // ✅ Required for cookies
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloClient}>
    <AppProvider>
      <App />
    </AppProvider>
  </ApolloProvider>
);
