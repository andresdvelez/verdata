import prisma from "./prisma";

export async function getReports(limit?: number) {
  return await prisma.report.findMany({
    orderBy: { created_at: "asc" },
    ...(limit ? { take: limit } : {}),
    include: {
      user: true,
    },
  });
}

export async function getReportById(id: string) {
  return await prisma.report.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
}
