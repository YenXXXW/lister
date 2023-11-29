"use client";

import { useState, useTransition } from "react";
import { addCategorySeverFunction } from "../categoriesActions";
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    startTransition(async () => {
      await addCategorySeverFunction(inputValue);
      setIsSuccess(true);
    });
  };
  return (
    <div className="w-full px-44 h-full mt-5">
      <h2 className="addPageHeader">Add Category</h2>
      <form onSubmit={(e) => addCategory(e)}>
        <input
          name="categoryName"
          tabIndex={0}
          required
          placeholder="Category Name"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          type="submit"
          className={`btn btn-accent w-full relative ${
            isPending && "pointer-events-none"
          }`}
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
          <span className="text-success">Added to categories</span>
        )}
      </div>
    </div>
  );
}
