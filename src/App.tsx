import { useState } from "react";

import type Task from "@/types/Task";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAdd(task: Task) {
    setTasks([...tasks, task]);
    console.log(tasks);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Focus Task
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <TaskForm onAdd={handleAdd} />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  )
}