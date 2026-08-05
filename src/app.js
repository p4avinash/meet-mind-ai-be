import express from "express"

import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use(errorHandler)

app.get("/", async (_, res) => {
  res.json({
    message: "Server Running 🚀",
  })
})

export default app
