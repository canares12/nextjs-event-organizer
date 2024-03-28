import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import prisma from "@/lib/db/prisma";
import { Category } from "@prisma/client";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/app/(root)/events/action";

interface DropdownProps {
  value?: string;
  onChangeHandler?: () => void;
}

export default function CategoryDropdown({
  value,
  onChangeHandler,
}: DropdownProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    async function addCategory() {
      await createCategory(newCategory).then((category) => {
        setCategories((prevState) => [...prevState, category]);
      });
    }

    if (newCategory.length > 0) {
      addCategory();
      setNewCategory("");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList: Category[] = await getAllCategories();

      categoryList && setCategories(categoryList);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="flex-center flex w-full rounded-sm py-3  font-semibold text-primary hover:bg-gray-200 focus:bg-gray-100 focus:text-primary">
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}
