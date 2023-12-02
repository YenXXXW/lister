"use client";
import React, { useState, useTransition } from "react";
import { addProductSeverAction } from "../productActions";
import { useRouter } from "next/navigation";

interface AddProductPageProps {
  searchParams: { id: string };
  params: { category: string };
}

export default function AddProductPage({
  searchParams: { id },
  params: { category },
}: AddProductPageProps) {
  const [procuctName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    startTransition(async () => {
      await addProductSeverAction(id, procuctName, price);
      setIsSuccess(true);
      setProductName("");
      setPrice("");
    });
  };
  return (
    <div className="w-full md:px-44">
      <h2 className="addPageHeader">
        Add Product to <span className="text-blue-600">{category}</span>
      </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="flex flex-col">
          Product Name
          <input
            name="productName"
            value={procuctName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            required
            placeholder="Product Name"
            tabIndex={0}
          />
        </label>
        <label className="flex flex-col">
          Price
          <input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            required
            placeholder="Price"
            tabIndex={0}
          />
        </label>
        <button
          type="submit"
          className={`btn btn-accent w-full relative ${
            isPending && "pointer-events-none"
          } `}
        >
          Add{" "}
          {isPending && (
            <span className="absolute right-[40%] loading loading-spinner loading-md" />
          )}
        </button>
      </form>
      <div className="flex justify-between items-center pr-20">
        <div
          onClick={() => router.back()}
          className="mt-3 btn btn-outline btn-info"
        >
          Go back
        </div>
        {!isPending && isSuccess && (
          <span className="text-success">Added to {category}</span>
        )}
      </div>
    </div>
  );
}
