import app from "./app.js";
import { config } from "dotenv"
import { connectToDatabase } from "./config/database.js";

config({ path: "./config/.env" });
connectToDatabase()

app.listen(process.env.PORT, () => {
   console.log(`server is working on port ${process.env.PORT}`)
});