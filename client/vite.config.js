import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ה-proxy מעביר כל בקשה ל-/api לשרת Express.
// כך הדפדפן רואה את הלקוח והשרת באותו origin, והקוקי httpOnly עם ה-JWT
// נשלח אוטומטית בלי הגדרות CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
