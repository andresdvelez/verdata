"use server";

import { axiosInstance } from "@/modules/core/lib/axios";
import prisma from "@/modules/prisma/lib/prisma";

export async function downloadReportServerAction(
  reportId: string,
  token: string
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: { related_identity: true },
    });

    if (!report) {
      throw new Error("Report not found");
    }

    const response = await axiosInstance.get(`/reports/${reportId}/pdf`, {
      responseType: "arraybuffer",
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      data: Array.from(new Uint8Array(response.data)),
      headers: {
        "content-disposition": response.headers["content-disposition"],
        "content-type": response.headers["content-type"],
      },
      status: response.status,
      report: {
        id: report.id,
        relatedIdentityName: report.related_identity?.name,
      },
    };
  } catch (error) {
    throw error;
  }
}
