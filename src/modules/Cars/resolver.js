import { Cars, Users } from "../../models/index.js";
import { tokenVerify } from "../../utils/tokenVerify.js";
import { UploadFile } from "../../utils/uploadFile.js";

export default {
  Query: {
    getCars: async (_, args) => {
      const { category_id } = args;

      const data = await Cars.findAll({ where: { category_id } });

      return {
        status: 200,
        message: "Okay",
        data,
      };
    },
  },
  Mutation: {
    createCar: async (_, args, context) => {
      try {
        const user = await tokenVerify(context);
        if (!user || user?.role !== "admin")
          return { status: 400, message: "Not Login" };

        const car = await Cars.findOne({ where: { name: args.name } });
        if (car)
          return {
            status: 200,
            message: "This car already exists",
          };

        const tashqi_rasm = [];
        const ichki_rasm = [];

        for (let i of args["tashqi_rasm"]) {
          tashqi_rasm.push(UploadFile(i.file));
        }
        for (let i of args["ichki_rasm"]) {
          ichki_rasm.push(UploadFile(i.file));
        }

        Cars.create({
          ...args,
          tashqi_rasm,
          ichki_rasm,
        });

        return {
          status: 200,
          message: "Okay",
          data: {
            ...args,
            tashqi_rasm,
            ichki_rasm,
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
    like: async (_, args, context) => {
      try {
        const user = await tokenVerify(context);
        if (!user) return { status: 400, message: "Not Login" };
        const { car_id } = args;
        const cars = await Cars.findOne({ where: { id: car_id } });
        if (!cars)
          return {
            status: 404,
            message: "Car not found",
          };

        let { id, likes } = user;

        if (!likes) {
          Users.update(
            {
              likes: [car_id],
            },
            { where: { id } }
          );

          return {
            status: 200,
            message: "Liked",
          };
        }

        if (likes?.includes(car_id)) {
          Users.update(
            {
              likes: likes.filter((el) => el != car_id),
            },
            { where: { id } }
          );

          return {
            status: 200,
            message: "Did not like",
          };
        }

        Users.update(
          {
            likes: [...likes, car_id],
          },
          { where: { id } }
        );

        return {
          status: 200,
          message: "Liked",
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
