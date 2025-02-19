import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://meditrack-zbcm.onrender.com/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-bold mb-2 text-[#2f3d7e]">Welcome Back</h2>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2f3d7e]" size={20} />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#2f3d7e] focus:ring-2 focus:ring-[#2f3d7e]/20 transition-colors"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2f3d7e]" size={20} />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#2f3d7e] focus:ring-2 focus:ring-[#2f3d7e]/20 transition-colors"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2f3d7e]" size={20} />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#2f3d7e] focus:ring-2 focus:ring-[#2f3d7e]/20 transition-colors"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#2f3d7e] hover:bg-[#1f2b5e] text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Sign in
              </button>

              <div className="text-center mt-6">
                <Link to="/register" className="text-[#2f3d7e] hover:text-[#1f2b5e] font-medium">
                  Don't have an account? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;