import { Country } from "@/types/app/bulk-search";
import { Card, CardBody, CardHeader, Select, SelectItem } from "@heroui/react";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  countries: Country[];
}

export const CountrySelector = ({
  selectedCountry,
  onCountryChange,
  countries,
}: CountrySelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Search Configuration</h2>
          <p className="text-sm text-default-500">
            Select the country for your bulk search
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <label htmlFor="bulk-country" className="text-sm font-medium">
            Country
          </label>
          <Select
            selectedKeys={selectedCountry ? [selectedCountry] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              onCountryChange(selected);
            }}
            placeholder="Select country for all searches"
            className="w-full"
          >
            {countries.map((country) => (
              <SelectItem key={country.code}>{country.name}</SelectItem>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  );
};
