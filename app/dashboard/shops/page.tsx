"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert, Store } from "lucide-react";

const Stores = () => {
  const data = [
    {
      id: "KGH001",
      store: "KFC OSU",
      total_budget: 5000,
      total_pending: 3200,
      total_processing: 1500,
      total_paid: 2500,
    },
    {
      id: "KGH002",
      store: "KFC NIA MELCOM",
      total_budget: 5000,
      total_pending: 2200,
      total_processing: 1000,
      total_paid: 2500,
    },
    {
      id: "KGH003",
      store: "KFC SAKUMONO",
      total_budget: 5000,
      total_pending: 1200,
      total_processing: 1900,
      total_paid: 2500,
    },
    {
      id: "KGH004",
      store: "KFC 37 LIBERATION",
      total_budget: 5000,
      total_pending: 2200,
      total_processing: 500,
      total_paid: 2500,
    },
    {
      id: "KGH005",
      store: "KFC ASOKWA",
      total_budget: 10000,
      total_pending: 9000,
      total_processing: 4000,
      total_paid: 2500,
    },
    {
      id: "KGH006",
      store: "KFC DANSOMAN",
      total_budget: 5000,
      total_pending: 1200,
      total_processing: 1500,
      total_paid: 2500,
    },
    {
      id: "KGH007",
      store: "KFC EAST LEGON",
      total_budget: 5000,
      total_pending: 3500,
      total_processing: 1500,
      total_paid: 2500,
    },
    {
      id: "KGH008",
      store: "KFC EAST LEGON HILLS",
      total_budget: 5000,
      total_pending: 3500,
      total_processing: 1500,
      total_paid: 2500,
    },
  ];

  const router = useRouter();

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mx-4">KFC STORES</h1>

        <p className="text-sm text-muted-foreground mt-2 mx-4">
          View Store Details Below
        </p>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 my-7 mx-4">
        {data.map((item) => {
          const isOverLimit = item.total_pending > item.total_budget * 0.6;

          return (
            <Card
              onClick={() =>
                router.push(
                  `/dashboard/shops/shop-details?id=${item.id}&store=${item.store}&budget=${item.total_budget}&pending=${item.total_pending}&processing=${item.total_processing}&paid=${item.total_paid}`,
                )
              }
              className="transition-transform duration-300 hover:-translate-y-2 cursor-pointer shadow-xl flex flex-col h-75 bg-[linear-gradient(135deg,_#fafafa_0%,_#d1d5db_50%,_#111827_100%)] border-1 hover:border-gray-400"
              key={item.id}
            >
              <CardHeader className="flex items-center justify-between pb-5">
                <CardTitle className="pt-4 font-bold text-lg">
                  <div className="flex items-center gap-3">
                    <Store className="text-black" />
                    {item.id}
                  </div>

                  {item.store}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <h2 className="text-black font-semibold">
                  Total Budget: ${" "}
                  {item.total_budget.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </h2>
                <h2 className="text-black font-semibold">
                  Total Pending: ${" "}
                  {item.total_pending.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </h2>
                <h2 className="text-black font-semibold">
                  Total Processing: ${" "}
                  {item.total_processing.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </h2>
                {isOverLimit && (
                  <div className="text-black font-semibold flex gap-2 items-center">
                    <TriangleAlert className="text-red-600" />
                    <div className="text-red-600">
                      Over 60% of budget pending
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Stores;
