"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-black text-slate-900">No se pudo cargar este Pokémon</h1>
      <p className="mt-3 text-slate-500">La PokéAPI no está disponible en este momento.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-7 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
      >
        Reintentar
      </button>
    </main>
  );
}