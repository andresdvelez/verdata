import { Button, Card, CardBody, CardFooter, Chip } from "@heroui/react";
import React from "react";
import { getCountryName } from "../utils/getCountryByCode";
import { SearchedIdentities } from "@prisma/client";
import { SearchType } from "@/types/app/search";

interface NameMatchesListUserCardProps {
  user: SearchedIdentities;
  handleSearchReport: (identityData: string, searchType: SearchType) => void;
}

export const NameMatchesListUserCard = ({
  user,
  handleSearchReport,
}: NameMatchesListUserCardProps) => {
  return (
    <Card shadow="none" key={user.id} className="group stat-card">
      <CardBody className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <i
              className="icon-[solar--user-circle-line-duotone] size-8"
              role="img"
              aria-hidden="true"
            />
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold line-clamp-1">{user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {user.document_type}: {user.id}
              </p>
            </div>
          </div>
          <div className="flex justify-around flex-wrap gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-primary">Document type</p>
              <Chip variant="solid" className="px-3 py-1">
                {user.document_type}
              </Chip>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary">Nationality</p>
              <Chip variant="solid" className="px-3 py-1">
                {getCountryName(user.nationality)}
              </Chip>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          onPress={() => handleSearchReport(user.id, SearchType.DOCUMENT)}
          className="w-full"
          variant="solid"
          color="primary"
        >
          View Report
        </Button>
      </CardFooter>
    </Card>
  );
};
