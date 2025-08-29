export const TaskPriority = {
  ALTA: 'alta',
  MEDIA: 'media',
  BAJA: 'baja'
} as const;

export const TaskStatus = {
  PENDIENTE: 'pendiente',
  COMPLETADA: 'completada'
} as const;

export type TaskPriorityType = typeof TaskPriority[keyof typeof TaskPriority];
export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  createdAt: number;
  updatedAt?: number;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'status'>>) => void;
  deleteTask: (id: string) => void;
  markAsCompleted: (id: string) => void;
  markAsPending: (id: string) => void;
}