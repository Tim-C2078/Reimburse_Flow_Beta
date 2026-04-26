"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Lottie from "lottie-react";
import chartAnimation from "./Bar Chart.json";
import Calendar from "@/components/monthly expenses/Calendar Lottie Animation.json";
import {
  ChartNoAxesCombined,
  ChartPie,
  Clock,
  Hourglass,
  ShieldEllipsis,
  ChartSpline,
} from "lucide-react";
import BarChart from "@/components/monthly expenses/barChart";
import PieChart from "@/components/monthly expenses/pieChart";
import LineChart from "@/components/monthly expenses/lineChart";

const AnalyticsPage = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold leading-none tracking-tight mx-4">
          Analytics
        </h1>

        <p className="text-sm text-muted-foreground mt-2 mx-4">
          Analyze overall spending trends and view segmented data through
          interactive charts.
        </p>

        <div className="grid lg:grid-cols-4 gap-4 my-7 mx-4">
          {/* CARD 1 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Pending</CardTitle>
              <Clock />
            </CardHeader>

            <CardContent className="py-5">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  $9,00,000
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

          {/* CARD 2 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Processing</CardTitle>
              <ShieldEllipsis />
            </CardHeader>

            <CardContent className="py-5">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  $50,000
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

          {/* CARD 3 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Expense Distribution</CardTitle>
              <ChartPie />
            </CardHeader>

            <CardContent className="pb-0">
              <PieChart />
            </CardContent>
          </Card>

          {/* CARD 4 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Average Duration</CardTitle>
              <Hourglass />
            </CardHeader>

            <CardContent className="py-5">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                  15 Days
                </h2>

                <div className="w-16 h-16 flex-shrink-0">
                  <Lottie
                    animationData={Calendar}
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>

              <p className="text-sm mt-2 text-red-600">
                - 10% Improvement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 my-7 mx-4">
        <Card className="shadow-md col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ChartNoAxesCombined />
              <span>Monthly Expense Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AnalyticsPage;
