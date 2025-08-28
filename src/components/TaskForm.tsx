import { useState } from "react";
import type Task from "../types/Task";

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("media");

  function onClickAddTask() {
    const currentTask: Task = {
      title,
      description,
      priority,
      createdAt: Date.now(),
      status: "pendiente"
    }

    onAdd(currentTask);

    setTitle("");
    setDescription("");
    setPriority("media");
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-white/10">
      <h2 className="text-lg font-semibold mb-4 text-black">Nueva tarea</h2>

      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Título</label>
          <input type="text" value={title} onChange={(e) => { setTitle(e.currentTarget.value) }}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Descripción</label>
          <input
            type="text" value={description} onChange={(e) => { setDescription(e.currentTarget.value) }}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Prioridad</label>
          <select value={priority} onChange={(e) => { setPriority(e.currentTarget.value) }}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <button onClick={onClickAddTask}
          className="w-full mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          Agregar Tarea
        </button>
      </div>
    </div>
  );
}
