import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  setSearch,
  searchInput,
  setSearchInput,
}) => {
 
 const navigate = useNavigate();
 const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
   const token = localStorage.getItem("token"); 

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">E-Portal</div>
      </div>

      <div className="nav-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-bar-input"
          placeholder="Search courses..."
        />

        {/* Search only when button clicked */}
        <button onClick={() => setSearch(searchInput)}>
          Search
        </button>
      </div>

      <div className="nav-right">
        {token ? (
          <button  onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button  onClick={() => navigate("/register")}> Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;