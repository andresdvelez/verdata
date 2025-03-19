export const recordsTableColumns = (t: (key: string) => string) => {
  return [
    { name: t("columns.nationality"), uid: "nationality" },
    { name: t("columns.search-type"), uid: "searchType" },
    { name: t("columns.search"), uid: "searchData" },
    { name: t("columns.date"), uid: "created_at" },
    { name: t("columns.report"), uid: "data" },
    { name: t("columns.actions"), uid: "actions" },
  ];
};
