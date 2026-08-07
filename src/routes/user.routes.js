import express from "express"

import auth from "../middleware/auth.js"

import { getSettings, updateSettings } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/settings", auth, getSettings)

router.patch("/settings", auth, updateSettings)

export default router
