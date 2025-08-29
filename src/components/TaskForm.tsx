import { useState } from "react";

import { useTasks } from "@/hook/useTasks";
import { TaskPriority, TaskStatus, type TaskPriorityType } from "@/types/Task";

export default function TaskForm() {

  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriorityType>(TaskPriority.MEDIA);

  function onClickAddTask() {
    const newTask = {
      title,
      description,
      priority,
      status: TaskStatus.PENDIENTE
    };

    addTask(newTask);

    setTitle("");
    setDescription("");
    setPriority("media");
  }

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-md">Nueva Tarea</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.currentTarget.value) }}
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200"
            placeholder="Ingresa el título..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.currentTarget.value) }}
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200 resize-none h-20"
            placeholder="Describe tu tarea..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Prioridad</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriorityType)} // ✅ Cast necesario para el select
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200"
          >
            <option value={TaskPriority.ALTA} className="bg-gray-800 text-white">🔴 Alta</option>
            <option value={TaskPriority.MEDIA} className="bg-gray-800 text-white">🟡 Media</option>
            <option value={TaskPriority.BAJA} className="bg-gray-800 text-white">🟢 Baja</option>
          </select>
        </div>

        <button
          onClick={onClickAddTask}
          className="w-full mt-4 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          ✨ Agregar Tarea
        </button>
      </div>
    </div>
  );
}