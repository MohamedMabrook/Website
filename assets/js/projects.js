// Project data. Everything on the site renders from this list.
// Swap placeholders for real media by adding `loop` (muted MP4), `poster`, and `stills`.
//
//   ratio   native aspect ratio as a number (2.39, 1.85, 1.78, 1.33)
//   year    release year; status (e.g. "Coming soon") shows instead when set
//   loop    path to a 4-8s muted MP4 shown on homepage hover
//   poster  still shown while the loop loads
//   stills  array of { src, ratio? } for the project page
//   tone    placeholder hue only, remove once real media is in
window.PROJECTS = [
  {
    slug: "movie-marathon",
    title: "Movie Marathon",
    status: "Coming soon",
    role: "Director",
    ratio: 1.78,
    credits: [["Director", "Mohamed Mabrok"]],
    tone: 28,
  },
  {
    slug: "get-experimental",
    title: "Get Experimental",
    role: "Director",
    ratio: 1.78,
    credits: [["Director", "Mohamed Mabrok"]],
    tone: 150,
  },
  {
    slug: "light-fall",
    title: "Light Fall",
    role: "Director",
    ratio: 1.78,
    credits: [["Director", "Mohamed Mabrok"]],
    tone: 45,
  },
  {
    slug: "1366",
    title: "1366",
    role: "Director",
    ratio: 1.78,
    credits: [["Director", "Mohamed Mabrok"]],
    tone: 0,
  },
  {
    slug: "dark-knight-test",
    title: "Dark Knight Test",
    year: 2025,
    role: "DP",
    ratio: 1.78,
    credits: [["Cinematography", "Mohamed Mabrok"]],
    tone: 220,
  },
  {
    slug: "the-flower",
    title: "The Flower",
    year: 2026,
    role: "DP",
    ratio: 1.78,
    credits: [["Cinematography", "Mohamed Mabrok"]],
    tone: 320,
  },
  {
    slug: "bhm",
    title: "BHM",
    year: 2026,
    role: "DP",
    ratio: 1.78,
    credits: [["Cinematography", "Mohamed Mabrok"]],
    tone: 35,
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
