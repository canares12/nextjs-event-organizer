"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, eventFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import CategoryDropdown from "@/components/shared/CategoryDropdown";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import location from "@/assets/location-grey.svg";
import calendar from "@/assets/calendar.svg";
import dollar from "@/assets/dollar.svg";
import urlLink from "@/assets/link.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
}

async function onSubmit(values: eventFormValues) {
//   await new Promise((r) => setTimeout(r, 3000));
  alert(JSON.stringify(values));
}

export default function EventForm({ userId, type }: EventFormProps) {
  const form = useForm<eventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      imageUrl: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
      price: "",
      isFree: false,
      categoryId: "",
      url: "",
    },
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <section className="bg-dotted-pattern bg-gray-100 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          {type === "Create" && "Create event"}
          {type === "Update" && "Update event"}
        </h3>
      </section>
      <div className="wrapper my-8  rounded-lg border p-4">
        <div className="mx-6 space-y-6">
          <h2 className="font-semibold">Event Details</h2>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Event title"
                          {...field}
                          className="input-field"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CategoryDropdown
                          value={field.value}
                          onChangeHandler={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="h-72">
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="textarea rounded-2xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="h-72">
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setFiles}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
                          <Image
                            src={location}
                            alt="location"
                            height={24}
                            width={24}
                          />
                          <Input
                            placeholder="Event location or Online"
                            {...field}
                            className="input-field"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={control}
                  name="startDateTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-100 px-4 py-2">
                          <Image
                            src={calendar}
                            alt="calendar"
                            height={24}
                            width={24}
                            className="filter-grey"
                          />
                          <p className="ml-3 whitespace-nowrap text-gray-600">
                            Start date:
                          </p>
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="datePicker"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="endDateTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
                          <Image
                            src={calendar}
                            alt="calendar"
                            height={24}
                            width={24}
                            className="filter-grey"
                          />
                          <p className="ml-3 whitespace-nowrap text-gray-600">
                            End date:
                          </p>
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="datePicker"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-100 px-4 py-2">
                          <Image
                            src={dollar}
                            alt="dollar"
                            height={24}
                            width={24}
                            className="filter-grey"
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            {...field}
                            className="p-regular-16 border-0 bg-gray-100 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <FormField
                            control={control}
                            name="isFree"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="flex items-center">
                                    <label
                                      htmlFor="isFree"
                                      className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Free Ticket
                                    </label>
                                    <Checkbox
                                      onCheckedChange={field.onChange}
                                      checked={field.value}
                                      id="isFree"
                                      className="mr-2 h-5 w-5 border-2 border-primary"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
                          <Image
                            src={urlLink}
                            alt="link"
                            height={24}
                            width={24}
                          />
                          <Input
                            placeholder="URL"
                            {...field}
                            className="input-field"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="button col-span-2 w-full text-lg"
              >
                {isSubmitting ? "Submitting..." : `${type} event`}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
