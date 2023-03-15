import fs from "fs";
import path from "path";

export const gitKeep = (destination) => {
  const folderPath = destination;
  const fileName = ".gitkeep";
  const filePath = path.join(folderPath, fileName);
  fs.writeFile(filePath, "", function (err) {
    if (err) console.log(err);
  });
};
