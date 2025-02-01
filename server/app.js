import express from "express";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

import userRoute from "./routes/user.js";
import todoRoute from "./routes/todo.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);


export default app;