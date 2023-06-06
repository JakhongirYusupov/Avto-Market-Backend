import { Cars, Category, Korzina, Users } from "../../models/index.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import { tokenVerify } from "../../utils/tokenVerify.js";
import { UploadFile } from "../../utils/uploadFile.js";
const TOKEN_KEY = process.env.TOKEN_KEY;

// Users.sync({ force: false });
// Korzina.sync({ force: false });
// Category.sync({ force: false });
// Cars.sync({ force: false });ss

export default {
  Query: {
    login: async (_, args, context) => {
      try {
        const { email, password } = args;

        const user = await Users.findOne({
          where: { email, password: jwt.sign(password, TOKEN_KEY) },
        });

        if (!user)
          return {
            status: 404,
            message: "Email or password wrong!",
          };

        delete user.dataValues.password;

        return {
          status: 200,
          message: "User login",
          data: {
            token: jwt.sign(user.dataValues, TOKEN_KEY + context["user-agent"]),
          },
        };
      } catch (error) {
        return {
          status: 500,
          message: "INTERNAL SERVER REGISTER ERROR",
          data: error,
        };
      }
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        console.log(args);
        const {
          username,
          email,
          password,
          avatar: { file },
        } = args;

        const user = await Users.findOne({ where: { email } });
        if (user) return { status: 400, message: "Email already exist" };

        Users.create({
          username,
          email,
          password: jwt.sign(password, TOKEN_KEY),
          avatar_url: UploadFile(file),
        });

        return {
          status: 200,
          message: "User create!",
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          message: "INTERNAL SERVER REGISTER ERROR",
          data: error,
        };
      }
    },

    updateUser: async (_, args, context) => {
      try {
        const foundUser = await tokenVerify(context);
        if (!foundUser) return { status: 400, message: "Not Login" };

        let { id, username, email, password, avatar, role } = foundUser;
        username = args?.username ? args.username : username;
        email = args?.email ? args.email : email;
        password = args?.password
          ? jwt.sign(args.password, TOKEN_KEY)
          : password;

        if (args.avatar) {
          avatar = UploadFile(args.avatar.file);
        }

        const res = await Users.update(
          {
            username,
            email,
            password,
            avatar,
            role,
          },
          { where: { id } }
        );

        if (res[0] === 1)
          return {
            status: 200,
            message: "User updated",
            data: {
              token: jwt.sign({ id, username, email, avatar }, TOKEN_KEY),
            },
          };

        return {
          status: 200,
          message: "User did not updated",
        };
      } catch (error) {
        return {
          status: 500,
          message: "INTERNAL SERVER REGISTER ERROR",
          data: error,
        };
      }
    },
  },
};
