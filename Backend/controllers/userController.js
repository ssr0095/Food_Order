import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    //JWT token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `Error: ${error}` });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); //, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Validation
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email address" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
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

    const user = await newUser.save();

    //JWT token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `Error: ${error}` });
  }
};

export { loginUser, registerUser };
