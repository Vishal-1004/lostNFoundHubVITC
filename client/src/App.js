import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Lost from "./Pages/Lost";
import Found from "./Pages/Found";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollTop from "./Components/ScrollToTop/ScrollTop";
import BackToTop from "./Components/ScrollToTop/ScrollButton";
import Terms from "./Pages/SupportPages/Terms";
import PrivacyPolicy from "./Pages/SupportPages/PrivacyPolicy";
import Faq from "./Pages/SupportPages/Faq";
import { useEffect, useState } from "react";
import { userData } from "./Services/Apis";
import Users from "./Pages/Users";

function App() {
  const [admin, setAdmin] = useState(false);
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  const userToken = sessionStorage.getItem("userdbtoken");

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
  return (
    <>
      <Router>
        <ScrollTop />
        {isLoggedIn ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/lost" element={isLoggedIn ? <Lost /> : <Login />} />
          <Route path="/found" element={isLoggedIn ? <Found /> : <Login />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route
            path="/register"
            element={isLoggedIn ? <Home /> : <Register />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Login />}
          />
          <Route
            path="/allusers"
            element={isLoggedIn ? admin ? <Users /> : <Home /> : <Login />}
          />
          <Route
            path="/terms&condition"
            element={isLoggedIn ? <Terms /> : <Login />}
          />
          <Route
            path="/privacypolicy"
            element={isLoggedIn ? <PrivacyPolicy /> : <Login />}
          />
          <Route path="/faq" element={isLoggedIn ? <Faq /> : <Login />} />
        </Routes>
        {isLoggedIn ? <Footer /> : null}
        <BackToTop />
      </Router>
    </>
  );
}

export default App;
