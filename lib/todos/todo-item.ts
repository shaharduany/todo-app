import getDb from "../db/database";
import Todo from "../db/models/Todo";

export enum TodoStatus {
    Pending = 0,
    Done = 1,
    Urgent = 2,
}

export default class TodoItem {
    private name:string;
    private date: Date;
    private status: TodoStatus;
    
    constructor(name: string, status: TodoStatus = TodoStatus.Pending){
        this.name = name;
        this.date = new Date(Date.now());
        this.status = status;
    }

    async addToDatabase(){
        await getDb();
        
        const todo = new Todo({
            name: this.name
        });

        await todo.save();

        return todo._id;
    }
}