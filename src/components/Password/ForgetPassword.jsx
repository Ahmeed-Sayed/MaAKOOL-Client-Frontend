import React, { useState } from "react";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/accounts/reset-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("Password reset link sent successfully.");
        navigate("/OpenMail");
      } else {
        const data = await response.json();
        setError(
          data.error || "Error occurred while sending reset instructions."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred while sending reset instructions.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center p-5">
        <div className="col-md-5">
          <h1 className="text-center">Reset Password</h1>
          <div className="mt-0 mb-3 w-25 mx-auto border-1 rounded border-danger text-center text-danger fw-bold">
            ________
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="mt-3 btn btn-lg  bg-danger text-light  w-100"
            >
              Send Instructions
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
