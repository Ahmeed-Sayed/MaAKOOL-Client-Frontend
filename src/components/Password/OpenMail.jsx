import React from "react";
import mail  from "../../assets/Images/Love Message.gif";

export default function OpenMail() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="p-5 border rounded">
          <div className="row justify-content-center align-items-center mb-4">
            <div className="col-auto">
              <img src={mail} alt="Mail Image" className="img-fluid" />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <h1>Check Your Mail</h1>
              <h5>
                We have sent you some instructions for resetting your password
                on Mail.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
