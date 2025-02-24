import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background-color: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 320px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1em;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    contact: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    setError("");
    alert("Sign-up successful!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <Input 
  type="tel" 
  name="contact" 
  placeholder="Contact Number" 
  value={formData.contact} 
  onChange={(e) => {
    const numericValue = e.target.value.replace(/\D/, ""); // Remove non-numeric characters
    handleChange({ target: { name: "contact", value: numericValue } });
  }} 
  required 
/>

        <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        {error && <Error>{error}</Error>}
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}

export default Signup;
