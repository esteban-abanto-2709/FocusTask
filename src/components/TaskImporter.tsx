import { useState } from "react";

import type { Task } from '@/types/Task';
import { useTasks } from "@/hook/useTasks";

export default function TaskImporter() {

  const { addTask } = useTasks();
  const [jsonInput, setJsonInput] = useState("");

  //TODO: Mejorar esta parte del texto y idicar las cosas reales de como subir el json
  const placeholder = `Directrices para agregar tareas en formato JSON:
[
  {
    "title": "Diseñar logo",
    "description": "Crear un logo minimalista para la app",
    "priority": "media",
  },
  {
    "title": "Configurar CI/CD",
    "description": "Automatizar despliegue con GitHub Actions",
    "priority": "baja",
  }
]`;

  function onClickCopyFormat() {
    navigator.clipboard.writeText(placeholder)
      .then(() => {
        //TODO: Tiene que cambiar, no quiero una alerta, busquemos otra forma de indicar que se copio
        alert("Formato copiado al portapapeles ✅");
      })
      .catch((err) => {
        console.error("Error copiando: ", err);
      });
  }

  function onClickUploadTasks() {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!Array.isArray(parsed)) {
        alert("El JSON debe ser un arreglo de tareas");
        return;
      }

      //TODO: Si la validacion es necesaria es porque el 'placeholder' esta mal hecho, tenemos que removerlo
      parsed.forEach((task: Task, index: number) => {
        if (typeof task.title !== "string") {
          throw new Error(`Tarea en posición ${index} no válida`);
        }
      });

      parsed.forEach((task: Task) => addTask(task));

      setJsonInput("");

      //TODO: Tiene que cambiar, no quiero una alerta
      alert("Tareas cargadas con éxito ✅");
    } catch (err) {
      console.error(err);

      //TODO: Tiene que cambiar, no quiero una alerta
      alert("El texto no es un JSON válido de tareas");
    }
  }

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-md">Agregar Varias Tareas</h2>

      <div className="flex flex-col gap-4">

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Pergar formato de Json</label>
          <textarea value={jsonInput}
            onChange={(e) => { setJsonInput(e.currentTarget.value) }}
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200 resize-none h-60"
            placeholder={placeholder}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={onClickCopyFormat}
            className="w-full mt-4 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Copiar Indicaciones
          </button>
          <button
            onClick={onClickUploadTasks}
            className="w-full mt-4 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Subir Tareas
          </button>
        </div>
      </div>
    </div>
  );
}