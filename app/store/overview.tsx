"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Lottie from "lottie-react";
import chartAnimation from "./Bar Chart.json";
import TableDesign from "@/components/Users_Table/data-table";
import {
  TriangleAlert,
  Clock,
  Landmark,
  ShieldEllipsis,
  ScanEye,
} from "lucide-react";
import { log } from "next/dist/server/typescript/utils";


const Dashboard = () => {

  const budget = 5000;
  const pending = 4000;
  const processing = 2500;
  const paid = 1000;
  
  const isOverLimit = pending > budget * 0.6;

  return (
    <>
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mx-4">KFC Osu</h1>
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
      <div><TableDesign/></div>
    </>
  );
};

export default Dashboard;
