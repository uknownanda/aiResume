import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

/**
 * ResumePreview Component
 *
 * Renders the resume in a chosen template with accent color and print-friendly styling.
 * Supports: "modern", "minimal", "minimal-image", and "classic" templates.
 */
export const ResumePreview = ({
  data,
  template,
  accentColor,
  classes = "",
}) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 print:bg-white print:p-0">
      <div
        id="resume-preview"
        className={`bg-white shadow-md rounded-lg border border-gray-200 w-full max-w-[850px] overflow-hidden transition-transform duration-200 hover:scale-[1.01] print:border-none print:shadow-none ${classes}`}
      >
        {renderTemplate()}
      </div>

      {/* Print Styles (applied globally) */}
      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
              background: white;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
