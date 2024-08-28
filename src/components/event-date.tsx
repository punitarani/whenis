"use client";

interface EventDateProps {
  name: string;
  date: Date;
  local: boolean;
}

export function EventDate({ name, date, local }: EventDateProps) {
  const eventDate = local ? new Date(date.toLocaleString()) : date;

  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-bold">{name} is on</h2>
      <p className="text-xl">{eventDate.toLocaleDateString()}</p>
    </div>
  );
}
