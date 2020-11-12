import {FilterValueType, TaskStateType} from "../App";
import {AddTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";


export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
/*export type AddTodolistActionType = {
    type: 'ADD-TASK'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TASKS-FILTER'
    id: string
    filter: FilterValueType
}*/

export type ActionsType = RemoveTasksActionType | AddTasksActionType|changeTaskStatusAC|AddTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let newTask =  { id: "4", title: action.title, isDone: false }
            let newTasks = [newTask,...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS":{
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let newTask = tasks.find(t => t.id === action.taskId)
            if(newTask){
                newTask.isDone = action.isDone
            }
            return stateCopy
        }
        case "ADD-TODOLIST":{
            let stateCopy = {...state};
            stateCopy[v1()]=[];
            return stateCopy
        }

        default:
            throw new Error('I dont understand this action type')
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

 type AddTasksActionType = {type: 'ADD-TASK', todolistId: string, title: string}
export const addTaskAC = (title:string, todolistId: string): AddTasksActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title}
}

type changeTaskStatusAC = {type: 'CHANGE-TASK-STATUS', todolistId: string, taskId: string, isDone: boolean}

export const changeTaskStatusAC = (taskId:string, isDone: boolean, todolistId: string): changeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, isDone: isDone}
}

