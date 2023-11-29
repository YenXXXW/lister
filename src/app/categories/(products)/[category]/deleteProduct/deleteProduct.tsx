"use client";

import React, { useTransition } from "react";
import { deleteProductServerAction } from "../productActions";
import DeleteIcon from "@/components/DeleteIcon";
import { Product } from "@prisma/client";

type DeleteProductPageProps = {
  product: Product;
};

export default function DeleteProductpage({ product }: DeleteProductPageProps) {
  const [isPending, startTransition] = useTransition();
  const deleteProduct = () => {
    startTransition(async () => {
      await deleteProductServerAction(product);
    });
  };
  return (
    <div>
      <div onClick={deleteProduct}>
        {isPending && (
          <span className="loading loading-spinner loading-sm text-red-400" />
        )}
        {!isPending && <DeleteIcon />}
      </div>
    </div>
  );
}
