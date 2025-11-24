import { PrismaClient } from '@prisma/client';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
const prisma = new PrismaClient();

async function fixAdmin() {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'Admin123!';
  
  // Delete existing user and account
  await prisma.account.deleteMany({
    where: {
      user: { email: adminEmail }
    }
  });
  
  await prisma.user.deleteMany({
    where: { email: adminEmail }
  });
  
  // Hash password using scrypt like Better Auth does
  const salt = randomBytes(16);
  const derivedKey = await scryptAsync(adminPassword.normalize('NFKC'), salt, 64) as Buffer;
  const hashedPassword = `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
  
  const adminUser = await prisma.user.create({
    data: {
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
  
  console.log('✅ Admin user fixed:', adminUser);
  console.log('📧 Email:', adminEmail);
  console.log('🔑 Password:', adminPassword);
}

fixAdmin()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
