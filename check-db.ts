import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
    },
  });
  
  console.log('Current users:', JSON.stringify(users, null, 2));
}

checkData()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
