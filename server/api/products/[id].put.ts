// import prisma from "~/lib/prisma";
import { Product } from "../../models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;
    const productById = await Product.findByPk(Number(id));
    // const productById = await prisma.products.findUnique({
    //   where: {
    //     p_id: Number(id),
    //   },
    //   select: {
    //     p_id: true,
    //     p_name: true,
    //     p_price: true,
    //     p_amount: true,
    //   },
    // });
    if (!productById) {
      setResponseStatus(event, 500);
      return createError({
        statusCode: 500,
        statusMessage: `Product id ${id} not found`,
      });
    }
    const body: Product = await readBody(event);
    const payload = {
      ...productById,
      ...body,
    };
    // const updateProduct = await prisma.products.update({
    //   where: {
    //     p_id: Number(id),
    //   },
    //   data: payload,
    // });
    const updateProduct = await Product.update(payload, {
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
