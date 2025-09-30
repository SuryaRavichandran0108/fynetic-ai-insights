export const getConfidenceTier = (value: number): "Low" | "Medium" | "High" => {
  if (value >= 70) return "High";
  if (value >= 40) return "Medium";
  return "Low";
};

export const getConfidenceColor = (value: number): string => {
  if (value >= 70) return "bg-accent-teal";
  if (value >= 40) return "bg-warning";
  return "bg-negative";
};