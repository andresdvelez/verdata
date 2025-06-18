export const recordsTableColumns = (t: (key: string) => string) => {
  return [
    { name: t("columns.nationality"), uid: "nationality" },
    { name: t("columns.search-type"), uid: "search_type" },
    { name: t("columns.search"), uid: "search_data" },
    { name: t("columns.date"), uid: "created_at" },
    { name: t("columns.report"), uid: "is_identity_matched" },
    { name: t("columns.actions"), uid: "actions" },
  ];
};
