import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import {
  removeProfilePic,
  updateUserCred,
  userData,
  userProfileUpdate,
} from "../Services/Apis";
import Lost from "../Components/Lost";
import Found from "../Components/Found";

export default function ProfilePage() {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");

  const [normalSpinner, setNormalSpinner] = useState(false);
  const [updateProfileSpiner, setUpdateProfileSpiner] = useState(false);
  const [iconsActive, setIconsActive] = useState("tab1");

  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNormalSpinner(true);
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        setData(getUserData.data.data);
        setNormalSpinner(false);
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

  const [updateData, setUpdateData] = useState({
    newhostelOrDayScholar: "",
    newpassword: "",
    reEnterPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleUserCredClick = async (e) => {
    e.preventDefault();

    const { newhostelOrDayScholar, newpassword, reEnterPassword } = updateData;

    let dataToSend = {};
    if (newpassword.length !== 0) {
      if (newpassword !== reEnterPassword) {
        return alert("Password & Re-entered Password should be same");
      } else {
        if (newpassword.length < 6) {
          return alert("Password should be atleast of 6 character");
        } else {
          if (newhostelOrDayScholar !== "None") {
            dataToSend = {
              newpassword,
              newhostelOrDayScholar,
              userId: data._id,
            };
          } else {
            dataToSend = { newpassword, userId: data._id };
          }
        }
      }
    } else {
      if (newhostelOrDayScholar !== "None") {
        dataToSend = { newhostelOrDayScholar, userId: data._id };
      } else {
        return alert("Enter something to update");
      }
    }

    const response = await updateUserCred(dataToSend);
    if (response.status === 200) {
      //console.log(response);
      alert("Credentails Updated Successfully");
      setUpdateData({
        newhostelOrDayScholar: "",
        newpassword: "",
        reEnterPassword: "",
      });
      window.location.reload();
    } else {
      //console.log(response);
      alert("Some Error Occurred");
      setUpdateData({
        newhostelOrDayScholar: "",
        newpassword: "",
        reEnterPassword: "",
      });
    }
  };

  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }
    setIconsActive(value);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Choose An Image");
    } else {
      setUpdateProfileSpiner(true);
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("userId", data._id);

      try {
        const response = await userProfileUpdate(formData);

        if (response.status === 200) {
          setUpdateProfileSpiner(false);
          alert("Profile Updated successfully");
          console.log(response);
          window.location.reload();
        } else {
          setUpdateProfileSpiner(false);
          alert("Some error occurred");
          console.log(response);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Some error occurred");
      }
    }
  };

  const handleRemoveProfilePicClick = async (e) => {
    e.preventDefault();

    try {
      const response = await removeProfilePic({ userId: data._id });

      if (response.status === 200) {
        alert("Profile Picture Removed");
        window.location.reload();
      } else {
        alert("Some error occurred, please try later");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Some error occurred");
    }
  };

  return (
    <section>
      <MDBContainer className="py-3">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {normalSpinner ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  <MDBCardImage
                    src={
                      data.profileImgPath
                        ? data.profileImgPath
                        : "./images/profileDefault.png"
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      height: "150px",
                      width: "150px",
                      objectFit: "cover",
                    }}
                    fluid
                  />
                )}
                <p className="text-muted mb-1">Hello {data.fname}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal222"
                  >
                    Edit Credential
                  </button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data.fname}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Registration No.</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data.regNo}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Dayscholar/Hosteler</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data.hostelOrDayScholar}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBTabs fill className="container">
        <MDBTabsItem>
          <MDBTabsLink
            className="d-flex justify-content-center align-items-center"
            onClick={() => handleIconsClick("tab1")}
            active={iconsActive === "tab1"}
          >
            <MDBIcon className="me-2" />
            Lost Items
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            className="d-flex justify-content-center align-items-center"
            onClick={() => handleIconsClick("tab2")}
            active={iconsActive === "tab2"}
          >
            <MDBIcon className="me-2" />
            Found Items
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className="container">
        <MDBTabsPane open={iconsActive === "tab1"}>
          <Lost />
        </MDBTabsPane>
        <MDBTabsPane open={iconsActive === "tab2"}>
          <Found />
        </MDBTabsPane>
      </MDBTabsContent>
      {/* given below is the structure of a model which opens when user clicks on "Edit Profile" button */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Profile Picture
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label"
                >
                  Choose Profile Picture
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Choose Image"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="modal-footer">
              {data.profileImgPath ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleRemoveProfilePicClick}
                >
                  Remove Picture
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateClick}
              >
                Save changes
                {updateProfileSpiner ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal222"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Credentials
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Day Scholar / Hosteler
                </label>
                <select
                  className="form-select"
                  id="exampleFormControlSelect"
                  aria-label="Select Day Scholar or Hosteller"
                  name="newhostelOrDayScholar"
                  value={updateData.newhostelOrDayScholar}
                  onChange={handleChange}
                >
                  <option value="None">Select One</option>
                  <option value="Day Scholoar">Day Scholar</option>
                  <option value="Hosteler">Hosteler</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput22"
                  className="form-label"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput22"
                  placeholder="Password"
                  name="newpassword"
                  value={updateData.newpassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput3"
                  className="form-label"
                >
                  Re-Enter Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Re-Enter Password"
                  name="reEnterPassword"
                  value={updateData.reEnterPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUserCredClick}
              >
                Save changes
                {updateProfileSpiner ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
