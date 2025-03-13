import { User } from "@prisma/client";
import { db } from "@/firebase/config";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { FetchData } from "@/types/app/endpoints";
import { UserIdentity } from "@/types/app/user-identity";
import { parseCountry } from "../utils/parseCountry";

export const getReportsClient = async (user: User) => {
  const docRef = doc(db, "records", `${user?.id}`);
  const res = await getDoc(docRef);
  const reports = res?.data()?.reports;
  reports?.sort((reportA: any, reportB: any) => {
    return (
      new Date(reportB?.preview?.date).getTime() -
      new Date(reportA?.preview?.date).getTime()
    ); // Sort by date in descending order (newest first)
  });
  return reports;
};

export const createUpdateReport = async ({
  user,
  internationalData,
  nationalData,
  isSearchName,
  userIdentity,
  countryCode,
  searchType,
}: {
  user: User;
  internationalData: FetchData[];
  nationalData: FetchData[];
  isSearchName: boolean;
  userIdentity: UserIdentity;
  countryCode: string;
  searchType: string;
}) => {
  if (!user) return;
  const docRef = doc(db, "reports", `${user?.id}`);
  const documentSnapshot = await getDoc(docRef);
  const reportData = {
    reports: arrayUnion({
      preview: {
        nationality: parseCountry(countryCode),
        searchType: searchType,
        searchData: isSearchName ? userIdentity?.Nombres : userIdentity?.ID,
        date: new Date().toISOString(),
        report: true,
        selectedName: userIdentity?.Nombres,
        nameSearch: isSearchName ? userIdentity?.Nombres : "",
        identity: userIdentity,
      },
      reportData: {
        nationals: nationalData,
        internationals: internationalData,
      },
    }),
  };
  if (documentSnapshot.exists()) {
    await updateDoc(docRef, reportData);
  } else {
    // TODO: Update database
    // await addData("reports", user?.id, reportData);
  }
};
