import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TasksType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
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
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        }else {
            setError('Вы не ввели данные');
        }
    };
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
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
                            const onRemoveHandler = () => props.removeTask(t.id)
                             const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => (
                                 props.changeTaskStatus(t.id, e.currentTarget.checked)
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
                <button className={props.filter === 'all' ? 'active-filter': ''} onClick={ () => { props.changeFilter('all') }}>All</button>
                <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter': ''}  onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}