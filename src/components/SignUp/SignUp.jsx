import { useState } from "react";
import signup_img from "../../assets/Images/signup_img.avif";
import "./SignUp.css";
import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    switch (fieldName) {
      case "email":
        errors.emailError = !validateEmail(value)
          ? "Please enter a valid email address."
          : "";
        break;
      case "username":
        errors.usernameError =
          value.trim() === "" ? "username is required." : "";
        break;

      default:
        break;
    }
    setFormErrors(errors);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.values(formErrors).every((error) => error === "");

    if (isValid) {
      await fetch("http://localhost:8000/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      navigate("/signin");
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={signup_img}
            alt="signup image"
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "15px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3 }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  label="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={() => validateField("username", formData.username)}
                  required
                  variant="outlined"
                  error={Boolean(formErrors.usernameError)}
                  helperText={formErrors.usernameError}
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => validateField("email", formData.email)}
                  required
                  variant="outlined"
                  error={Boolean(formErrors.emailError)}
                  helperText={formErrors.emailError}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={() => validateField("password", formData.password)}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Confirm password</InputLabel>
                  <OutlinedInput
                    label="Confirm password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={() =>
                      validateField("confirmPassword", formData.confirmPassword)
                    }
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <button className="btn btn-dark w-100">Cancel</button>
              </Grid>
              <Grid item xs={6}>
                <button className="btn btn-danger w-100 btn-lg">
                  Register
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
