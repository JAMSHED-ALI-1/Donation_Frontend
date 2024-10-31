import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/Apiurl";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ buttonText = "Sign Up" }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous error
    setSuccessMessage(null); // Clear previous success message
    setLoading(true); // Start loading

    try {
      const res = await axios.post(`${BASE_URL}users/`, formState, {
        headers: {
          "Content-Type": "application/json",
        },
      });
console.log(res)
      setSuccessMessage("Sign up successful! Welcome to the platform.");
      setFormState({ name: "", email: "", password: "" }); // Reset form
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred during sign up.");
      } else {
        setError("Network Error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Signup Form */}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Signing Up...
                    </span>
                  ) : (
                    buttonText
                  )}
                </button>
              </form>
              <p className="text-center mt-3">
                  <small className="text-muted">
                    If You have an account? <Link to="/SignIn">Sign In</Link>.
                  </small>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
