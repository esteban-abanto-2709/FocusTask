import { useState } from "react";
import type { Task } from '@/types/Task';
import { useTasks } from "@/hook/useTasks";

export default function TaskImporter() {
  const { addTask } = useTasks();
  const [jsonInput, setJsonInput] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("📋 Copiar Directrices");

  // Directrices claras para la IA
  const aiDirectives = `Por favor, genera un JSON con tareas para mi proyecto siguiendo exactamente este formato:

[
  {
    "title": "Nombre corto y claro de la tarea",
    "description": "Descripción detallada de qué hacer exactamente",
    "priority": "alta"
  },
  {
    "title": "Segunda tarea del proyecto",
    "description": "Otra descripción específica y accionable",
    "priority": "media"
  }
]

REGLAS IMPORTANTES:
- Solo usa estas prioridades: "alta", "media", "baja"
- Title: máximo 50 caracteres, sea específico
- Description: detalla QUÉ hacer y CÓMO hacerlo
- Genera entre 5-15 tareas ordenadas por importancia
- NO agregues comas al final de las propiedades
- Asegúrate que el JSON sea válido para copiar y pegar directamente`;

  async function handleCopyDirectives() {
    try {
      await navigator.clipboard.writeText(aiDirectives);
      setCopyButtonText("✅ Directrices Copiadas");
      setTimeout(() => setCopyButtonText("📋 Copiar Directrices"), 3000);
    } catch (err) {
      console.error("Error copiando:", err);
      setCopyButtonText("❌ Error al copiar");
      setTimeout(() => setCopyButtonText("📋 Copiar Directrices"), 3000);
    }
  }

  function handleImportTasks() {
    if (!jsonInput.trim()) {
      alert("Por favor, pega el JSON generado por la IA");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      if (!Array.isArray(parsed)) {
        alert("El JSON debe ser un array de tareas");
        return;
      }

      parsed.forEach((taskData: Task) => {
        addTask({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority
        });
      });

      setJsonInput("");
      alert(`✅ ${parsed.length} tareas importadas exitosamente`);

    } catch {
      alert("JSON inválido. Asegúrate de copiar exactamente lo que generó la IA");
    }
  }

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">

      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
        📦 Importar Tareas
      </h2>

      <div className="space-y-4">

        {/* Área de texto para el JSON */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            JSON de Tareas (generado por IA)
          </label>

          <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200 resize-none h-64 font-mono text-sm"
            placeholder="Pega aquí el JSON que generó tu IA..."
          />
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <button
            onClick={handleCopyDirectives}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            {copyButtonText}
          </button>

          <button
            onClick={handleImportTasks}
            disabled={!jsonInput.trim()}
            className={`px-4 py-3 rounded-xl font-medium border backdrop-blur-sm transition-all duration-300 ${!jsonInput.trim()
              ? 'bg-gray-500/20 border-gray-400/30 text-gray-300 cursor-not-allowed'
              : 'bg-green-500/20 hover:bg-green-500/30 border-green-300/40 text-green-100 hover:scale-105 hover:shadow-lg active:scale-95'
              }`}
          >
            ⬆️ Importar Tareas
          </button>
        </div>

        {/* Flujo de trabajo simple */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-2">
            🤖 Flujo con IA:
          </h3>
          <div className="text-xs text-white/70 space-y-1">
            <p><strong>1.</strong> Copia las directrices con el botón de arriba</p>
            <p><strong>2.</strong> Pégalas en tu IA favorita + describe tu proyecto</p>
            <p><strong>3.</strong> Copia el JSON que te genere</p>
            <p><strong>4.</strong> Pégalo arriba y presiona "Importar Tareas"</p>
          </div>
        </div>
      </div>
    </div>
  );
}