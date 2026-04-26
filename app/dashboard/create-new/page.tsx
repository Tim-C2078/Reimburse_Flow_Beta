"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/rangeDatePicker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const CreateUser = () => {
  const [show, setShow] = useState("hidden");
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [comments, setComments] = useState("Approved");
  const [value, setValue] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);

    if (
      value === "welfare" ||
      value === "marketing" ||
      value === "regulatory expenses"
    ) {
      setShow("block");
    } else {
      setShow("hidden");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    console.log({
      store: (form.store as HTMLSelectElement).value,
      initialAmount: (form.initialAmount as HTMLInputElement).value,
      approvedAmount: (form.initialAmount as HTMLInputElement).value,
      type: (form.type as HTMLSelectElement).value,
      comments: (form.comments as HTMLTextAreaElement)?.value.toUpperCase(),
      dateFrom: date?.from ? format(date.from, "dd/MM/yyyy") : null,
      dateTo: date?.to ? format(date.to, "dd/MM/yyyy") : null,
    });

    // ✅ RESET FORM FIELDS
    form.reset();

    // ✅ RESET DATE PICKER
    setDate(undefined);

    // Reset conditional UI
    setShow("hidden");

    // ✅ RESET DATE PICKER
    setValue("");

    // RESET COMMENT
    setComments("Approved");
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mx-1 my-5">
          Create New Petty Cash
        </h1>
      </div>

      <div>
        <form className="mx-5" onSubmit={handleSubmit}>
          {/* STORE */}
          <label className="mr-21">Stores:</label>
          <br />
          <select
            name="store"
            onChange={handleChange}
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

          <br />

          {/* AMOUNT */}
          <label className="mr-5.5">Initial Amount:</label>
          <br />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Initial Amount"
            type="number"
            name="initialAmount"
            className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
          />

          <br />

          {/* AMOUNT */}
          <div className="hidden">
            <label className="mr-5.5">Approved Amount:</label>
            <br />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Initial Amount"
              type="number"
              name="approvedAmount"
              className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
            />
          </div>

          <br />

          {/* DATE */}
          <div className="flex items-center my-5">
            <div className="mr-10.5">Date Range:</div>
            <div>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
          </div>

          <br />

          {/* TYPE */}
          <label className="mr-26">Type:</label>
          <br />
          <select
            name="type"
            onChange={handleChange}
            className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
          >
            <option value="">--Select type--</option>
            <option value="regulatory expenses">regulatory expenses</option>
            <option value="operations">operations</option>
            <option value="maintenance">maintenance</option>
            <option value="welfare">welfare</option>
            <option value="marketing">marketing</option>
          </select>

          <br />

          {/* COMMENT */}
          <div className={show}>
            <div className="flex flex-col">
              <label className="mr-13.5">Comment:</label>
              <textarea
                className="w-[50%] h-40 p-3 my-3.75 border-3 rounded-lg outline-none"
                placeholder="Details..."
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>

          <br />

          {/* SUBMIT */}
          <div className="flex items-center my-5">
            <Button type="submit" className="cursor-pointer ml-35 h-15 w-[23%]">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
