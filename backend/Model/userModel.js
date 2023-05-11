const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

userSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("userName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
