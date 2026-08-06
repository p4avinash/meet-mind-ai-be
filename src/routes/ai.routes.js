import express from "express"
import {
  testGroq,
  transcribeMeeting,
  summarizeMeeting,
  generateMeetingActionItems,
} from "../controllers/ai.controller.js"

const router = express.Router()

router.get("/test", testGroq)

router.post("/:id/transcribe", transcribeMeeting)
router.post("/:id/summary", summarizeMeeting)
router.post("/:id/action-items", generateMeetingActionItems)

export default router
