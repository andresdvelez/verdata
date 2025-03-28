import { CreditsHeader } from "@/modules/app/credits/components/CreditsHeader";
import { SchematicComponent } from "@/modules/core/components/schematic/SchematicComponent";

const Credits = () => {
  return (
    <section className="flex flex-col gap-4">
      <CreditsHeader />
      <SchematicComponent componentId="cmpn_XrGFT3MfxCY" />
    </section>
  );
};

export default Credits;
