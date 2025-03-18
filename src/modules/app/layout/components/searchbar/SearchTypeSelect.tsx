import {
  SEARCH_TYPE_ID,
  SEARCH_TYPE_NAME,
} from "@/modules/app/constants/search";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { SearchFormInterface } from "@/types/app/search";
import { Select, SelectItem } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Control, Controller } from "react-hook-form";

export const SearchTypeSelect = ({
  control,
}: {
  control: Control<SearchFormInterface>;
}) => {
  const t = useTranslations("search-type-select");

  const searchDocumentLabel = useSearchReportStore(
    (state) => state.searchDocumentLabel
  );

  const setLocalSearchType = useSearchReportStore(
    (state) => state.setLocalSearchType
  );

  return (
    <Controller
      name="searchType"
      control={control}
      defaultValue=""
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <Select
          isInvalid={!!error}
          errorMessage={error?.message}
          radius="full"
          label={t("label")}
          variant="flat"
          className="bg-transparent min-w-[235px]"
          classNames={{
            trigger:
              "py-0 min-h-2 bg-transparent shadow-none data-[hover=true]:bg-transparent mr-4",
            listbox: "max-h-60 overflow-y-auto",
            errorMessage: "absolute bottom-0",
          }}
          onChange={(event) => {
            onChange(event);
            setLocalSearchType(event.target.value);
          }}
          {...field}
        >
          <SelectItem key={SEARCH_TYPE_NAME} data-value={SEARCH_TYPE_NAME}>
            {t("name")}
          </SelectItem>
          <SelectItem key={SEARCH_TYPE_ID} data-value={SEARCH_TYPE_ID}>
            {searchDocumentLabel}
          </SelectItem>
        </Select>
      )}
    />
  );
};
