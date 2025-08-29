import type Task from "@/types/Task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200">
          {task.priority}
        </span>
      </div>

      <p className="text-gray-300 mb-3">{task.description}</p>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{task.status}</span>
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}