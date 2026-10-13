import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  query: string;
};

export default function Pagination({ page, totalPages, query }: PaginationProps): React.ReactElement {
  const makeHref = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    if (query) {
      params.set("q", query);
    }
    return `/?${params.toString()}`;
  };

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;
  const buttonClassName = "rounded-xl border px-4 py-2 text-sm font-semibold transition";

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-3 pt-4">
      {isFirstPage ? (
        <span className={`${buttonClassName} border-slate-100 text-slate-500`}>Anterior</span>
      ) : (
        <Link
          href={makeHref(page - 1)}
          className={`${buttonClassName} border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600`}
        >
          Anterior
        </Link>
      )}

      <span className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
        {page} / {totalPages}
      </span>

      {isLastPage ? (
        <span className={`${buttonClassName} border-slate-100 text-slate-500`}>Siguiente</span>
      ) : (
        <Link
          href={makeHref(page + 1)}
          className={`${buttonClassName} border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600`}
        >
          Siguiente
        </Link>
      )}
    </nav>
  );
}