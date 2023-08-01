import prisma from '../src/config/prisma';

async function main() {
  const newUser1 = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'test',
    },
  });

  const newUser2 = await prisma.user.create({
    data: {
      email: 'example@test.com',
      password: 'example',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
