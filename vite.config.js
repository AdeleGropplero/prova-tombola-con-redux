import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/prova-tombola-con-redux/", // Specifica il nome del tuo repository
  plugins: [react()]
});
