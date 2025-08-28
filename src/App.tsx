import { useState } from "react";

import type Task from "./types/Task";

import TaskForm from "./components/TaskForm";

export default function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAdd(task: Task) {
    setTasks([...tasks, task]);
    console.log(tasks);
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <TaskForm onAdd={handleAdd} />
      </div>
    </>
  )
}
