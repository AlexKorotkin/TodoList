import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    removeTodolist: (todoListId: string)=> void
    changeTodolistTitle:(id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {


    const  onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle:string) => props.changeTodolistTitle(props.id, newTitle)
    const addTask = (title:string)=> props.addTask(title, props.id) //ф-ция обвертка

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>х</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                             const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                                 props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                             }
                             const onChangeTitleHandler = (newValue: string) => {
                                 props.changeTaskTitle(t.id, newValue, props.id)

                             }

                            return <li className={t.isDone ? 'is-done':''} key={t.id}><input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        }
                    )

                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter': ''}  onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

