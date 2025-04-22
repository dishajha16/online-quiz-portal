//const express = require('express');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const User = require('../models/user');
//const router = express.Router();
//
////const User = [
////  { id: 1, email: "admin@test.com", password: "admin" },
////  { id: 2, email: "user@test.com", password: "user123" }
////];
//
//
//exports.getUsers = (req, res) => {
//    res.json(User);
//};
//
//// Register a new user
//router.post('/register', async (req, res) => {
//  try {
//    const { name, email, password } = req.body;
//    const hashedPassword = await bcrypt.hash(password, 10);
//    const newUser = new User({ name, email, password: hashedPassword });
//    await newUser.save();
//    res.status(201).json({ message: 'User registered successfully' });
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});
//
//// Login user
//router.post('/login', async (req, res) => {
//  try {
//    const { email, password } = req.body;
//    const user = await User.findOne({ email });
//    if (!user) return res.status(404).json({ message: 'User not found' });
//
//    const isMatch = await bcrypt.compare(password, user.password);
//    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
//
//    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//    res.status(200).json({ token });
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});
//
//// get users
//router.get('/', async (req, res) => {
//  try {
//    const users = await User.find();
//    res.status(200).json(users);
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//
//});
//
//
//
//
//// delete student by id
//router.delete('/:id', async(req, res)=>{
//  try{
//      const student = await User.findById(req.params.id);
//      if(!student){
//          return res.status(404).json({message: "Student not found"});
//      }
//      await student.deleteOne();
//      res.status(200).json({message: "Student deleted successfully"});
//  }catch(err){
//      res.status(500).json({error: err.message});
//  }
//})
//
//module.exports = router;

//original code above.........................................................................................................................
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config(); // Ensure environment variables are loaded

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role: role || "student" });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
