import express from "express"

import auth from "../middleware/auth.js"
import uploadMiddleware from "../middleware/upload.js"

import {
  upload,
  getById,
  getAllMeetings,
  rename,
} from "../controllers/meeting.controller.js"

const router = express.Router()

router.get("/:id", auth, getById)
router.post("/upload", auth, uploadMiddleware.single("audio"), upload)
router.get("/", auth, getAllMeetings)
router.patch("/:id", auth, rename)

export default router
