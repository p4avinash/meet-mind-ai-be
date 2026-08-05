import express from "express"
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Public Routes
router.post("/register", register)
router.post("/login", login)

// Protected Routes
router.get("/me", auth, getCurrentUser)
router.post("/logout", auth, logout)

export default router
