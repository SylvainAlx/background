const CreateTile = (parentId) => {
  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };
  const newTile = {
    title: "",
    tag: "",
    image: "",
    description: "",
    parentId: parentId,
    children: [],
  };
  newTile.id = getRandom(100000);

  return newTile;
};

export default CreateTile;
