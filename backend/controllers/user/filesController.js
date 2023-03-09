import { createCipheriv } from "crypto";
import formidable from "formidable";
import fs from "fs";

export const uploadFile = (req, res) => {
  const form = formidable();
  form.parse(req, function (error, fields, files) {
    try {
      if (!files.file) {
        res.status(400).json({
          message: "fichier manquant",
        });
      } else {
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
            res.send(error);
          } else {
            if (fields.path) {
              fs.unlink(fields.path, (error) => {
                if (error) {
                  return res.send(error);
                } else {
                  console.log("fichier supprimé");
                  res.status(200).json({ newpath });
                }
              });
            } else {
              res.status(200).json({ newpath });
            }
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "upload impossible",
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
