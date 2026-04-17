import API from "./api";

// Review Code
export const reviewCode = async (code, language, userId) => {
  const res = await API.post("/review", {
    code,
    language,
    userId,
  });
  return res.data;
};

// Get History
export const getHistory = async (userId) => {
  const res = await API.get(`/review/${userId}`);
  return res.data;
};