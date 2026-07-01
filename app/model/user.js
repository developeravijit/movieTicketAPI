const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "Name must be atleast 3 character"],
      maxlength: [30, "Name cannot exceed 30 character"],
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: Number,
    },

    avatar: {
      type: String,
      default: "",
    },

    public_id: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    secretKey: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
