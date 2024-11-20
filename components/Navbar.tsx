import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Smart Frame</h1>
      </Link>
      <Link href="/about">About</Link>
    </div>
  );
}
