import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/my-dashboard">
        <button className="h-32 w-64 rounded-full bg-white shadow-lg transition-transform hover:scale-105 active:scale-95"></button>
      </Link>
    </div>
  );
}
