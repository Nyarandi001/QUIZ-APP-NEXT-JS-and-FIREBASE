
import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="min-h-screen w-full max-w-full flex flex-col items-center justify-center bg-slate-100 p-3 sm:p-4 text-center overflow-x-hidden">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-red-700">
        404
      </h1>

      <h2 className="mt-4 text-xl sm:text-2xl font-bold text-red-600 p-2 break-words">
        Page Not Found
      </h2>

      <Link
        href="/user"
        className="mt-6 max-w-full rounded-2xl bg-blue-600 px-4 sm:px-5 py-3 text-white hover:bg-blue-700 text-sm sm:text-base text-center break-words"
      >
        Back to Admin Dashboard
      </Link>
    </div>
  );
}
