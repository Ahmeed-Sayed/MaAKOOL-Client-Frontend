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
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { increment, setCart, setLoading } from "./store/slices/orderItems";

function App() {
  const fetchOrder = async () => {
    const { data } = await axios.get("http://localhost:8000/orders/orders/");
    return data.length > 0 ? data[0] : null;
  };
  const dispatch = useDispatch();
  const { data: order, isLoading, error } = useQuery("order", fetchOrder);
  useEffect(() => {
    if (order && !isLoading) {
      dispatch(setCart(order));
      dispatch(increment());
    }
  }, [dispatch, isLoading, order]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);
  if (!isLoading && !error) {
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
}
export default App;
