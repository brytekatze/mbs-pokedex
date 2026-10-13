'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }): React.ReactElement {
  return <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center"><p className="text-5xl">⚡</p><h1 className="mt-5 text-3xl font-black text-slate-900">No se pudo cargar la Pokédex</h1><p className="mt-3 text-slate-500">Revisa tu conexión e inténtalo de nuevo.</p><button onClick={reset} className="mt-7 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700">Reintentar</button></main>;
}
