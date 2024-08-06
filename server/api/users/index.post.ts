import { UserModel, } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await UserModel.create(body);
    setResponseStatus(event, 201);
    return user;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
