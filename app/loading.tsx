export default function Loading(): React.ReactElement {
  return <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8"><div className="mb-10 h-32 animate-pulse rounded-3xl bg-slate-100" /><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">{Array.from({ length: 8 }, (_, index) => <div key={index} className="h-80 animate-pulse rounded-3xl bg-slate-100" />)}</div></main>;
}
