import { SchematicComponent } from "@/modules/core/components/schematic/SchematicComponent";
import React from "react";

const Credits = () => {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 my-">Manage Your Plan</h2>
        <p className="text-gray-600 mb-8">
          Manage your subscription and billing details here.
        </p>
      </div>
      <SchematicComponent componentId="cmpn_XrGFT3MfxCY" />
    </section>
  );
};

export default Credits;
