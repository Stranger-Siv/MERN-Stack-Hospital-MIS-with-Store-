import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import Store_Home from "./Pages/Store_Home";
import Store_Cart from "./Pages/Store_Cart";
import Store_Checkout from "./Pages/Store_PlaceOrder";
import Store_Confirm_Order from "./components/Store_Confirm_Order";
import OrderConfirmed from './Pages/OrderConfirmed';
import ContactUs from './Pages/ContactUs';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://meditrack-zbcm.onrender.com/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/store" element={<Store_Home />} />
          <Route path="/cart" element={<Store_Cart />} />
          <Route path="/placeorder" element={<Store_Checkout />} />
          <Route path="/confirmorder" element={<Store_Confirm_Order />} />
          <Route path="/orderconfirmed" element={<OrderConfirmed />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
