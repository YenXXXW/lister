import { prisma } from "@/lib/db/prisma";
import React from "react";
import CategoryCard from "./categoryCard";
import HeadOfContent from "@/components/headOfContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UnauthoriedUserView from "@/components/UnauthoriedUserView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - Lister",
};

export default async function Categories() {
  const session = await getServerSession(authOptions);

  const categories = await prisma.category.findMany({
    orderBy: { id: "desc" },
    where: {
      userId: session?.user.id,
    },
  });

  if (!session) {
    return <UnauthoriedUserView />;
  }
  return (
    <div className="flex flex-col gap-2">
      <HeadOfContent
        isProductsPage={false}
        contentName={"Categories"}
        navigateTo="/categories/addCategory"
      />
      {categories.length === 0 && <p className="mt-4">No categories added</p>}
      {categories.length !== 0 &&
        categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
    </div>
  );
}
