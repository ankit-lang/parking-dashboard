import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { clearUser } from "../reducers/userReducer";
import {Instagram, Github, Linkedin, Mail} from "lucide-react";
import '../css/layout.scss';

const Layout = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    };

    useEffect(() => {
        console.log('user ', user);
        if (!user && location.pathname !== '/' && location.pathname !== '/about') {
            navigate('/login')
        }
    }, [user, location])

    return (
        <div className="main-container">
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-info" to="/">
          SwiftyPark
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3 py-2" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 py-2" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 py-2" to="/parking">
                Parking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 py-2" to="/space">
                Spaces
              </Link>
            </li>

            {/* Conditional Links for non-seekers */}
            {user?.type !== "seeker" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3 py-2" to="/parkingForm">
                    Create Parking
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 py-2" to="/spaceForm">
                    Create Space
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link px-3 py-2" to="/booking">
                Bookings
              </Link>
            </li>

            {/* Admin-only Links */}
            {user?.type === "admin" && (
              <li className="nav-item">
                <Link className="nav-link px-3 py-2" to="/users">
                  Users
                </Link>
              </li>
            )}

            {/* User Profile or Login */}
            {user ? (
              <>
                <li className="nav-item ms-2">
                  <Link className="nav-link" to="/profile">
                    <div
                      className="bg-info text-dark rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "38px", height: "38px", fontSize: "16px", fontWeight: "bold" }}
                    >
                      {user?.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <button className="btn btn-outline-info" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-3">
                <Link className="btn btn-outline-info" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>

            <main>
                <Outlet />
            </main>

            <footer className="container-fluid  mt-5">
                <div className="row">
                    
                    <div className="col-md-4">
                    </div>
                   
                </div>
            </footer>
        </div>
    )
};

export default Layout;