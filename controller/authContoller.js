import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import { cmpPassword, hashPassword } from "../utils/passwordUtils.js";
import { UnAuthenticatedError } from "../errors/errors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstUser = (await userModel.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await userModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};
export const login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  const isValidUser =
    user && (await cmpPassword(req.body.password, user.password));
  if (!isValidUser) throw new UnAuthenticatedError("invalid credential");
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: false,
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logoutUser = (req, res) => {
  res.cookie("token", "logoutUser", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
