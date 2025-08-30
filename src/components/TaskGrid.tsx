import { useTasks } from "@/hook/useTasks";
import TaskCard from "./TaskCard";

export default function TaskGrid() {
  const { tasks } = useTasks();

  return (
    <div className="bg-white/15 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30 col-span-full">
      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
        📋 Mis Tareas ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-50">📝</div>
          <p className="text-white/70 text-lg">No tienes tareas pendientes</p>
          <p className="text-white/50 text-sm">¡Agrega una nueva tarea para comenzar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}