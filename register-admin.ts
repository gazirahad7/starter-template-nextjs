// This script registers the admin user properly through Better Auth
async function registerAdmin() {
  const response = await fetch('http://localhost:3001/api/auth/sign-up/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: 'Admin123!',
      name: 'Admin User',
    }),
  });

  const data = await response.json();
  console.log('Registration response:', data);
  
  if (response.ok) {
    console.log('✅ Admin user registered successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: Admin123!');
    console.log('\nNow updating user to admin role and email verified...');
    
    // Now update the user in database to be admin and email verified
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: {
        role: 'admin',
        emailVerified: true,
      },
    });
    
    console.log('✅ User updated to admin with verified email!');
    await prisma.$disconnect();
  } else {
    console.error('❌ Registration failed:', data);
  }
}

registerAdmin().catch(console.error);
