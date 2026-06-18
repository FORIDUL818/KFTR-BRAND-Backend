
// registration 
const userModel = require("../Model/ProductsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const registration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    let hashPass = await bcrypt.hashSync(password,bcrypt.genSaltSync(10));

    const userData = new userModel({
      firstName,
      lastName,
      email,
      password:hashPass,
      role,
    });

   
    await userData.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userData,
    });

   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } 
};
// registration


//login 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userModel.findOne({ email });

    if (!userData) {
      return res.status(401).json({ message: "Email does not exist" });
    }

    // ✅ FIX: bcrypt.compare(plainPassword, hashedPassword)
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // res.status(200).json({
    //   message: "Login success",
    //   data: userData,
    // });

      let token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ status: "success", data: userData, token: token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login

// profileUpdate
const profileUpdate = async (req, res) => {
  try {
    const email = req.headers.email;
    
    if (!email) {
      return res.status(400).json({ message: "Email missing in headers" });
    }

    const body = req.body;

    const user = await userModel.updateOne(
      { email: email },
      { $set: body }
    );

    if (user.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Updated successfully", data: user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  registration,
  login,
  profileUpdate
};