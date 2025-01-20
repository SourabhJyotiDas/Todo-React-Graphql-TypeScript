import mongoose from "mongoose";

export const connectToDatabase = async ()=>{
   try {
      const { connection } = await mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`)
      console.log(`Database connected on ${connection.host}`)
   } catch (error) {
      console.log(`Failed while connected to Database`);
   }
}