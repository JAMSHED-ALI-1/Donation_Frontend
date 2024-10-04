/* eslint-disable no-unused-vars */
import { Form, Row, Col, Button, Stack, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CompainNewsApply = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    imageUrl: "", // Store the base64 string here
    category: "",
    url: "",
    fundingNeeded: "",
  });

  const [categories, setCategories] = useState([]); 

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    // Submit the form data to the backend
    handleApi();
    // Alert('Succefuly Post')
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);

    if (name === "fundingNeeded") {
      value = parseInt(value, 10);
      if (isNaN(value)) value = 0;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState({
          ...formState,
          imageUrl: reader.result, 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApi = async () => {
    try {
      const formData = {
        title: formState.title,
        content: formState.content,
        imageUrl: 'https://images.theconversation.com/files/622009/original/file-20240926-18-1lm34b.jpg?ixlib=rb-4.1.0&rect=309%2C1956%2C4514%2C2257&q=45&auto=format&w=1356&h=668&fit=crop', // Using base64 image string
        category: formState.category,
        url: formState.url,
        fundingNeeded: formState.fundingNeeded,
      };

      const response = await axios.post(
        "http://localhost:5000/api/news/addNews",
        formData
      );

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
    }
  };

  // Fetch categories from the API
  const handleCategory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/getAllCat');
      console.log(response);
      setCategories(response.data.data); // Assuming the API response has a categories field
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleCategory(); // Fetch categories when the component mounts
  }, []);

  return (
    <>
      <div>
        <div>
          <Container className="compain-form d-flex flex-column justify-center align-center mt-5">
            <Container className="header d-flex flex-column justify-content-start align-content-start p-3 w-20">
              <h1 className="py-1 ">Post For Campaign</h1>
            </Container>
            <Form onSubmit={handleFormSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={formState.title}
                    onChange={handleChange}
                    name="title"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={formState.content}
                    onChange={handleChange}
                    name="content"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridUploadImage">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange} // handle file change separately
                    name="uploadImage"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formState.category}
                    onChange={handleChange}
                    name="category"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridUrl">
                  <Form.Label>URL for News</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter News URL"
                    value={formState.url}
                    onChange={handleChange}
                    name="url"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFunding">
                  <Form.Label>Funding Needed</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Funding Needed (e.g. $12,000)"
                    value={formState.fundingNeeded}
                    onChange={handleChange}
                    name="fundingNeeded"
                  />
                </Form.Group>
              </Row>

              <Stack className="col-md-5 p-2 m-2 mx-auto">
                <Button variant="primary" type="submit">
                  Create Campaign
                </Button>
              </Stack>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CompainNewsApply;
