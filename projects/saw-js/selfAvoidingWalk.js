
const directions = [
  [0, 1],   // up
  [1, 0],   // right
  [0, -1],  // down
  [-1, 0],  // left
];

async function walk(grid, currentX, currentY, maxLength, headingId = 0, currentLength = 0) {
  // Sleep for animation
  await new Promise((resolve) => setTimeout(() => resolve(), 1));

  grid[currentY][currentX] = true;
  path.push([currentX, currentY]);
  currentLength++;

  draw();

  if (currentLength >= maxLength) return true;

  // Prevents from going backwards
  const possibleDirections = directions
    .map((d, i) => ({ heading: d.slice(), headingId: i }))
    .filter(d => d.i !== (headingId + 2) % 4)
    .sort(() => Math.random() > 0.5 ? 1 : -1);

  for (const direction of possibleDirections) {
    const newX = currentX + direction.heading[0];
    const newY = currentY + direction.heading[1];

    // Out of bounds check
    if (newX < 0 || newX >= data.columns || newY < 0 || newY >= data.rows) continue;

    // Self avoid
    if (grid[newY][newX]) continue;

    const finishedWalk = await walk(
      grid,
      newX,
      newY,
      maxLength,
      direction.headingId,
      currentLength
    );
    if (finishedWalk) return true;
  }

  // Backtrack
  grid[currentY][currentX] = false;
  path.pop();

  return false;
}