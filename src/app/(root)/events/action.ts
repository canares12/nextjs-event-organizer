"use server";

import prisma from "@/lib/db/prisma";
import { handleError } from "@/lib/utils";
import { Category } from "@prisma/client";

export async function createCategory(categoryName: string) {
  const newCategory = await prisma.category.create({
    data: {
      name: categoryName.trim(),
    },
  });

  return newCategory;
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}
