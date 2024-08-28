"use server";

import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>When is it?</h1>
      </main>
    </HydrateClient>
  );
}
