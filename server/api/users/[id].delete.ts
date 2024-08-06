import { UserModel } from "../../models/User.model";


export default defineEventHandler(async (event) => {
  try {
    const { id }: any = event.context.params;
    const deleteProduct = await UserModel.destroy({
      where: {
        p_id: Number(id),
      },
    })
    if (!deleteProduct) {
      setResponseStatus(event, 500);
      return createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
    return {
      statusCode: 200,
      message: `Product id ${id} deleted successfully`,
    };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
