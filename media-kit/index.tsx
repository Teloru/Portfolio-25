import React from 'react';
import ReactDOM from 'react-dom/client';
import MediaKitPage from './MediaKitPage';
import './media-kit.css';

const root = document.getElementById('root');
if (!root) throw new Error('Could not find root element to mount Media Kit page');
ReactDOM.createRoot(root).render(<React.StrictMode><MediaKitPage /></React.StrictMode>);
