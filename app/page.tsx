import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import SummaryCards from "./(home)/_components/summary-cards";
import TimeSelect from "./(home)/_components/time-select";
import { isMatch } from "date-fns";

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
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  );
};

export default Home;
