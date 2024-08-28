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

    const { event: name, date, local } = event;
    const eventDate = new Date(date);

    return (
      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">{name}</h1>
          <EventDate name={name} date={eventDate} local={local} />
          <CountdownTimer name={name} date={eventDate} local={local} />
        </main>
      </HydrateClient>
    );
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
