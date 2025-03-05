import prisma from "./prisma";

export async function getBalances() {
  return await prisma.balance.findMany({
    orderBy: {
      amount: "asc",
    },
  });
}
