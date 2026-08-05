import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (_, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)

    cb(null, `${uniqueName}${path.extname(file.originalname)}`)
  },
})

const upload = multer({ storage })

export default upload
