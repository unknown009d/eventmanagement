import mongoose from "mongoose";

const Eventt = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    loc: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    createdBy: {
      type: String,
      required: true,
    },
    badge: {
      type: Array(2),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Eventt || mongoose.model("Eventt", Eventt);
