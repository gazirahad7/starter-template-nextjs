import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'better-auth/crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default admin user
  const adminEmail = 'admin@example.com';
  const adminPassword = 'Admin123!';
  
  // Use Better Auth's password hashing utility
  const hashedPassword = await hashPassword(adminPassword);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin User',
      emailVerified: true,
      role: 'admin',
      accounts: {
        create: {
          accountId: adminEmail,
          providerId: 'credential',
          password: hashedPassword,
        },
      },
    },
  });

  console.log('✅ Admin user created:', {
    email: adminUser.email,
    password: adminPassword,
  });

  // Create default homepage content
  const homepageContent = await prisma.homePageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Welcome to Your Next.js Starter',
      description:
        'This is a fully-featured starter template with Next.js, TypeScript, Prisma, Better Auth, and ShadCN UI. Start building your next project with authentication, admin dashboard, and CMS out of the box.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop',
    },
  });

  console.log('✅ Homepage content created:', homepageContent);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
