import formidable from "formidable";
import fs from "fs";

export const uploadFile = (req, res) => {
  const form = formidable();
  form.parse(req, function (error, fields, files) {
    try {
      fs.unlink(fields.path, (error) => {
        if (error) {
          return error;
        }
        console.log("Le fichier a été supprimé avec succès");
      });
      const projectId = fields.projectId;
      const extension = files.file.originalFilename.split(".").pop();
      let oldpath = files.file.filepath;
      let newpath =
        `public/images/${projectId}_` +
        files.file.newFilename +
        "." +
        extension;
      fs.copyFile(oldpath, newpath, (error) => {
        if (error) {
          return error;
        }
        res.status(200).json({ newpath });
      });
    } catch (error) {
      res.status(400).json({
        message: "Erreur de l'upload",
        erreur: error,
      });
    }
  });
};

export const deleteFile = (req, res) => {
  try {
    const path = req.body.path;
    fs.unlink(path, (error) => {
      if (error) {
        return res.status(400).json({
          message: "suppression du fichier impossible",
          erreur: error,
        });
      }
      res.status(200).json({
        message: "fichier supprimé",
        file: path,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "suppression du fichier impossible",
      erreur: error,
    });
  }
};
