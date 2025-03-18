import { SEARCH_TYPE_NAME } from "@/modules/app/constants/search";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { SearchFormInterface } from "@/types/app/search";
import { Input } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Control, Controller } from "react-hook-form";

export const SearchInput = ({
  control,
}: {
  control: Control<SearchFormInterface>;
}) => {
  const t = useTranslations("search-data-input");

  const localSearchType = useSearchReportStore(
    (state) => state.localSearchType
  );

  const warningLabel = useSearchReportStore((state) => state.warningLabel);
  const searchDocumentLabel = useSearchReportStore(
    (state) => state.searchDocumentLabel
  );

  return (
    <Controller
      name="searchInput"
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Input
          isInvalid={!!error}
          errorMessage={error?.message}
          isRequired
          className="bg-transparent shadow-none min-w-[235px] border-none"
          classNames={{
            inputWrapper:
              "bg-transparent shadow-none data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            errorMessage: "absolute bottom-0",
          }}
          type="text"
          label={
            localSearchType !== SEARCH_TYPE_NAME && warningLabel
              ? warningLabel
              : localSearchType === SEARCH_TYPE_NAME
              ? t("name")
              : searchDocumentLabel
          }
          placeholder={
            localSearchType === SEARCH_TYPE_NAME
              ? t("name")
              : searchDocumentLabel
          }
          {...field}
        />
      )}
    />
  );
};
