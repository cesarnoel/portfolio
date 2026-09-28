import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// SASS entry point. Vite compiles it with dart-sass and then runs the result
// through PostCSS so the Tailwind directives inside are expanded.
import './styles/main.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Could not find the #root element in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
