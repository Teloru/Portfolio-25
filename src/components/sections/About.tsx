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
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
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
      body: `Welcome! I’m Astrid. Currently working as a <span class="highlight">3D software engineer</span> <a href="https://h3d.ai" target="_blank" style="color: #d9d9dd;">@h3d</a><br /> Based in Marseille, France.`,
      width: 25,
    },
    {
      title: "hobbies",
      body: `Passionate about all things <span class="highlight">tech</span> and <span class="highlight">3D</span>.<ol style="margin-left: 1rem"><li>VR/AR</li><li>drones</li><li>digital art</li><li>music</li><li>y2k video games</li></ol>`,
      width: 18,
    },
    {
      title: "twitch.tv",
      body: `Occasional streams on my <a href="https://www.twitch.tv/teloru" target="_blank" style="text-decoration: none;"><span class="highlight">Twitch</span></a> channel-- Come take a look! #sega #atlus #jrpg`,
      width: 20,
    },
    {
      title: "collaboration",
      body: `Open to <span class="highlight">remote</span> work opportunities.<br /><br />Eager to contribute to research projects in <span class="highlight">real time rendering</span>.<br /><br />I specialize in <span class="highlight">C++</span> and <span class="highlight">JS</span>/<span class="highlight">TS</span> (React & Vue, ThreeJS, BabylonJS).`,
      width: 21,
    },
    {
      title: "education",
      body: `<span style="display: flex; flex-direction: column;">
          <span style="color: var(--highlight); font-size: 0.9rem; margin-bottom: 0.5rem;">@Aix-Marseille University</span>
          <a style="color:#d9d9d9;" href="https://sciences.univ-amu.fr/en/node/598" target="_blank">
          <span style="display: flex; justify-content: space-between">
            <span>MS in Computer Science</span>
            <span>2024</span></a>
          </span>
          <span style="margin-left: 2rem; font-size: 0.65rem">Specialization: Computer Graphics and Applied Geometry</span>

          <a style="color:#d9d9d9;" href="https://sciences.univ-amu.fr/en/study-program/bachelor-degree/informatics" target="_blank">
          <span style="display: flex; justify-content: space-between">
            <span>BS in Computer Science</span>
            <span>2022</span></a>
          </span>
          <span style="margin-left: 2rem; font-size: 0.65rem">Major: GPU Progamming | Minor: Human-Machine Interface</span>


          <a style="color:#d9d9d9;" href="https://iut.univ-amu.fr/en/study-programs/university-bachelor-of-technology/but-computing/but-computing-aix" target="_blank">
          <span style="display: flex; justify-content: space-between">
            <span>Associate Degree in Computer Science</span>
            <span>2020</span></a>
          </span>
          <span style="margin-left: 2rem; font-size: 0.65rem">Specialization: Software development, UNIX, Qt</span></span>`,
      width: 28,
    },
    {
      title: "grab-a-coffee",
      body: `I make free templates (discord, Notion) on my <a href="https://www.ko-fi.com/teloru" target="_blank" style="text-decoration: none;"><span class="highlight">Ko-fi page</span></a>- if you wanna grab a coffee with me feel free to visit my page :)`,
      width: 24,
    },
    {
      title: "experiences",
      body: `<span style="display: flex; flex-direction: column;">
          <span style="display: flex; justify-content: space-between">
          <span>SE intern <span class="highlight">@dassaultSystemes</span>, Aix-en-Provence, Fr</span>
          <span>apr. 2024 - sep. 2024</span></a></span>
          <span style="margin-left: 0.5rem; font-size: 0.65rem">
            
            <details class="toggle">
              <summary>Joined the Additive Manufacturing team; [software engineering] <span class="chevron"></span></summary>
              <ul>
                <li>Designed a G-code export feature compatible with multiple 3D printer models, enhancing workflow efficiency for both domestic and industrial users.</li>
                <li>Implemented a flexible UI, enabling users to define machine-specific printing parameters, improving customization and UX.</li>
                <li>Integrated the solution with high-end 3D printers (Ultimaker, Raise3D), coordinated remote testing with a team in Vélizy.</li>
                <li>Collaborated within an Agile Scrum team</li>
              </ul>
            </details>
          </span>
        <br/>
        <span style="display: flex; justify-content: space-between">
          <span>CG researcher intern <span class="highlight">@LIS lab</span>, Marseille, Fr</span>
          <span>apr. 2023 - jun. 2023</span></a></span>
          <span style="margin-left: 0.5rem; font-size: 0.65rem">    
            <details class="toggle">
              <summary>Joined the G-Mod team; [research]<span class="chevron"></span></summary>
              Optimized topological extraction scripts on 3D shapes using the TTK library. My work focused on improving compatibility with various 3D file formats and integrating segmentation filters.
              <ul>
              <li>Added support for STL and PLY formats, enhancing script flexibility.</li>
              <li>Implemented topological filters, improving mesh processing efficiency by 20%.</li>
              <li>Refactored C++ code, reducing compatibility errors by 30%.</li>
              </ul>
            </details>
          </span>

        <br/>
          <span style="display: flex; justify-content: space-between">
          <span>CMS developer intern <span class="highlight">@iconik</span>, La Ciotat, Fr</span>
          <span>apr. 2022 - aug. 2022</span></a></span>
          <span style="margin-left: 0.5rem; font-size: 0.65rem">
          <details class="toggle">
            <summary>Joined the Communication team; [VR video game]<span class="chevron"></span></summary>
              <ul>
                <li>Led the development of Iconik's website, reducing page load time by 25% through optimized code and content delivery strategies.</li>
                <li>Assisted in the launch of a new service.</li>
              </ul>
            </details>
          </span>`,
      width: 44,
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
