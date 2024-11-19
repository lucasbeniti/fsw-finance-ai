import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";
import { redirect } from "next/navigation";

export const getCurrentMonthTransaction = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const date = new Date();
  const currentMonthTransactions = await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
    },
  });
  return currentMonthTransactions;
};
