import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
    host: '68.183.93.40', // Replace with your local IP address
  },
})
