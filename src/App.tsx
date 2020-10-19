import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let todolist1 = v1();
    let todolist2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListsType>>(
        [
            {id: todolist1, title: '"What to learns"', filter: 'all'},
            {id: todolist2, title: 'todolists2', filter: 'all'}
        ]
    )

    let [tasksObj, setTasks] = useState(
        {
            [todolist1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "React", isDone: true},
                {id: v1(), title: "Js", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}
            ],
            [todolist2]: [
                {id: v1(), title: "bulk", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
            ]
        }
    )

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId] // нашли массив тасок
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }
    let removeTodolist = (todolistId: string)=>{
         let filteredTodolist = todolists.filter(tl => tl.id !==todolistId )
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId:string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId] // нашли массив тасок
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists]);
    }

    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId] // нашли массив тасок
        let task = tasks.find(t => t.id === taskID); // в этом массиве тасок нашли нужную таску
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasksObj});
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                        let tasksForTodoList = tasksObj[tl.id];
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksObj[tl.id].filter(t => t.isDone === false);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksObj[tl.id].filter(t => t.isDone === true);
                        }
                        return <TodoList
                            key={tl.id}
                            title={tl.title}
                            id={tl.id}
                            filter={tl.filter}
                            tasks={tasksForTodoList}
                            removeTodolist = {removeTodolist}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            changeFilter={changeFilter}/>
                    }
                )
            }

        </div>
    );
}

export default App;

