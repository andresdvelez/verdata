import { getReportById } from "@/modules/prisma/lib/reports";
import { ReportNotFound } from "@/modules/reports/components/ReportNotFound";

const ReportPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const reportId = (await params).id;
  const report = await getReportById(reportId);

  if (!report) {
    return <ReportNotFound />;
  }

  return <div>ReportPage</div>;
};

export default ReportPage;
