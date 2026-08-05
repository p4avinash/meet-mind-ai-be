import express from "express"

import auth from "../middleware/auth.js"
import uploadMiddleware from "../middleware/upload.js"

import { upload } from "../controllers/meeting.controller.js"

const router = express.Router()

router.post("/upload", auth, uploadMiddleware.single("audio"), upload)

export default router
