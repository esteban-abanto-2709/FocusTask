import { useState } from "react";
import { useTasks } from "@/hook/useTasks";
import type { Task } from "@/types/Task";

export default function TaskGetter() {
  const { tasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [isGettingTask, setIsGettingTask] = useState(false);

  function getTask() {
    const prioridadOrden = { alta: 1, media: 2, baja: 3 };
    const pendientes = tasks.filter(task => task.status === "pendiente");
    
    if (pendientes.length === 0) return null;
    
    return pendientes.sort(
      (a, b) => prioridadOrden[a.priority] - prioridadOrden[b.priority]
    )[0];
  }

  function handleGetTask() {
    setIsGettingTask(true);
    
    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      const task = getTask();
      setSelectedTask(task || null);
      setIsGettingTask(false);
    }, 800);
  }

  function handleGetAnotherTask() {
    const currentTask = selectedTask;
    const pendientes = tasks.filter(task => 
      task.status === "pendiente" && task.id !== currentTask?.id
    );
    
    if (pendientes.length === 0) {
      setSelectedTask(null);
      return;
    }

    setIsGettingTask(true);
    setTimeout(() => {
      // Obtener tarea aleatoria de las restantes
      const randomIndex = Math.floor(Math.random() * pendientes.length);
      setSelectedTask(pendientes[randomIndex]);
      setIsGettingTask(false);
    }, 600);
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-gradient-to-r from-red-500/30 to-red-600/40 border-red-400/50 text-red-100';
      case 'media':
        return 'bg-gradient-to-r from-yellow-500/30 to-yellow-600/40 border-yellow-400/50 text-yellow-100';
      case 'baja':
        return 'bg-gradient-to-r from-green-500/30 to-green-600/40 border-green-400/50 text-green-100';
      default:
        return 'bg-gradient-to-r from-gray-500/30 to-gray-600/40 border-gray-400/50 text-gray-100';
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

  const pendingTasksCount = tasks.filter(task => task.status === "pendiente").length;
  const hasOtherTasks = pendingTasksCount > 1;

  return (
    <div className="bg-white/15 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 col-span-full hover:shadow-3xl transition-all duration-500">
      
      {/* Header con animación */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
          🎯 Dame una Tarea
        </h2>
        <p className="text-white/70 text-sm">
          {pendingTasksCount > 0 
            ? `${pendingTasksCount} tarea${pendingTasksCount > 1 ? 's' : ''} pendiente${pendingTasksCount > 1 ? 's' : ''}`
            : 'No hay tareas pendientes'
          }
        </p>
      </div>

      {/* Contenido principal */}
      <div className="min-h-[280px] flex flex-col justify-center">
        
        {isGettingTask ? (
          // Estado de carga con animación
          <div className="text-center py-12">
            <div className="relative">
              <div className="text-7xl mb-6 animate-bounce">🎲</div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <p className="text-white/80 text-lg font-medium animate-pulse">
              Seleccionando tu próxima tarea...
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-0"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        ) : selectedTask ? (
          // Tarea seleccionada con diseño mejorado
          <div className="text-center animate-fadeIn">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              
              {/* Prioridad destacada */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getPriorityColor(selectedTask.priority)} backdrop-blur-sm border-2 mb-6 shadow-lg`}>
                <span className="text-lg">{getPriorityIcon(selectedTask.priority)}</span>
                PRIORIDAD {selectedTask.priority.toUpperCase()}
              </div>

              {/* Título de la tarea */}
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {selectedTask.title}
              </h3>

              {/* Descripción */}
              <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                {selectedTask.description}
              </p>

              {/* Metadatos */}
              <div className="flex items-center justify-center gap-4 text-sm text-white/60 mb-6">
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Creada: {new Date(selectedTask.createdAt).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <span>🔢</span>
                  <span>ID: {selectedTask.id.slice(0, 8)}...</span>
                </div>
              </div>

              {/* Botones de acción para la tarea actual */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                <button
                  onClick={() => console.log('Marcar completada:', selectedTask.title)}
                  className="px-4 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-100 text-sm font-medium border border-green-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
                >
                  ✅ Completar
                </button>
                <button
                  onClick={() => console.log('Posponer tarea:', selectedTask.title)}
                  className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-100 text-sm font-medium border border-yellow-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
                >
                  ⏰ Posponer
                </button>
                <button
                  onClick={() => console.log('Saltar tarea:', selectedTask.title)}
                  className="px-4 py-2 rounded-xl bg-gray-500/20 hover:bg-gray-500/30 text-gray-100 text-sm font-medium border border-gray-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
                >
                  ⏭️ Saltar
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Estado vacío mejorado
          <div className="text-center py-12">
            <div className="text-8xl mb-6 opacity-40 animate-pulse">🎯</div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              ¡Todo listo!
            </h3>
            <p className="text-white/70 text-lg mb-2">No tienes tareas pendientes</p>
            <p className="text-white/50 text-sm">
              Agrega nuevas tareas o importa desde IA para comenzar
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto">
              <p className="text-white/60 text-xs">
                💡 <strong>Tip:</strong> Usa el importador de tareas con IA para generar un proyecto completo en segundos
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botones principales */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        
        {/* Botón principal: Obtener tarea */}
        {!selectedTask && (
          <button
            onClick={handleGetTask}
            disabled={pendingTasksCount === 0 || isGettingTask}
            className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
              pendingTasksCount === 0 || isGettingTask
                ? 'bg-gray-500/20 border-gray-400/30 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-2 border-white/20 hover:border-white/30 hover:scale-105 hover:shadow-2xl active:scale-95 backdrop-blur-sm'
            }`}
          >
            {isGettingTask ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Seleccionando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                🎯 Obtener Tarea
              </span>
            )}
          </button>
        )}

        {/* Botones cuando hay tarea seleccionada */}
        {selectedTask && (
          <>
            {hasOtherTasks && (
              <button
                onClick={handleGetAnotherTask}
                disabled={isGettingTask}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/20"
              >
                {isGettingTask ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Buscando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🔄 Dame Otra Tarea
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={() => setSelectedTask(null)}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <span className="flex items-center gap-2">
                🏠 Volver al Inicio
              </span>
            </button>
          </>
        )}
      </div>

      {/* Indicador de progreso */}
      {pendingTasksCount > 0 && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
            <span>📊</span>
            <span>Progreso del día</span>
            <div className="w-20 bg-white/20 rounded-full h-2 ml-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.max(10, ((tasks.filter(t => t.status === 'completada').length) / tasks.length) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}