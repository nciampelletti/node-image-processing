/*
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const { error } = require("console")

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path")

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      //.on("entry", (entry) => entry.autodrain())
      .promise()
      .then(
        () => resolve("done"),
        (e) => reject(e)
      )
  })
}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      resolve(files)
    })
  })
}

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .on("error", (err) => {
        reject(er.message)
      })
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2

            this.data[idx] = this.data[idx]
            this.data[idx + 1] = this.data[idx]
            this.data[idx + 2] = this.data[idx]
          }
        }

        this.pack().pipe(fs.createWriteStream(pathOut))
      })
      .on("end", () => {
        console.log("file has been grayscaled!")
        resolve("done")
      })
  })
}

module.exports = {
  unzip,
  readDir,
  grayScale,
}
