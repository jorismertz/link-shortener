import prisma from "../prisma";

export function generateString(): string {
  const str = Math.random().toString(36).slice(2, 7);
  return str;
}

export default async function database() {
  //   const link = await prisma.link.create({
  //     data: {
  //       originalUrl: "https://google.com",
  //       shorthand: "poepgap",
  //     },
  //   });
  //   console.log(link);
}

export async function createLink(url: string) {
  const link = await prisma.link.create({
    data: {
      originalUrl: url,
      shorthand: generateString(),
    },
  });
  return link;
}

export async function findByShorthand(shorthand: string) {
  const redirectUrl = await prisma.link.findMany({
    where: {
      shorthand: shorthand,
    },
    select: {
      originalUrl: true,
    },
    take: 1,
  });
  return redirectUrl;
}
