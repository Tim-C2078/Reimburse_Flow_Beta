"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Lottie from "lottie-react";
import chartAnimation from "./Bar Chart.json";

const AnalyticsPage = () => {
  return (
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
          <CardHeader>
            <CardTitle>Total Petty Cash</CardTitle>
          </CardHeader>

          <CardContent>
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
              No data available
            </p>
          </CardContent>
        </Card>

        {/* CARD 2 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Pending</CardTitle>
          </CardHeader>

          <CardContent>
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
              No data available
            </p>
          </CardContent>
        </Card>

        {/* CARD 3 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Processing</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between w-full">
              <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                $600
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
              No data available
            </p>
          </CardContent>
        </Card>

        {/* CARD 4 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Paid</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between w-full">
              <h2 className="font-semibold text-2xl truncate max-w-[160px]">
                $5,000
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
              No data available
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
