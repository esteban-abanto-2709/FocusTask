import express from "express";
import authRoutes from "@/modules/auth/auth.routes";
import userRoutes from "@/modules/users/users.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando 🚀" });
});

export default app;