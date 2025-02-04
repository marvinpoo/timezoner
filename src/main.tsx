import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { TimelineScrollProvider } from './context/TimelineScrollContext';
import initI18n from './i18n';
import './styles/main.scss';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const renderApp = () => {
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <ThemeProvider>
        <TimelineScrollProvider>
          <App />
        </TimelineScrollProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

// Initialize the app
const init = async () => {
  try {
    await initI18n();
    await renderApp();
  } catch (error) {
    console.error('Failed to initialize the app:', error);
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: #666;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page</p>
        </div>
      `;
    }
  }
};

init();