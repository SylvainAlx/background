import fs from "fs";

export const createFolder = (destination) => {
  fs.mkdir(destination, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
