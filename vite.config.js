import { defineConfig } from 'vite';

 // vite.config.js

export default defineConfig({
  // ...existing configuration...

  server: {
    fs: {
      strict: false
    }
  },

  // ...existing configuration...
});
