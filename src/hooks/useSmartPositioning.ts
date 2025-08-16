import { useState, useEffect } from "react";

interface WindowPosition {
  x: number;
  y: number;
}

interface WindowData {
  width: number;
  height: number;
}

export const useSmartPositioning = (
  windows: WindowData[],
  containerWidth: number,
  containerHeight: number
) => {
  const [positions, setPositions] = useState<WindowPosition[]>([]);

  const generatePosition = (
    windowData: WindowData,
    windowIndex: number,
    existingPositions: { pos: WindowPosition; data: WindowData }[]
  ) => {
    const margin = 40;
    const cellPadding = 20; // space padding in each cell

    // convert vw width to pixels
    const windowWidthPx = (windowData.width / 100) * containerWidth;
    const windowHeightPx = windowData.height;

    // template grid for each window (logical (positions) - 4x3 asymmetric grid
    const gridPositions = [
      { x: 0, y: 0 }, // who-am-i
      { x: 1, y: 0 }, // hobbies
      { x: 0, y: 1 }, // twitch
      { x: 1, y: 1 }, // collaboration
      { x: 3, y: 0 }, // education
      { x: 3, y: 3 }, // coffee
      { x: 2, y: 1 }, // experiences
    ];

    // get grid position based for this window
    const gridPos = gridPositions[windowIndex] || {
      x: windowIndex % 4,
      y: Math.floor(windowIndex / 4),
    };

    // compute grids dimensions based on screen size
    const availableWidth = containerWidth - margin * 2;
    const availableHeight = containerHeight - margin * 2;

    const gridCols = 4;
    const gridRows = 3;

    const cellWidth = availableWidth / gridCols;
    const cellHeight = availableHeight / gridRows;

    // base pos in cell
    const baseCellX = margin + gridPos.x * cellWidth;
    const baseCellY = margin + gridPos.y * cellHeight;

    // compute available space in cell to center window
    const availableCellWidth = cellWidth - cellPadding * 2;
    const availableCellHeight = cellHeight - cellPadding * 2;

    // centered position in cell with a bit of randomness
    const randomOffsetX =
      (Math.random() - 0.5) * Math.min(60, availableCellWidth * 0.3);
    const randomOffsetY =
      (Math.random() - 0.5) * Math.min(40, availableCellHeight * 0.3);

    const centerX =
      baseCellX + cellWidth / 2 - windowWidthPx / 2 + randomOffsetX;
    const centerY =
      baseCellY + cellHeight / 2 - windowHeightPx / 2 + randomOffsetY;

    // make sure the window stays within the screen bounds
    const finalX = Math.max(
      margin,
      Math.min(centerX, containerWidth - windowWidthPx - margin)
    );
    const finalY = Math.max(
      margin,
      Math.min(centerY, containerHeight - windowHeightPx - margin)
    );

    // check for collision with existing windows
    const hasCollision = existingPositions.some(({ pos, data }) => {
      const existingWidthPx = (data.width / 100) * containerWidth;
      const existingHeightPx = data.height;
      const buffer = 20; // min buffer to avoid collision

      return (
        finalX < pos.x + existingWidthPx + buffer &&
        finalX + windowWidthPx > pos.x - buffer &&
        finalY < pos.y + existingHeightPx + buffer &&
        finalY + windowHeightPx > pos.y - buffer
      );
    });

    // if collision, try with variations around the position
    if (hasCollision) {
      for (let attempt = 0; attempt < 10; attempt++) {
        const offsetX = (Math.random() - 0.5) * 120;
        const offsetY = (Math.random() - 0.5) * 80;

        const adjustedX = Math.max(
          margin,
          Math.min(centerX + offsetX, containerWidth - windowWidthPx - margin)
        );
        const adjustedY = Math.max(
          margin,
          Math.min(centerY + offsetY, containerHeight - windowHeightPx - margin)
        );

        const stillHasCollision = existingPositions.some(({ pos, data }) => {
          const existingWidthPx = (data.width / 100) * containerWidth;
          const existingHeightPx = data.height;
          const buffer = 20;

          return (
            adjustedX < pos.x + existingWidthPx + buffer &&
            adjustedX + windowWidthPx > pos.x - buffer &&
            adjustedY < pos.y + existingHeightPx + buffer &&
            adjustedY + windowHeightPx > pos.y - buffer
          );
        });

        if (!stillHasCollision) {
          return { x: adjustedX, y: adjustedY };
        }
      }
    }

    return { x: finalX, y: finalY };
  };

  const generateAllPositions = () => {
    const newPositions: WindowPosition[] = [];
    const positionsWithData: { pos: WindowPosition; data: WindowData }[] = [];

    windows.forEach((windowData, index) => {
      const position = generatePosition(windowData, index, positionsWithData);
      newPositions.push(position);
      positionsWithData.push({ pos: position, data: windowData });
    });

    setPositions(newPositions);
  };

  useEffect(() => {
    if (containerWidth > 0 && containerHeight > 0 && windows.length > 0) {
      generateAllPositions();
    }
  }, [containerWidth, containerHeight, windows.length]);

  const regeneratePositions = () => {
    // force regeneration by first clearing the positions
    setPositions([]);
    // Regenerate after a short delay to see the visual effect
    setTimeout(() => {
      generateAllPositions();
    }, 100);
  };

  return {
    positions,
    regeneratePositions,
  };
};
