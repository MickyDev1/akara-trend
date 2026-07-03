export type MockUser = {
  name: string;
  email: string;
  password: string;
};

export type MockSession = Pick<MockUser, "name" | "email">;

export const USERS_STORAGE_KEY = "smoky-akara-users";
export const SESSION_STORAGE_KEY = "smoky-akara-session";
