import { createContext } from 'react';
import type { TaskContextType } from '@/types/Task';

export const TaskContext = createContext<TaskContextType | null>(null);
