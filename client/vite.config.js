import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()]
=======
  plugins: [react()],
	server: {
    host: '68.183.93.40', // Replace with your local IP address
    port: 80, // Set the port to your desired value
  },
>>>>>>> 19421bd (undefined updated again)
})
