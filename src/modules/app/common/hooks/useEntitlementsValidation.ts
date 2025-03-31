import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { FeatureFlag } from "../features/flags";
import { useEffect, useState } from "react";

export const useEntitlementsValidation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { value: isNationalsAvailable, error: errorNationals } =
    useSchematicEntitlement(FeatureFlag.NATIONAL_LISTS_SEARCH);
  const { value: isInternationalsAvailable, error: errorInternationals } =
    useSchematicEntitlement(FeatureFlag.INTERNATIONAL_LISTS_SEARCH);

  useEffect(() => {
    if (
      isNationalsAvailable !== undefined &&
      isInternationalsAvailable !== undefined
    ) {
      setIsLoading(false);
    }
  }, [isNationalsAvailable, isInternationalsAvailable]);

  const isFullReportAvailable =
    isNationalsAvailable && isInternationalsAvailable;

  return {
    isFullReportAvailable,
    isNationalsAvailable,
    isInternationalsAvailable,
    errorNationals,
    errorInternationals,
    isLoading,
  };
};
