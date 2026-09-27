// Project data. Everything on the site renders from this list.
// Swap placeholders for real media by adding `loop` (muted MP4), `poster`, and `stills`.
//
//   section homepage list(s) it appears in: "directing", "cinematography", "color",
//           or an array of several. Lists sort themselves newest first.
//   role    your credit, shown on the project page
//   credits other crew as [role, name] pairs (optional)
//   ratio   native aspect ratio as a number (2.39, 1.85, 1.78, 1.33)
//   year    release year; status (e.g. "Coming soon") shows instead when set
//   loop    path to a 4-8s muted MP4 shown on homepage hover
//   poster  still shown while the loop loads, and on homepage hover when there's no loop
//   stills  array of { src, ratio? } for the project page
window.PROJECTS = [
  {
    slug: "movie-marathon",
    title: "Movie Marathon",
    status: "Coming soon",
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
  },
  {
    slug: "get-experimental",
    title: "Get Experimental",
    section: ["directing", "color"],
    role: "Director / DP / Color / Edit",
    ratio: 2.37,
    poster: "media/get-experimental/01.webp",
    stills: Array.from({ length: 15 }, (_, n) => ({ src: `media/get-experimental/${String(n + 1).padStart(2, "0")}.webp` })),
  },
  {
    slug: "light-fall",
    title: "Light Fall",
    section: "directing",
    role: "Director",
    ratio: 1.78,
  },
  {
    slug: "1366",
    title: "1366",
    section: "directing",
    role: "Director",
    ratio: 1.78,
  },
  {
    slug: "dominion",
    title: "Dominion",
    year: 2026,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
  },
  {
    slug: "dark-knight-test",
    title: "Dark Knight Test",
    year: 2025,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
  },
  {
    slug: "the-flower",
    title: "The Flower",
    year: 2026,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
  },
  {
    slug: "bhm",
    title: "BHM",
    year: 2026,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
  },
];

// Homepage sections, in page order. The header shows the label of the one on screen.
// Sections with `list: true` show the projects whose `section` includes their id.
window.SECTIONS = [
  { id: "reel", label: "Reel" },
  { id: "directing", label: "Directing", list: true },
  { id: "cinematography", label: "Cinematography", list: true },
  { id: "color", label: "Color", list: true },
  { id: "info", label: "Info" },
];
