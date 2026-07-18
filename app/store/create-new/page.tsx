"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CreateNewStore = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Petty Cash</CardTitle>
        <CardDescription>
          Enter details for the new petty cash request
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>Card Content</p>
      </CardContent>

      <CardFooter className="flex items-center justify-end gap-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className={`${buttonVariants({ variant: "outline" })} w-50 shadow-md cursor-pointer bg-slate-400 text-white hover:bg-white hover:text-black dark:bg-gray-200 dark:text-white dark:hover:bg-white dark:hover:text-black`}
            >
              Cancel
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

              <AlertDialogDescription>
                This action will discard any unsaved changes.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                className="cursor-pointer"
                onClick={() => router.push("/store")}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div>
          <button
            className={`${buttonVariants()} w-50 shadow-md cursor-pointer`}
          >
            Create New
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreateNewStore;
