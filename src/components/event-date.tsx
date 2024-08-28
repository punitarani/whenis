"use client";

interface EventDateProps {
  name: string;
  date: string;
}

export function EventDate({ name, date }: EventDateProps) {
  const eventDate = new Date(date);

  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-bold">{name} is on</h2>
      <p className="text-xl">{eventDate.toLocaleDateString()}</p>
    </div>
  );
}
