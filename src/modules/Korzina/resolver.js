import { Korzina } from "../../models/index.js";
import { tokenVerify } from "../../utils/tokenVerify.js";
import Cars from "../Cars/index.js";

export default {
  Mutation: {
    createKorzina: async (_, args, context) => {
      try {
        const user = await tokenVerify(context);
        if (!user) return { status: 400, message: "Not Login" };
        const { car_id } = args;

        const car = await Cars.findOne({ where: { id: car_id } });
        if (!car)
          return {
            status: 404,
            message: "Car not found",
          };

        const korzina = await Korzina.findOne({ where: { user_id: user.id } });
        if (!korzina) {
          Korzina.create({
            cars: [car_id],
            user_id: user.id,
          });

          return {
            status: 200,
            message: "Car added to korzina",
          };
        }
        let { id, cars } = korzina.dataValues;
        if (cars.includes(car_id)) {
          Korzina.update(
            {
              cars: cars.filter((el) => el != car_id),
            },
            { where: { id } }
          );

          return {
            status: 200,
            message: "Car deleted from korzina",
          };
        }

        Korzina.update(
          {
            cars: [...cars, car_id],
          },
          { where: { id } }
        );

        return {
          status: 200,
          message: "Car added to korzina",
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
