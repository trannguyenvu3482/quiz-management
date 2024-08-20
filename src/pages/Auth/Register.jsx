import React, { useState } from "react";
import "./Login.scss";
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/apiService";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await registerUser(email, username, password);

    if (res && res.EC === 0) {
      toast.success(`${res.EM}, redirecting to login page...`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container w-full flex flex-col items-center">
      <div className="w-full sign-up flex justify-end items-center px-4 py-2 gap-2">
        <span>Already have an account?</span>
        <Link className="signup-btn text-xs px-2.5 py-1.5" to="/login">
          Login
        </Link>
        <span className="underline">Contact us</span>
      </div>
      <div className="main-form mt-28 flex flex-col items-center">
        <Link className="text-4xl" to="/">
          Vu Tran
        </Link>
        <h3 className="mt-4 text-xl">Hello, register to start!</h3>

        <div className="mt-4 flex flex-col">
          <form>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="border border-black py-2 px-3 mt-2 text-md"
                type="email"
                id="email"
                placeholder="bruce@wayne.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="password">Password</label>
              <div className="flex items-center relative">
                <input
                  className="w-full border border-black py-2 px-3 mt-2 text-sm"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-2 bottom-3 text-gray-300"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-2 bottom-3 text-gray-300"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="email">Username</label>
              <input
                className="border border-black py-2 px-3 mt-2 text-md"
                type="text"
                id="username"
                placeholder="Optional"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="underline mt-2 text-gray-500 text-sm"
                htmlFor="password"
              >
                Forgot password?
              </label>
            </div>
            <button
              className="w-full py-2 px-4 bg-black text-white mt-4 rounded-sm"
              onClick={(e) => handleRegister(e)}
            >
              Register
            </button>
            <div>
              <span className="w-full flex justify-center mt-2">OR</span>
            </div>
            <div>
              <button className="w-full flex items-center py-2 px-3 border border-black mt-2 rounded-sm">
                <FaGoogle className="mr-6" />
                Register with Google
              </button>
            </div>
            <div>
              <button className="w-full flex items-center py-2 px-3 border border-black mt-4 rounded-sm">
                <FaMicrosoft className="mr-6" /> Register with Microsoft
              </button>
            </div>
            <div className="text-center">
              <button className="underline mt-2 text-gray-600 text-sm text-center">
                Register with SSO
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
