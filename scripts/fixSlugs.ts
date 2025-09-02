import { PrismaClient } from "@prisma/client";
import { generateSlug } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  const events = await prisma.event.findMany();

  for (const event of events) {
    if (!event.slug || event.slug.trim() === "") {
      const slug = generateSlug(event.title);

      await prisma.event.update({
        where: { id: event.id },
        data: { slug },
      });

      console.log(`✅ Added slug "${slug}" to event "${event.title}"`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
