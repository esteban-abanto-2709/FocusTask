import { useTasks } from "@/hook/useTasks";

export default function TaskList() {

  const { tasks } = useTasks();

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/15 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30">
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
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-xl">📌</span>
                  {task.title}
                </h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)} backdrop-blur-sm`}>
                  {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
                </div>
              </div>

              <p className="text-white/80 mb-3 leading-relaxed">
                {task.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <span>🕐</span>
                  {formatDate(task.createdAt)}
                </div>
                <div className="bg-blue-500/20 border border-blue-300/30 text-blue-100 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  📊 {task.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}