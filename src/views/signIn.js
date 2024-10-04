/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"; // Import necessary Bootstrap components
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true); // Start loading state
  
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
  
      const data = await response.json();
      console.log(data); // Log the full response for debugging
      setLoading(false); // End loading state
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
  
      // Assuming the API returns the user data correctly
      localStorage.setItem("user", JSON.stringify(data)); // Store user info
      // localStorage.setItem("token", data.token); // Store token
      setSuccess(true); // Show success message
      navigate("/dashboard");
      console.log('User stored in localStorage:', localStorage.getItem("user"));
    } catch (e) {
      setLoading(false); // End loading state in case of error
      setError(e.message); // Set error message
    }
  
    // Clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="signin-card p-4 shadow-lg rounded">
            <h2 className="text-center mb-4">Sign In</h2>
            {success ? (
              <Alert variant="success" className="text-center">
                Success! You may now head <Link to="/">back to the homepage</Link>.
              </Alert>
            ) : (
              <>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </Form>
                <p className="text-center mt-3">
                  <small className="text-muted">
                    Don't have an account? <Link to="/signup">Sign Up</Link>.
                  </small>
                </p>
              </>
            )}

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
