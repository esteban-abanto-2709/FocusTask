import type { Task } from "@/types/Task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-500/20 border-red-300/30 text-red-100';
      case 'media':
        return 'bg-yellow-500/20 border-yellow-300/30 text-yellow-100';
      case 'baja':
        return 'bg-green-500/20 border-green-300/30 text-green-100';
      default:
        return 'bg-gray-500/20 border-gray-300/30 text-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baja': return '🟢';
      default: return '⚪';
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 h-64 flex flex-col"    >
      {/* Header con título y prioridad */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">📌</span>
          <span className="truncate">{task.title}</span>
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)} backdrop-blur-sm flex-shrink-0 ml-2`}>
          {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
        </div>
      </div>

      {/* Descripción con flex-1 para ocupar espacio disponible */}
      <p className="text-white/80 mb-4 leading-relaxed text-sm flex-1 overflow-hidden">
        {task.description}
      </p>

      {/* Footer con fecha y status */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-1 text-white/60">
          <span>🕐</span>
          <span>{formatDate(task.createdAt)}</span>
        </div>
        <div className="bg-blue-500/20 border border-blue-300/30 text-blue-100 px-2 py-1 rounded-full font-medium backdrop-blur-sm">
          📊 {task.status}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => console.log('Descartar tarea:', task.title)}
          className="px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-100 text-xs font-medium border border-red-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          🗑️ Descartar
        </button>
        <button
          onClick={() => console.log('Completar tarea:', task.title)}
          className="px-3 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-100 text-xs font-medium border border-green-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          ✅ Completado
        </button>
        <button
          onClick={() => console.log('Modificar tarea:', task.title)}
          className="px-3 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 text-xs font-medium border border-blue-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          ✏️ Modificar
        </button>
      </div>
    </div>
  );
}