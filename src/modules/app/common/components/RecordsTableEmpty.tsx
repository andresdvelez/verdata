import { useRouter } from "@/modules/translations/i18n/routing";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

export const RecordsTableEmpty = () => {
  const t = useTranslations("records-table.empty");
  const router = useRouter();

  return (
    <section className="w-dvw lg:w-full h-full flex justify-center items-center mt-10 md:mt-16">
      <div className="flex flex-col gap-y-4 items-center">
        <span className="icon-[lets-icons--arhive-alt-big-duotone-line] text-6xl text-black/85"></span>
        <p className="font-semibold text-xl text-primary">
          {t("not-reports-yet")}
        </p>
        <>
          <p>{t("get-started")}</p>
          <Button
            onPress={() => router.push("/app/search")}
            className="bg-black text-white hover:text-black hover:bg-white border-2 border-black font-clashDisplay tracking-wider font-medium"
          >
            {t("search-report")}
          </Button>
        </>
      </div>
    </section>
  );
};
