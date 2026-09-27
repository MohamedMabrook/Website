// Project data. Everything on the site renders from this list.
// Swap placeholders for real media by adding `loop` (muted MP4), `poster`, and `stills`.
//
//   ratio   native aspect ratio as a number (2.39, 1.85, 1.78, 1.33)
//   loop    path to a 4-8s muted MP4 shown on homepage hover
//   poster  still shown while the loop loads
//   stills  array of { src, ratio? } for the project page
//   tone    placeholder hue only, remove once real media is in
window.PROJECTS = [
  {
    slug: "the-long-road",
    title: "The Long Road",
    year: 2025,
    role: "Director / DP",
    format: "16mm",
    runtime: "14 min",
    ratio: 2.39,
    logline: "One-line logline.",
    credits: [["Director", "Mohamed Mabrok"], ["Cinematography", "Mohamed Mabrok"], ["Editor", "Name Here"], ["Sound", "Name Here"]],
    tone: 28,
  },
  {
    slug: "salt",
    title: "Salt",
    year: 2024,
    role: "DP",
    format: "Digital, Alexa Mini",
    runtime: "22 min",
    ratio: 1.85,
    logline: "One-line logline.",
    credits: [["Director", "Name Here"], ["Cinematography", "Mohamed Mabrok"], ["Editor", "Name Here"]],
    tone: 200,
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    year: 2023,
    role: "Director",
    format: "Digital",
    runtime: "9 min",
    ratio: 1.33,
    logline: "One-line logline.",
    credits: [["Director", "Mohamed Mabrok"], ["Cinematography", "Name Here"], ["Editor", "Mohamed Mabrok"]],
    tone: 150,
  },
  {
    slug: "harbor",
    title: "Harbor",
    year: 2022,
    role: "Director / DP",
    format: "Super 8",
    runtime: "6 min",
    ratio: 1.78,
    logline: "One-line logline.",
    credits: [["Director", "Mohamed Mabrok"], ["Cinematography", "Mohamed Mabrok"]],
    tone: 45,
  },
  {
    slug: "untitled-study",
    title: "Untitled Study",
    year: 2021,
    role: "DP",
    format: "35mm",
    runtime: "4 min",
    ratio: 2.0,
    logline: "One-line logline.",
    credits: [["Director", "Name Here"], ["Cinematography", "Mohamed Mabrok"]],
    tone: 320,
  },
];

// Homepage sections. As each one scrolls into view, its `loop` plays over the page at 30%.
// `role` filters which projects list in that section (matched against project.role).
window.SECTIONS = [
  { id: "reel", label: "Reel", tone: 30 },
  { id: "directing", label: "Directing", role: "Director", tone: 20 },
  { id: "cinematography", label: "Cinematography", role: "DP", tone: 205 },
  { id: "info", label: "Info", tone: 0 },
];
