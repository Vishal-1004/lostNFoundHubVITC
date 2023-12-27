import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userData } from "../Services/Apis";

export default function ContactUs() {
  const [data, setData] = useState({});

  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        setData(getUserData.data.data);
        //console.log("User data is: ", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);
  return (
    <ContactUsStyle>
      <div className="container py-4">
        <div className="my-4">
          <h1>Contact Us</h1>
          <hr style={{ border: "1px solid #0c0c0c" }} />
        </div>
        <div className="row sec_sp">
          <div lg="5" className="col-12 col-md-6">
            <h3 className="color_sec py-4">Report An Issue</h3>
            <address>
              <strong>Email:</strong>
              <span>&nbsp;&nbsp;lostNFoundHubVITC@gmail.com</span>
              <br />
            </address>
            <p>
              Thank you for reaching out to us! Your inquiries, feedback, and
              suggestions are invaluable to us. The 'Contact Us' section
              reflects our commitment to open communication and continuous
              improvement. We appreciate your engagement and look forward to
              assisting you promptly. Feel free to share your thoughts, and
              we'll get back to you as soon as possible.
            </p>
          </div>
          <div lg="7" className="col-12 col-md-6 d-flex align-items-center">
            <form
              className="contact__form w-100"
              action="https://formspree.io/f/xnqeaeon"
              method="POST"
            >
              <div className="row">
                <div lg="6" className="col form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    value={data.fname}
                    placeholder="Name"
                    type="text"
                    required
                    readOnly
                  />
                </div>
                <div lg="6" className="col form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    value={data.email}
                    placeholder="Email"
                    type="email"
                    required
                    readOnly
                  />
                </div>
              </div>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                required
              ></textarea>
              <br />
              <div className="row">
                <div lg="12" className="col form-group">
                  <button className="btn btn-primary" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ContactUsStyle>
  );
}

const ContactUsStyle = styled.section`
  .contact__form .form-control {
    padding: 1.375rem 0.75rem;
    line-height: 1.5;
    background-color: inherit;
    border-radius: 0 !important;
    border: 1px solid #0c0c0c;
  }

  .contact__form input.form-control {
    margin-bottom: 2em;
    height: calc(2.5em + 0.75rem + 2px);
  }
`;
