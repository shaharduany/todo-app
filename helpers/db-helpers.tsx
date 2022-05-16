import { Types } from "mongoose";
import clientPromise from "../lib/db/database";
import Todo, { TodoSchemaInterface } from "../lib/db/models/Todo";
import User, { UserInterface } from "../lib/db/models/User";
import TodoItem from "../lib/todos/todo-item";

type TodoType = string[] | ErrorOptions[] | Types.ObjectId[] | TodoItem[];

async function convertTodoIdsToObject(todos: TodoType): TodoItem[]{
    let validTodos:TodoItem[] = [];
    let todoItem: TodoItem;

    for(let todo of todos){
        let todoObj = await Todo.findById(todo);
        
        todoItem = new TodoItem(todoObj.name, todoObj.status, todoObj.date, todoObj._id);
        validTodos.push(todoItem);
    }

    return validTodos;
}

export async function getTodosByEmail(email: string): TodoType{
    clientPromise;
    let todos: TodoType;

    try{
        let user = await User.findOne({ email });
        todos = user.todos;
    } catch (error: ErrorOptions{
        return [error]
    }

    try {
        todos = await convertTodoIdsToObject(todos);
    } catch (error: Error){
        return [error];
    }

    return todos;
}
