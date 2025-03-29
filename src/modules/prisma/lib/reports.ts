import { ReportData } from "@/types/app/reports";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export async function createReport({
  userId,
  identityId,
  reportData,
  nationality,
  searchData,
  searchType,
}: {
  userId: string;
  identityId: string;
  reportData: ReportData;
  nationality: string;
  searchData: string;
  searchType: string;
}) {
  try {
    const data: Prisma.ReportCreateInput = {
      user: {
        connect: { id: userId },
      },
      related_identity: {
        connect: { id: identityId },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: reportData as any,
      nationality,
      searchData,
      searchType,
    };

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

export async function getReportByReportIdAndUserId(
  reportId: string,
  userId: string
) {
  return await prisma.report.findUnique({
    where: {
      id: reportId,
      user: {
        clerk_id: userId,
      },
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
