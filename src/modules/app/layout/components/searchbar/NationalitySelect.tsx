import { COUNTRIES } from "@/modules/app/data/countries";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { SearchFormInterface } from "@/types/app/search";
import { Select, SelectItem } from "@heroui/react";
import { Control, Controller } from "react-hook-form";

export const NationalitySelect = ({
  control,
}: {
  control: Control<SearchFormInterface>;
}) => {
  // const t = useTranslations();

  const setSearchDocumentLabel = useSearchReportStore(
    (state) => state.setSearchDocumentLabel
  );

  const setSearchWarning = useSearchReportStore(
    (state) => state.setSearchWarning
  );

  return (
    <Controller
      name="nationality"
      control={control}
      defaultValue=""
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <Select
          isInvalid={!!error}
          errorMessage={error?.message}
          radius="full"
          label="nationality"
          variant="flat"
          className="bg-transparent min-w-[235px]"
          classNames={{
            trigger:
              "py-0 min-h-2 bg-transparent shadow-none data-[hover=true]:bg-transparent",
            listbox: "max-h-60 overflow-y-auto",
            errorMessage: "absolute bottom-0",
          }}
          {...field}
        >
          {COUNTRIES?.map(
            ({ Country, Country_Code, Document_Type, Warning }) => (
              <SelectItem
                key={Country}
                data-value={Country_Code}
                onPress={() => {
                  const updatedDocumentType = Document_Type.replace(
                    /[()]/g,
                    ""
                  );
                  setSearchDocumentLabel(updatedDocumentType);
                  setSearchWarning(Warning);
                  onChange(Country_Code);
                }}
              >
                {Country}
              </SelectItem>
            )
          )}
        </Select>
      )}
    />
  );
};
