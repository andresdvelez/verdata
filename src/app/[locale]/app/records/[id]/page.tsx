import { sampleKYCReport } from "@/modules/app/common/data/kycReportData";
import { KYCReportComponent } from "@/modules/app/home/KYCReportComponent";
import { getReportByReportIdAndUserId } from "@/modules/prisma/lib/reports";
import { ReportNotFound } from "@/modules/reports/components/ReportNotFound";
import { KYCReport } from "@/types/app/reports";
import { currentUser } from "@clerk/nextjs/server";

const ReportPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const reportId = (await params).id;
  const user = await currentUser();

  const report = await getReportByReportIdAndUserId(
    reportId,
    user?.id as string
  );

  if (!report) {
    return <ReportNotFound />;
  }

  return (
    <KYCReportComponent report={(report as KYCReport) || sampleKYCReport} />
  );
};

export default ReportPage;
