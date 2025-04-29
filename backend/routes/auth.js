const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const textflow = require("textflow.js");
require('dotenv').config();


const key = process.env.TEXTFLOW_API_KEY;
console.log("TEXTFLOW_KEY:", key);
textflow.useKey(key);

// Generate OTP
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

const sendSMSOTP = async (phone, otp) => {
  textflow.sendSMS(phone, `Your OTP code is ${otp}. It expires in 10 minutes.`, (result) => {
    if (!result.ok) {
      console.error('Error sending SMS:', result);
    }
  });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, phone, role, signUpMethod } = req.body;
  // console.log("TEXTFLOW_KEY:", key);

  try {
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    const user = new User({ name, email, password, phone, role, otp, otpExpires });
    await user.save();

    if (signUpMethod === 'email') {
      await sendOTP(email, otp);
    } else if (signUpMethod === 'phone') {
      await sendSMSOTP(phone, otp);
    }

    res.status(201).json({ message: 'User registered successfully, OTP sent' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, phone, otp, signUpMethod } = req.body;

  try {
    const user = signUpMethod === 'email' ? await User.findOne({ email }) : await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, phone, password, signUpMethod } = req.body;
console.log("TEXTFLOW_KEY:", key);

  try {
    // Find the user based on the login method (email or phone)
    const user = signUpMethod === 'email'
      ? await User.findOne({ email })
      : await User.findOne({ phone });

    if (user && (await user.matchPassword(password))) {
      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email/phone or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: error.message });
  }
});


// Get all farmers and buyers
router.get('/farmers-and-buyers', async (req, res) => {
  try {
    const farmersAndBuyers = await User.find({ role: { $in: ['farmer', 'buyer'] } });
    res.json(farmersAndBuyers);
  } catch (error) {
    console.error('Error fetching farmers and buyers:', error);
    res.status(500).json({ error: error.message });
  }
});

// Forgot Password Request
router.post('/forgot-password', async (req, res) => {
  const { email, phone, signUpMethod } = req.body;

  try {
    const user = signUpMethod === 'email' ? await User.findOne({ email }) : await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    if (signUpMethod === 'email') {
      await sendOTP(email, otp);
    } else if (signUpMethod === 'phone') {
      await sendSMSOTP(phone, otp);
    }

    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP for Forgot Password
router.post('/verify-otp-forgot', async (req, res) => {
  const { email, phone, otp, signUpMethod } = req.body;
  console.log('Received OTP verification request:', { email, phone, otp });

  try {
    const user = signUpMethod === 'email' ? await User.findOne({ email }) : await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('OTP Expires:', user.otpExpires);
    console.log('Current Time:', new Date());
    console.log("shi1");

    if (user.otp !== otp || user.otpExpires < new Date()) {
      console.log("galt1");
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    console.log("shi2");
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });
    console.log("token", resetToken);
    res.status(200).json({ resetToken });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
