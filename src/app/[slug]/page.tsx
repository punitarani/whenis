import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { CountdownTimer } from "@/components/countdown-timer";
import { EventDate } from "@/components/event-date";

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const event = await api.event.code({ code: params.slug });

    if (!event) {
      redirect("/");
      return null;
    }

    const name = event.event!;
    const date = new Date(event.date!);

    return (
      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">{name}</h1>
          <EventDate name={name} date={date.toISOString()} />
          <CountdownTimer name={name} date={date.toISOString()} />
        </main>
      </HydrateClient>
    );
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
