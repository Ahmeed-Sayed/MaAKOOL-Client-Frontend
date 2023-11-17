import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./header.css"; // Import a custom CSS file for styling
import { Badge, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order.cartItems);
  const loading = useSelector((state) => state.order.loading);
  const [categories, setCategories] = useState([]);
  const queryClient = useQueryClient();
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    let totalQuantity = 0;
    if (order && !loading && order.orderItems.length > 0) {
      totalQuantity = order.orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    }
    setTotalQuantity(totalQuantity);
  }, [order, loading]);

  // Log out function
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/accounts/logout/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            refresh_token: localStorage.refresh,
          }),
        }
      );
      if (response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        queryClient.invalidateQueries("order");
        Swal.fire({
          icon: "success",
          title: "Logout Successful!",
          showConfirmButton: false,
          timer: 1500, // Automatically close after 1.5 seconds
        });
        navigate("/");
      } else {
        console.log(localStorage.refresh);
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/resturant/category/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error during fetching categories:", error);
      }
    };

    getCategories(); // Call the function when the component mounts
  }, []);
  return (
    <>
      <div className="upperHeader align-items-center bg-dark d-flex justify-content-between px-3 py-2">
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <div className="upperHeaderLeft bg-light rounded">
            <h5 className="px-3 py-3 fw-bold">Fast Food Restaurant</h5>
          </div>
        </Box>
        <div className="upperHeaderRight d-flex flex-row">
          {localStorage.id && (
            <>
              <button
                type="button"
                className="btn bg-danger text-light fs-5 px-3 py-2 me-3 fw-bold"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                type="button"
                className="btn bg-light text-dark fs-5 px-3 py-2 me-3 fw-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          {!localStorage.id && (
            <>
              <button
                type="button"
                className="btn bg-danger text-light fs-5 px-3 py-2 me-3 fw-bold"
                onClick={() => navigate("/signin")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn bg-light text-dark fs-5 px-3 py-2 me-3 fw-bold"
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
        <div className="d-flex jusify-content-between align-items-end fs-5">
          <Link
            className="text-decoration-none text-light fw-bold ms-3  px-3"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-decoration-none text-light  ms-3 fw-bold px-3"
            to="/browse"
          >
            All
          </Link>
        </div>
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
          <ul className="navbar-nav ms-3 fs-5">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li className="nav-item mx-4" key={category.id}>
                  <Link
                    className="nav-link text-light"
                    to={`/browse/${category.id}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))
            ) : (
              <li key="no-category" className="nav-item mx-4">
                <span className="nav-link text-light">
                  No categories available
                </span>
              </li>
            )}
          </ul>

          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div className="d-flex me-5 ">
              <button
                className="btn bg-light text-dark fw-bold px-3 fs-5 me-3 d-flex flex-row align-items-center"
                type="submit"
              >
                <p className="mb-0">Place your order</p>
                <div className="ms-3 d-flex align-items-center text-light position-relative">
                  <Badge
                    badgeContent={totalQuantity}
                    fontSize="large"
                    color="primary"
                  >
                    <ShoppingCartIcon sx={{ fontSize: 30, color: "black" }} />
                  </Badge>
                </div>
              </button>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
