import {useState} from 'react';
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login=()=>{
const API = import.meta.env.VITE_API_URL;
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
//function to fetch data from backend
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting...");

  try {
    const response = await fetch(
      `${API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Data:", data);
   if (response.ok) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  navigate('/homepage')
}

  } catch (err) {
    console.error(err);
  }
};
//The components on the page
return(
  <div className='bg-login'>
<div className="register-card">
  <h3 className="h3">Welcome Back</h3>

  <p>
   Continue your learning journey
  </p>

  <form onSubmit={handleSubmit}>

    <input
      type="email"
      placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
        value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

   
    <button type="submit" >Login</button>
  </form>

 <p>
 Don't have an account?{" "}
  <Link to="/register">Sign Up</Link>
</p>
</div>
  </div>

    );
   
}
export default Login;