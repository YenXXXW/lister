"use server";

import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteProductServerAction(product: Product) {
  await prisma.product.delete({
    where: {
      id: product.id,
    },
  });
  revalidatePath("/categories/[category]");
}

export async function addProductSeverAction(
  categoryId: string,
  productName: string,
  price: number
) {
  if (!productName || !price || !categoryId) throw Error("Fields Missing");

  await prisma.product.create({
    data: {
      categoryId,
      productName,
      price,
    },
  });
  revalidatePath("/categories/[category]");
}

export async function getProductServerAction(id: string) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}
export async function UpadateProductServerAction(
  id: string,
  updatedProductName: string,
  updatedPrice: number
) {
  await getProductServerAction(id);

  if (!updatedProductName || !updatedPrice)
    throw Error("All fields must be filled");

  await prisma.product.update({
    where: { id },
    data: {
      productName: updatedProductName,
      price: updatedPrice,
    },
  });

  revalidatePath(`/categories/[category]`);
}
