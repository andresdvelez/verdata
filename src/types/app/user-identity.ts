export interface UserIdentity {
  ID: string;
  Nacionalidad: string;
  Nombres: string;
  "Tipo de documento"?: string;
}

export type UserNotFound = {
  ID: string;
  error: string;
};
