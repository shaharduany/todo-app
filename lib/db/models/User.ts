import mongoose, { Schema } from "mongoose";

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    image: {
        type: String,
        required: false,
    },
    emailVerified: {
        
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    todos: {
        type: Array,
        required: false,
        default: [],
    }, 
    history: {
        type: Array,
        required: false,
        default: [],
    },
});

export default mongoose.models?.User || mongoose.model("user", userSchema);