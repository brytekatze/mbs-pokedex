export default function Loading(): React.ReactElement {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
      <div className="h-6 w-36 animate-pulse rounded bg-slate-100" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-[2rem] bg-red-100" />
        <div className="space-y-6">
          <div className="h-64 animate-pulse rounded-[2rem] bg-slate-100" />
          <div className="h-72 animate-pulse rounded-[2rem] bg-slate-100" />
        </div>
      </div>
    </main>
  );
}