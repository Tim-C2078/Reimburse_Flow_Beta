"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Lottie from "lottie-react";
import chartAnimation from "./Bar Chart.json";
import Calendar from "@/components/monthly expenses/Calendar Lottie Animation.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { columns } from "@/components/Payments/columns";
import { paymentsData } from "@/components/Payments/data";
import { DataTable } from "@/components/Payments/data-table";
import { Banknote, Clock, Hourglass, ShieldEllipsis } from "lucide-react";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const dates = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - 2 + index);
    return date;
  });

  const formatDate = (date: Date) => ({
    dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
    month: date.toLocaleString("en-US", { month: "long" }),
    day: date.getDate(),
    year: date.getFullYear(),
  });

  return (
    <>
      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mx-4">Overview</h1>
        <p className="text-sm text-muted-foreground mt-2 mx-4">
          This section provides a comprehensive overview of all store petty cash
          data and their respective statuses.
        </p>
        <div className="grid lg:grid-cols-4 gap-4 my-7 mx-4">
          {/* CARD 1 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Pending</CardTitle>
              <Clock />
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
                Pending With Finance
              </p>
            </CardContent>
          </Card>
          {/* CARD 3 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Paid</CardTitle>
              <Banknote />
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
                Paid Petty Cash
              </p>
            </CardContent>
          </Card>
          {/* CARD 4 */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Average Duration</CardTitle>
              <Hourglass />
            </CardHeader>
            <CardContent>
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
              <p className="text-sm mt-2 text-green-600">
                + 10% Improvement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DATE CAROUSEL */}
      <div className="flex justify-center mx-12 my-5">
        <Carousel className="w-full">
          <CarouselContent>
            {dates.map((date, index) => {
              const { dayName, month, day, year } = formatDate(date);

              return (
                <CarouselItem
                  key={index}
                  className="flex justify-center lg:basis-1/5"
                >
                  <div
                    onClick={() => setSelectedDate(date)}
                    className={`p-5 rounded-lg cursor-pointer flex flex-col items-center
                      ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                  >
                    <div className="text-sm">{dayName}</div>
                    <div className="font-semibold">
                      {day} {month} {year}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* TABLE */}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={paymentsData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  );
};

export default Dashboard;
