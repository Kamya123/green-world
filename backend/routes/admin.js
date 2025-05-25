const express = require('express');
const router = express.Router();
const Community = require('../models/community');
const User = require('../models/User'); // Import the User model
const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to generate a random password
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8);
};

// Function to send an email with login credentials
const sendLoginCredentials = async (email, password) => {
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
    subject: 'Your Login Credentials',
    text: `Your account has been created successfully.\n\nEmail: ${email}\nPassword: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending login credentials email:', error);
    throw error;
  }
};

// Route to add a member to a department
router.post('/add-member', async (req, res) => {
  const { department, name, email, phone } = req.body;
  console.log(req.body);

  // Ensure name and email are provided
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Generate a random password and department ID
  const password = generateRandomPassword();
  const departmentID = 'D' + Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random department ID

  // Create memberDetails object
  const memberDetails = {
    name,
    emailAddress: email,
    phoneNumber: phone,
    departmentID,
    password,
  };

  try {
    let community = await Community.findOne();

    if (!community) {
      community = new Community({
        [department]: [memberDetails]
      });
    } else {
      // Add the member to the specified department
      community[department].push(memberDetails);
    }

    // Create a new user with the same email and password
    const user = new User({
      name,
      email,
      password,
      phone,
      role: 'admin', // Set a default role or modify as needed
    });

    await user.save();
    
    await community.save();
    // Send an email with the login credentials
    await sendLoginCredentials(email, password);

    res.status(200).json({ message: 'Member added successfully and login credentials sent.' });
  } catch (error) {
    console.error('Error adding member to department:', error);
    res.status(500).json({ error: error.message });
  }
});
router.get('/employees/:department', async (req, res) => {
  const { department } = req.params;

  try {
    const community = await Community.findOne();

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const employees = community[department] || [];

    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
