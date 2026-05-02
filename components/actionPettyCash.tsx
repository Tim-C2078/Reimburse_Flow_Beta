"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import {
  FilePenLine,
  Trash,
  BanknoteArrowUp,
  LoaderPinwheel,
  TruckElectric,
  CheckCheck,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Payment = {
  id: string;
  store: string;
  dateFrom: string;
  dateTo: string;
  initial_amount: number;
  approved_amount: number;
  comments: "Approved" | string;
  type:
    | "operations"
    | "maintenance"
    | "welfare"
    | "marketing"
    | "regulatory expenses";
};

export const ActionsCell = ({ payment }: { payment: Payment }) => {
  const router = useRouter();

  const handleEdit = () => {
    const url = new URLSearchParams({
      id: payment.id,
      store: payment.store,
      dateFrom: format(parseISO(payment.dateFrom), "dd/MM/yyyy"),
      dateTo: format(parseISO(payment.dateTo), "dd/MM/yyyy"),
      initialAmount: String(payment.initial_amount),
      approvedAmount: String(payment.approved_amount),
      comments: payment.comments,
      type: payment.type,
    });

    router.push(`/dashboard/edit-pettyCash?${url.toString()}`);
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        {/* EDIT */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleEdit} className="cursor-pointer">
              <FilePenLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Payment</TooltipContent>
        </Tooltip>

        {/* DELETE */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => console.log("Delete", payment.id)}
              className="cursor-pointer"
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Payment</TooltipContent>
        </Tooltip>

        {/* PAID */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-green-500 cursor-pointer">
              <BanknoteArrowUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark as Paid</TooltipContent>
        </Tooltip>

        {/* PROCESSING */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-blue-500 cursor-pointer">
              <LoaderPinwheel />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Processing</TooltipContent>
        </Tooltip>

        {/* SENT */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-gray-500 cursor-pointer">
              <TruckElectric />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sent</TooltipContent>
        </Tooltip>

        {/* RECEIVED */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-red-500 cursor-pointer">
              <CheckCheck />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Received</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
