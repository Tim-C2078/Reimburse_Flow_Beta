"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Lottie from "lottie-react";
import chartAnimation from "@/app/dashboard/Bar Chart.json";
import { columns } from "@/components/Store_table/columns";
import { paymentsData } from "@/components/Store_table/data";
import { DataTable } from "@/components/Store_table/data-table";
import {
  Clock,
  Landmark,
  ShieldEllipsis,
  TriangleAlert,
  ScanEye,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const store = searchParams.get("store");
  const budget = Number(searchParams.get("budget") || 0);
  const pending = Number(searchParams.get("pending") || 0);
  const processing = Number(searchParams.get("processing") || 0);
  const paid = Number(searchParams.get("paid") || 0);

  const isOverLimit = pending > budget * 0.6;

  return (
    <>
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mx-4">{store}</h1>
          {isOverLimit && (
            <div className="text-white font-semibold flex gap-2 items-center pr-5">
              <TriangleAlert className="text-red-600" />
              <div className="text-red-600">Over 60% of budget pending</div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-4 my-7 mx-4">
          {/* CARD 1 */}
          <Card className="shadow-md ">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Budget</CardTitle>
              <Landmark />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  $ {budget.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <div className="w-16 h-16 flex-shrink-0">
                  <Lottie
                    animationData={chartAnimation}
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Total Petty Cash
              </p>
            </CardContent>
          </Card>
          {/* CARD 2 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Pending</CardTitle>
              <Clock />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  $ {pending.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <div className="w-16 h-16 flex-shrink-0">
                  <Lottie
                    animationData={chartAnimation}
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Unpaid Petty Cash
              </p>
            </CardContent>
          </Card>
          {/* CARD 3 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Processing</CardTitle>
              <ShieldEllipsis />
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  $ {processing.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <div className="w-16 h-16 flex-shrink-0">
                  <Lottie
                    animationData={chartAnimation}
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Pending With Finance
              </p>
            </CardContent>
          </Card>
          {/* CARD 4 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Under Review</CardTitle>
              <ScanEye />
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  $ {paid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <div className="w-16 h-16 flex-shrink-0">
                  <Lottie
                    animationData={chartAnimation}
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Pending Approval
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TABLE */}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={paymentsData}
          stores={store}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  );
};

export default Dashboard;
