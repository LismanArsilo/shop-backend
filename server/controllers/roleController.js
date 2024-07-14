import mongoose from "mongoose";
import Role from "../models/Role.js";
import { createError } from "../utils/error.js";
import HttpCodes from "../utils/httpCodes.js";

const getAllRole = async (req, res, next) => {
  try {
    const roles = await Role.find();
    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Get All Role Successfully",
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

const getOneRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.find({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!role) {
      return next(createError(HttpCodes.NOT_FOUND, "Role Not Found"));
    }

    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Get One Role Successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const { name } = req.body;

    const role = new Role({
      name,
    });
    await role.save();

    return res.status(HttpCodes.CREATED).json({
      status: true,
      message: "Create Role Successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;

    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return next(createError(HttpCodes.NOT_FOUND, "Role Not Found"));
    }

    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Delete Role Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { createRole, getOneRole, getAllRole, deleteRole };
