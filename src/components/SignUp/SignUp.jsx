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
import Swal from "sweetalert2";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
    addressError: "",
    phoneError: "",
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
        errors.usernameError = validateUsername(value);
        break;
      case "phone":
        errors.phoneError = !validatePhone(value)
          ? "Please enter a valid phone number starting with 010, 011, 012, or 015 and is 11 digits long."
          : "";
        break;
      case "password":
        errors.passwordError = validatePassword(value);
        break;

      case "confirmPassword":
        errors.confirmPasswordError = validateConfirmPassword(value);
        break;
      case "address":
        errors.addressError = value.trim() === "" ? "Address is required." : "";
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

  const validatePassword = (password) => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    const lengthValidation =
      password.length >= minLength
        ? ""
        : `Password must be at least ${minLength} characters.`;
    const uppercaseValidation = uppercaseRegex.test(password)
      ? ""
      : "Password must include at least one uppercase letter.";
    const lowercaseValidation = lowercaseRegex.test(password)
      ? ""
      : "Password must include at least one lowercase letter.";
    const digitValidation = digitRegex.test(password)
      ? ""
      : "Password must include at least one numeric digit.";

    return (
      lengthValidation ||
      uppercaseValidation ||
      lowercaseValidation ||
      digitValidation
    );
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateUsername = (username) => {
    const previousValidation =
      username.trim() === "" ? "Username is required." : "";
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    const maxLengthValidation =
      username.length <= 30
        ? ""
        : "Username must have a maximum of 30 characters.";

    // Validate against the alphanumeric regex
    const regexValidation = alphanumericRegex.test(username)
      ? ""
      : "Username must be alphanumeric.";

    return previousValidation || regexValidation || maxLengthValidation;
  };

  const validateConfirmPassword = (confirmPassword) => {
    const password = formData.password;
    return confirmPassword === password ? "" : "Passwords do not match.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.values(formErrors).every((error) => error === "");

    if (isValid) {
      const response = await fetch(
        "http://localhost:8000/api/accounts/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",

          Accept: "application/json",

          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            password2: formData.confirmPassword,
            profile: {
              address: formData.address,
              phone: formData.phone,
            },
          }),
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Sign up was Sucessfull, You can now login",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(navigate("/"), 1000);
      } else {
        const data = await response.json();
        console.log(data, formData);
        const errors = { ...formErrors };
        if (data.username) errors.usernameError = data.username;
        if (data.email) errors.emailError = data.email;
        if (data.password) errors.passwordError = data.password;
        if (data.password2) errors.confirmPasswordError = data.password2;
        if (data.profile) {
          if (data.profile.address) errors.addressError = data.profile.address;
          if (data.profile.phone) errors.phoneError = data.profile.phone;
        }
        setFormErrors(errors);
        console.log(response, formData);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "3.5rem" }}>
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
          <div className="mt-0 mb-3 w-25 mx-auto  border-1 rounded border-danger text-center text-danger fw-bold">
            ________
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
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
                  <FormHelperText error={Boolean(formErrors.passwordError)}>
                    {formErrors.passwordError}
                  </FormHelperText>
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
                    onInput={() =>
                      validateField("confirmPassword", formData.confirmPassword)
                    }
                    required
                    error={Boolean(formErrors.confirmPasswordError)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error>
                    {formErrors.confirmPasswordError}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  type="text"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => validateField("phone", formData.phone)}
                  variant="outlined"
                  error={Boolean(formErrors.phoneError)}
                  helperText={formErrors.phoneError}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address"
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={Boolean(formErrors.addressError)}
                  helperText={formErrors.addressError}
                />
              </Grid>
              <Grid item xs={6}>
                <button className="btn btn-lg btn-dark w-100">Cancel</button>
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
