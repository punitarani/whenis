"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

interface SearchResult {
  event: string;
  code: string;
  date: string;
  local: string;
}

export function EventSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const router = useRouter();

  const { data, error } = api.event.search.useQuery(
    { query: debouncedQuery },
    { enabled: !!debouncedQuery },
  );

  useEffect(() => {
    if (data) {
      setResults(data);
      setIsLoading(false);
    }
    if (error) {
      setResults([]);
      setIsLoading(false);
    }
  }, [data, error]);

  return (
    <div className="mx-auto w-full max-w-md">
      <Input
        placeholder="Search for events..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsLoading(true);
        }}
        className="mb-4"
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && results.length === 0 && <p>No events found</p>}
      <ul className="space-y-2">
        {results.map((result) => (
          <li
            key={result.code}
            className="flex cursor-pointer items-center justify-between rounded border p-2 hover:bg-gray-100"
            onClick={() => router.push(`/${result.code}`)}
          >
            <span>{result.event}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
