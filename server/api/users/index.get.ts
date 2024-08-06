import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  try {
    const results: UserModel[] = await UserModel.findAll({
      order: [["id", "DESC"]],
    });
    return results;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
