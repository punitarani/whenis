import { redirect } from 'next/navigation';
import { api } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";

export default async function EventPage({ params }: { params: { slug: string } }) {
  try {
    const event = await api.event.code({ code: params.slug });

    return (
      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <h1>{event?.event}</h1>
          <p>Date: {event?.date?.toLocaleDateString()}</p>
          {/* Add more event details as needed */}
        </main>
      </HydrateClient>
    );
  } catch (error) {
    // If the event is not found or any other error occurs, redirect to home
    redirect('/');
  }
}
