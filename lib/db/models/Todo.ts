import mongoose from "mongoose";
import { TodoDate, TodoStatus } from "../../todos/todo-item";

export interface TodoSchemaInterface {
    name: String,
    date: TodoDate,
    status: TodoStatus,
}

let todoSchema = new mongoose.Schema<TodoSchemaInterface>({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    date: {
        TYPR: Date,
        required: false,
        unique: false,
        default: Date.now(),
    },
    status: {
        type: Number,
        default: 0,
        unique: false,
        required: false,
    }
});

export default mongoose.models?.Todo || mongoose.model("Todo", todoSchema);