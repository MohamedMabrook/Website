# Film portfolio

Static site, no build step. Open `index.html` or serve the folder (`python3 -m http.server`).

- `assets/js/projects.js` holds every project. Edit this file to add or change work.
- `index.html` title list; hovering a title plays that film's loop at its native aspect ratio. Touch screens show loops inline.
- `project.html?p=<slug>` stills sequence, credits, next project.
- `info.html` bio and contact.

## Replacing placeholders

Add media paths to a project in `projects.js`:

```js
loop: "media/the-long-road/loop.mp4",   // 4-8s, 720p, H.264, no audio, 1-3 MB
poster: "media/the-long-road/poster.jpg",
stills: [{ src: "media/the-long-road/01.jpg" }, { src: "media/the-long-road/02.jpg", ratio: 1.85 }],
```

Anything without a path renders as a drifting placeholder frame labeled with its aspect ratio.
