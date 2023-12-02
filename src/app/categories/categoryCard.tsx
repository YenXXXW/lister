import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";
import DeleteCategory from "./deleteCategory";

import UpdateIcon from "@/components/UpdateIcon";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="w-full border-[1px] rounded-md border-slate-400 flex items-center justify-between pr-4">
      <p className="p-3 text-xl">{category.categoryName}</p>
      <div className="flex gap-3 items-center">
        <Link href={"/categories/updateCategory?id=" + category.id}>
          <UpdateIcon />
        </Link>

        <DeleteCategory categoryId={category.id} />

        <Link href={`/categories/${category.categoryName}?id=${category.id}`}>
          <span className="px-2">
            <svg
              width="30px"
              height="30px"
              strokeWidth="1.3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#063970"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
