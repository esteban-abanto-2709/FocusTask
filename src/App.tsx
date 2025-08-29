import TaskProvider from "@/components/TaskProvider";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskImporter from "@/components/TaskImporter";

export default function App() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Focus Task
        </h1>
        <TaskProvider>
          <div className="grid md:grid-cols-2 gap-8">
            <TaskForm />
            <TaskImporter />
            <TaskList />
          </div>
        </TaskProvider>
      </div>
    </div>
  )
}