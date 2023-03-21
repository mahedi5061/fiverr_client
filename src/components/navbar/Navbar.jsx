import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utils/cookies";
import httpRequest from "../../utils/httpRequest";
import "./Navbar.scss";
const Navbar = () => {
  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navbarActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", navbarActive);
    return () => {
      window.removeEventListener("scroll", navbarActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await httpRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      deleteCookie("accessToken");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>fiverr business</span>
          <span>explore</span>
          <span>english</span>
          {!currentUser?.isSeller && <span>become a seller</span>}
          {!currentUser && (
            <Link to="/login" className="link">
              <span>sing in</span>
            </Link>
          )}
          {!currentUser && (
            <Link to="/login">
              <button>join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "./images/noavatar.jpg"} alt="" />
              <span>{currentUser?.usename}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/addNewGig" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link to="/" className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link">Graphics & Design</Link>
            <Link className="link">Digital Marketing</Link>
            <Link className="link">Writing & Translation</Link>
            <Link className="link">Video & Animation</Link>
            <Link className="link">Music & Audio</Link>
            <Link className="link">Programming & Tech</Link>
            <Link className="link">Business</Link>
            <Link className="link">Life Style</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
