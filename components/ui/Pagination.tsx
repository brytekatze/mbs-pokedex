import Link from 'next/link';

export default function Pagination({ page, totalPages, query }: { page: number; totalPages: number; query: string }): React.ReactElement {
  const makeHref = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set('page', String(nextPage));
    if (query) params.set('q', query);
    return `/?${params.toString()}`;
  };
  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-3 pt-4">
      <Link href={makeHref(Math.max(1, page - 1))} aria-disabled={page === 1} className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${page === 1 ? 'pointer-events-none border-slate-100 text-slate-300' : 'border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600'}`}>Anterior</Link>
      <span className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">{page} / {totalPages}</span>
      <Link href={makeHref(Math.min(totalPages, page + 1))} aria-disabled={page === totalPages} className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${page === totalPages ? 'pointer-events-none border-slate-100 text-slate-300' : 'border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600'}`}>Siguiente</Link>
    </nav>
  );
}
