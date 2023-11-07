import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Home/components/Header";
import Footer from "./components/Home/components/Footer";
import Browsing from "./components/Browsing";
import Cart from "./components/Cart";
import HomePage from "./components/Home";
import ContactUs from "./components/ContactUs";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import BrowseCatg from "./components/BrowseCatg";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<Browsing />} />
          <Route path="/browse/:catgName" element={<BrowseCatg />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
