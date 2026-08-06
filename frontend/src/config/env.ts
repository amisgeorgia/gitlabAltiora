export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API !== "false",
};
