import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const lp = await prisma.lp.create({
    data: {
      name: 'Sample LP',
      url: 'https://example.com/sample-lp',
      model: 'gpt-4o',
      content: '<h1>Best danball for wine</h1>',
      prompt: 'Generate an image: A worker, wearing gloves, carefully packs a high-quality leather black jacket into a cardboard box. The jacket is folded neatly and protected with special support materials to ensure it retains its shape within the box. On the workbench, several other leather jackets, already packed, are lined up.Emphasize the cardboard.',
      isAdopted: true,
    },
  });

  const item = await prisma.item.create({
    data: {
      name: 'danball-for-wine',
      imageUrl: 'https://example.com/danball-for-wine.jpg',
      description: 'Description for danball-for-wine.',
      lpId: lp.id,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
