import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface WindowCardProps {
  title: string;
  body: string;
  width: number;
  x: number;
  y: number;
}

const WindowContainer = styled.li<{
  $width: number;
  $x: number;
  $y: number;
  $focused?: boolean;
}>`
  position: absolute;
  width: ${(props) => props.$width}vw;
  min-width: 250px;
  background: rgba(20, 20, 25, 0.95);
  border: 2px solid
    ${(props) =>
      props.$focused ? "rgba(96, 165, 250, 0.6)" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: ${(props) =>
    props.$focused
      ? "0 12px 40px rgba(96, 165, 250, 0.2), 0 4px 16px rgba(0, 0, 0, 0.4)"
      : "0 8px 32px rgba(0, 0, 0, 0.3)"};
  transform: translate3d(
    ${(props) => props.$x}vw,
    ${(props) => props.$y}vh,
    0px
  );
  cursor: move;
  z-index: ${(props) => (props.$focused ? 50 : 10)};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(96, 165, 250, 0.4);
    box-shadow: 0 12px 40px rgba(96, 165, 250, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    width: 90vw;
    position: relative;
    transform: none !important;
    margin-bottom: 2rem;
  }
`;

const WindowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px 6px 0 0;

  h3 {
    margin: 0;
    font-size: 0.9rem;
    color: #ffffff;
    font-weight: 600;
    font-family: "Courier New", monospace;
  }
`;

const CloseButton = styled.button`
  width: 16px;
  height: 16px;
  background: #ff5555;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &:before {
    content: "×";
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  &:hover {
    background: #ff7777;
  }
`;

const WindowBody = styled.div`
  padding: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.6;

  .highlight {
    color: #60a5fa;
    font-weight: 600;
  }

  a {
    color: #60a5fa;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ol,
  ul {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.3rem;
  }

  details {
    margin: 0.5rem 0;

    summary {
      cursor: pointer;
      color: #60a5fa;
      font-weight: 500;

      &:hover {
        color: #93c5fd;
      }
    }

    ul {
      margin-top: 0.5rem;
      font-size: 0.85rem;
    }
  }
`;

const WindowCard: React.FC<WindowCardProps> = ({
  title,
  body,
  width,
  x,
  y,
}) => {
  const windowRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!windowRef.current) return;

    // configure draggable
    Draggable.create(windowRef.current, {
      type: "x,y",
      bounds: windowRef.current.parentElement, // use parent instead of body
      inertia: true,
      onPress: () => {
        setIsFocused(true);
      },
      onDrag: () => {
        // Optional: logic during drag
      },
      onRelease: () => {
        // Optional: logic after drag
      },
    });

    // Click handler for focus
    const handleClick = () => {
      setIsFocused(true);
      // Remove focus from other windows
      document.querySelectorAll("[data-window]").forEach((window) => {
        if (window !== windowRef.current) {
          (window as any).blur?.();
        }
      });
    };

    windowRef.current.addEventListener("mousedown", handleClick);

    // Intersection Observer for entry animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(windowRef.current);

    return () => {
      if (windowRef.current) {
        observer.unobserve(windowRef.current);
        windowRef.current.removeEventListener("mousedown", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && windowRef.current) {
      gsap.fromTo(
        windowRef.current,
        {
          scale: 0.2,
          opacity: 0,
          rotateY: 45,
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isVisible]);

  return (
    <WindowContainer
      ref={windowRef}
      $width={width}
      $x={x}
      $y={y}
      $focused={isFocused}
      data-window
    >
      <WindowHeader>
        <h3>{title}</h3>
        <CloseButton onClick={() => setIsFocused(false)} />
      </WindowHeader>
      <WindowBody dangerouslySetInnerHTML={{ __html: body }} />
    </WindowContainer>
  );
};

export default WindowCard;
