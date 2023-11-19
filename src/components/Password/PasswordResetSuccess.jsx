import React from "react";
import { Link } from "react-router-dom";
import done from "../../assets/Images/correct-icon.svg";

export default function PasswordResetSuccess() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="p-5 border rounded">
          <div className="row justify-content-center align-items-center mb-4">
            <div className="col-auto">
              <img src={done} alt="Done Image" className="img-fluid" />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <h1>Password Reaset Done</h1>
              <Link to="/signin"
                type="submit"
                className="mt-3 btn btn-lg btn-danger w-100"
              >
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
