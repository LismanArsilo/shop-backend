import mongoose from "mongoose";
import Store from "../models/Store.js";
import HttpCodes from "../utils/httpCodes.js";
import { createError } from "../utils/error.js";

const getAllStore = async (req, res, next) => {
  try {
    const allStore = await Store.find({});

    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Get All Successfully",
      data: allStore,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSellerStore = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const allStore = await Store.find({
      user_id: new mongoose.Types.ObjectId(userId),
    });

    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Get All Successfully",
      data: allStore,
    });
  } catch (error) {
    next(error);
  }
};

const createStore = async (req, res, next) => {
  try {
    const { user, name, category, location } = req.body;

    if (!user) {
      return next(createError(HttpCodes.BAD_REQUEST, "User Store is require"));
    }

    const userId = new mongoose.Types.ObjectId(user);
    const newStore = new Store({
      user_id: userId,
      name,
      category,
      location: {
        type: "Point",
        coordinates: location?.coordinates, //[Long, Lat]
      },
    });
    await newStore.save();

    return res.status(HttpCodes.CREATED).json({
      status: true,
      message: "Create Store Successfully",
      data: newStore,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllSellerStore,
  getAllStore,
  createStore,
};
