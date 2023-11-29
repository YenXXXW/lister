import UpdateIcon from "@/components/UpdateIcon";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import DeleteProduct from "./deleteProduct/deleteProduct";

interface ProductCardProps {
  product: Product;
  category: string;
}

export default function ProductCard({ product, category }: ProductCardProps) {
  return (
    <div className="w-full border-[1px] rounded-md border-slate-400 flex items-center justify-between px-4 py-2">
      <div className="flex w-full justify-between">
        <p>{product.productName}</p>
        <p>{product.price}</p>
      </div>

      <div className="px-3 flex gap-3">
        <Link href={category + "/updateProduct?id=" + product.id}>
          <UpdateIcon />
        </Link>
        <DeleteProduct product={product} />
      </div>
    </div>
  );
}
