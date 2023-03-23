const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema(
  {
    destinationAddress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "destination",
  }
);

const Destination = mongoose.model("Destination", DestinationSchema);
module.exports = Destination;
