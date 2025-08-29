import type Task from "../types/Task";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {

  return (
    <div>
      {tasks.map((task, index) => (
        <div>
          <h3 key={index}>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.priority}</p>
          <p>{new Date(task.createdAt).toISOString()}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}