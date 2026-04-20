"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash } from "lucide-react";

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
    <div className="flex gap-2">
      {/* EDIT */}
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

      {/* DELETE */}
      <Button
        onClick={() => console.log("Delete", user.id, user.username)}
        className="cursor-pointer"
      >
        <Trash />
      </Button>
    </div>
  );
};
