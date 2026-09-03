"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IoLogOutOutline,
  IoImageOutline,
  IoDocumentTextOutline,
  IoNewspaperOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoHomeOutline,
  IoRibbonOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { isAdminUser } from "@/lib/admin-guard";

const nav = [
  { label: "Page Banners", href: "/admin/content-manager/banners", icon: IoImageOutline },
  { label: "Blog Posts", href: "/admin/content-manager/blogs", icon: IoDocumentTextOutline },
  { label: "Gallery", href: "/admin/content-manager/gallery", icon: IoNewspaperOutline },
  { label: "Home Gallery", href: "/admin/content-manager/home-gallery", icon: IoHomeOutline },
  { label: "Certificates", href: "/admin/content-manager/certificates", icon: IoRibbonOutline },
  { label: "Partners", href: "/admin/content-manager/partners", icon: IoPeopleOutline },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && isAdminUser(u)) {
        setUser({ email: u.email || "" });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-gray-200">
          <Link href="/admin/content-manager" className="text-sm font-bold tracking-tight text-gray-900">
            DSF Content Manager
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-900">
            <IoCloseOutline className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="mb-3 truncate text-xs text-gray-400">{user.email}</div>
          <button
            onClick={async () => {
              await signOut(auth);
              setUser(null);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-red-600"
          >
            <IoLogOutOutline className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900"
          >
            <IoMenuOutline className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-semibold text-gray-500">
            {nav.find((n) => pathname.startsWith(n.href))?.label || "Dashboard"}
          </h1>
          <div className="ml-auto">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-400 hover:text-gray-700 transition"
            >
              View site
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-white p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message.includes("auth/invalid-credential") ? "Invalid email or password" : err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm border border-gray-200 bg-white p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Admin Access
        </p>
        <h1 className="text-xl font-bold text-gray-900">DSF Content Manager</h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in with your authorized account.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-11 w-full border border-gray-300 bg-white px-3.5 text-sm text-gray-900 outline-none transition focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="h-11 w-full border border-gray-300 bg-white px-3.5 text-sm text-gray-900 outline-none transition focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
