import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./header.css"; // Import a custom CSS file for styling
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { resetCart } from "../../../../store/slices/cartItems";
import { useDispatch } from "react-redux";


const Header = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/account/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const content = await response.json();
          setUsername(content.username);
        } else {
          // If not authenticated, navigate to the login page
          setUsername(''); // Set username to an empty string
          // navigate('/signin');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  // Log out function
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/account/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        dispatch(resetCart());
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <div className="upperHeader align-items-center bg-dark d-flex justify-content-between p-3">
        <div className="upperHeaderLeft bg-light rounded">
          <h3 className="px-3 py-3 fw-bold">Fast Food Restaurant</h3>
        </div>
        <div className="upperHeaderRight d-flex flex-row">
          {username && (
            <>
              <button
                type="button"
                className="btn bg-danger text-light fs-3 px-3 py-2 me-3 fw-bold"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                type="button"
                className="btn bg-light text-dark fs-3 px-3 py-2 me-3 fw-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          {!username && (
            <>
              <button
                type="button"
                className="btn bg-danger text-light fs-3 px-3 py-2 me-3 fw-bold"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                className="btn bg-light text-dark fs-3 px-3 py-2 me-3 fw-bold"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ backgroundColor: "#DC3545" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-3  fs-4">
            <li className="nav-item mx-4 ">
              <Link className="nav-link text-light fw-bold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link text-light" to="/browse">
                All
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link text-light" to="/browse/Pizzas">
                Pizza
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link text-light" to="/browse/Burgers">
                Burgers
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link text-light" to="/browse/Sandwiches">
                Sandwiches
              </Link>
            </li>
          </ul>
          <div className="d-flex me-5">
            <button
              className="btn bg-light text-dark fw-bold px-3 fs-4 me-3"
              type="submit"
              onClick={() => navigate("/cart")}
            >
              Place your order
            </button>
            <div className="d-flex align-items-center text-light position-relative">
              <Badge
                badgeContent={totalQuantity}
                fontSize="large"
                color="primary"
              >
                <ShoppingCartIcon sx={{ fontSize: 40 }} />
              </Badge>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
