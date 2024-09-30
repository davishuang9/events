"use client";

import { EventsTable } from "@/components/event-table";
import { api } from "@/trpc/react";

export default function EventsHome() {
  const events = api.event.listEvents.useQuery({
    direction: "forward",
  });
  console.log("🚀 ~ EventsHome ~ events:", events);
  return <EventsTable />;
}
