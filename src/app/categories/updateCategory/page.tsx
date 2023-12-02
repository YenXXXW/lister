"use client";

import React, { useTransition } from "react";
import { useEffect, useState } from "react";
import {
  getCategoryServerAction,
  updateCategorySeverAction,
} from "../categoriesActions";
import { Category } from "@prisma/client";
import { useRouter } from "next/router";

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
      router.back();
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
            className="input border-slate-300 border-2 w-full  focus:outline-none"
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
    </div>
  );
}
