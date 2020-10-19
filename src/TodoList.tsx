import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TasksType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodolist: (todoListId: string)=> void
}

export function TodoList(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState< string | null >(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle,props.id);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        }else {
            setError('Вы не ввели данные');
        }
    };
    const  onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => props.removeTodolist(props.id)
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>х</button></h3>
            <div>
                <input  value={newTaskTitle}
                        onKeyPress={onKeyPressHandler}
                       onChange={onNewTitleChangeHandler}
                       className={ error ?'error': ''}
                />
                <button onClick={addTask}>+</button>
                { error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                             const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => (
                                 props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
                             )

                            return <li className={t.isDone ? 'is-done':''} key={t.id}><input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                <span>{t.title}</span>
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