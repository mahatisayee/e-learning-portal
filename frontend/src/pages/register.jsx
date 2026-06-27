import {useState} from 'react';
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register=()=>{


const [name, setname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role,setRole]=useState("student");
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting...");

  try {
    console.log({
  name,
  email,
  password,
  role
});
    const response = await fetch(
      "http://localhost:5000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Data:", data);
   if (response.ok) {
  localStorage.setItem("token", data.token);
  navigate('/homepage');
}

  } catch (err) {
    console.error(err);
  }
};

return(
  <div className='bg-login'>
<div className="register-card">
  <h3>Create Account</h3>

  <p>
    Join thousands of learners and start
    exploring courses today.
  </p>

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Username"
      value={name}
      onChange={(e) => setname(e.target.value)}
    />

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

    <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
   >
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>
    <button type="submit">
      Create Account
    </button>
  </form>

 <p>
  Already have an account?{" "}
  <Link to="/login">Sign In</Link>
</p>
</div>
  </div>

    );
   
}
export default Register;