
import "../../globals.css";
import Link from "next/link";

export default function UserLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen w-full max-w-full flex flex-col">
      <header className="bg-white text-blue-600 text-xl sm:text-2xl flex flex-wrap items-center gap-2 p-2 w-full">
        <Link
          className="bg-blue-600 text-white p-2 rounded-2xl"
          href="/user"
        >
          Home
        </Link>

        <Link
          className="bg-red-600 text-white p-2 rounded-2xl"
          href="/login"
        >
          Logout
        </Link>
      </header>

      <div className="flex-1 w-full min-w-0">
        {children}
      </div>
    </div>
  );
}
