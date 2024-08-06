import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  try {
    const { id }: any = event.context.params;
    const productById = await UserModel.findByPk(Number(id));
    if (!productById) {
      setResponseStatus(event, 500);
      return createError({
        statusCode: 500,
        statusMessage: `User id ${id} not found`,
      });
    }
    const body: Product = await readBody(event);
    const payload = {
      ...productById,
      ...body,
    };
    const updateProduct = await UserModel.update(payload, {
      where: {
        p_id: Number(id),
      },
    })
    return updateProduct;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
