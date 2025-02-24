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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
`;

const CreateAccount = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.username !== formData.username || storedUser.password !== formData.password) {
      setError("Invalid username or password!");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <Button type="submit">Login</Button>

        {/* Create New Account Button (Now Redirects to /signup) */}
        <CreateAccount>
          Don't have an account?{" "}
          <LinkButton onClick={() => navigate("/signup")}>Create New Account</LinkButton>
        </CreateAccount>
      </Form>
    </Container>
  );
}

export default Login;
