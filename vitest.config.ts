import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import reactNative from 'vitest-react-native';

module.exports = defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
  },
  plugins: [reactNative(), react()],
  test: {
    setupFiles: ['./tests/setup.tsx'],
  },
});
