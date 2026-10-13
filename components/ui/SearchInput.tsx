"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput({ initialQuery }: { initialQuery: string }): React.ReactElement {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const value = query.trim();
      const currentValue = params.get("q") ?? "";

      // Sin cambios en el término de búsqueda no se navega: así no se pierde
      // el parámetro `page` al paginar.
      if (value === currentValue) {
        return;
      }

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [pathname, query, router, searchParams]);

  return (
    <label className="relative block w-full max-w-xl">
      <span className="sr-only">Buscar Pokémon por nombre o ID</span>
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">⌕</span>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busca por nombre o ID..."
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-5 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
      />
    </label>
  );
}
