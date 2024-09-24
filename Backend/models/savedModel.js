import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Job",  
        required: true
    }
},{timestamps:true});

export const Saved = mongoose.model("Saved", savedSchema);
