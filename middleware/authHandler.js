//import { verify } from "jsonwebtoken";
import { UnAuthaurizedError, UnAuthenticatedError } from "../errors/errors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnAuthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("authentication invalid");
  }
};

export const authorizePermission = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthaurizedError("unauthaurised error");
    }
    next();
  };
};
