import React, { Fragment } from "react";
import styled from "styled-components";
import { Timeline, Event } from "./TimeLine/Timeline";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <PictureStyle>
      <div>
        <div className="top-heading d-flex flex-column align-items-center">
          <h1 className="slogan-container">
            LOST ON CAMPUS <br /> FOUND ONLINE:
            <br /> BRINGING BELONGINGS
            <br /> BACK TO YOU
          </h1>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <Link to="/lost" className="btn btn-primary mx-3 py-2 px-3">
              Lost Something?
            </Link>
            <Link to="/found" className="btn btn-primary mx-3 py-2">
              Found Something?
            </Link>
          </div>
        </div>
        <div className="bg-white content">
          <div className="container">
            <div className="row justify-content-between lost-item-content">
              <div className="col-12 col-md-6 my-2">
                <h2>Lost an Item?</h2>
                <Fragment>
                  <Timeline>
                    <Event interval={"Step 1"} title={"Search For Lost Item"}>
                      First, check the "Found" section for your lost item.
                      Others may have posted items they found but don't own.
                      Start by searching there.
                    </Event>
                    <Event interval={"Step 2"} title={"Create Post"}>
                      If your lost item isn't in the "Found" section, it hasn't
                      been found yet. Head to your profile and create a post in
                      the "Lost Item" tab.
                    </Event>
                    <Event interval={"Step 3"} title={"Wait For Response"}>
                      Now, all that's left to do is wait. If someone finds your
                      item, they may come to the website, locate your post in
                      the "Lost" section, and contact you through your email.
                    </Event>
                    <Event interval={"Step 4"} title={"Delete Post"}>
                      Once you retrieve your lost item, please return to the
                      website and delete the "Lost Item" post you created. This
                      ensures that others won't be misled by outdated
                      information.
                    </Event>
                  </Timeline>
                </Fragment>
              </div>
              <div className="col-12 col-md-6 my-2">
                <h2>Found an Item?</h2>
                <Fragment>
                  <Timeline>
                    <Event interval={"Step 1"} title={"Search For Found Item"}>
                      First, check the 'Lost' section for the item you found.
                      Others may have posted items they lost but can't find.
                      Start by searching there.
                    </Event>
                    <Event interval={"Step 2"} title={"Create Post"}>
                      If the item you found isn't in the "Lost" section. Head to
                      your profile and create a post in the "Found Item" tab.
                    </Event>
                    <Event interval={"Step 3"} title={"Wait For Response"}>
                      Now, all that's left to do is wait. If someone is looking
                      for their item, they may come to the website, locate your
                      post in the 'Found' section, and contact you through your
                      email.
                    </Event>
                    <Event interval={"Step 4"} title={"Delete Post"}>
                      Once you have returned the item you found, please return
                      to the website and delete the "Found Item" post you
                      created. This ensures that others won't be misled by
                      outdated information.
                    </Event>
                  </Timeline>
                </Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PictureStyle>
  );
}

const PictureStyle = styled.section`
  h1 {
    font-size: 3.5em;
    font-weight: 600;
  }

  .content {
    padding: 2rem 0 !important;
  }

  .top-heading {
    margin: 2rem 0 5rem 0;
  }

  .slogan-container {
    text-align: center !important;
    margin: 2rem 0px 2rem 0px;
    color: #35363a;
  }

  .content-container {
    display: flex;
    justify-content: space-between;
  }

  .directions-container {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5em;
      font-weight: 600;
    }

    .top-heading {
      margin: 1rem 0 3rem 0;
    }

    .btn {
      font-size: 0.8rem;
    }
  }
`;

export default Hero;
