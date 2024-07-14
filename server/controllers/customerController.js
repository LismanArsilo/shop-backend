import Shop from "../models/Store.js";
import HttpCodes from "../utils/httpCodes.js";
import { createError } from "../utils/error.js";

const getAllStoreLocUser = async (req, res, next) => {
  try {
    const { long, lat } = req.query;
    const longitude = parseFloat(long);
    const latitude = parseFloat(lat);

    const stores = await Shop.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 1000, //1Km
        },
      },
    });

    return res.status(HttpCodes.OK).json({
      status: true,
      message: "Get All Store Successfully",
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    next(createError(HttpCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
  }
};

export default { getAllStoreLocUser };
