import express from "express"
import cors from "cors"
import "dotenv/config"

import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/auth.routes.js"
import meetingRoutes from "./routes/meeting.routes.js"
import aiRoutes from "./routes/ai.routes.js"

const app = express()

const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)

app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/meetings", meetingRoutes)
app.use("/api/ai", aiRoutes)
app.use(errorHandler)

app.get("/", async (_, res) => {
  res.json({
    message: "Server Running 🚀",
  })
})

export default app
