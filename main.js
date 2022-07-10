/*
 * File Name: main.js
 * Description:
 *
 * Created Date: July 9, 2022
 * Author: Natalia Ciampelletti
 *
 */
const { rejects } = require("assert")
const path = require("path")
const { unzip, readDir, grayScale } = require("./IOhandler")

const IOhandler = require("./IOhandler"),
  zipFilePath = path.join(__dirname, "myfile.zip"),
  pathUnzipped = path.join(__dirname, "unzipped"),
  pathProcessed = path.join(__dirname, "grayscaledNew")

unzip(zipFilePath, pathUnzipped)
  .then((message) => {
    return readDir(pathUnzipped)
  })
  .then((filePaths) => {
    filePaths.forEach((fileName) => {
      var ext = path.parse(fileName).ext

      if (ext === ".png") {
        return grayScale(
          path.join(pathUnzipped, fileName),
          fileName // path.join(pathProcessed, fileName)
        )
      }
    })
  })
  .catch((err) => console.log(err))
