"use server";

import { HydrateClient } from "@/trpc/server";
import { EventSearch } from "@/components/event-search";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>When is it?</h1>
        <EventSearch />
      </main>
    </HydrateClient>
  );
}
