import express from "express"

import auth from "../middleware/auth.js"
import uploadMiddleware from "../middleware/upload.js"

import {
  upload,
  getById,
  getAllMeetings,
  rename,
  remove,
  stats,
} from "../controllers/meeting.controller.js"

const router = express.Router()

router.post("/upload", auth, uploadMiddleware.single("audio"), upload)
router.get("/stats", auth, stats)
router.get("/", auth, getAllMeetings)
router.get("/:id", auth, getById)
router.patch("/:id", auth, rename)
router.delete("/:id", auth, remove)

export default router
