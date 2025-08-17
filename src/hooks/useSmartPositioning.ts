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
      { x: 0, y: 2 }, // collaboration
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

    // Increased randomness for more natural "messy" look
    // Some windows get more chaos than others
    const chaosLevel = windowIndex % 3 === 0 ? 1.5 : 1; // Every 3rd window gets more chaos
    const maxOffsetX = Math.min(120, availableCellWidth * 0.5) * chaosLevel;
    const maxOffsetY = Math.min(80, availableCellHeight * 0.4) * chaosLevel;

    const randomOffsetX = (Math.random() - 0.5) * maxOffsetX;
    const randomOffsetY = (Math.random() - 0.5) * maxOffsetY;

    // Sometimes break out of grid boundaries for more organic feel
    const breakoutChance = 0.3; // 30% chance to break out
    const shouldBreakout = Math.random() < breakoutChance;
    
    let centerX, centerY;
    
    if (shouldBreakout) {
      // Allow windows to wander between cells
      const cellBreakoutX = (Math.random() - 0.5) * cellWidth * 0.6;
      const cellBreakoutY = (Math.random() - 0.5) * cellHeight * 0.4;
      centerX = baseCellX + cellWidth / 2 - windowWidthPx / 2 + randomOffsetX + cellBreakoutX;
      centerY = baseCellY + cellHeight / 2 - windowHeightPx / 2 + randomOffsetY + cellBreakoutY;
    } else {
      centerX = baseCellX + cellWidth / 2 - windowWidthPx / 2 + randomOffsetX;
      centerY = baseCellY + cellHeight / 2 - windowHeightPx / 2 + randomOffsetY;
    }

    // make sure the window stays within the screen bounds
    const finalX = Math.max(
      margin,
      Math.min(centerX, containerWidth - windowWidthPx - margin)
    );
    const finalY = Math.max(
      margin,
      Math.min(centerY, containerHeight - windowHeightPx - margin)
    );

    // Allow partial overlaps for more natural look
    // Only prevent major collisions (>60% overlap)
    const hasSignificantCollision = existingPositions.some(({ pos, data }) => {
      const existingWidthPx = (data.width / 100) * containerWidth;
      const existingHeightPx = data.height;
      
      // Calculate overlap area
      const overlapX = Math.max(0, Math.min(finalX + windowWidthPx, pos.x + existingWidthPx) - Math.max(finalX, pos.x));
      const overlapY = Math.max(0, Math.min(finalY + windowHeightPx, pos.y + existingHeightPx) - Math.max(finalY, pos.y));
      const overlapArea = overlapX * overlapY;
      
      // Calculate percentage of overlap relative to smaller window
      const currentWindowArea = windowWidthPx * windowHeightPx;
      const existingWindowArea = existingWidthPx * existingHeightPx;
      const smallerWindowArea = Math.min(currentWindowArea, existingWindowArea);
      
      const overlapPercentage = overlapArea / smallerWindowArea;
      
      // Only consider it a "collision" if overlap is more than 60%
      return overlapPercentage > 0.6;
    });

    // if significant collision, try with smaller variations to find a good spot
    if (hasSignificantCollision) {
      for (let attempt = 0; attempt < 8; attempt++) {
        // Smaller, more subtle adjustments
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 60;

        const adjustedX = Math.max(
          margin,
          Math.min(centerX + offsetX, containerWidth - windowWidthPx - margin)
        );
        const adjustedY = Math.max(
          margin,
          Math.min(centerY + offsetY, containerHeight - windowHeightPx - margin)
        );

        const stillHasSignificantCollision = existingPositions.some(({ pos, data }) => {
          const existingWidthPx = (data.width / 100) * containerWidth;
          const existingHeightPx = data.height;
          
          const overlapX = Math.max(0, Math.min(adjustedX + windowWidthPx, pos.x + existingWidthPx) - Math.max(adjustedX, pos.x));
          const overlapY = Math.max(0, Math.min(adjustedY + windowHeightPx, pos.y + existingHeightPx) - Math.max(adjustedY, pos.y));
          const overlapArea = overlapX * overlapY;
          
          const currentWindowArea = windowWidthPx * windowHeightPx;
          const existingWindowArea = existingWidthPx * existingHeightPx;
          const smallerWindowArea = Math.min(currentWindowArea, existingWindowArea);
          
          const overlapPercentage = overlapArea / smallerWindowArea;
          return overlapPercentage > 0.6;
        });

        if (!stillHasSignificantCollision) {
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
