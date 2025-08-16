import { useState, useEffect } from "react";

interface MousePosition {
  mouseX: number;
  mouseY: number;
}

export const useMouse = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};
