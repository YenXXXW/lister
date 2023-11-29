"use client";

import React, { useState, useTransition } from "react";
import { deleteCategorySeverFunction } from "./categoriesActions";
import DeleteIcon from "@/components/DeleteIcon";

interface DeleteCategoryProps {
  categoryId: string;
}

export default function DeleteCategory({ categoryId }: DeleteCategoryProps) {
  const [isPending, startTransition] = useTransition();

  const deleteCategory = (categoryId: string) => {
    startTransition(async () => {
      await deleteCategorySeverFunction(categoryId);
    });
  };
  return (
    <div>
      <div onClick={() => deleteCategory(categoryId)}>
        {isPending && (
          <span className="loading loading-spinner loading-sm text-red-400" />
        )}
        {!isPending && <DeleteIcon />}
      </div>
    </div>
  );
}
