import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  try {
    const { id }: any = event.context.params;
    const result = await UserModel.findByPk(Number(id));
    return result;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
