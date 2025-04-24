import React, { useState, useEffect } from "react";
import { verifyOtpForgot } from "../../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function VerifyForgotOTP() {
  const { state } = useLocation();
  const email = state?.email || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("otp")?.focus();
  }, []);

  const validate = (val) => {
    if (!val) return "OTP is required";
    if (!/^\d{6}$/.test(val)) return "OTP must be 6 digits";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(otp);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await verifyOtpForgot({ email, otp });
      navigate("/reset-password", {
        state: { resetToken: res.data.resetToken },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-screen py-16">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Verify OTP</h2>
          <p className="text-gray-600 mb-6">
            We sent a 6-digit code to <strong>{email}</strong>.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-live="polite"
          >
            <div>
              <label htmlFor="otp" className="block font-medium">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                aria-invalid={!!error}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center p-3 text-white rounded-md ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Didn’t get it?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
