import Enrollment from "../models/enrollment.js";
import Course from "../models/courses.js"
export const enroll = async (req, res) => {
    try {


        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        const existing = await Enrollment.findOne({
            user: req.user.id,
            course: req.params.courseId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "You are already enrolled in this course"
            });
        }
        const relation = await Enrollment.create({
            user: req.user.id,
            course: req.params.courseId
        });
        await Course.findByIdAndUpdate(
            req.params.courseId, {
            $inc: { enrolledStudents: 1 }
        }
        );
        res.status(201).json({
            success: true,
            data: relation
        });
    } catch (error) {
        console.log("ENROLL ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            user: req.user.id
        }).populate("course");

        const courses = enrollments.map(
            enrollment => enrollment.course
        );

        res.status(200).json({
            success: true,
            data: courses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const checkenrollment = async (req, res) => {
    console.log("checking enrollment... ");
    try {
        const existing = await Enrollment.findOne({
            user: req.user.id,
            course: req.params.id
        });

        return res.status(200).json({
            success: true,
            enrolled: !!existing
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};