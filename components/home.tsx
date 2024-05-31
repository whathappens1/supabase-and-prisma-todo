"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import addTodo from "@/app/actions/addTodo";
import deleteTodo from "@/app/actions/deleteTodo";
import { Card } from "@/components/ui/card";
import updateTodo from "@/app/actions/updateTodo";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface HomeProps {
  todos: Todo[];
}

export default function Home({ todos }: HomeProps) {
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<{ [key: number]: boolean }>({});
  const [loadingComplete, setLoadingComplete] = useState<{ [key: number]: boolean }>({});

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingAdd(true);
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await addTodo(formData);
      // Optionally handle success (e.g., refresh the todo list)
    } catch (error) {
      console.error("Failed to add todo", error);
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleDeleteTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const id = parseInt(formData.get("id") as string);
    setLoadingDelete((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteTodo(formData);
      // Optionally handle success (e.g., refresh the todo list)
    } catch (error) {
      console.error("Failed to delete todo", error);
    } finally {
      setLoadingDelete((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleCompleteTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const id = parseInt(formData.get("id") as string);
    setLoadingComplete((prev) => ({ ...prev, [id]: true }));
    try {
      await updateTodo(formData);
      // Optionally handle success (e.g., refresh the todo list)
    } catch (error) {
      console.error("Failed to update todo", error);
    } finally {
      setLoadingComplete((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <main className="p-24">
      <h1 className="text-center text-2xl font-semibold">قائمة المهام</h1>
      <form onSubmit={handleAddTodo} className="flex justify-center flex-col w-full sm:w-[250px] lg:w-[350px] mx-auto mt-3">
        <Input name="title" type="text" placeholder="أضف مهمة جديدة هنا.." />
        <Button type="submit" className="mt-3 w-full" loading={loadingAdd}>
          إضافة المهمة
        </Button>
      </form>
      <div className="">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-6 my-12 mx-auto w-full sm:w-[250px] lg:w-[350px]">
            <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
            <div className="flex items-center gap-3">
              <form onSubmit={handleDeleteTodo} className="mt-2">
                <input type="hidden" name="id" value={todo.id} />
                <Button type="submit" loading={loadingDelete[todo.id]}>
                  حذف
                </Button>
              </form>
              <form onSubmit={handleCompleteTodo} className="mt-2">
                <input type="hidden" name="id" value={todo.id} />
                <Button type="submit" variant="ghost" loading={loadingComplete[todo.id]}>
                  {todo.completed ? "إلغاء الإكمال" : "إكمال"}
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
