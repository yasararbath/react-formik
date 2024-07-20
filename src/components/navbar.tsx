import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../Api/useUser";
import { getUser } from "../services/Auth.services";

const Navbar = () => {
  const { user, fetchUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
        navigate("/login"); // Redirect to "/login" on error
      }
    };

    fetchData();
  }, [fetchUser, navigate]);

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header" data-logobg="skin6">
          <span className="navbar-brand">
            <span className="logo-text text-dark">
              <h1>Dashboard</h1>
            </span>
          </span>
        </div>

        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContent"
          data-navbarbg="skin5"
        >
          <ul className="navbar-nav me-auto mt-md-0">
            <li className="nav-item hidden-sm-down"></li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              {isLoading ? (
                <span>Loading...</span>
              ) : error ? (
                <span>Error: {error.message}</span>
              ) : (
                <Link
                  to={"/user"}
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                >
                  {user ? user.username : "Markarn Doe"}
                </Link>
              )}
              <ul
                className="dropdown-menu show"
                aria-labelledby="navbarDropdown"
              ></ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
