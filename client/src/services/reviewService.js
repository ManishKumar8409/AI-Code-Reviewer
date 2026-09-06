import API from "./api";

// Review Code
export const reviewCode = async (code, language) => {
  const res = await API.post("/review", {
    code,
    language,
  });

  return res.data;
};