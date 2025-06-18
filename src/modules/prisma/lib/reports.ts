/* eslint-disable @typescript-eslint/no-explicit-any */
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
      sanctions_lists: reportData as any,
      nationality,
      search_data,
      search_type,
      is_identity_matched: false, // Default value, update as needed
      risk_score: 0, // Default value, update as needed
      peps_verification: false, // Default value, update as needed
      criminal_records: false, // Default value, update as needed
      news_media: false,
      peps_lists: "",
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
      related_identity: true,
    },
  });
}

export async function getReportByReportIdAndUserId(
  reportId: string,
  userId: string
) {
  const report = await prisma.report.findUnique({
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

  if (!report) {
    return null;
  }

  // Parse the JSON fields to ensure proper structure
  const parsedReport = {
    ...report,
    sanctions_lists: report.sanctions_lists as any,
    peps_lists: report.peps_lists as any,
  };

  return parsedReport;
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
