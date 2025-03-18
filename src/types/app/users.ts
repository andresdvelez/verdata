import { Report, User } from "@prisma/client";

export type UserType = User & { searched_reports: Report[] };

export type UserSearchByName = { Nombre: string };
