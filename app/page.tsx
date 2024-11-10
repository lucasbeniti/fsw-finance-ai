import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import SummaryCards from "./(home)/_components/summary-cards";
import TimeSelect from "./(home)/_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./(home)/_components/transactions-pie-chart";
import { getDashboard } from "./_data/get-dashboard";
import ExpensesPerCategory from "./(home)/_components/expenses-per-category";

interface HomePage {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomePage) => {
  const { userId } = auth();

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect("?month=01");
  }
  if (!userId) {
    redirect("/login");
  }
  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
