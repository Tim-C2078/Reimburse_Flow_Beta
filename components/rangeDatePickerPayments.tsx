"use client";

import * as React from "react";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  date: DateRange | undefined;
  setDate: (value: DateRange | undefined) => void;

  // 👇 add these
  dateFrom?: string | null;
  dateTo?: string | null;
};

export function DatePickerWithRange({
  date,
  setDate,
  dateFrom,
  dateTo,
}: Props) {
  // ✅ handle URL string → DateRange here (no parent logic needed)
  React.useEffect(() => {
    if (!dateFrom) return;

    let from: Date;
    let to: Date | undefined;

    if (dateFrom.includes("/")) {
      from = parse(dateFrom, "dd/MM/yyyy", new Date());
      to = dateTo ? parse(dateTo, "dd/MM/yyyy", new Date()) : undefined;
    } else {
      from = new Date(dateFrom);
      to = dateTo ? new Date(dateTo) : undefined;
    }

    if (!isNaN(from.getTime())) {
      setDate({ from, to });
    }
  }, [dateFrom, dateTo, setDate]);

  return (
    <Field className="mx-auto w-60">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start px-2.5 font-normal cursor-pointer"
          >
            <CalendarIcon />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} -{" "}
                  {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
