import mongoose from "mongoose"

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Meeting",
    },

    audioUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Meeting", meetingSchema)
