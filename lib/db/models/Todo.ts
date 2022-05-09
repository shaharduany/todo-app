import mongoose from "mongoose";

let todoSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    date: {
        TYPR: Date,
        required: false,
        unique: false,
        default; Date.now(),
    },
    status: {
        type: Number,
        default: 0,
        unique: false,
        required: false,
    }
});

export default mongoose.models?.Todo || mongoose.model("Todo", todoSchema);