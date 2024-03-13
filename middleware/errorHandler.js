import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong";
  res.status(500).json({ msg });
};

export default errorHandler;
