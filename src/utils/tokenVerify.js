import { verify } from "jsonwebtoken";
import { Users } from "../models/users.js";
const TOKEN_KEY = process.env.TOKEN_KEY;

export const tokenVerify = async (context) => {
  try {
    const { token } = context;
    const data = verify(
      token,
      TOKEN_KEY + context["user-agent"],
      function (err, decoded) {
        return decoded;
      }
    );
    if (data?.email) {
      const user = await Users.findOne({ where: { email: data.email } });
      if (user) return user.dataValues;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
