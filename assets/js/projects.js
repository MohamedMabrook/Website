// Project data. Everything on the site renders from this list.
// Swap placeholders for real media by adding `loop` (muted MP4), `poster`, and `stills`.
//
//   section homepage list it appears in ("directing" or "cinematography")
//   role    your credit, shown on the project page
//   credits other crew as [role, name] pairs (optional)
//   ratio   native aspect ratio as a number (2.39, 1.85, 1.78, 1.33)
//   year    release year; status (e.g. "Coming soon") shows instead when set
//   loop    path to a 4-8s muted MP4 shown on homepage hover
//   poster  still shown while the loop loads, and on homepage hover when there's no loop
//   stills  array of { src, ratio? } for the project page
//   tone    placeholder hue only, remove once real media is in
window.PROJECTS = [
  {
    slug: "movie-marathon",
    title: "Movie Marathon",
    status: "Coming soon",
    section: "directing",
    role: "Director",
    ratio: 1.78,
    tone: 28,
  },
  {
    slug: "get-experimental",
    title: "Get Experimental",
    section: "directing",
    role: "Director / DP / Color / Edit",
    ratio: 2.37,
    poster: "media/get-experimental/01.webp",
    stills: Array.from({ length: 15 }, (_, n) => ({ src: `media/get-experimental/${String(n + 1).padStart(2, "0")}.webp` })),
    tone: 150,
  },
  {
    slug: "light-fall",
    title: "Light Fall",
    section: "directing",
    role: "Director",
    ratio: 1.78,
    tone: 45,
  },
  {
    slug: "1366",
    title: "1366",
    section: "directing",
    role: "Director",
    ratio: 1.78,
    tone: 0,
  },
  {
    slug: "dark-knight-test",
    title: "Dark Knight Test",
    year: 2025,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
    tone: 220,
  },
  {
    slug: "the-flower",
    title: "The Flower",
    year: 2026,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
    tone: 320,
  },
  {
    slug: "bhm",
    title: "BHM",
    year: 2026,
    section: "cinematography",
    role: "DP",
    ratio: 1.78,
    tone: 35,
  },
];

// Homepage sections. As each one scrolls into view, its `loop` plays over the page at 30%.
// Sections with `list: true` show the projects whose `section` matches their id.
window.SECTIONS = [
  { id: "reel", label: "Reel", tone: 30 },
  { id: "directing", label: "Directing", list: true, tone: 20 },
  { id: "cinematography", label: "Cinematography", list: true, tone: 205 },
  { id: "info", label: "Info", tone: 0 },
];
