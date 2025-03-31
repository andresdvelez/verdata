import { COUNTRIES } from "@/modules/app/data/countries";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { SearchFormInterface } from "@/types/app/search";
import { Select, SelectItem } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Control, Controller } from "react-hook-form";

export const NationalitySelect = ({
  control,
}: {
  control: Control<SearchFormInterface>;
}) => {
  const t = useTranslations("nationality-select");

  const setSearchDocumentLabel = useSearchReportStore(
    (state) => state.setSearchDocumentLabel
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
          label={t("label")}
          variant="flat"
          className="bg-transparent lg:min-w-[180px] xl:min-w-[205px] 2xl:min-w-[235px]"
          classNames={{
            trigger:
              "py-0 min-h-2 bg-transparent shadow-none data-[hover=true]:bg-transparent",
            listbox: "max-h-60 overflow-y-auto",
            errorMessage: "absolute bottom-0",
          }}
          {...field}
        >
          {COUNTRIES?.map(({ Country, Country_Code, Document_Type }) => (
            <SelectItem
              key={Country}
              data-value={Country_Code}
              onPress={() => {
                const updatedDocumentType = Document_Type.replace(/[()]/g, "");
                setSearchDocumentLabel(updatedDocumentType);
                onChange(Country_Code);
              }}
            >
              {Country}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};
