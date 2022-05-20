import mongoose, { Schema } from "mongoose";

export interface UserInterface {
    name: string,
    image: string,
    email: string,
    todos: [],
    history: [],
}

let userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    image: {
        type: String,
        required: false,
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

export default mongoose.models?.user || mongoose.model("user", userSchema);