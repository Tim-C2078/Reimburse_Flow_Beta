"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type User = {
  id: string;
  username: string;
  role:
    | "admin"
    | "store"
    | "finance"
    | "area coach"
    | "regional coach"
    | "supreme admin"
    | "HR office"
    | "Q and A";
};

export const ActionsCell = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        {/* EDIT */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                router.push(
                  `/dashboard/users/edit-user?id=${user.id}&username=${user.username}&role=${user.role}`,
                )
              }
              className="cursor-pointer"
            >
              <FilePenLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit User</TooltipContent>
        </Tooltip>

        {/* DELETE */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => console.log("Delete", user.id, user.username)}
              className="cursor-pointer"
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete {user.username}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
