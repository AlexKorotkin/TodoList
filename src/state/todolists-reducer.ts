import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";


/*type ActionType = {
    type: string
    [key: string]: any
}*/

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id == action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            debugger
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error('I dont understand this action type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}

export const changeTodolistTitleAC = (id: string, title:string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: id,
        title: title
    }
}


export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: id,
        filter: filter
    }
}

