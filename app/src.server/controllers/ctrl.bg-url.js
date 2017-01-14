/**
 * Bg-URL controller.
 * Return a image url for splash screen randomly.
 */

const fs = require('fs')
const path = require('path')
const { ResponseJSON } = require('../define')

const IMAGE_DIR_PATH = path.resolve(__dirname, '../../../public/images/splash-screen')
const IMAGE_PUBLIC_PATH = '/images/splash-screen'

module.exports = function (req, res, next) {
  const getFileList = gGetFileList()
  getFileList.next()
    .value
    .then(files => {
      const randomFileName = files[Math.floor(Math.random() * files.length)]
      const bgUrl = `${IMAGE_PUBLIC_PATH}/${randomFileName}`
      res.status(200).json(new ResponseJSON(200, 'OK', bgUrl))
    })
    .catch(err => res.status(500).json(new ResponseJSON(500, `图片读取失败: ${err}`)))
}

/**
 * Read background image folder and get all file path.
 *
 * @return {GeneratorFunctionConstructor}
 */
function *gGetFileList () {
  yield new Promise((resolve, reject) => {
    fs.readdir(IMAGE_DIR_PATH, (err, files) => {
      err
        ? reject(err)
        : resolve(files)
    })
  })
}
