import { Metadata } from "next";
import EventForm from "../EventForm";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Update event",
};

export default function Page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return <EventForm userId={userId} type="Update" />;
}
