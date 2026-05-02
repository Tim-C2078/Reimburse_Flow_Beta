"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/rangeDatePickerPayments";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const EditUser = () => {
  const searchParams = useSearchParams();

  // GET PARAMS FROM URL
  const id = searchParams.get("id");
  const store = searchParams.get("store");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const initialAmount = searchParams.get("initialAmount");
  const approvedAmount = searchParams.get("approvedAmount");
  const type = searchParams.get("type");
  const comments = searchParams.get("comments");

  // STATE
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [approved, setApproved] = useState(approvedAmount || "");
  const [typeState, setType] = useState(type || "");
  const [commentState, setComments] = useState(comments || "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      id,
      store,
      initialAmount,
      approvedAmount: approved,
      type: typeState,
      comments: commentState,
      dateFrom: date?.from ? format(date.from, "dd/MM/yyyy") : null,
      dateTo: date?.to ? format(date.to, "dd/MM/yyyy") : null,
    };

    console.log("UPDATED DATA:", payload);
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mx-1 my-5">
          Change Payment Information
        </h1>
      </div>

      <form className="mx-5" onSubmit={handleSubmit}>
        {/* STORE */}
        <label className="mr-5.5">Store:</label>
        <br />
        <input
          value={store || ""}
          type="text"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
          readOnly
        />

        <br />

        {/* INITIAL AMOUNT */}
        <label className="mr-14">Initial Amount:</label>
        <br />
        <input
          value={initialAmount || ""}
          type="number"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
          readOnly
        />

        <br />

        {/* APPROVED AMOUNT */}
        <label className="mr-5.5">Approved Amount:</label>
        <br />
        <input
          value={approved}
          onChange={(e) => setApproved(e.target.value)}
          type="number"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
        />

        <br />

        {/* DATE */}
        <div className="flex items-center my-3.75">
          <div className="mr-10">Date Range:</div>
          <div>
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          </div>
        </div>

        <br />

        {/* TYPE */}
        <label className="mr-35 my-3.75">Type:</label>
        <br />
        <input
          value={typeState}
          onChange={(e) => setType(e.target.value)}
          type="text"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
        />

        <br />

        {/* COMMENTS */}
        <div className="flex flex-col">
          <label className="mr-13.5">Comment:</label>
          <br />
          <textarea
            className="w-[50%] h-40 p-3 my-3.75 border-3 rounded-lg outline-none"
            value={commentState}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <br />

        {/* SUBMIT */}
        <Button type="submit" className="cursor-pointer ml-35 h-15 w-[23%]">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditUser;
