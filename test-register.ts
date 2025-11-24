import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function registerAndCheck() {
  // First, register a test user through the API
  console.log('Registering test user through Better Auth API...');
  
  const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'Test123!',
      name: 'Test User',
    }),
  });

  if (response.ok) {
    console.log('✅ Test user registered!');
    
    // Now check what the hash looks like
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
      include: { accounts: true },
    });
    
    console.log('\nTest user account structure:');
    console.log(JSON.stringify(testUser, null, 2));
    
    // Clean up
    await prisma.account.deleteMany({
      where: { userId: testUser!.id }
    });
    await prisma.user.delete({
      where: { id: testUser!.id }
    });
    
    console.log('\n✅ Test user deleted');
  } else {
    const error = await response.text();
    console.error('❌ Registration failed:', error);
  }
}

registerAndCheck()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
