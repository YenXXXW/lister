import { prisma } from "@/lib/db/prisma";
import React from "react";
import ProductCard from "./ProductCard";
import HeadOfContent from "@/components/headOfContent";
import { unstable_cache } from "next/cache";
import Link from "next/link";

interface ProductPageProps {
  params: { category: string };
  searchParams: { id: string };
}

// const getProduts = unstable_cache(
//   async (id) =>
//     await prisma.product.findMany({
//       orderBy: { id: "desc" },
//       where: {
//         categoryId: id,
//       },
//     }),
//   ["products"]
// );

export default async function Productpage({
  params: { category },
  searchParams: { id },
}: ProductPageProps) {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: {
      categoryId: id,
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <HeadOfContent
        isProductsPage={true}
        contentName={"Products"}
        navigateTo={category + "/addProduct" + `?id=${id}`}
      />
      <div className="w-full flex justify-between">
        <h3 className="font-bold text-2xl">{category}</h3>
      </div>
      {products.length === 0 && <p className="mt-4">No products added</p>}
      {products.map((product) => (
        <ProductCard product={product} category={category} key={product.id} />
      ))}
    </div>
  );
}
