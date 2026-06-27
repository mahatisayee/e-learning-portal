import "./myenrollments.css";
import { useEffect,useState } from "react";

const MyEnrollments = () => {
  const [courses,setCourses]=useState([]);
 const token=localStorage.getItem('token');

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `${API_URL}/enrollments/myCourses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setCourses(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCourses();
},[]);
  // const courses = [
  //   {
  //     _id: 1,
  //     title: "MERN Stack Bootcamp",
  //     instructor: "John Doe",
  //     enrolledAt: "June 15, 2026",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  //   },
  //   {
  //     _id: 2,
  //     title: "DSA Masterclass",
  //     instructor: "Jane Smith",
  //     enrolledAt: "June 18, 2026",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  //   },
  // ];

  return (
    <div className="enrollments-page">
      <div className="enrollments-hero">
        <div>
          <h1 className="enrollments-hero-title">
            Continue Learning
          </h1>

          <p className="enrollments-hero-subtitle">
            Pick up where you left off and keep building your skills.
          </p>
        </div>

        <div className="enrollments-hero-stat">
          {courses.length} Courses Enrolled
        </div>
      </div>

      <div className="enrollments-course-list">
        {courses.map((course) => (
          <div
            key={course._id}
            className="enrollments-course-card"
          >
            <img
              src={course.image}
              alt={course.title}
              className="enrollments-course-image"
            />

            <div className="enrollments-course-info">
              <span className="enrollments-course-tag">
                Enrolled
              </span>

              <h2 className="enrollments-course-title">
                {course.title}
              </h2>

              <p className="enrollments-course-meta">
                Instructor: {course.instructor}
              </p>

              <p className="enrollments-course-meta">
                Enrolled on: {course.enrolledAt}
              </p>

              <button className="enrollments-continue-btn">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollments;