import { Copyright } from "@mui/icons-material";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer bg-dark d-flex justify-content-around fs-4 text-light align-items-center py-3">
        <p>Contact Us</p>
        <p>Fast Food Restuarant</p>
        <p>
          <Copyright></Copyright>iti 2023
        </p>
      </div>
    </>
  );
};
export default Footer;
