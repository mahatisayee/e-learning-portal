import './sidebar.css'

const SideBar=()=>{


    const token = localStorage.getItem("token");
    return(
        <>
    {/* <div className="homepage-content"> */}
     <aside className="sidebar">
    <div className="options" >🏠 Home</div>
      {token ? (
      <>
        <div className="options">📚 My Courses</div>
        <div className="options">💙 Wishlist</div>
        <div className="options">🏆 Certificates</div>
        <div className="options">👤 Profile</div>
      </>
    ) : (
      <>
        <div className="options">📚 Browse Courses</div>
        <div className="options">🔥 Popular Courses</div>
        <div className="options">⭐ Top Rated</div>
      </>
    )}
    </aside>
    
        </>
    );
}
export default SideBar;
