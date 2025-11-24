import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: Proxy doesn't check auth because Prisma doesn't work in Edge Runtime
// Auth checks are handled in layouts and pages using Better Auth's server-side utilities
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|auth).*)',
  ],
};
