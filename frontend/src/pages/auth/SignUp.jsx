import React, { useState, useEffect } from 'react';
import { register } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
    agreeTOS: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('name')?.focus();
  }, []);

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Min 8 characters';
        return '';
      case 'agreeTOS':
        if (!value) return 'You must agree to terms';
        return '';
      default:
        return '';
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: validate(name, val) }));
  };

  const runAllValidations = () => {
    const newErr = {};
    ['name', 'email', 'password', 'agreeTOS'].forEach(f => {
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
      await register(formData);
      navigate('/login');
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-6">
            <h2 className="text-3xl font-bold">Sign up to Celebration</h2>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>

            <form onSubmit={handleSubmit} aria-live="polite" className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-medium">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  aria-invalid={!!errors.name}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
              </div>

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
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    placeholder="Create a password"
                    aria-invalid={!!errors.password}
                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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

              {/* Role */}
              <div>
                <label htmlFor="role" className="block font-medium">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="buyer">Buyer</option>
                  <option value="farmer">Farmer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Terms */}
              <div className="flex items-center">
                <input
                  id="agreeTOS"
                  name="agreeTOS"
                  type="checkbox"
                  checked={formData.agreeTOS}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="agreeTOS" className="ml-2 text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                </label>
              </div>
              {errors.agreeTOS && <p className="mt-1 text-red-600 text-sm">{errors.agreeTOS}</p>}

              {submitError && <p className="text-red-600 text-center">{submitError}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-4 text-white rounded-md ${
                  loading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading
                  ? <span className="block h-5 w-5 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  : 'Create free account'}
              </button>
            </form>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md text-center">
            <img
              src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png"
              alt="Design your own card"
              className="mx-auto"
            />
            <h3 className="mt-6 text-2xl font-bold">Design your own card</h3>
            <p className="mt-2 text-gray-500">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
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

export default SignUp;
