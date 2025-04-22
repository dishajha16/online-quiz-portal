// import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../UIElements/LoadingSpinner";
// import { Link, Route } from "react-router-dom";

// import "./Login.css";
// const Login = () => {
//   const navigate = useNavigate();
//   const adminID = process.env.REACT_APP_ADMIN_ID;
//   const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

//   console.log(adminID, adminPassword);
//   const [email, setEmail] = useState("");
//   const [password, setPasword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const [errortxt, setErrortxt] = useState();
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   //const [isModalOpen, setIsModalOpen] = useState(false);
//   //const [errorMessage, setErrorMessage] = useState('');

//   const inputHandler1 = (event) => {
//     setEmail(event.target.value);
//   };
//   const inputHandler2 = (event) => {
//     setPasword(event.target.value);
//   };
  
//   return (
//     <div>
//       <main className="form-signin">
//         <form onSubmit={"authSubmitHandler"}>
//           <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

//           <div className="form-floating">
//             <input
//               type="email"
//               className="form-control"
//               id="floatingInput"
//               placeholder="name@example.com"
//               onInput={inputHandler1}
//             />
//             <label htmlFor="floatingInput">Email address</label>
//           </div>
//           <div className="form-floating">
//             <input
//               type="password"
//               className="form-control"
//               id="floatingPassword"
//               placeholder="Password"
//               onInput={inputHandler2}
//             />
//             <label htmlFor="floatingPassword">Password</label>
//           </div>

//           <Link to={"/admin/dashbord"}>
//             <button className="w-100 btn btn-lg btn-primary" type="submit">
//               Sign in
//             </button>
//           </Link>
//           <p className="mt-5 mb-3 text-muted">&copy; 2025–2026</p>
//         </form>
//       </main>

//       {isLoading && <LoadingSpinner asOverlay />}

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Error Message</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{errortxt}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };
// export default Login;


//........................................................

// original


import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const adminID = process.env.REACT_APP_ADMIN_ID;
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errortxt, setErrortxt] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //const authSubmitHandler = async (event) => {
  //  event.preventDefault();
  //  setIsLoading(true); // Start loading
//
  //  try {
  //    const response = await fetch("http://localhost:5001/api/users/login", {
  //      method: "POST",
  //      headers: { "Content-Type": "application/json" },
  //      body: JSON.stringify({ email, password }),
  //    });
//
  //    const data = await response.json();
//
  //    if (response.ok) {
  //      localStorage.setItem("adminToken", data.token);
  //      navigate("/Admin/Dashboard");
  //    } else {
  //      setErrortxt(data.message || "Login failed.");
  //      handleShow();
  //    }
  //  } catch (error) {
  //    setErrortxt("Server error.");
  //    handleShow();
  //  } finally {
  //    setIsLoading(false); // Stop loading
  //  }
  //};

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
  
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Login Response Data:", data); 
  
      //if (response.ok) {
      //  localStorage.setItem("adminToken", data.token);
  //
      //  // ✅ Explicitly check if user is admin before redirecting
      //  if (data.user && data.user.role === "admin") {
      //    navigate("admin/dashboard");
      //  } else {
      //    setErrortxt("Access Denied: Not an admin.");
      //    handleShow();
      //  }
      //} else {
      //  setErrortxt(data.message || "Login failed.");
      //  handleShow();
      //}
      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
      
        // ✅ Explicitly check if user is admin before redirecting
        if (data.user && data.user.role === "admin") {
          console.log("Redirecting to Admin Dashboard...");
      
          setTimeout(() => {
            window.location.replace("/admin/dashbord");   // ✅ Ensure correct casing
          }, 100);  // Small delay for smoother redirection
      
        } else {
          setErrortxt("Access Denied: Not an admin.");
          handleShow();
        }
      } else {
        setErrortxt(data.message || "Login failed.");
        handleShow();
      }      
    } catch (error) {
      setErrortxt("Server error.");
      handleShow();
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  

  return (
    <div>
      <main className="form-signin">
        <form onSubmit={authSubmitHandler}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Sign in"}
          </button>

          <p className="mt-5 mb-3 text-muted">&copy; 2025–2026</p>
        </form>
      </main>

      {isLoading && <LoadingSpinner asOverlay />}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errortxt}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
