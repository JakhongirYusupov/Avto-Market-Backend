import { Category } from "../../models/index.js";
import { tokenVerify } from "../../utils/tokenVerify.js";
import { UploadFile } from "../../utils/uploadFile.js";

export default {
  Query: {
    getCategory: async () => {
      const data = await Category.findAll();
      return {
        status: 200,
        message: "Success",
        data,
      };
    },
  },

  Mutation: {
    createCategory: async (_, args, context) => {
      try {
        console.log(args);
        const user = await tokenVerify(context);
        if (!user || user?.role !== "admin")
          return { status: 400, message: "Not Login" };

        const {
          category,
          image: { file },
        } = args;

        const fileUrl = UploadFile(file);

        const data = await Category.findOne({ where: { category } });
        if (data)
          return {
            status: 400,
            message: "This category already exists",
          };

        const res = await Category.create({
          category,
          image: fileUrl,
        });

        return {
          status: 200,
          message: "Category created",
          data: res.dataValues,
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
