
"use client";

export default function UserError({ error, reset }) {
  return (
    <div className="min-h-screen w-full max-w-full flex flex-col items-center justify-center bg-slate-100 p-3 sm:p-4 text-center overflow-x-hidden">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-red-600">
        Oops!
      </h1>

      <h2 className="mt-4 text-xl sm:text-2xl font-bold text-red-600 break-words">
        User Section Error
      </h2>

      <p className="mt-2 w-full max-w-lg break-words text-sm sm:text-base text-red-500">
        Something went wrong while loading this admin page.
        Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 max-w-full rounded-2xl bg-blue-600 px-4 sm:px-5 py-3 text-sm sm:text-base text-white hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
