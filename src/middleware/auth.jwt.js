import jwt  from "jsonwebtoken";
import { StatusCodes }  from "http-status-codes";
import jsonData  from "../helpers/response.js";
import redis  from "../helpers/redis.js";
const TOKEN_VALUE_INDEX = 1;

export default async (req, res, next) => {
  // eslint-disable-next-line no-undef
  const { JWT_SECRET } = process.env;
  let header = req.header("Authorization");
  if (!header) {
    return res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Please enter token"));
  }

  let token = header.split(" ")[TOKEN_VALUE_INDEX];
  try {
    let data = await redis.getAllValuesArr("blacklist");
    if (data.indexOf(token) > -1) {
      return res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Token invalid"));
    }
  } catch (error) {
    console.log("Error find token redis", error);
  }

  jwt.verify(token, JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Token not match or expired"));
    }
    let redisUser = await redis.getValues(data.user_id);
    if (redisUser) {
      let parserRedisUser = JSON.parse(redisUser)
      if(parserRedisUser.token_values.token !== token) {
        return res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Token invalid"));
      }
      req.user = data;
      return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Token not match or expired"));
  });
};
