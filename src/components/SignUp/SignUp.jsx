// import React, { useState } from 'react';
// import signup_img from '../../assets/Images/signup_img.avif';
// import './SignUp.css';
// import {
//   Button,
//   Container,
//   Grid,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   InputAdornment,
//   IconButton,
//   OutlinedInput,
//   FormHelperText,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import EmailIcon from '@mui/icons-material/Email';

// function SignUp() {
//   const [formData, setFormData] = useState({
//     email: '',
//     phone: '',
//     First_name: '',
//     Last_name: '',
//     Address: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [formErrors, setFormErrors] = useState({
//     emailError: '',
//     phoneError: '',
//     First_nameError: '',
//     Last_nameError: '',
//     AddressError: '',
//     passwordError: '',
//     confirmPasswordError: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Real-time validation
//     validateField(name, value);
//   };

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateField = (fieldName, value) => {
//     const errors = { ...formErrors };

//     switch (fieldName) {
//       case 'email':
//         errors.emailError = !validateEmail(value)
//           ? 'Please enter a valid email address.'
//           : '';
//         break;
//       case 'phone':
//         errors.phoneError = !validatePhone(value)
//           ? 'Please enter a valid phone number.'
//           : '';
//         break;
//       case 'First_name':
//         errors.First_nameError = value.trim() === '' ? 'First name is required.' : '';
//         break;
//       case 'Last_name':
//         errors.Last_nameError = value.trim() === '' ? 'Last name is required.' : '';
//         break;
//       case 'Address':
//         errors.AddressError = value.trim() === '' ? 'Address is required.' : '';
//         break;
//       case 'password':
//         errors.passwordError = !validatePassword(value)
//           ? 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
//           : '';
//         break;
//       case 'confirmPassword':
//         errors.confirmPasswordError =
//           value !== formData.password ? 'Passwords do not match.' : '';
//         break;
//       default:
//         break;
//     }

//     setFormErrors(errors);
//   };

//   const validatePhone = (phone) => {
//     // Regular expression for phone number validation
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone);
//   }

//   const validateEmail = (email) => {
//     // Regular expression for email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePassword = (password) => {
//     // Regular expression for password validation
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if there are any errors
//     const isValid = Object.values(formErrors).every((error) => error === '');

//     if (isValid) {
//       // Submit the form or perform other actions here
//       // You can access the form data in the formData object
//       console.log('Form data submitted:', formData);
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={2}>
//       <Grid item xs={12} sm={6}>
//         {/* Place your image component here */}
//         <img src={signup_img} alt="signup image"  style={{ width: '100%' , height: '80%', objectFit: 'cover', objectPosition: 'center', borderRadius: '15px' }}/>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3 }}>
//           Sign Up
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={6} sm={6}>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 type="text"
//                 name="First_name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 onBlur={() => validateField('First_name', formData.name)}
//                 required
//                 variant="outlined"
//                 error={Boolean(formErrors.nameError)}
//                 helperText={formErrors.nameError}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 type="text"
//                 name="Last_name"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 onBlur={() => validateField('Last_name', formData.username)}
//                 required
//                 variant="outlined"
//                 error={Boolean(formErrors.usernameError)}
//                 helperText={formErrors.usernameError}
//               />
//             </Grid>
//             <Grid item xs={12} sm={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 type="text"
//                 name="Address"
//                 value={formData.Address}
//                 onChange={handleInputChange}
//                 onBlur={() => validateField('Address', formData.Address)}
//                 required
//                 variant="outlined"
//                 error={Boolean(formErrors.AddressError)}
//                 helperText={formErrors.AddressError}
//               />
//             </Grid>
//             <Grid item xs={6} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Email address"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 onBlur={() => validateField('email', formData.email)}
//                 required
//                 variant="outlined"
//                 error={Boolean(formErrors.emailError)}
//                 helperText={formErrors.emailError}

//               />
//             </Grid>
//             <Grid item xs={6} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Phone number"
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 onBlur={() => validateField('phone', formData.phone)}
//                 required
//                 variant="outlined"
//                 error={Boolean(formErrors.phoneError)}
//                 helperText={formErrors.phoneError}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Password</InputLabel>
//                 <OutlinedInput
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   onBlur={() => validateField('password', formData.password)}
//                   required
//                   error={Boolean(formErrors.passwordError)}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={handleShowPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <Visibility /> : <VisibilityOff />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//                 <FormHelperText error={Boolean(formErrors.passwordError)}>
//                   {formErrors.passwordError}
//                 </FormHelperText>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Confirm password</InputLabel>
//                 <OutlinedInput
//                   label="Confirm password"
//                   type={showPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
//                   required
//                   error={Boolean(formErrors.confirmPasswordError)}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={handleShowPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <Visibility /> : <VisibilityOff />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//                 <FormHelperText error={Boolean(formErrors.confirmPasswordError)}>
//                   {formErrors.confirmPasswordError}
//                 </FormHelperText>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <button className='btn btn-dark w-100' >Cancel</button>
//               {/* <Button  type="button" variant="outlined"  color="error" size="large" fullWidth>
//               Cancel
//             </Button> */}
//             </Grid>
//             <Grid item xs={6}>
//               <button className='btn btn-danger  w-100 btn-lg"' >Register</button>
//               {/* <Button type="submit" variant="contained" color="error" size="large" fullWidth>
//               Register
//             </Button> */}
//             </Grid>
//           </Grid>
//         </form>
//       </Grid>
//     </Grid>
//     </Container>
//   );
// }

// export default SignUp;

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const submit = async (e) => {
      e.preventDefault();

      await fetch('http://localhost:8000/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      navigate('/signin');
    };
  return (
    <div>
      <form onSubmit={submit}>
      <label>
        username:
          <input type="text" name="username" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          Email:
          <input type="text" name="email" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          password:
          <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
