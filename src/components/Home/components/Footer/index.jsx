import { Copyright } from "@mui/icons-material";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer bg-dark d-flex justify-content-around fs-4 text-light align-items-baseline py-1">
        <Link
          to="/contactUs"
          className="text-light text-decoration-none text-center"
        >
          Contact Us
        </Link>
        <Link className="text-light text-decoration-none" to="/">
          Fast Food Restuarant
        </Link>
        <p className="d-flex p-0 align-items-center">
          <Copyright />
          <span>iti 2023</span>
        </p>
      </div>
    </>
  );
};
export default Footer;
