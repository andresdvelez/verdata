import { Card, Skeleton } from "@heroui/react";

export const KYCReportSkeleton = () => {
  return (
    <div className="animate-fade-in">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-1">
        <Skeleton className="h-10 w-24 mb-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />

          {/* Identity Card Skeleton */}
          <div className="glass-card py-6 rounded-lg space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-28" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions Card Skeleton */}
          <Card className="overflow-hidden" shadow="sm">
            <div className="flex justify-between items-center p-4 border-b">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          </Card>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Card shadow="sm" className="p-5">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <Skeleton className="h-7 w-32" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-4 w-36 mt-1" />
                <Skeleton className="h-36 w-36 rounded-full my-2" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
            </div>

            <Skeleton className="h-px w-full my-4" />

            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
