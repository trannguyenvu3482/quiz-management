import React, { useState } from "react";
import "./Login.scss";
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../features/users/userSlice";
import { ImSpinner10 } from "react-icons/im";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    };
    const res = await loginUser(data);

    if (res && res.EC === 0) {
      dispatch(login({ ...res.DT, email }));
      toast.success(`${res.EM}, redirecting to home page...`);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container flex w-full flex-col items-center">
      <div className="sign-up flex w-full items-center justify-end gap-2 px-4 py-2">
        <span>Don't have an account yet?</span>
        <Link className="signup-btn px-2.5 py-1.5 text-xs" to="/register">
          Sign up
        </Link>
        <span className="underline">Contact us</span>
      </div>
      <div className="main-form mt-28 flex flex-col items-center">
        <Link className="text-4xl" to="/">
          Vu Tran
        </Link>
        <h3 className="mt-4 text-xl">Hello, who's this?</h3>

        <div className="mt-4 flex flex-col">
          <form>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="text-md mt-2 border border-black px-3 py-2"
                type="email"
                id="email"
                placeholder="bruce@wayne.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <input
                  className="mt-2 w-full border border-black px-3 py-2 text-sm"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute bottom-3 right-2 text-gray-300"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute bottom-3 right-2 text-gray-300"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                className="mt-2 text-sm text-gray-500 underline"
                htmlFor="password"
              >
                Forgot password?
              </label>
            </div>
            <button
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={(e) => handleLogin(e)}
              disabled={isLoading}
            >
              {isLoading && <ImSpinner10 className="animate-spin" />}
              <span>Log in</span>
            </button>
            <div>
              <span className="mt-2 flex w-full justify-center">OR</span>
            </div>
            <div>
              <button className="mt-2 flex w-full items-center rounded-sm border border-black px-3 py-2">
                <FaGoogle className="mr-6" />
                Log in with Google
              </button>
            </div>
            <div>
              <button className="mt-4 flex w-full items-center rounded-sm border border-black px-3 py-2">
                <FaMicrosoft className="mr-6" /> Log in with Microsoft
              </button>
            </div>
            <div className="text-center">
              <button className="mt-2 text-center text-sm text-gray-600 underline">
                Log in with SSO
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
