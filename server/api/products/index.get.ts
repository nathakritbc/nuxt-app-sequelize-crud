import { defineEventHandler } from "h3";
import { Product } from "../../models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const products: Product[] = await Product.findAll({});
    return products;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
