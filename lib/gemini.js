export const getGeminiModelName = () =>
  process.env.GEMINI_MODEL?.trim() || "gemini-3-flash-preview";

export const getGeminiModelCandidates = () => {
  const preferred = getGeminiModelName();
  return Array.from(new Set([preferred, "gemini-2.0-flash"]));
};

export const isModelNotAvailableError = (error) => {
  const message = error?.message || "";
  return (
    message.includes("404 Not Found") ||
    message.includes("is not found") ||
    message.includes("not supported for generateContent")
  );
};
