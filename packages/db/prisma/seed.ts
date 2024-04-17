import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create users with OnRamp transactions
  const alice = await prisma.user.upsert({
    where: { number: '1234567890' },
    update: {},
    create: {
      number: '1234567890',
      password: 'alice',
      name: 'Alice',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: 'bob',
      name: 'Bob',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  });

  // Create P2P transactions
  await prisma.p2pTransfer.createMany({
    data: [
      {
        amount: 1000,
        timestamp: new Date(),
        fromUserId: alice.id,
        toUserId: bob.id,
        note: "Food_Dining",
      },
      {
        amount: 1500,
        timestamp: new Date(),
        fromUserId: bob.id,
        toUserId: alice.id,
        note: "Utilities",
      },
    ],
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
