import { Copyright } from "@mui/icons-material";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer bg-dark d-flex justify-content-around fs-4 text-light align-items-center py-3">
        <Link to="/contactUs" className="text-light text-decoration-none">
          Contact Us
        </Link>
        <p>Fast Food Restuarant</p>
        <p>
          <Copyright></Copyright>iti 2023
        </p>
      </div>
    </>
  );
};
export default Footer;
