import fs from "fs";
import path from "path";

export const deleteFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // récursif
        deleteFolder(curPath);
      } else {
        // supprimer le fichier
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath); // supprimer le dossier
  }
};
