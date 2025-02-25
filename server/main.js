import { expressMiddleware } from "@apollo/server/express4";
import cookieParser from 'cookie-parser';
import express from "express";
import cors from "cors"
import { connectToDatabase } from "./config/database.js";
import { connectGraphQl } from "./graphql/server.js";
import { authMiddleware } from "./middleware/checkAuth.js"
import { config } from "dotenv";
config({ path: "./config/.env" });

const startServer = async () => {

  const app = express();
  connectToDatabase()

  app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow only your frontend domain
    credentials: true, // ✅ Allow cookies in cross-origin requests
  }));

  app.use(express.json());
  app.use(cookieParser());


  const server = connectGraphQl();
  await server.start();



  app.use(
    "/graphql",
    authMiddleware, // Use auth middleware before GraphQL requests
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }), // ✅ Pass `req` and `res`
    })
  );

  app.use("/", (req, res) => {
    res.json({ message: "API is working fine!" });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
