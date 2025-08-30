import { useState } from "react";
import { useTasks } from "@/hook/useTasks";

export default function TaskGetter() {
  const { tasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState<null | ReturnType<typeof getTask>>(null);

  function getTask() {
    const prioridadOrden = { alta: 1, media: 2, baja: 3 };
    const pendientes = tasks.filter(task => task.status === "pendiente");
    return pendientes.sort(
      (a, b) => prioridadOrden[a.priority] - prioridadOrden[b.priority]
    )[0];
  }

  function handleGetTask() {
    console.log("Gol");
    
    const task = getTask();
    setSelectedTask(task || null);
  }

  return (
    <div className="bg-white/15 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30 col-span-full">
      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
        Consigue una tarea
      </h2>

      {selectedTask ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-white">{selectedTask.title}</h3>
          <p className="text-white/70">{selectedTask.description}</p>
          <span className="inline-block mt-4 px-4 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">
            {selectedTask.priority.toUpperCase()}
          </span>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-50">📝</div>
          <p className="text-white/70 text-lg">No tienes tareas pendientes</p>
          <p className="text-white/50 text-sm">¡Agrega una nueva tarea para comenzar!</p>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleGetTask}
          className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
        >
          Obtener tarea
        </button>
      </div>
    </div>
  );
}
