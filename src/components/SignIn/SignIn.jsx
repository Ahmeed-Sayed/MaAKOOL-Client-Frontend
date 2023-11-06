import React, { useState } from 'react';
import {
  Button,
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    First_name: '',
    Last_name: '',
    Address: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    emailError: '',
    First_nameError: '',
    Last_nameError: '',
    AddressError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    validateField(name, value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    switch (fieldName) {
      case 'email':
        errors.emailError = !validateEmail(value)
          ? 'Please enter a valid email address.'
          : '';
        break;
      case 'First_name':
        errors.First_nameError = value.trim() === '' ? 'First name is required.' : '';
        break;
      case 'Last_name':
        errors.Last_nameError = value.trim() === '' ? 'Last name is required.' : '';
        break;
      case 'Address':
        errors.AddressError = value.trim() === '' ? 'Address is required.' : '';
        break;
      case 'password':
        errors.passwordError = !validatePassword(value)
          ? 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
          : '';
        break;
      case 'confirmPassword':
        errors.confirmPasswordError =
          value !== formData.password ? 'Passwords do not match.' : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors
    const isValid = Object.values(formErrors).every((error) => error === '');

    if (isValid) {
      // Submit the form or perform other actions here
      // You can access the form data in the formData object
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <Container maxWidth="sm">
      
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              type="text"
              name="First_name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => validateField('First_name', formData.name)}
              required
              variant="outlined"
              error={Boolean(formErrors.nameError)}
              helperText={formErrors.nameError}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              type="text"
              name="Last_name"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={() => validateField('Last_name', formData.username)}
              required
              variant="outlined"
              error={Boolean(formErrors.usernameError)}
              helperText={formErrors.usernameError}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Address"
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              onBlur={() => validateField('Address', formData.Address)}
              required
              variant="outlined"
              error={Boolean(formErrors.AddressError)}
              helperText={formErrors.AddressError}
            />  
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => validateField('email', formData.email)}
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={() => validateField('password', formData.password)}
                required
                error={Boolean(formErrors.passwordError)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
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
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
                required
                error={Boolean(formErrors.confirmPasswordError)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={Boolean(formErrors.confirmPasswordError)}>
                {formErrors.confirmPasswordError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
