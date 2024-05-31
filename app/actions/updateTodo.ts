"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function toggleTodoCompletion(formData: any) {
  const id = parseInt(formData.get("id"));
  try {
    // احصل على الحالة الحالية للمهمة
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { completed: true },
    });

    // إذا كانت المهمة موجودة، قم بتبديل حالة completed
    if (todo) {
      const newCompletedStatus = !todo.completed;
      await prisma.todo.update({
        where: { id },
        data: { completed: newCompletedStatus },
      });
      revalidatePath('/');
    } else {
      throw new Error(`Todo with id ${id} not found`);
    }
  } catch (e) {
    console.error("Failed to toggle todo completion:", e);
  }
}
