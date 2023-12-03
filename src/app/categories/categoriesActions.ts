"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteCategorySeverFunction(categoryId: string) {
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  revalidatePath("/");
}

export async function addCategorySeverFunction(categoryName: string) {
  if (!categoryName) throw Error("Missing required fields");
  await prisma.category.create({
    data: {
      categoryName,
    },
  });

  revalidatePath("/");
}

export async function getCategoryServerAction(categoryId: string) {
  return await prisma.category.findUnique({
    where: { id: categoryId },
  });
}

export async function updateCategorySeverAction(
  newCategoryName: string,
  categoryId: string
) {
  if (!newCategoryName) throw Error("The Updated name must be filled");

  await prisma.category.update({
    where: { id: categoryId },
    data: {
      categoryName: newCategoryName,
    },
  });

  revalidatePath("/");
  redirect("/categories");
}
