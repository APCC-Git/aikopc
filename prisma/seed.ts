import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const dummyUsers = [
    {
      id: randomUUID(),
      userId: '72031',
      username: 'Tomoi',
      password: 'tomowata19', // 実際はハッシュ化推奨
    },
    {
      id: randomUUID(),
      userId: '69119',
      username: 'Rix',
      password: 'admin',
    },
  ];

  for (const user of dummyUsers) {
    await prisma.user.create({ data: user });
  }

  console.log('🌱 Dummy users inserted.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
