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
  const status = searchParams.get("status");
  const dateCreated = searchParams.get("date");
  const createdDate = dateCreated ? new Date(dateCreated) : null;

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
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold mx-1 my-5">
          View Payment Information
        </h1>
      </div>

      {/* TOP SECTION (FIXED ALIGNMENT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 text-sm mb-6">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="w-[140px]">#ID:</span>
          <Button className="bg-black rounded-md w-[140px]">{id}</Button>
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-2 md:justify-center">
          <span className="w-[140px]">#Duration:</span>
          <Button className="bg-black rounded-md w-[140px]">3 days</Button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:justify-end">
          <span className="w-[140px]">#STATUS:</span>
          <Button className="bg-black rounded-md w-[140px]">
            {status?.toUpperCase()}
          </Button>
        </div>
      </div>

      {/* 🔥 FIXED BOTTOM SECTION (PERFECT LEFT ALIGNMENT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 text-sm">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 items-start">
          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Date Created:</span>
            <Button className="bg-black rounded-md w-[140px]">
              {createdDate ? format(createdDate, "dd MMM yyyy") : "No date"}
            </Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Date Approved:</span>
            <Button className="bg-black rounded-md w-[140px]">
              {createdDate ? format(createdDate, "dd MMM yyyy") : "No date"}
            </Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Approved by:</span>
            <Button className="bg-black rounded-md w-[140px]">James</Button>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="flex flex-col gap-4 items-start md:items-center">
          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Date Pending:</span>
            <Button className="bg-black rounded-md w-[140px]">
              {createdDate ? format(createdDate, "dd MMM yyyy") : "No date"}
            </Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Date Processing:</span>
            <Button className="bg-black rounded-md w-[140px]">
              {createdDate ? format(createdDate, "dd MMM yyyy") : "No date"}
            </Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Date Paid:</span>
            <Button className="bg-black rounded-md w-[140px]">
              {createdDate ? format(createdDate, "dd MMM yyyy") : "No date"}
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Paid by:</span>
            <Button className="bg-black rounded-md w-[140px]">Godfred</Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-2">
            <span>#Date Sent:</span>
            <Button className="bg-black rounded-md w-[140px]">
              {createdDate ? format(createdDate, "dd MMM yyyy") : "No date"}
            </Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-2 pb-7">
            <span>#Sent by:</span>
            <Button className="bg-black rounded-md w-[140px]">Titus</Button>
          </div>
        </div>
      </div>

      <hr />

      {/* FORM (UNCHANGED) */}
      <div>
        <h1 className="text-2xl font-semibold mx-1 my-5">
          View Form Information
        </h1>
      </div>
      <form className="mx-5 pt-7" onSubmit={handleSubmit}>
        <label className="mr-5.5">Store:</label>
        <br />
        <input
          value={store || ""}
          type="text"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
          readOnly
        />

        <br />

        <label className="mr-14">Initial Amount:</label>
        <br />
        <input
          value={initialAmount || ""}
          type="number"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
          readOnly
        />

        <br />

        <label className="mr-5.5">Approved Amount:</label>
        <br />
        <input
          value={approved}
          onChange={(e) => setApproved(e.target.value)}
          type="number"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
        />

        <br />

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

        <label className="mr-35 my-3.75">Type:</label>
        <br />
        <input
          value={typeState}
          onChange={(e) => setType(e.target.value)}
          type="text"
          className="w-[23%] p-3 my-3.75 border-3 rounded-lg outline-none"
        />

        <br />

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

        <Button type="submit" className="cursor-pointer ml-35 h-15 w-[23%]">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditUser;
