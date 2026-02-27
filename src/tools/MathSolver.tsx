import ToolLayout from "../components/ToolLayout";

export default function MathSolver() {
  return (
    <ToolLayout
      icon="🧮"
      iconBg="linear-gradient(135deg, #06b6d4, #6366f1)"
      title="Math Problem Solver"
      description="Solve any math problem step-by-step with detailed explanations."
      fields={[
        {
          id: "problem",
          label: "Math Problem",
          type: "textarea",
          placeholder: "Type your math problem here...\n\nExamples:\n• Solve: 2x² + 5x - 3 = 0\n• Find the derivative of f(x) = x³ + 2x\n• A train travels 60mph for 2.5 hours. How far?",
          rows: 6,
        },
        {
          id: "level",
          label: "Math Level",
          type: "select",
          options: [
            "Elementary (Basic Arithmetic)",
            "Middle School (Pre-Algebra)",
            "High School (Algebra/Geometry)",
            "High School (Trigonometry)",
            "College (Calculus)",
            "College (Linear Algebra)",
            "College (Statistics)",
            "Advanced (Differential Equations)",
          ],
        },
        {
          id: "detail",
          label: "Solution Detail",
          type: "select",
          options: [
            "Step-by-Step with Explanations",
            "Quick Solution with Key Steps",
            "Full Explanation for Beginners",
          ],
        },
      ]}
      systemPrompt={() =>
        `You are an expert math tutor. Solve math problems clearly and accurately. Show all steps in a structured way. Use plain text formatting with numbered steps. Always verify your answer. Be encouraging and educational.`
      }
      userPrompt={(v) =>
        `Math Level: ${v.level || "High School (Algebra/Geometry)"}
Detail: ${v.detail || "Step-by-Step with Explanations"}

Problem:
${v.problem}

Please solve this problem with ${v.detail || "step-by-step explanations"}. Number each step clearly and show all working.`
      }
      outputLabel="🧮 Solution"
      outputClass="result-math"
      buttonText="Solve Problem"
    />
  );
}
