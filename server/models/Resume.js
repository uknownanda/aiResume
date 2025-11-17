import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },

    professional_summary: { type: String, default: "" },

    skills: [{ type: String }],

    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    experience: [
      {
        company: String,
        position: String,
        start_date: String,
        end_date: String,
        description: String,
        is_current: Boolean,
      },
    ],

    project: [
      {
        name: String,
        type: String,
        description: String,
      },
    ],

    education: [
      {
        institute: String,
        degree: String,
        field: String,
        graduation_date: String,
        gpa: String,
      },
    ],
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model("Resume", ResumeSchema);
