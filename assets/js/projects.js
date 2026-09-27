// Project data. Everything on the site renders from this list.
// Swap placeholders for real media by adding `loop` (muted MP4), `poster`, and `stills`.
//
//   section homepage list(s) it appears in: "directing", "cinematography", "color",
//           or an array of several. Lists sort themselves newest first.
//   role    your credit, shown on the project page
//   genre   shown on the homepage row and project page; leave out to hide
//   logline one line under the title on the project page (optional)
//   note    small print under the logline, e.g. rights notices (optional)
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
    section: "directing",
    role: "Director / DP / Color / Edit",
    genre: "Neo Noir",
    ratio: 2.37,
    poster: "media/get-experimental/01.webp",
    stills: Array.from({ length: 15 }, (_, n) => ({ src: `media/get-experimental/${String(n + 1).padStart(2, "0")}.webp` })),
  },
  {
    slug: "light-fall",
    title: "Light Fall",
    section: "directing",
    role: "Director",
    logline: "Adapted from Destiny 2.",
    note: "Fan project. Not affiliated with or endorsed by Bungie. Destiny 2 © Bungie, Inc. All rights reserved.",
    ratio: 1.42,
    poster: "media/light-fall/01.webp",
    stills: Array.from({ length: 5 }, (_, n) => ({ src: `media/light-fall/${String(n + 1).padStart(2, "0")}.webp` })),
  },
  {
    slug: "1366",
    title: "1366",
    section: "directing",
    role: "Director",
    ratio: 1.32,
    poster: "media/1366/01.webp",
    // Mixed formats: two 1.32:1 frames, then three 2.37:1.
    stills: [1.32, 1.32, 2.37, 2.37, 2.37].map((ratio, n) => ({ src: `media/1366/0${n + 1}.webp`, ratio })),
  },
  {
    slug: "dominion",
    title: "Dominion",
    year: 2026,
    section: "cinematography",
    role: "DP",
    genre: "Cinematic Documentary",
    ratio: 1.42,
    poster: "media/dominion/01.webp",
    stills: Array.from({ length: 8 }, (_, n) => ({ src: `media/dominion/${String(n + 1).padStart(2, "0")}.webp` })),
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
    genre: "Romance",
    ratio: 1.42,
    poster: "media/the-flower/01.webp",
    stills: Array.from({ length: 5 }, (_, n) => ({ src: `media/the-flower/${String(n + 1).padStart(2, "0")}.webp` })),
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
// Sections with `list: true` show the projects whose `section` includes their id;
// a list with no projects hides its whole section (e.g. Color until one is added).
window.SECTIONS = [
  { id: "reel", label: "Reel" },
  { id: "directing", label: "Directing", list: true },
  { id: "cinematography", label: "Cinematography", list: true },
  { id: "color", label: "Color", list: true },
];
