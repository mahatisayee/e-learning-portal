// import './coursecard.css'
// import {Link} from 'react-router-dom'
// const CourseCard = ({course}) => {
//   return (
//     <Link to={`/courses/${course._id}`}>
//     <div className="course-card">
//       <img
//         src={course.image}

//       />

//       <h4>{course.title}</h4>

//       <p>{course.instructor}</p>

//       <p>⭐ {course.averageRating} • {course.enrolledStudents} students</p>
//     </div>
//     </Link>
//   );
// };
// export default CourseCard;
import "./coursecard.css";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="course-card"
      onClick={() => navigate(`/courses/${course._id}`)}
    >
      <img
        src={course.image}
        alt={course.title}
      />

      <h4>{course.title}</h4>

      <p className="instructor">{course.instructor}</p>

      <p className="rating">
        ⭐ {course.averageRating} • {course.enrolledStudents} students
      </p>
    </div>
  );
};

export default CourseCard;
