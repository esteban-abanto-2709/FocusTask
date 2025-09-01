import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando 🚀" });
});

export default app;