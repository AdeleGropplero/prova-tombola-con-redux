import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/prova-tombola-con-redux/" // Cambia con il nome del tuo repository
});
