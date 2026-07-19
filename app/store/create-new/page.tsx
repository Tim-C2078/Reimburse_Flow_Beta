"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
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
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";

const formSchema = z.object({
  storeName: z.string(),
  initialAmount: z.number().min(1),
  approvedAmount: z.number(),
  dateStart: z.date().refine((date) => date <= new Date(), {
    message: "Start date cannot be in the future",
  }),
  dateEnd: z.date().refine((date) => date <= new Date(), {
    message: "End date cannot be in the future",
  }),
  type: z
    .enum(["Operations", "Regulatory", "Welfare", "Marketing", "Maintenance"], {
      message: "Please select a valid type",
    })
    .optional(),
  comments: z.string(),
  proof_url: z
    .string({ message: "Please select a proof" })
    .array(),
  uploadFile: z.instanceof(File, {
    message: "Please upload excel file.",
  }),
});

const CreateNewStore = () => {
  const [value, setValue] = useState(1);
  const [selectProofs, setSelectProofs] = useState([]);
  const [comments, setComments] = useState("Approved By RGM");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      initialAmount: 1,
      approvedAmount: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      type: undefined,
      comments: "",
      proof_url: [],
      uploadFile: new File([], ""),
    },
  });

  function deleteSelecetedProof(index: number) {
    const updatedFiles = selectProofs.filter((_, i) => i !== index);
    setSelectProofs(updatedFiles);
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const type = form.watch("type");
  console.log(type);

  return (
    <Card className="bg-accent mx-5 p-5 shadow-xl dark:border-white dark:border-1">
      <CardHeader>
        <CardTitle>Create New Petty Cash</CardTitle>
        <CardDescription>
          Enter details for the new petty cash request
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <div className="flex items-center justify-evenly gap-4 py-4">
              <Controller
                name="storeName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-storeName">
                      Store Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-storeName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter store name"
                      autoComplete="off"
                      value="KFC OSU"
                      readOnly
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="initialAmount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-initialAmount">
                      Initial Amount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-initialAmount"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter initial amount"
                      autoComplete="off"
                      value={value}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setValue(value);
                        field.onChange(value);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="hidden mb-block">
              <Controller
                name="approvedAmount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-approvedAmount">
                      Initial Amount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-approvedAmount"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter approvedAmount"
                      autoComplete="off"
                      value={value}
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        setValue(value);
                        field.onChange(value);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex items-center justify-evenly gap-4 py-4">
              <Controller
                name="dateStart"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-dateStart">
                      Start Date
                    </FieldLabel>
                    <div className="flex items-center gap-2">
                      <InputGroup>
                        <Input
                          readOnly
                          {...field}
                          id="form-rhf-demo-dateStart"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter start date"
                          autoComplete="off"
                          value={field.value?.toISOString().split("T")[0]}
                          className="cursor-pointer w-full"
                        />
                      </InputGroup>
                      <Popover>
                        <PopoverTrigger>
                          <CalendarIcon className="h-5 w-5 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-lg border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="dateEnd"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-dateEnd">
                      End Date
                    </FieldLabel>
                    <div className="flex items-center gap-2">
                      <InputGroup>
                        <Input
                          {...field}
                          readOnly
                          id="form-rhf-demo-dateEnd"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter end date"
                          autoComplete="off"
                          value={field.value?.toISOString().split("T")[0]}
                          className="cursor-pointer w-full"
                        />
                      </InputGroup>
                      <Popover>
                        <PopoverTrigger>
                          <CalendarIcon className="h-5 w-5 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-lg border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-type">Type</FieldLabel>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-demo-type"
                      aria-invalid={fieldState.invalid}
                      className="cursor-pointer"
                    >
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Regulatory">Regulatory</SelectItem>
                        <SelectItem value="Welfare">Welfare</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div
              className={
                type === undefined ||
                type === "Operations" ||
                type === "Maintenance"
                  ? "hidden"
                  : "block"
              }
            >
              <Controller
                name="comments"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-Comments">
                      Comments
                    </FieldLabel>
                    <textarea
                      {...field}
                      id="form-rhf-demo-Comments"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter comments"
                      autoComplete="off"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="h-30 border-2 resize-none p-2"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              {/* Form For Selecting The Files */}
              <Controller
                name="proof_url"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-proof_url">
                      Select Proofs
                    </FieldLabel>
                    <input
                      {...field}
                      id="form-rhf-demo-proof_url"
                      aria-invalid={fieldState.invalid}
                      placeholder="Select proof"
                      type="file"
                      multiple
                      autoComplete="off"
                      onChange={(e) => {
                        setSelectProofs(
                          [
                            ...selectProofs,
                            Array.from(e.target.files || []),
                          ].flat(),
                        );
                      }}
                      className="border-2 cursor-pointer p-2"
                    />
                    {/* Viewing Seleceted Images */}
                    <div className="flex flex-wrap gap-4">
                      {selectProofs.map((file, index) => (
                        <div
                          key={file.name}
                          className="flex flex-col gap-2 border rounded p-2"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            loading="lazy"
                            alt="Proofs"
                            width={300}
                            height={300}
                            className="object-contain cursor-pointer"
                          />
                          <h1
                            onClick={() => deleteSelecetedProof(index)}
                            className="text-sm text-gray-600 cursor-pointer underline"
                          >
                            Delete
                          </h1>
                        </div>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-3 mt-8">
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
              type="submit"
            >
              Create New
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateNewStore;
