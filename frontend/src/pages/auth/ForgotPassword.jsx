import React, { useState, useEffect } from "react";
import { forgotPassword } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const validate = (val) => {
    if (!val) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(val)) return "Enter a valid email";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      navigate("/verify-forgot-otp", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-screen py-16">
      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-6">
            Enter your email and we’ll send you a one-time code to reset your
            password.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-live="polite"
          >
            <div>
              <label htmlFor="email" className="block font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!error}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center p-3 text-white rounded-md transition ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
