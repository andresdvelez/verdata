import { SEARCH_TYPE_NAME } from "@/modules/app/constants/search";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { SearchFormInterface } from "@/types/app/search";
import { Input } from "@heroui/react";
import { Control, Controller } from "react-hook-form";

export const SearchInput = ({
  control,
}: {
  control: Control<SearchFormInterface>;
}) => {
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
          radius="full"
          className="bg-transparent shadow-none min-w-[235px]"
          classNames={{
            inputWrapper:
              "bg-transparent shadow-none data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
          }}
          type="text"
          label={
            localSearchType !== SEARCH_TYPE_NAME && warningLabel
              ? warningLabel
              : localSearchType === SEARCH_TYPE_NAME
              ? "Nombre"
              : searchDocumentLabel
          }
          placeholder={
            localSearchType === SEARCH_TYPE_NAME
              ? "Nombre"
              : searchDocumentLabel
          }
          {...field}
        />
      )}
    />
  );
};
