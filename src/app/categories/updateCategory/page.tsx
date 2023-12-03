"use client";

import React, { useTransition } from "react";
import { useEffect, useState } from "react";
import {
  getCategoryServerAction,
  updateCategorySeverAction,
} from "../categoriesActions";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UpdateCategorypageProps {
  searchParams: { id: string };
}

export default function UpdateCategorypage({
  searchParams: { id },
}: UpdateCategorypageProps) {
  let category: Category | null;
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getcategory = async () => {
      category = await getCategoryServerAction(id);
      category && setInputValue(category?.categoryName);
    };

    getcategory();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await updateCategorySeverAction(inputValue, id);
    });
  };

  return (
    <div className="w-full md:px-10">
      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <label className="flex flex-col w-full">
          Category Name
          <input
            type="text"
            name="newCategoryName"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            tabIndex={0}
          />
        </label>
        <button
          type="submit"
          className={`btn btn-accent w-full ${
            isPending && "pointer-events-none"
          } `}
        >
          Update
          {isPending && <span className="loading loading-spinner" />}
        </button>
      </form>
      <button
        className="btn btn-accent btn-outline mt-5"
        onClick={() => router.back()}
      >
        back
      </button>
    </div>
  );
}
