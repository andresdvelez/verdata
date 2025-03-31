import { ReportData } from "@/types/app/reports";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export async function createReport({
  userId,
  identityId,
  reportData,
  nationality,
  search_data,
  search_type,
}: {
  userId: string;
  identityId: string;
  reportData: ReportData;
  nationality: string;
  search_data: string;
  search_type: string;
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
      sanctions_lists: reportData as any,
      nationality,
      search_data,
      search_type,
      is_identity_matched: false, // Default value, update as needed
      risk_score: 0, // Default value, update as needed
      peps_verification: false, // Default value, update as needed
      criminal_records: false, // Default value, update as needed
      news_media: false, // Default value, update as needed
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
    include: {
      related_identity: true,
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
