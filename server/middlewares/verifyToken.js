import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import HttpCodes from "../utils/httpCodes.js";
import Role from "../models/Role.js";

// Pengecekan token dan validation
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(
        createError(HttpCodes.UNAUTHORIZED, "You are not authenticated!")
      );
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
      if (err) {
        return next(createError(HttpCodes.UNAUTHORIZED, "Token is not valid!"));
      }

      const roleId = user.role_id;
      const role = await Role.findById(roleId);

      if (role.name !== "Admin") {
        return next(
          createError(HttpCodes.FORBIDDEN, "You are not authorized!")
        );
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

const verifySeller = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(
        createError(HttpCodes.UNAUTHORIZED, "You are not authenticated!")
      );
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
      if (err) {
        return next(createError(HttpCodes.UNAUTHORIZED, "Token is not valid!"));
      }

      const roleId = user.role_id;
      const role = await Role.findById(roleId);
      if (role && (role.name === "Admin" || role.name === "Seller")) {
        next();
      } else {
        return next(
          createError(HttpCodes.FORBIDDEN, "You are not authorized!")
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

const verifyCustomer = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(
        createError(HttpCodes.UNAUTHORIZED, "You are not authenticated!")
      );
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
      if (err) {
        return next(createError(HttpCodes.UNAUTHORIZED, "Token is not valid!"));
      }

      const roleId = user.role_id;
      const role = await Role.findById(roleId);
      if (role && (role.name === "Admin" || role.name === "Customer")) {
        next();
      } else {
        return next(
          createError(HttpCodes.FORBIDDEN, "You are not authorized!")
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

export { verifySeller, verifyAdmin, verifyCustomer };
