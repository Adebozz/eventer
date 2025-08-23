import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.create({
    data: {
      title: "Launch Party 🎉",
      date: new Date("2025-09-01T18:00:00Z"),
      location: "Lagos, Nigeria",
    },
  });

  console.log("Event created:", event);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
