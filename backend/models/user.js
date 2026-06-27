import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
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
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

const User = mongoose.model("User", userSchema);

export default User;


