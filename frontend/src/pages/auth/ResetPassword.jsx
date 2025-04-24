import React, { useState, useEffect } from "react";
import { resetPassword } from "../../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function ResetPassword() {
  const { state } = useLocation();
  const resetToken = state?.resetToken || "";
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("pwd")?.focus();
  }, []);

  const validate = () => {
    const errs = {};
    if (!pwd) errs.pwd = "Password is required";
    else if (pwd.length < 8) errs.pwd = "Must be ≥8 characters";
    if (!confirm) errs.confirm = "Please confirm password";
    else if (confirm !== pwd) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await resetPassword({ resetToken, newPassword: pwd });
      navigate("/login", { replace: true });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-screen py-16">
      <div className="h-full flex justify-center items-center">
        <div className="w-full max-w-md px-4">
          <h2 className="text-3xl font-bold mb-4">Reset Password</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-live="polite"
          >
            {/* New Password */}
            <div>
              <label htmlFor="pwd" className="block font-medium">
                New Password
              </label>
              <div className="relative">
                <input
                  id="pwd"
                  type={showPwd ? "text" : "password"}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Enter new password"
                  aria-invalid={!!errors.pwd}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPwd ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
                </button>
              </div>
              {errors.pwd && (
                <p className="mt-1 text-sm text-red-600">{errors.pwd}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm" className="block font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConf ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-type new password"
                  aria-invalid={!!errors.confirm}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConf((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showConf ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
                </button>
              </div>
              {errors.confirm && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
              )}
            </div>

            {submitError && (
              <p className="text-center text-sm text-red-600">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white rounded-md ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Reset Password"
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
