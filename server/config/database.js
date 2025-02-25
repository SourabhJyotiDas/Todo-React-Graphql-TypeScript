import mongoose from "mongoose";

export const connectToDatabase = async () => {
   try {
      const { connection } = await mongoose.connect(process.env.MONGO_URI)
      console.log(`Database connected on ${connection.host}`)
   } catch (error) {
      console.log(`Failed while connected to Database`);
   }
}