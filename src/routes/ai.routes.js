import express from "express"
import { testGroq, transcribeMeeting } from "../controllers/ai.controller.js"

const router = express.Router()

router.get("/test", testGroq)

router.post("/:id/transcribe", transcribeMeeting)

export default router
