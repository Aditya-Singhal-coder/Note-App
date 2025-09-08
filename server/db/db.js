import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(
      "mongodb+srv://adityasinghal374:Aryan_123@cluster0.qdxmper.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MogoDb", error.message);
        
    }
}

export default connectToMongoDB