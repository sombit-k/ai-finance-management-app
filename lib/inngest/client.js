import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "MoneyMinds AI", // Unique app ID
  name: "MoneyMinds AI",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});
