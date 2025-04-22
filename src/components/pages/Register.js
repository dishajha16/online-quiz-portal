import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
const Register = () => {

  const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const [errortxt, setErrortxt] = useState();
    const [show, setShow] = useState(false);
    const inputName =(event)=>{
      setName(event.target.value);
        }
        const inputEmail =(event)=>{
          setEmail(event.target.value);
            }
            const inputPassword =(event)=>{
              setPassword(event.target.value);
                }
                
                const registerUser = async (event) => {
                  event.preventDefault();
                  setIsLoading(true);
                  try {
                    console.log("password: " + password);
                    const response = await axios.post('http://localhost:5001/api/users/register',
                      { name, email, password }
                    );
                    
                    // If registration successful
                    navigate("/");
                    localStorage.setItem("student", JSON.stringify(response.data));
                    console.log(localStorage.getItem("student"));
                    window.alert("User registered successfully!");
                  } catch (error) {
                    // Handle error response
                    if (error.response && error.response.data) {
                      // If the server sends a specific error message
                      window.alert("User already exists! Please Login");
                      setErrortxt(error.response.data.message || "Registration failed");
                      console.log(error.response.data.message);
                    } else {
                      // Generic error
                      setErrortxt("Registration failed. Please try again.");
                      alert("User already exists! Please Login");
                      console.log(error);
                      window.alert("User already exists! Please Login");
                    }
                    // Show error message
                    setShow(true);
                  } finally {
                    setIsLoading(false);
                  }
                }
  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center text-success">Register</h2>
        <form onSubmit={registerUser}>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={inputName}
              type="text"
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={inputEmail}
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
            onChange={inputPassword}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
