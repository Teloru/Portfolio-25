import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --highlight: #60a5fa;
    --highlight-hover: #93c5fd;
    --window-bg: rgba(20, 20, 25, 0.95);
    --window-border: rgba(255, 255, 255, 0.2);
    --window-border-focus: rgba(96, 165, 250, 0.6);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    overflow: hidden;
  }

  #root {
    height: 100%;
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export default GlobalStyles;
