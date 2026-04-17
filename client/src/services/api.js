import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-code-reviewer-htew.onrender.com/api",
});

export default API;