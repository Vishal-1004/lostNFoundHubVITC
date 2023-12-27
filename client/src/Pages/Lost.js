import React, { useEffect, useState } from "react";
import {
  getAllLostItemsPosted,
  userData,
  deleteLostPost,
} from "../Services/Apis";
import moment from "moment";

const Lost = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("Old");
  const [admin, setAdmin] = useState(false);

  const [spinner, setSpinner] = useState(false);
  const [lostItemsData, setLostItemsData] = useState([]);

  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  useEffect(() => {
    const fetchLostItemsData = async () => {
      try {
        setSpinner(true);
        const response = await getAllLostItemsPosted({ search: search });
        //console.log(response);
        setSpinner(false);
        setLostItemsData(response.data);
      } catch (error) {
        alert("Error in fetching data");
        console.error("Error in fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchLostItemsData();
    }
  }, [search, isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        if (getUserData.status === 200) {
          setAdmin(getUserData.data.data.isAdmin);
          //console.log("User is admin : ", admin);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description + "...";
  }

  const handleDeletePost = async (postId) => {
    try {
      const response = await deleteLostPost({ postId });

      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
      alert("Some error occurred while deleting, please try later");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Lost Items</h1>
      <div className="my-2 d-flex justify-content-between align-items-center">
        <select
          id="exampleFormControlSelect"
          aria-label="Select Day Scholar or Hosteller"
          name="sortingorder"
          className="text-muted"
          style={{ padding: "6px 8px" }}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="Old">Oldest First</option>
          <option value="New">Newest First</option>
        </select>
        <input
          type="text"
          className="mx-2"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Title"
          style={{ padding: "6px 5px", width: "150px" }}
        />
      </div>
      <div className="row" style={{ margin: "auto" }}>
        {spinner ? (
          <>
            Loading
            <div className="spinner-border text-center" role="status">
              <span className="sr-only"></span>
            </div>
          </>
        ) : lostItemsData?.length === 0 ? (
          <h3 className="text-center">Nothing To Display</h3>
        ) : (
          lostItemsData
            ?.slice()
            .sort((a, b) => (order === "Old" ? 1 : -1))
            .map((element, index) => (
              <>
                <div
                  className="card mx-3 mt-3"
                  key={index}
                  style={{ width: "18rem", height: "28rem" }}
                >
                  <div className="profileImg my-2 d-flex justify-content-start align-items-center">
                    <img
                      src={
                        element.userProfileImgPath
                          ? element.userProfileImgPath
                          : "./images/profileDefault.png"
                      }
                      className="rounded-circle"
                      style={{
                        height: "30px",
                        width: "30px",
                        objectFit: "cover",
                        border: "1px solid black",
                      }}
                      alt={index}
                    />
                    <div
                      className="d-flex justify-content-center flex-column"
                      style={{ marginLeft: "10px" }}
                    >
                      <text style={{ fontSize: "14px" }}>
                        {element.userName}
                      </text>
                      <text className="text-muted" style={{ fontSize: "10px" }}>
                        {element.userEmail}
                      </text>
                    </div>
                  </div>
                  <img
                    src={element.itemImgPath}
                    style={{ objectFit: "cover", height: "50%" }}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">
                      {truncateDescription(element.description, 50)}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-outline-primary"
                        style={{ fontSize: "14px" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModalGlobalLost${index}`}
                      >
                        View Details
                      </button>
                      {admin ? (
                        <button
                          className="btn px-4 btn-outline-danger"
                          style={{ fontSize: "14px" }}
                          onClick={() => handleDeletePost(element._id)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  key={`1.${index}`}
                  id={`exampleModalGlobalLost${index}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModal4Title">
                          {element.title}
                        </h5>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-12 col-md-5 col-lg-4">
                            <img
                              src={element.itemImgPath}
                              alt="Earbuds"
                              className="img-fluid"
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div className="col-7">
                            <h5>Description</h5>
                            <p className="text-muted">{element.description}</p>
                            <h6 className="text-dark ">
                              Posted By:
                              <span className="ps-2 text-muted">
                                {element.userName}
                              </span>
                            </h6>
                            <h6 className="text-dark ">
                              Email ID:
                              <span className="ps-3 text-muted">
                                {element.userEmail}
                              </span>
                            </h6>
                            <h6 className="text-dark ">
                              Lost on Date:
                              <span className="ps-2 text-muted">
                                {moment(element.date).format("L")}
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
        )}
      </div>
    </div>
  );
};

export default Lost;
