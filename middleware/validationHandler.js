import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthaurizedError,
} from "../errors/errors.js";
import { SHOW_TIMING } from "../utils/constants.js";
import mongoose from "mongoose";
import showModel from "../models/showModel.js";
import userModel from "../models/userModel.js";

const validationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no show")) {
          throw new NotFoundError(errorMessage);
        }
        if (errorMessage[0].startsWith("unauthorised access")) {
          throw new UnAuthaurizedError("unauthorised access");
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateShowInputs = validationError([
  body("show_artist").notEmpty().withMessage("Artist name is required"),
  body("show_type").notEmpty().withMessage("What is the show about?"),
  body("show_location").notEmpty().withMessage("Show location is required"),
  body("show_Description")
    .notEmpty()
    .withMessage("Provide decription of the show."),
  /*body("show_Timing").isIn(
    Object.values(SHOW_TIMING).withMessage("Invalid timing")
  ),*/
]);

export const validateShowID = validationError([
  param("id").custom(async (value, { req }) => {
    const isValidID = mongoose.Types.ObjectId.isValid(value);
    if (!isValidID) throw new BadRequestError("Invalid Show ID");
    const show = await showModel.findById(id);

    if (!show) throw new NotFoundError(`no show with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === show.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnAuthaurizedError("unauthorised access");
  }),
]);

export const validateUserRegister = validationError([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email) => {
      const user = await userModel.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("must be atleast 8 letters"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastname is required"),
]);

export const validateUserLogin = validationError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateEditedUser = validationError([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email) => {
      const user = await userModel.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already exists");
      }
    }),

  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastname is required"),
]);
