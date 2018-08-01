export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ambience.uber.space/api"
    : "http://localhost:62729";
