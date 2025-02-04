import { expressMiddleware } from "@apollo/server/express4";
import cookieParser from 'cookie-parser';
import express from "express";
import { connectToDatabase } from "./config/database.js";
import { connectGraphQl } from "./graphql/server.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  connectToDatabase()
  
  const server = connectGraphQl();
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is working fine",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
