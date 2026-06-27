import express from "express";
import authRoutes from "./routes/authroutes.js";
import courseroutes from "./routes/courseroutes.js";
import connectDB from "./config/db.js";
 import enrollmentRoutes from "./routes/enrollementRoutes.js";
 import reviewRoutes from "./routes/reviewRoutes.js";
 import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";
connectDB();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/courses", courseroutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/reviews", reviewRoutes);
 app.use("/payment",paymentRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running");
});