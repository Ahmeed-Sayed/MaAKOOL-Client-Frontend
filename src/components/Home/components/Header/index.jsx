import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css"; // Import a custom CSS file for styling
import { Badge } from "@mui/material";
const Header = () => {
  return (
    <>
      <div className="upperHeader align-items-center bg-dark d-flex justify-content-between p-3">
        <div className="upperHeaderLeft bg-light rounded">
          <h3 className="px-3 py-3 fw-bold">Fast Food Restaurant</h3>
        </div>
        <div className="upperHeaderRight d-flex flex-row">
          <button
            type="button"
            className="btn bg-danger text-light fs-3 px-3 py-2 me-3 fw-bold"
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn bg-light text-dark fs-3 px-3 py-2 me-3 fw-bold"
          >
            Sign Up
          </button>
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
              <a className="nav-link text-light fw-bold" href="#">
                Home
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-light" href="#">
                All
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-light" href="#">
                Pizza
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-light" href="#">
                Burgers
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-light" href="#">
                Sandwiches
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-light" href="#">
                Desserts
              </a>
            </li>
          </ul>
          <div className="d-flex me-5">
            <button
              className="btn bg-light text-dark fw-bold px-3 fs-4 me-3"
              type="submit"
            >
              Place your order
            </button>
            <div className="d-flex align-items-center text-light position-relative">
              <Badge badgeContent={17} fontSize="large" color="primary">
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
