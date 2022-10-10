import prisma from "../prisma";

export async function generateString(): Promise<string> {
  async function AlreadyExists(str: string) {
    const results = await prisma.link.findMany({
      where: {
        shorthand: str,
      },
    });
    if (results.length !== 0) return true;
    else return false;
  }
  const newString = async (): Promise<any> => {
    const str = Math.random().toString(36).slice(2, 12);
    const exists = await AlreadyExists(str);
    if (!exists) {
      return str;
    } else return newString();
  };

  return await newString();
}

export async function getAllLinks() {
  const links = await prisma.link.findMany();
  return links;
}

export async function createLink(url: string) {
  const shorthand = await generateString();
  const link = await prisma.link.create({
    data: {
      originalUrl: url,
      shorthand: shorthand,
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
      id: true,
    },
    take: 1,
  });
  return redirectUrl;
}

export async function incrementVisitedAmount(id: number) {
  const updateAmount = await prisma.link.update({
    where: {
      id: id,
    },
    data: {
      visitedAmount: {
        increment: 1,
      },
    },
  });
  return updateAmount;
}
