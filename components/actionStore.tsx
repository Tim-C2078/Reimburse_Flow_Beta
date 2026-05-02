"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FilePenLine, Trash, Download } from "lucide-react";
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
  date: Date;
  status:
    | "pending"
    | "processing"
    | "under review"
    | "paid"
    | "sent"
    | "received";
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
      dateFrom: format(payment.dateFrom, "dd/MM/yyyy"),
      dateTo: format(payment.dateTo, "dd/MM/yyyy"),
      initialAmount: String(payment.initial_amount),
      approvedAmount: String(payment.approved_amount),
      comments: payment.comments,
      status: payment.status,
      type: payment.type,
      date: payment.date.toISOString(),
    });

    router.push(`/dashboard/shops/edit-pettyCash?${url.toString()}`);
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleEdit} className="cursor-pointer">
              <FilePenLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="cursor-pointer"
              onClick={() => console.log("Delete", payment.id)}
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="bg-gray-400 cursor-pointer"
              onClick={() => console.log("Download", payment.id)}
            >
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
