import Navbar from "../components/navbar.jsx";
// import SideBar from "../components/sidebar.jsx";
import CourseCard from "../components/coursecard.jsx";
import { useEffect, useState } from "react";

import "./homepage.css";

const Homepage = () => {
  const API = import.meta.env.VITE_API_URL;
  const LIMIT = 12;
  const [courses, setCourses] = useState([]);

  // Search box text
  const [searchInput, setSearchInput] = useState("");

  // Actual search query used for API calls
  const [search, setSearch] = useState("");

  // NEW: pagination state
  const [page, setPage] = useState(1);

  // NEW: total pages from backend
  const [totalPages, setTotalPages] = useState(1);

  useEffect( () => {
    const fetchCourses = async () => {
      try {
        // CHANGED: send page and search to backend
       
        const response = await fetch(
          `${API}/courses/getCourses?page=${page}&limit=${LIMIT}&search=${encodeURIComponent(search)}`
        );

        const data = await response.json();

        setCourses(data.courses);

        // NEW: store total pages
        setTotalPages(data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourses();

    // CHANGED: refetch when page or search changes
  }, [page, search]);

  return (
    <div className="App-container">
      <Navbar
        setSearch={setSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="main-content">
        {/* <SideBar /> */}

        <div className="">
          <div className="rt">
             <div className="column-box">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          
          </div>

          </div>

          {/* NEW: Pagination */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;