import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">© 2025</footer>
    </div>
  );
}