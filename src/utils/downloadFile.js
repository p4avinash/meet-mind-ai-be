import axios from "axios"
import fs from "fs"
import path from "path"

const downloadFile = async (url, fileName) => {
  const tempDir = path.join(process.cwd(), "temp")

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  const filePath = path.join(tempDir, fileName)

  const response = await axios({
    method: "GET",
    url,
    responseType: "stream",
  })

  const writer = fs.createWriteStream(filePath)

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath))
    writer.on("error", reject)
  })
}

export default downloadFile
