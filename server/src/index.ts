import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.json({ message: "Servidor funcionando 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});