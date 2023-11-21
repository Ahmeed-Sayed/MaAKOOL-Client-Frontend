import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ForgetPassword from "./components/Password/ForgetPassword";
import PasswordResetSuccess from "./components/Password/PasswordResetSuccess";
import OpenMail from "./components/Password/OpenMail";
import ForgetPasswordConfirm from "./components/Password/ForgetPasswordConfirm";
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
import { setCart, setLoading } from "./store/slices/orderItems";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

function App() {
  const fetchOrder = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/orders/orders/");

      const nonOrderedOrders = data.filter((order) => {
        return order.ordered === false && order.user.id == localStorage.id;
      });
      return nonOrderedOrders.length > 0 ? nonOrderedOrders[0] : null;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return null;
    }
  };

  const dispatch = useDispatch();
  const { data: order, isLoading, error } = useQuery("order", fetchOrder);
  useEffect(() => {
    if (!isLoading) {
      dispatch(setCart(order));
    }
  }, [dispatch, isLoading, order]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading, order]);
  if (!isLoading && !error) {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<Browsing />} />
            <Route path="/browse/:catgNum" element={<BrowseCatg />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route
              path="/ForgetPasswordConfirm/:uidb64/:token"
              element={<ForgetPasswordConfirm />}
            />
            <Route
              path="/PasswordResetSuccess"
              element={<PasswordResetSuccess />}
            />
            <Route path="/OpenMail" element={<OpenMail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}
export default App;
