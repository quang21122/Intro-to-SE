import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000, // Set the port to 3000 (or any other port you prefer)
    strictPort: true, // Ensure Vite doesn't switch to another port if 3000 is occupied
    headers: {
      'Access-Control-Allow-Origin': '*', // Add CORS headers to allow all origins
    },
  },
})
