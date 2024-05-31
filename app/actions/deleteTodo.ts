"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export default async function deleteTodo(formData: any) {
  const id = parseInt(formData.get("id"));
  try {
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (e) {
    console.error("Failed to delete todo:", e); // تعديل لتعزيز قراءة الأخطاء
  }
}