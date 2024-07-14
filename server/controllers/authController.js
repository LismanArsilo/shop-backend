import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import HttpCodes from "../utils/httpCodes.js";
import mongoose from "mongoose";

const registration = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const roleId = new mongoose.Types.ObjectId(role);
    const newUser = new User({
      role_id: roleId,
      username: username,
      email: email,
      password: hash,
    });

    await newUser.save();

    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Register Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, accountPassword } = req.body;

    const data = await User.findOne({
      $or: [{ username: account }, { email: account }],
    });

    if (!data)
      return next(
        createError(HttpCodes.BAD_REQUEST, "Username Or Password Invalid")
      );

    const isPassword = await bcrypt.compare(accountPassword, data.password);
    if (!isPassword)
      return next(
        createError(HttpCodes.BAD_REQUEST, "Username Or Password Invalid")
      );

    const token = jwt.sign(
      {
        id: data.id,
        role_id: data.role_id,
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );
    const { password, ...otherDetails } = data._doc;

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(HttpCodes.OK)
      .json({
        status: true,
        message: "Login Successfully",
        data: { ...otherDetails },
        token,
      });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(400).json({
        status: false,
        message: "No token provided",
      });
    }

    res.clearCookie("access_token");

    return res.status(200).json({
      status: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { registration, login, logout };
