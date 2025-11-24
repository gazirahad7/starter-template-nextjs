# Next.js Starter Template

A production-ready Next.js starter template with authentication, admin dashboard, and content management system.

## ��� Features

### Authentication (Better Auth)
- ✅ Google OAuth login
- ✅ Email + password authentication
- ✅ Email verification
- ✅ Forgot & reset password
- ✅ Two-factor authentication (2FA via TOTP) - *Framework ready*
- ✅ Protected routes (/dashboard, /admin, API routes)
- ✅ Complete auth pages (login, register, verify-email, forgot-password, reset-password)

### Admin Dashboard
- ✅ Beautiful dashboard with sidebar navigation
- ✅ Topbar with user avatar & dropdown menu
- ✅ Dashboard overview with statistics
- ✅ User management page
- ✅ CMS editor for homepage content
- ✅ Account settings & security pages

### Content Management System (CMS)
- ✅ Edit homepage title, description, and hero image
- ✅ Real-time content updates
- ✅ Form validation with Zod
- ✅ Server actions for data mutations

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Prisma ORM + SQLite
- **Styling**: TailwindCSS + ShadCN UI
- **Authentication**: Better Auth
- **Validation**: Zod
- **Forms**: React Hook Form

## ���️ Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="your-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: \`http://localhost:3000/api/auth/callback/google\`
4. Copy Client ID and Client Secret to \`.env\`

### 4. Database Setup

\`\`\`bash
npm run db:generate
npm run db:push
npm run db:seed
\`\`\`

**Default Admin:** admin@example.com / Admin123!

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## ��� Database Commands

- \`npm run db:generate\` - Generate Prisma Client
- \`npm run db:migrate\` - Create migration
- \`npm run db:push\` - Push schema
- \`npm run db:seed\` - Seed database
- \`npm run db:studio\` - Open Prisma Studio

## �� Security Features

- Password hashing with bcrypt
- CSRF protection
- Rate limiting
- Protected API routes
- Session management
- Email verification
- 2FA support (TOTP ready)

---

Built with ❤️ using Next.js, TypeScript, Prisma, Better Auth, and ShadCN UI
