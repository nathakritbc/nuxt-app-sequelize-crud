import { defineEventHandler } from "h3";
import { Product } from "../../models/Product.model";
export default defineEventHandler(async (event) => {
  try {
    const body: Product = await readBody(event);
    const user = await Product.create(body);
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
