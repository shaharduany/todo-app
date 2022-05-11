import mongoose from "mongoose";
import { TokenEndpointHandler } from "next-auth/providers";
import clientPromise from "../db/database";
import Todo from "../db/models/Todo";

type TodoDate = Date | number;
type TodoId = string | mongoose.Types.ObjectId;

export enum TodoStatus {
    Pending = 0,
    Done = 1,
    Urgent = 2,
}

export default class TodoItem {
    name:string;
    date: TodoDate;
    status: TodoStatus;
    id: TodoId;

    constructor(name: string, status: TodoStatus = TodoStatus.Pending, 
        date: TodoDate = Date.now()
        id: TodoId = "empty"){
        this.name = name;
        this.date = date;
        this.status = status;
        this.id = id;
    }

    async addToDatabase(){
        try {
            await clientPromise;
        } catch(error){
            throw error;
        }

        const todo = new Todo({
            name: this.name,
            status: this.status,
            date: this.date
        });
        try {
            await todo.save();
        } catch (error){
            throw error;
        }
        
        this.id = todo._id;
        return this.id;
    }

    async changeStatus(status: TodoStatus){
        if(this.status === status){
            return true;
        }

        this.status = status;
        try {
            await Todo.findOneAndUpdate({ name: this.name }, { status: this.status });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}