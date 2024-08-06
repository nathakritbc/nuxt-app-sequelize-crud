// import prisma from "~/lib/prisma";
import { Product } from "../../models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;
    // const product = await prisma.products.findUnique({
    //   where: {
    //     p_id: Number(id),
    //   },
    // });
    const product = await Product.findByPk(Number(id));
    return product;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
