import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error("Root element not found");

const root = createRoot(container);

function Root() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}

function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    console.error('Application crashed:', error);
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Application Error</h1>
        <p>{error.message}</p>
        <p>Please refresh the page or contact support</p>
      </div>
    );
  }
}

root.render(<Root />);