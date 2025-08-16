import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import WindowCard from "../WindowCard";
import { useSmartPositioning } from "../../hooks/useSmartPositioning";

const AboutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: none;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
`;

const WindowsList = styled.ul`
  position: relative;
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 2rem;
  }
`;

const ShuffleButton = styled.button<{ $isShuffling: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.5);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: "Courier New", monospace;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(96, 165, 250, 0.3);
    border-color: rgba(96, 165, 250, 0.7);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isShuffling, setIsShuffling] = useState(false);

  // windows data
  const windowsData = [
    {
      title: "who-am-i",
      body: `Salut ! Je suis Astrid. Actuellement en tant que <span class="highlight">développeuse frontend</span> passionnée par les expériences 3D.<br/>Basée à Marseille, France.`,
      width: 25,
    },
    {
      title: "passions",
      body: `Passionnée par tout ce qui touche à la <span class="highlight">tech</span> et à la <span class="highlight">3D</span>.<ol style="margin-left: 1rem"><li>Three.js & WebGL</li><li>React & TypeScript</li><li>Animation & GSAP</li><li>UI/UX Design</li><li>Gaming & VR</li></ol>`,
      width: 18,
    },
    {
      title: "projets",
      body: `Mes projets récents incluent des <span class="highlight">portfolios interactifs</span>, des <span class="highlight">visualisations 3D</span> et des <span class="highlight">applications web modernes</span> avec React.`,
      width: 20,
    },
    {
      title: "collaboration",
      body: `Ouverte aux opportunités de <span class="highlight">travail remote</span>.<br/><br/>Spécialisée en <span class="highlight">React</span>, <span class="highlight">TypeScript</span>, <span class="highlight">Three.js</span> et <span class="highlight">GSAP</span>.<br/><br/>Toujours partante pour collaborer sur des projets créatifs !`,
      width: 21,
    },
    {
      title: "formation",
      body: `<span style="display: flex; flex-direction: column;">
        <span style="color: var(--highlight); font-size: 0.9rem; margin-bottom: 0.5rem;">Formation Autodidacte</span>
        <span style="display: flex; justify-content: space-between">
          <span>Frontend Development</span>
          <span>2020-2024</span>
        </span>
        <span style="margin-left: 1rem; font-size: 0.8rem; color: rgba(255,255,255,0.7)">React, TypeScript, Three.js, GSAP</span>
        
        <br/>
        <span style="display: flex; justify-content: space-between">
          <span>Développement Web</span>
          <span>2019-2024</span>
        </span>
        <span style="margin-left: 1rem; font-size: 0.8rem; color: rgba(255,255,255,0.7)">JavaScript, CSS, HTML, Git</span>
      </span>`,
      width: 28,
    },
    {
      title: "technologies",
      body: `<span style="display: flex; flex-direction: column; gap: 0.8rem;">
        <div>
          <span class="highlight">Frontend:</span> React, TypeScript, Styled Components, GSAP
        </div>
        <div>
          <span class="highlight">3D/Graphics:</span> Three.js, WebGL, Shaders GLSL
        </div>
        <div>
          <span class="highlight">Tools:</span> Vite, Git, VS Code, Figma
        </div>
        <div>
          <span class="highlight">Interests:</span> WebXR, Creative Coding, UI Animation
        </div>
      </span>`,
      width: 24,
    },
  ];

  // hook (smart positioning)
  const { positions, regeneratePositions } = useSmartPositioning(
    windowsData.map((w) => ({ width: w.width, height: 200 })),
    containerSize.width,
    containerSize.height
  );

  // function to handle shuffle with visual feedback
  const handleShuffle = async () => {
    setIsShuffling(true);
    regeneratePositions();
    setTimeout(() => {
      setIsShuffling(false);
    }, 600);
  };

  // measure container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <AboutContainer ref={containerRef}>
      <ShuffleButton
        $isShuffling={isShuffling}
        onClick={handleShuffle}
        disabled={isShuffling}
        title="Mélanger les fenêtres"
      >
        🎲 {isShuffling ? "shuffling..." : "shuffle"}
      </ShuffleButton>

      <WindowsList>
        {windowsData.map((window, index) => {
          const position = positions[index];
          if (!position) return null;

          return (
            <WindowCard
              key={`${window.title}-${index}`}
              title={window.title}
              body={window.body}
              width={window.width}
              // Convertir les positions px en vw/vh pour compatibilité
              x={(position.x / containerSize.width) * 100}
              y={(position.y / containerSize.height) * 100}
            />
          );
        })}
      </WindowsList>
    </AboutContainer>
  );
};

export default About;
