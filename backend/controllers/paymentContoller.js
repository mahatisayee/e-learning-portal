import Razorpay from "razorpay";
import crypto from "crypto";
import Enrollment from "../models/enrollment.js";
import Course from "../models/courses.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const options = req.body;

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error creating order");
        }

        res.json(order);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const verify = async (req, res) =>  {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId,
        } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }
             const course = await Course.findById(courseId);
            
                    if (!course) {
                        return res.status(404).json({
                            success: false,
                            message: "Course not found"
                        });
                    }
                    const existing = await Enrollment.findOne({
                        user: req.user.id,
                        course: courseId
                    });
            
                    if (existing) {
                        return res.status(400).json({
                            success: false,
                            message: "You are already enrolled in this course"
                        });
                    }
                    const relation = await Enrollment.create({
                        user: req.user.id,
                        course: courseId
                    });
                    await Course.findByIdAndUpdate(
                        courseId, {
                        $inc: { enrolledStudents: 1 }
                    }
                    );

            res.json({
                success: true,
                message: "Payment verified",
            });
        


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


