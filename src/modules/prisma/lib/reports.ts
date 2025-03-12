import { Report } from "@prisma/client";
import prisma from "./prisma";

export async function createReport(data: Report) {
  try {
    const report = await prisma.report.create({ data });
    return { report };
  } catch (error) {
    return { error };
  }
}

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

export async function getReportsByUserId(userId?: string, limit?: number) {
  return await prisma.report.findMany({
    orderBy: { created_at: "asc" },
    ...(limit ? { take: limit } : {}),
    where: {
      user_id: userId,
    },
    include: {
      user: true,
    },
  });
}
