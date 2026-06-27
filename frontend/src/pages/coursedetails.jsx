import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './coursedetails.css';
import { useNavigate } from "react-router-dom";
import CourseReviews from "../components/courseReviews"; 
const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
   const navigate = useNavigate();
   const token=localStorage.getItem("token");
useEffect(() => {
  const checkEnrollment = async () => {
     console.log("Checking enrollment...");
    try {
      const res = await fetch(
        `http://localhost:5000/enrollments/checkenrollment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setEnrolled(data.enrolled);
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    checkEnrollment();
  }
}, [id, token]);

useEffect(() => {
  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/courses/getCourse/${id}`
      );

      const data = await response.json();

      setCourse(data);
    } catch (err) {
      console.log("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCourse();
}, [id]);
  if (loading) return <h2>Loading...</h2>;

  if (!course) return <h2>Course not found</h2>;


// const HandleEnroll = async () => {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/enrollments/enroll/${course._id}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     const data = await response.json();

//    if (response.ok) {
//   setEnrolled(true);
// }else {
//       alert(data.message);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

const HandlePayment=async()=>{
  const res= await fetch("http://localhost:5000/payment/create-order",{
   method:"POST",
   headers:{
     "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
 },
 body: JSON.stringify({
        amount: course.price * 100,
        currency: "INR",
      }),
  }
  );
  
  const order= await res.json();
  console.log(order);
  if (!res.ok) {
  console.log(order);
  alert("Failed to create order");
  return;}
  

    const options = {
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,

    handler: async function (response) {
  console.log(response);

  const verify=await fetch("http://localhost:5000/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...response,
      courseId: course._id,
    }),
  });
  const verification= await verify.json();
  if (!verify.ok) {
  alert(verification.message || "Payment verification failed");
  return;
}

navigate("/myEnrollments");

}
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};



  return (
    <div className="course-details-page">

        <div className="hero">
          <div className="hero-content">
            <h1>{course.title}</h1>

            <p>{course.description}</p>

            <p>Instructor: {course.instructor}</p>

           {
  enrolled ?  (
    <button onClick={() => navigate("/myenrollments")}>
      Resume Course
    </button>
  ) : (
    <button onClick={HandlePayment}>
      Enroll Now for {course.price ? `₹${course.price}` : "free"}
    </button>
  )
}
          </div>
          <img src={course.image} alt={course.title} />
        

       
      </div>
      <div className="stats">
          <div className="box"><img src="/star1.svg" alt="star1"  /> Rated {course.averageRating} by our users</div>
          <div className="box"><img src="/student.svg" alt="student"  /> {course.enrolledStudents} students learning</div>
          <div className="box"><img src="/goal.svg" alt="goal"  /> {course.level} level Course</div>
          <div className="box"><img src="/certificate.svg" alt="certificate"  />Complete {course.duration} of content to earn certification</div>
        </div>

      <div className="learning">
        <h2>What You'll Learn</h2>

        <ul>
          {course.learningOutcomes?.map((item, index) => (
            <li key={index}>✔ {item}</li>
          ))}
        </ul>
      </div>

      <div className="course-reviewss"> <CourseReviews courseId={id}/></div>
    
    </div>
  );
};

export default CourseDetails;