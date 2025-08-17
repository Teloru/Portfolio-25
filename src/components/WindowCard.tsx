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
  windowId?: string;
  onFocus?: (windowId: string) => void;
  isFocused?: boolean;
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
      props.$focused ? "var(--window-border-focus)" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: ${(props) =>
    props.$focused
      ? "0 12px 40px rgba(250, 227, 241, 0.1), 0 4px 16px rgba(0, 0, 0, 0.4)"
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
    border-color: var(--window-border-focus);
    box-shadow: 0 12px 40px rgba(250, 227, 241, 0.1),
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
    font-family: "Source Code Pro", "Courier New", monospace;
    letter-spacing: 0.025em;
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
  font-family: "Source Code Pro", "Courier New", monospace;
  font-weight: 400;
  letter-spacing: 0.025em;

  .highlight {
    color: var(--highlight);
    font-weight: 600;
  }

  a {
    color: var(--highlight);
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
      color: var(--highlight);
      font-weight: 500;

      &:hover {
        color: var(--highlight-hover);
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
  windowId = title,
  onFocus,
  isFocused: externalFocused = false,
}) => {
  const windowRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!windowRef.current) return;

    // Handle focus on mousedown (before dragging starts)
    const handleMouseDown = () => {
      // Focus the window immediately when mouse is pressed
      onFocus?.(windowId);
    };

    windowRef.current.addEventListener("mousedown", handleMouseDown);

    // configure draggable
    Draggable.create(windowRef.current, {
      type: "x,y",
      bounds: windowRef.current.parentElement,
      inertia: true,
      onDrag: () => {
        // Optional: logic during drag
      },
      onRelease: () => {
        // Optional: logic after drag
      },
    });

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
        windowRef.current.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [windowId, onFocus]);

  useEffect(() => {
    if (isVisible && windowRef.current) {
      gsap.fromTo(
        windowRef.current,
        {
          scale: 0.2,
          opacity: 0,
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
      $focused={externalFocused}
      data-window
    >
      <WindowHeader>
        <h3>{title}</h3>
        <CloseButton onClick={() => onFocus?.("")} />
      </WindowHeader>
      <WindowBody dangerouslySetInnerHTML={{ __html: body }} />
    </WindowContainer>
  );
};

export default WindowCard;
