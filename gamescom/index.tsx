import React from 'react';
import ReactDOM from 'react-dom/client';
import GamescomPage from './GamescomPage';
import './gamescom.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount Gamescom page');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GamescomPage />
  </React.StrictMode>,
);
