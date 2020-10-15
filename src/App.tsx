import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>(
        [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Js", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}

        ]
    )
    let [filter, filterTasks] = useState<FilterValueType>('all')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)

    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: FilterValueType) {
        filterTasks(value);
    }

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false);

    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true);

    }

    function changeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    return (
        <div className="App">
            <TodoList title={"What to learns"}
                      filter = {filter}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

