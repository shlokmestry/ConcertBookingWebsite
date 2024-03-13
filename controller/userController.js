import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import showModel from "../models/showModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const currentUser = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  console.log(user);
  const withoutPassUser = user.toJSON();
  console.log(withoutPassUser);
  res.status(StatusCodes.OK).json({ user: withoutPassUser });
};

export const showsStats = async (req, res) => {
  const users = await userModel.countDocuments();
  const shows = await showModel.countDocuments();
  res.status(StatusCodes.OK).json({ users, shows });
};

export const editUser = async (req, res) => {
  console.log(req.file);
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avartarPublicId = response.public_id;
  }
  const editedUser = await userModel.findByIdAndUpdate(
    req.user.userId,
    newUser
  );

  if (req.file && editedUser.avartarPublicId) {
    await cloudinary.v2.uploader.destroy(editedUser.avatarPublicID);
  }
  res.status(StatusCodes.OK).json({ msg: "edit shows stats" });
};
