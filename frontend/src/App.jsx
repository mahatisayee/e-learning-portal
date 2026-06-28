import {Routes,Route} from 'react-router';
import './App.css';
import { Navigate } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Homepage from './pages/homepage';
import CourseDetails from './pages/coursedetails';
import MyEnrollments from './pages/myenrollments';
import CourseReviews from './components/courseReviews';

function App() {
  return (
    <div className="App">
    <Routes>
    {/* <Route index element={<Login />} /> */}
     <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login/>}   />
    <Route path="/homepage" element={<Homepage/>}/>
    <Route path="/courses/:id" element={<CourseDetails />}/>
    <Route path="/myenrollments" element={<MyEnrollments/>}/>
    <Route path="/comments" element={<CourseReviews/>}/>
   </Routes>
    </div>
  );
}

export default App;
