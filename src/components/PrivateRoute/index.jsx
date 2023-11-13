import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = () => {
    // Check if the user is logged in, perhaps by checking localStorage or authentication status
    return localStorage.getItem("username") !== null; // Check if the username exists in localStorage
  };

  return (
    <Route
      {...rest}
      element={isLoggedIn() ? element : <Navigate to="/signin" />} // Redirect to the signin page if not logged in
    />
  );
};

export default PrivateRoute;
