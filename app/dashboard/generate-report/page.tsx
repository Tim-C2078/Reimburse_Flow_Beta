"use client";

import { DatePickerWithRange } from "@/components/rangeDatePicker";
import { DateRange } from "react-day-picker";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const GenerateReport = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const store = (form.store as HTMLSelectElement).value;

    console.log({
      store,
      dateFrom: date?.from ? format(date.from, "dd/MM/yyyy") : null,
      dateTo: date?.to ? format(date.to, "dd/MM/yyyy") : null,
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mx-4">Generate Report</h1>

      <p className="text-sm text-muted-foreground mt-2 mx-4">
        Download Excel reports for audit logs and transaction history for review
        and analysis.
      </p>

      <form className="mx-5 my-10" onSubmit={handleSubmit}>
        {/* STORE */}
        <label className="mr-21">Stores:</label>
        <select
          name="store"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
        >
          <option value="">Select store</option>
          <option value="KFC OSU">KFC OSU</option>
          <option value="KFC MELCOM">KFC MELCOM</option>
          <option value="KFC ASOKWA">KFC ASOKWA</option>
          <option value="KFC EAST LEGON">KFC EAST LEGON</option>
          <option value="KFC DANSOMAN">KFC DANSOMAN</option>
          <option value="KFC JUNCTION MALL">KFC JUNCTION MALL</option>
          <option value="KFC ACHIMOTA MALL">KFC ACHIMOTA MALL</option>
          <option value="KFC TEMA SHELL">KFC TEMA SHELL</option>
        </select>

        {/* DATE */}
        <div className="flex items-center my-5">
          <div className="mr-10.5">Date Range:</div>
          <div>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex items-center my-10">
          <Button type="submit" className="hover:bg-accent hover:text-black hover:border-2 border-black cursor-pointer ml-35 h-15 w-[23%]">
            Download
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenerateReport;
