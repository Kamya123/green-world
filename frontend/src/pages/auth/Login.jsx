import React, { useState, useEffect } from 'react';
import { login } from '../../services/authService';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

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
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.getElementById('email')?.focus();
  }, []);

  const validate = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Min 8 characters';
    }
    return '';
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: validate(name, val) }));
  };

  const runAllValidations = () => {
    const newErr = {};
    ['email', 'password'].forEach(f => {
      newErr[f] = validate(f, formData[f]);
    });
    setErrors(newErr);
    return Object.values(newErr).every(v => !v);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    if (!runAllValidations()) return;

    setLoading(true);
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/verify-otp', { replace: true, state: { email: formData.email, from } });
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-screen">
      <div className="h-full grid lg:grid-cols-2">
        {/* Form */}
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="w-full max-w-sm space-y-6">
            <h2 className="text-3xl font-bold">Login to Celebration</h2>
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-green-600 hover:underline">Sign up</Link>
            </p>

            <form onSubmit={handleSubmit} aria-live="polite" className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-medium">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block font-medium">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPwd
                      ? <VscEyeClosed size={20}/>
                      : <VscEye size={20}/>}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {submitError && <p className="text-red-600 text-center">{submitError}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-4 text-white rounded-md ${
                  loading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading
                  ? <span className="block h-5 w-5 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  : 'Login'}
              </button>
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

export default Login;

