const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const openai = require("../config/openai");

router.post("/", async (req, res) => {
  try {
    console.log("🔥 REVIEW API HIT");

    const { code, language, userId } = req.body;

    console.log("CODE:", code);

    // 🔥 AI PROMPT
    const prompt = `
You are a senior software engineer.

Analyze the following ${language} code:

${code}

Give response in this format:

1. ❌ Errors / Issues:
- Explain what is wrong (simple language)

2. ✅ Correct Code:
- Provide fixed version of code

3. 💡 Explanation:
- Explain what you changed and why

4. ▶️ Output:
- What will be the output after fixing

Keep answer clean and structured.
`;


router.get("/:userId", async (req, res) => {
  try {
    console.log("🔥 HISTORY API HIT");   // 👈 ADD

    const reviews = await Review.find({ userId: req.params.userId });

    console.log("DATA:", reviews);      // 👈 ADD

    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});


    // 🔥 OPENAI CALL
    const response = await openai.chat.completions.create({
  model: "deepseek/deepseek-chat",  // ✅ FREE MODEL
  messages: [
    { role: "system", content: "You are an expert code reviewer." },
    { role: "user", content: prompt }
  ],
});

    const result = response.choices[0].message.content;

    console.log("AI RESULT:", result);

    // 💾 SAVE TO DB
    const review = new Review({
      code,
      language,
      result,
      userId,
    });

    await review.save();

    // 📤 RESPONSE
    res.json({ result });

  } catch (error) {
  console.log("❌ FULL ERROR:", error);   // 👈 पूरा error दिखेगा
  res.status(500).json({ error: "AI review failed" });
}
});

module.exports = router;