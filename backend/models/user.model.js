const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    accessCreatedAt: {
      type: Date,
      default: null,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    subscribedTo: [String],
  },
  {
    timestamps: true,
    collection: "user",
  }
);

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
