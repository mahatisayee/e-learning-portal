import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  },

  // NEW: Course details
  duration: {
    type: String,
    default: ""
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },

  category: {
    type: String,
    default: ""
  },

  language: {
    type: String,
    default: "English"
  },

  price: {
    type: Number,
    default: 0
  },

  // NEW: What students will learn
  learningOutcomes: [
    {
      type: String
    }
  ],

  enrolledStudents: {
    type: Number,
    default: 0
  },

  averageRating: {
    type: Number,
    default: 0
  },

  reviewCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;

