const COLORS = {
  goodbye: "#34495e",
  affirm: "#2ecc71",
  greet: "#9b59b6",
  deny: "#e74c3c",
  other: "#b5c5c6",
  ask: "#3498db",
  argue: "#e67e22",
  explain: "#f1c40f",
  propose: "#1abc9c",
};

export function getColorByIntent(intent) {
  return COLORS[intent];
}
