import { expressMiddleware } from "@apollo/server/express4";
import cookieParser from 'cookie-parser';
import express from "express";
import cors from "cors"
import { connectToDatabase } from "./config/database.js";
import { connectGraphQl } from "./graphql/server.js";
import {authMiddleware} from "./middleware/checkAuth.js"
import { config } from "dotenv";
config({ path: "./config/.env" });

const PORT = process.env.PORT

const startServer = async () => {


  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(cookieParser());

  connectToDatabase()
  
  const server = connectGraphQl();
  await server.start();

  // app.use("/graphql", expressMiddleware(server));

  // app.use(
  //   "/graphql",
  //   authMiddleware, // Use auth middleware before GraphQL requests
  //   expressMiddleware(server, {
  //     context: async ({ req }) => {
  //       return { user: req.user }; // Attach authenticated user to GraphQL context
  //     },
  //   })
  // );

  app.use(
    "/graphql",
    authMiddleware, // Use auth middleware before GraphQL requests
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }), // ✅ Pass `req` and `res`
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
