import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import transporter from "../config/nodeMailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplate.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Details missing" });
  }

  try {
    //Validation
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    //JWT token
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      isAccountVerified: user.isAccountVerified,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.json({ success: false, message: `Error: ${error.message}` });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); //, { expiresIn: "1h" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Details missing" });
  }

  try {
    //Validation

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email address" });
    }

    if (name.length < 4) {
      return res.json({ success: false, message: "Enter valid name" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
    }

    const exists = await userModel.findOne({ email });

    if (exists) {
      if (exists.isAccountVerified) {
        return res.json({
          success: false,
          message: "User already exists",
          isAccountVerified: exists.isAccountVerified,
        });
      } else {
        const token = createToken(exists._id);
        return res.json({
          success: false,
          message: "User already exists, but email not verified",
          token,
          isAccountVerified: exists.isAccountVerified,
        });
      }
    }

    //Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Save
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    //JWT token
    const token = createToken(newUser._id);

    res.json({
      success: true,
      token,
      isAccountVerified: newUser.isAccountVerified,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.json({ success: false, message: `Error: ${error.message}` });
  }
};

const sendVerifyOTP = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Accounct already verified" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOTP = OTP;
    user.verifyOTPexpireAt = Date.now() + 3 * 60 * 1000;
    await user.save();

    //Sending email
    const mailOptions = {
      from: process.env.SMTP_SENDER,
      to: user.email,
      subject: "Account Verfication OTP",
      // text: `Your OTP is ${OTP} Verify your account using this OTP. This will expire in 3 minutes`,
      html: EMAIL_VERIFY_TEMPLATE.replace("{{name}}", user.name)
        .replaceAll("{{OTP}}", user.verifyOTP)
        .replace("{{FRONT_URL}}", process.env.FRONT_URL)
        .replace("{{token}}", req.headers.token),
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!userId || !OTP) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOTP === "" || user.verifyOTP !== OTP) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOTPexpireAt < Date.now()) {
      return res.json({ success: false, message: "Invalid OTP time" });
    }
    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOTPexpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Account verfied successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error: " + error.message + "now auth contr");
  }
};

const sendResetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOTP = OTP;
    user.resetOTPexpireAt = Date.now() + 3 * 60 * 1000;
    await user.save();

    //Sending email
    const mailOptions = {
      from: process.env.SMTP_SENDER,
      to: user.email,
      subject: "Password Reset OTP",
      html: PASSWORD_RESET_TEMPLATE.replace("{{name}}", user.name)
        .replaceAll("{{OTP}}", user.resetOTP)
        .replaceAll("{{EMAIL}}", user.email)
        .replace("{{FRONT_URL}}", process.env.FRONT_URL),
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Reset OTP sent" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyResetOTP = async (req, res) => {
  const { email, OTP } = req.body;
  if (!email || !OTP) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.resetOTP === "" || user.resetOTP !== OTP) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOTPexpireAt < Date.now()) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    user.resetOTP = "";
    user.resetOTPexpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Reset OTP verfied successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// const getUser = async (req, res) => {
//   const { userId, OTP } = req.body;
//   if (!userId || !OTP) {
//     return res.json({ success: false, message: "Missing details" });
//   }
//   try {
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     return res.json({ success: true, data: user });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

const isAuthenticated = async (req, res) => {
  const { userId } = req.body;
  try {
    if (userId) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "not verified" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error: " + error);
  }
};

export {
  register,
  login,
  sendVerifyOTP,
  verifyEmail,
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
  isAuthenticated,
  // getUser,
};
