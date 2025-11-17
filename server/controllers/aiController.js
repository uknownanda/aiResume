import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import fs from "fs";

// ---------------------------------------------------------------------
// Enhance Professional Summary
// ---------------------------------------------------------------------
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Improve the professional summary into 1–2 ATS-friendly sentences highlighting skills, experience, and career goals. Return ONLY the improved text.",
        },
        { role: "user", content: userContent },
      ],
    });

    return res.status(200).json({
      enhancedContent: response.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error("Summary Error:", error);
    return res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
// Enhance Job Description
// ---------------------------------------------------------------------
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Rewrite job responsibilities into 1–2 strong, action-driven, ATS-friendly bullet points. Return ONLY the improved text.",
        },
        { role: "user", content: userContent },
      ],
    });

    return res.status(200).json({
      enhancedContent: response.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error("Job Desc Error:", error);
    return res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
// Upload Resume + AI Extraction
// ---------------------------------------------------------------------
export const uploadResume = async (req, res) => {
  try {
    const userId = req.user._id;

    const title = req.body.title;
    const resumeText = req.body.resumeText;
    const file = req.file;

    if (!title || !resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // delete uploaded temp file if exists
    if (file?.path) fs.unlinkSync(file.path);

    // AI prompt
    const systemPrompt =
      "You are an expert AI system that extracts structured resume data.";

    const userPrompt = `
Extract structured resume data from the following text:

${resumeText}

Return ONLY valid JSON in this exact structure:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institute": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    let extracted;

    try {
      extracted = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error("JSON parse failed:", error);
      return res.status(400).json({
        message: "AI returned invalid JSON. Please try again.",
      });
    }

    // Create resume in DB
    const created = await Resume.create({
      userId,
      title,
      ...extracted,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resumeId: created._id,
    });
  } catch (err) {
    console.error("Upload Resume Error:", err);
    return res.status(400).json({ message: err.message });
  }
};
