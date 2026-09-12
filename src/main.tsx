import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent benign Vite WebSocket / HMR disconnects from bubbling up as unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const errorMsg =
      event.reason?.message ||
      event.reason?.description ||
      (typeof event.reason === 'string' ? event.reason : '') ||
      event.reason?.toString?.() ||
      '';
    if (errorMsg.includes('WebSocket') || errorMsg.includes('websocket')) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
