const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const openai = require("../config/openai");

router.post("/", async (req, res) => {
  try {
    console.log("🔥 REVIEW API HIT");

    const { code, language } = req.body;

    console.log("LANGUAGE:", language);
    console.log("CODE:", code);

    // Validation
    if (!code || !code.trim()) {
      return res.status(400).json({
        error: "Code is required",
      });
    }

    // AI PROMPT
    const prompt = `
You are a senior software engineer and expert code reviewer.

Analyze the following ${language} code:

${code}

Give response in this exact format:

1. ❌ Errors / Issues:
- Explain what is wrong in simple language.

2. ✅ Correct Code:
- Provide the fixed version of the code.

3. 💡 Explanation:
- Explain what you changed and why.

4. ▶️ Output:
- Explain what the output will be after fixing.

Keep the response clean, structured and easy to understand.
`;

    // OPENROUTER / AI CALL
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = response?.choices?.[0]?.message?.content;

    console.log("🤖 AI RESULT:", result);

    if (!result) {
      return res.status(500).json({
        error: "No response received from AI",
      });
    }

    /*
      Save review to database.

      IMPORTANT:
      This assumes userId is NOT required in Review schema.
    */
    try {
      const review = new Review({
        code,
        language,
        result,
      });

      await review.save();

      console.log("💾 Review saved to MongoDB");
    } catch (dbError) {
      console.log("⚠️ DB SAVE ERROR:", dbError.message);

      // AI result should still be returned
      // even if history saving fails.
    }

    // RESPONSE
    res.json({
      result,
    });

  } catch (error) {
    console.log("❌ FULL REVIEW ERROR:", error);

    res.status(500).json({
      error: "AI review failed",
    });
  }
});

module.exports = router;