"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  UpadateProductServerAction,
  getProductServerAction,
} from "../productActions";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

type UpdateProductpageProps = {
  params: { category: string };
  searchParams: { id: string };
};

export default function UpdateProductpage({
  searchParams: { id },
  params: { category },
}: UpdateProductpageProps) {
  const [upateProductName, setUpdateProductName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  let product: Product | null;

  useEffect(() => {
    const getProduct = async () => {
      product = await getProductServerAction(id);
      if (product) {
        setUpdateProductName(product.productName);
        setUpdatePrice(product.price);
      }
    };

    getProduct();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            await UpadateProductServerAction(id, upateProductName, updatePrice);
            router.back();
          });
        }}
      >
        <label>
          Product Name
          <input
            required
            value={upateProductName}
            onChange={(e) => setUpdateProductName(e.target.value)}
          />
        </label>
        <label>
          Product Price
          <input
            required
            value={updatePrice}
            onChange={(e) => setUpdatePrice(e.target.value)}
          />
        </label>
        <button
          className={`btn btn-accent w-full ${
            isPending && "pointer-events-none"
          } `}
        >
          Update
          {isPending && <span className="loading loading-spinner" />}
        </button>
      </form>
    </div>
  );
}
