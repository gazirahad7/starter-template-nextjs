import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await prisma.homePageContent.findFirst({
    where: { id: 1 },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            Next.js Starter
          </Link>
          <div className="flex gap-4">
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Hero Content */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {content?.title || "Welcome to Your Next.js Starter"}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {content?.description ||
                "A full-featured starter template with Next.js, TypeScript, Prisma, Better Auth, and ShadCN UI."}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          {content?.imageUrl && (
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={content.imageUrl}
                alt="Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Features Grid */}
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Authentication
              </h3>
              <p className="text-gray-600">
                Built-in auth with Google OAuth, email/password, email verification, and 2FA
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Admin Dashboard
              </h3>
              <p className="text-gray-600">
                Beautiful admin interface with user management and analytics
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                CMS Ready
              </h3>
              <p className="text-gray-600">
                Simple content management system to edit your pages easily
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-gray-600">
            Built with Next.js, TypeScript, Prisma, Better Auth, and ShadCN UI
          </p>
        </div>
      </footer>
    </div>
  );
}
