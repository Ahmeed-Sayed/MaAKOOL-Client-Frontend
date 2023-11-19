import { Copyright } from "@mui/icons-material";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer bg-dark d-flex justify-content-around fs-4 text-light align-items-center py-1">
        <Link
          to="/contactUs"
          className="text-light text-decoration-none text-center"
        >
          Contact Us On <br />
          Sample@gmail.com{" "}
        </Link>
        <Link className="text-light text-decoration-none" to="/">
          Fast Food Restuarant
        </Link>
        <p>
          <Copyright />
          iti 2023
        </p>
      </div>
    </>
  );
};
export default Footer;
