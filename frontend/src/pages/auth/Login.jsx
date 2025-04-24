import React, { useState, useEffect } from 'react';
import { login } from '../../services/authService';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // Redirect back to where the user came from (or home)
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.getElementById('email')?.focus();
  }, []);

  // Field-level validation
  const validate = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: validate(name, val) }));
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    !errors.email &&
    !errors.password;

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    if (!isFormValid) return;

    setLoading(true);
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      // Optionally extend token life if rememberMe:
      if (formData.rememberMe) {
        // logic to refresh/extend token...
      }

      navigate('/verify-otp', {
        replace: true,
        state: { email: formData.email, from },
      });
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* --- Left: Form --- */}
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="w-full max-w-sm space-y-6">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login to Celebration
            </h2>
            <p className="text-base text-gray-600">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign up
              </Link>
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              aria-live="polite"
            >
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    className="block w-full p-4 border border-gray-200 rounded-md bg-gray-50 focus:border-blue-600 focus:bg-white caret-blue-600 outline-blue-600 outline-1"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="relative mt-2.5">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    className="block w-full p-4 border border-gray-200 rounded-md bg-gray-50 focus:border-blue-600 focus:bg-white caret-blue-600 outline-blue-600 outline-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute inset-y-0 right-3 bottom-4 flex items-center text-sm font-medium text-gray-600"
                  >
                    {showPwd ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
                  </button>
                  {errors.password && (
                    <p role="alert" className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2 form-checkbox"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submission Error */}
              {submitError && (
                <p role="alert" className="text-center text-sm text-red-600">
                  {submitError}
                </p>
              )}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full flex justify-center items-center px-4 py-4 font-semibold text-white rounded-md transition ${
                    loading
                      ? 'bg-blue-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- Right: Illustration --- */}
        <div className="flex items-center justify-center px-4 py-10 bg-gray-50 sm:px-6 lg:px-8">
          <div className="max-w-md text-center">
            <img
              className="w-full mx-auto"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png"
              alt="Design your own card"
            />
            <h3 className="mt-8 text-2xl font-bold text-black">
              Design your own card
            </h3>
            <p className="mt-2 text-gray-500">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis.
            </p>
            <div className="flex items-center justify-center mt-10 space-x-3">
              <div className="h-1.5 w-20 bg-orange-500 rounded-full" />
              <div className="h-1.5 w-12 bg-gray-200 rounded-full" />
              <div className="h-1.5 w-12 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
