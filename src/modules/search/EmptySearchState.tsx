import { useState } from "react";
import { SearchBar } from "../app/layout/components/SearchBar";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { BulkSearch } from "./BulkSearch";

export const EmptySearchState = () => {
  // const t = useTranslations("report.empty");
  const [activeTab, setActiveTab] = useState("individual");

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VERDATA Report Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for comprehensive VERDATA reports using individual queries or
            bulk uploads
          </p>
        </div>

        {/* Search Options */}
        <Card shadow="none" className="backdrop-blur-sm bg-white/80 border-0">
          <CardHeader className="flex-col">
            <h2 className="text-2xl text-center font-semibold">
              Choose Your Search Method
            </h2>
            <p className="text-center">
              Select between individual search or bulk processing
            </p>
          </CardHeader>
          <CardBody className="items-center overflow-hidden flex">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
            >
              <Tab
                key="individual"
                title={
                  <div className="flex items-center gap-2">
                    <i
                      className="icon-[tdesign--search] size-4"
                      role="img"
                      aria-hidden="true"
                    />
                    Individual Search
                  </div>
                }
              >
                <div className="space-y-6 pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Individual VERDATA Search
                    </h3>
                    <p className="text-gray-600">
                      Search for a single person using their name or document
                      number
                    </p>
                  </div>
                  <SearchBar variant="search-page" />
                </div>
              </Tab>

              <Tab
                key="bulk"
                title={
                  <div className="flex items-center gap-2">
                    <i
                      className="icon-[material-symbols--upload] size-5"
                      role="img"
                      aria-hidden="true"
                    />
                    Bulk Search
                  </div>
                }
                className="!w-full"
              >
                <div className="space-y-6 pt-6 w-full">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Bulk VERDATA Search
                    </h3>
                    <p className="text-gray-600">
                      Upload a file with multiple names or document numbers for
                      batch processing
                    </p>
                  </div>
                  <BulkSearch />
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
