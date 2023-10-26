const { hashPassword, comparePassword } = require("../helpers/auth");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
let { expressjwt: jwt } = require("express-jwt");

// middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// Register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and 6 character long",
      });
    }

    // exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Register With This Email",
      });
    }

    // Hashded password
    const hashedPassword = await hashPassword(password);

    // save data user
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registeration Successfully please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Enter Email Or Password ",
      });
    }
    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Match Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    // Token JWT
    const token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // undefned password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login Api",
      error,
    });
  }
};

// Update User
const updateUseController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // User find
    const user = await userModel.findOne({ email });
    // Password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    // Update User
    const updateedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      {
        new: true,
      }
    );
    updateedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile has been updated please login",
      updateedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update API",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUseController,
};
