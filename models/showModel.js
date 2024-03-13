import mongoose from "mongoose";
import { SHOW_TIMING } from "../utils/constants.js";

const showSchema = new mongoose.Schema(
  {
    show_artist: String,
    show_type: {
      type: String,
      default: "Music",
    },
    show_Timing: {
      type: String,
      enum: Object.values(SHOW_TIMING),
      default: SHOW_TIMING.EVENING,
    },
    show_location: {
      type: String,
      default: "Earth",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    show_Description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Show", showSchema);
