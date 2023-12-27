import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerfunction } from "../Services/Apis";

const Register = () => {
  const Navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fname: "",
    email: "",
    regNo: "",
    hostelOrDayScholar: "None",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const regNoPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;

    const {
      fname,
      email,
      regNo,
      hostelOrDayScholar,
      password,
      reEnterPassword,
    } = inputData;

    if (
      !fname ||
      !email ||
      !regNo ||
      !hostelOrDayScholar ||
      !password ||
      !reEnterPassword
    ) {
      alert("Enter all input fields");
    } else if (!email.includes("@vitstudent.ac.in") || !email.includes("20")) {
      alert("Enter VIT Chennai Mail ID");
    } else if (!regNoPattern.test(regNo)) {
      alert("Enter a valid registration number");
    } else if (password.length < 6) {
      alert("Password should be minimun of 6 characters");
    } else if (password !== reEnterPassword) {
      alert("Password and Re-Entered Password should be same");
    } else {
      const response = await registerfunction(inputData);

      if (response.status === 200) {
        alert("Registered Successfully");
        setInputData({
          ...inputData,
          fname: "",
          email: "",
          password: "",
          hostelOrDayScholar: "None",
          reEnterPassword: "",
          regNo: "",
        });
        Navigate("/login");
      } else {
        alert("User already exits");
      }
    }
  };

  return (
    <RegisterStyle>
      <div className="App">
        <div className="register">
          <h1>Register</h1>
          <input
            type="text"
            name="fname"
            value={inputData.fname}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <input
            type="text"
            name="regNo"
            value={inputData.regNo}
            onChange={handleChange}
            placeholder="Your Registration Number (Capital)"
          />
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            placeholder="Your College Email"
          />
          <select
            className={
              inputData.hostelOrDayScholar === "None"
                ? "form-select text-muted"
                : "form-select"
            }
            id="exampleFormControlSelect"
            aria-label="Select Day Scholar or Hosteller"
            name="hostelOrDayScholar"
            value={inputData.hostelOrDayScholar}
            onChange={handleChange}
          >
            <option value="None">Select Day Scholar / Hosteler</option>
            <option value="Day Scholoar">Day Scholar</option>
            <option value="Hosteler">Hosteler</option>
          </select>
          <input
            type="password"
            name="password"
            value={inputData.password}
            onChange={handleChange}
            placeholder="Your Password"
          />
          <input
            type="password"
            name="reEnterPassword"
            value={inputData.reEnterPassword}
            onChange={handleChange}
            placeholder="Re-enter Password"
          />
          <div className="button" onClick={handleRegister}>
            Register
          </div>
          <div>or</div>
          <div className="button" onClick={() => Navigate("/login")}>
            Login
          </div>
        </div>
      </div>
    </RegisterStyle>
  );
};

const RegisterStyle = styled.section`
  .App {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
    font-family: Arial, sans-serif;
  }

  .register {
    width: 400px;
    background: #fff;
    border: 1px solid #dddfe2;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    border-radius: 8px;
    padding: 1rem;
    align-items: center;
    text-align: center;
  }

  .register > input {
    border-radius: 8px;
    border: 2px solid #dddfe2;
    outline: none;
    color: #1d2129;
    margin: 0.5rem 0;
    padding: 0.5rem 0.75rem;
    width: 92%;
    font-size: 1rem;
  }

  .register > .button {
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

  .register > select {
    border-radius: 8px;
    border: 2px solid #dddfe2;
    outline: none;
    color: #1d2129;
    margin: 8px 15px;
    width: 92%;
    height: 45px;
  }
`;

export default Register;
