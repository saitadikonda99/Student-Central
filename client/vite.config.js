import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.2', // Replace with your local IP address
    port: 3000, // Set the port to your desired value
  },
})
