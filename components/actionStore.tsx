"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FilePenLine, Trash, TruckElectric } from "lucide-react";

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
      dateFrom: format(payment.dateFrom, "dd/MM/yyyy"),
      dateTo: format(payment.dateTo, "dd/MM/yyyy"),
      initialAmount: String(payment.initial_amount),
      approvedAmount: String(payment.approved_amount),
      comments: payment.comments,
      type: payment.type,
    });

    router.push(`/dashboard/shops/edit-pettyCash?${url.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleEdit} className="cursor-pointer">
        <FilePenLine />
      </Button>
      <Button onClick={() => console.log("Delete", payment.id)}>
        <Trash />
      </Button>

      <Button className="bg-gray-500">
        <TruckElectric />
      </Button>
    </div>
  );
};
