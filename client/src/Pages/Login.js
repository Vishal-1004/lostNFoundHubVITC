import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginfunction } from "../Services/Apis";

const Login = () => {
  const Navigate = useNavigate();
  const [inputData, setInputData] = useState({ regNo: "", password: "" });
  const [spinner, setSpinner] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { regNo, password } = inputData;

    if (!regNo || !password) {
      alert("Enter all input fields");
    } else {
      setSpinner(true);
      const response = await loginfunction(inputData);

      if (response.status === 200) {
        if (response.data.message === "Blocked") {
          alert(
            "You are blocked by the admin, contact admin at lostNFoundHubVITC@gmail.com"
          );
          setSpinner(false);
          setInputData({ regNo: "", password: "" });
        } else {
          setSpinner(false);
          alert(response.data.message);
          sessionStorage.setItem("userdbtoken", response.data.userToken);
          sessionStorage.setItem("loggedIn", true);
          Navigate("/");
          window.location.reload();
        }
      } else {
        setSpinner(false);
        alert(response.response.data.message);
        setInputData({ regNo: "", password: "" });
      }
    }
  };

  return (
    <LoginStyle>
      <div className="App">
        <div className="login">
          <h1>Login</h1>
          <input
            type="text"
            name="regNo"
            value={inputData.regNo}
            placeholder="Enter your Registration Number"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={inputData.password}
            placeholder="Enter your Password"
            onChange={handleChange}
          />
          <div className="button" onClick={handleLogin}>
            Login
            {spinner ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>or</div>
          <div className="button" onClick={() => Navigate("/register")}>
            Register
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

const LoginStyle = styled.section`
  .App {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
    font-family: Arial, sans-serif;
  }

  .login {
    width: 400px;
    background: #fff;
    border: 1px solid #dddfe2;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    border-radius: 8px;
    padding: 1rem;
    align-items: center;
    text-align: center;
  }

  .login > input {
    border-radius: 8px;
    border: 2px solid #dddfe2;
    outline: none;
    color: #1d2129;
    margin: 0.5rem 0;
    padding: 0.5rem 0.75rem;
    width: 92%;
    font-size: 1rem;
  }

  .login > .button {
    background: #1877f2;
    border: 1px solid #1877f2;
    color: #fff;
    font-size: 1.25rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
  }
`;

export default Login;
