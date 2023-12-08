import signin_img from "../../assets/Images/SignIn_img.png";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.id && localStorage.access && localStorage.refresh) {
      navigate("/");
    }
  }, []);
  const handleLogin = (response) => {
    console.log("Login successful!", response);
    localStorage.setItem("id", response.user.id);
    localStorage.setItem("access", response.access);
    localStorage.setItem("refresh", response.refresh);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleLogin(data);
        queryClient.invalidateQueries("order");
        setError("");
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-7 mt-3 d-flex justify-content-end">
            <img
              src={signin_img}
              alt="signin image"
              style={{
                width: "90%",
                height: "500px",
                objectFit: "fill",
                objectPosition: "center",
                borderRadius: "15px",
              }}
            />
          </div>
          <div className="col-md-5 mt-5">
            <h1 className="text-center mb-0">Login</h1>
            <div className="mt-0 mb-3 w-25 mx-auto  border-1 rounded border-danger text-center text-danger fw-bold">
              ________
            </div>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control "
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <Link to="/ForgetPassword"> forget password </Link>
              <button
                type="submit"
                className="mt-3 btn btn-lg btn-danger w-100 bg-danger"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
