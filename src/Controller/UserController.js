const userModel = require("../Model/ProductsModel");
const bcrypt = require("bcrypt");
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

module.exports = {
  registration,
};