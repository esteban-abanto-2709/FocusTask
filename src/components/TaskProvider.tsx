import { useState, type ReactNode } from 'react';
import type { Task, TaskContextType } from '@/types/Task';

import { TaskContext } from "@/context/TaskContext";

interface TaskProviderProps {
  children: ReactNode;
}

export default function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (
    id: string,
    updates: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'status'>>
  ) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: Date.now() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const markAsCompleted = (id: string) => {
    updateTask(id, { status: 'completada' });
  };

  const markAsPending = (id: string) => {
    updateTask(id, { status: 'pendiente' });
  };

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    markAsCompleted,
    markAsPending,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}