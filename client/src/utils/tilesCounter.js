export const tilesCounter = (data) => {
  let counter = 0;
  const counterFunction = (project) => {
    project.children.map((tile, i) => {
      counter++;
      if (tile.children.length > 0) {
        counterFunction(tile);
      }
    });
  };
  counterFunction(data);
  return counter;
};
