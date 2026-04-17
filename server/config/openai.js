// require("dotenv").config();

// const OpenAI = require("openai");

// // 🔥 Check API key
// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("❌ OPENAI_API_KEY is missing in .env file");
// }




require("dotenv").config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173", // जरूरी
    "X-Title": "AI Code Reviewer"
  }
});

module.exports = openai;