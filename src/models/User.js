import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    defaultDeliveryEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    settings: {
      autoProcessMeeting: {
        type: Boolean,
        default: true,
      },

      autoSendEmail: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("User", userSchema)
