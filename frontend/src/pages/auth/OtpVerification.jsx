import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../../services/authService";
import { getDashboardPathFromStorage } from '../../utils/jwtHelper';

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOTP({ email, otp });
      localStorage.setItem("token", response.data.token); // Store the token
      const redirectPath = getDashboardPathFromStorage() || "/";
      navigate(redirectPath, { replace: true });
      //navigate('/dashboard'); // Redirect to home after successful OTP verification
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <section className="bg-white h-screen">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Verify Your Account
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Enter the OTP sent to your email address.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="otp"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    OTP{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter the OTP"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-green-600 focus:bg-white caret-green-600"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-green-700 focus:bg-green-700"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md text-center">
            <img
              src="https://i.imgur.com/GMhUvHQ.png"
              alt="GreenWorld Farmers' Forum"
              className="mx-auto"
            />
            <h3 className="mt-6 text-2xl font-bold">GreenWorld Farmers' Forum</h3>
            <p className="mt-2 text-gray-500">
            Green World connects buyers with trained organic farmers through e-commerce and education-driven platform.
            </p>
            <div className="flex justify-center space-x-3 mt-6">
              <div className="h-1.5 w-20 bg-orange-500 rounded-full"/>
              <div className="h-1.5 w-12 bg-gray-200 rounded-full"/>
              <div className="h-1.5 w-12 bg-gray-200 rounded-full"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTPVerification;
