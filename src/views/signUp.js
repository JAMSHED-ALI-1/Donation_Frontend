import React, { useState } from "react";
import axios from "axios";

const SignUp = ({ buttonText = "Sign Up" }) => {
  // Initial state for form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    setError(null); // Reset any previous errors
    setSuccessMessage(null); // Reset any previous success message

    try {
      const response = await axios.post("http://localhost:3000/api/users/", formState, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Set success message
      setSuccessMessage("Sign up successful! You can now go back to the homepage.");
    } catch (e) {
      // Handle errors
      setError(e.response?.data?.message || e.message || "Something went wrong during sign up.");
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

                <button type="submit" className="btn btn-primary w-100">
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
