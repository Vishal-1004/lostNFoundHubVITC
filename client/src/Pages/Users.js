import React, { useEffect, useState } from "react";
import { toggleBlockUser, getAllUsersData } from "../Services/Apis";

const Users = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [search, setSearch] = useState("");
  const [spinner, setSpinner] = useState(false);

  const isLoggedIn = sessionStorage.getItem("loggedIn");
  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        setSpinner(true);
        const response = await getAllUsersData({ search: search });
        //console.log(response);
        setSpinner(false);
        setAllUsersData(response.data);
      } catch (error) {
        alert("Error in fetching data");
        console.error("Error in fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchAllUsersData();
    }
  }, [search, isLoggedIn]);

  const handleToggleBlockClick = async (userId) => {
    try {
      const response = await toggleBlockUser({ userId });
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert("Some error occurred, while blocking user");
      }
    } catch (error) {
      console.error("Error in blocking user:", error);
      alert("Some error occurred, while blocking user");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">All Users Data</h1>
      <div className="my-2 d-flex justify-content-end align-items-center">
        <input
          type="text"
          className="mx-2"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Name"
          style={{ padding: "6px 5px", width: "150px" }}
        />
      </div>
      {spinner ? (
        <>
          Loading
          <div className="spinner-border text-center" role="status">
            <span className="sr-only"></span>
          </div>
        </>
      ) : allUsersData?.length === 0 ? (
        <h3 className="text-center">Nothing To Display</h3>
      ) : (
        <table className="table my-3">
          <thead>
            <tr>
              <th scope="col">Sno.</th>
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsersData?.map((element, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={
                      element.profileImgPath
                        ? element.profileImgPath
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
                </td>
                <td>{element.fname}</td>
                <td>{element.email}</td>
                <td>
                  {element.isAdmin ? (
                    <button className="btn btn-warning">Admin</button>
                  ) : element.isBlocked ? (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleToggleBlockClick(element._id)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleToggleBlockClick(element._id)}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
