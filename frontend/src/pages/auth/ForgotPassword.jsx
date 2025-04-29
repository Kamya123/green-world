import React, { useState, useEffect } from "react";
import { forgotPassword } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [signUpMethod, setSignUpMethod] = useState("email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (signUpMethod === "email") {
      document.getElementById("email")?.focus();
    } else {
      document.getElementById("phone")?.focus();
    }
  }, [signUpMethod]);

  const validate = (val, type) => {
    if (!val) return `${type} is required`;
    if (type === "email" && !/^\S+@\S+\.\S+$/.test(val)) return "Enter a valid email";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = "";
    if (signUpMethod === "email") {
      err = validate(email, "email");
    } else {
      err = validate(phone, "phone");
    }
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await forgotPassword({ email, phone, signUpMethod });
      navigate("/verify-forgot-otp", { state: { email, phone, signUpMethod } });
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
            Enter your email or phone number and we’ll send you a one-time code to reset your
            password.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-live="polite"
          >
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="signUpMethod"
                  value="email"
                  checked={signUpMethod === "email"}
                  onChange={() => setSignUpMethod("email")}
                  className="mr-2"
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="signUpMethod"
                  value="phone"
                  checked={signUpMethod === "phone"}
                  onChange={() => setSignUpMethod("phone")}
                  className="mr-2"
                />
                Phone
              </label>
            </div>
            {signUpMethod === "email" && (
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
            )}
            {signUpMethod === "phone" && (
              <div>
                <label htmlFor="phone" className="block font-medium">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="1234567890"
                  aria-invalid={!!error}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>
            )}
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
