// app/page.tsx

import { PrismaClient } from "@prisma/client";
import Home from "@/components/home";

const prisma = new PrismaClient();

export default async function Page() {
  const todos = await prisma.todo.findMany();
  return <Home todos={todos} />;
}
