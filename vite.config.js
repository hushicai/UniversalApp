import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

const exts = ['.jsx', '.js', '.json', '.ts', '.tsx'];
const webExts = exts.map(ext => `.web${ext}`);
const envExts = process.env.PLATFORM
  ? exts.map(ext => `.${process.env.PLATFORM.toLowerCase()}${ext}`)
  : [];
const sourceExts = [...webExts, ...envExts, ...exts];

console.log(sourceExts);

export default defineConfig({
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: [{find: 'react-native', replacement: 'react-native-web'}],
    extensions: sourceExts,
  },
  define: {
    'process.env': process.env,
  },
  plugins: [reactRefresh()],
});
