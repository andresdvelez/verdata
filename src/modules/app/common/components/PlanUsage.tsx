"use client";

import {
  useSchematicEntitlement,
  useSchematicIsPending,
} from "@schematichq/schematic-react";
import { FeatureFlag } from "../features/flags";
import { Progress, Spinner } from "@heroui/react";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useTranslations } from "next-intl";

export const PlanUsage = ({
  featureFlag,
  title,
  description,
}: {
  featureFlag: FeatureFlag;
  title: string;
  description: string;
}) => {
  const t = useTranslations("stat-cards");

  const router = useRouter();
  const isPending = useSchematicIsPending();
  const {
    featureAllocation,
    featureUsage,
    value: isFeatureEnabled,
    featureUsageExceeded,
  } = useSchematicEntitlement(featureFlag);

  if (isPending) {
    return <Spinner />;
  }

  if (featureUsageExceeded) {
    return (
      <div className="rounded-2xl shadow-sm border border-red-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="px-4 py-2 bg-red-50 rounded-md">
            <span className="font-medium text-red-700">{featureUsage}</span>
            <span className="text-red-400 mx-2">/</span>
            <span className="font-medium text-red-700">
              {featureAllocation}
            </span>
            <div className="">
              <button
                onClick={() => router.push("/app/credits")}
                className={`text-black/80 hover:text-black underline text-sm font-medium transition-colors duration-200`}
              >
                {t("get-more-credits")}
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <Progress
            value={100}
            className="h-3 rounded-full bg-gray-100 [&>*]:bg-red-600"
          />
          <p className="text-sm text-red-600 mt-2">
            You have used all available tokens. Please upgrade your plan to
            continue using this feature.
          </p>
          <div className="">
            <button
              onClick={() => router.push("/app/credits")}
              className={`text-black/80 hover:text-black underline text-sm font-medium transition-colors duration-200`}
            >
              {t("get-more-credits")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-gray-500">Feature disabled</span>
          </div>
        </div>
        <div className="relative">
          <Progress value={0} className="h-3 rounded-full bg-gray-100" />
          <p className="text-sm text-gray-500 mt-2">
            Upgrade to use this feature
          </p>
          <div className="">
            <button
              onClick={() => router.push("/app/credits")}
              className={`text-black/80 hover:text-black underline text-sm font-medium transition-colors duration-200`}
            >
              {t("get-more-credits")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return "[&>]:bg-red-600";
    if (percent >= 50) return "[&>]:bg-yellow-500";
    return "[&>]:bg-green-500";
  };

  const progressColor = getProgressColor(progress);

  return (
    <div className="stat-card p-8 overflow-hidden rounded-md border border-primary">
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex flex-col gap-2">
          <i
            className="icon-[tdesign--search] size-8"
            role="img"
            aria-hidden="true"
          />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        <div className="px-4 py-2 bg-gray-50 rounded-md">
          <span className="font-medium text-gray-700">{featureUsage}</span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="font-medium text-gray-700">{featureAllocation}</span>
        </div>
      </div>
      <div className="relative flex-1">
        <Progress
          value={progress}
          className={`h-3 rounded-full bg-gray-100 ${progressColor}`}
        />
        <div className="">
          <button
            onClick={() => router.push("/app/credits")}
            className={`text-black/80 hover:text-black underline text-sm font-medium transition-colors duration-200`}
          >
            {t("get-more-credits")}
          </button>
        </div>

        {progress >= 100 ? (
          <p className="text-sm text-red-600 mt-2">
            You have reached your usage limit
          </p>
        ) : progress >= 80 ? (
          <p className="text-sm text-red-600 mt-2">
            Warning: You are approaching your usage limit
          </p>
        ) : null}
      </div>
    </div>
  );
};
