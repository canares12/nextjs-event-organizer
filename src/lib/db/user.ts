import { Prisma, User } from "@prisma/client";
import { CreateUserValues } from "../validation";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export type UpdateUserValues = Prisma.UserGetPayload<{
  select: { firstName: true; lastName: true; username: true; photo: true };
}>;

export async function createUserFromClerk(
  user: CreateUserValues,
): Promise<User> {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
}

export async function updateUserFromClerk(
  clerkId: string,
  user: UpdateUserValues,
): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: {
      clerkId: clerkId,
    },
    data: user,
  });

  return updatedUser;
}

export async function deleteUser(clerkId: string) {
  const userToDelete = await prisma.user.findUnique({
    where: { clerkId: clerkId },
  });

  if (!userToDelete) {
    throw new Error("User not found.");
  }

  const deletedUser = await prisma.user.delete({
    where: { clerkId: userToDelete.clerkId },
  });

  revalidatePath("/");

  return deletedUser ? deletedUser : null
}
