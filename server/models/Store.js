import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User shop is required"],
    },
    name: {
      type: String,
      required: [true, "Username shop is required"],
      minlength: [3, "Username shop must be at least 3 characters long"],
      maxlength: [50, "Username shop must be at most 50 characters long"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category shop is required"],
      minlength: [3, "Category shop must be at least 3 characters long"],
      maxlength: [50, "Category shop must be at most 50 characters long"],
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], //[Long, Lat]
        required: [
          true,
          "Coordinates are required. Provide longitude and latitude.",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);
StoreSchema.index({ location: "2dsphere" });

StoreSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model("Store", StoreSchema);
