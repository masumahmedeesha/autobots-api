import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const user1 = await prisma.user.upsert({
    where: { email: 'masum@gmail.com' },
    update: {},
    create: {
      email: 'masum@gmail.com',
      name: 'Masum Ahmed',
      profileImage: 'masum',
      paymentClear: true,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'eesha@gmail.com' },
    update: {},
    create: {
      email: 'eesha@gmail.com',
      name: 'EeSha Ahmed',
      profileImage: 'eesha',
      paymentClear: true,
    },
  });
  console.log(user1, user2);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
