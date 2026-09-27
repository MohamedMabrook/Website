(function () {
  const projects = window.PROJECTS || [];

  const ratioLabel = (r) => (Math.abs(r - 1.33) < 0.01 ? "4:3" : Math.abs(r - 1.78) < 0.01 ? "16:9" : r.toFixed(2) + ":1");

  // Builds a frame: real <video>/<img> when a source exists, drifting placeholder otherwise.
  function frame(p, opts = {}) {
    const el = document.createElement("div");
    const ratio = opts.ratio || p.ratio;
    el.className = "frame";
    el.style.setProperty("--ar", ratio);

    const src = opts.src || (opts.still ? null : p.loop);
    if (src && /\.(mp4|webm)$/i.test(src)) {
      const v = document.createElement("video");
      Object.assign(v, { src, muted: true, loop: true, playsInline: true, preload: "metadata" });
      v.setAttribute("muted", "");
      if (p.poster) v.poster = p.poster;
      if (opts.autoplay) v.autoplay = true;
      el.appendChild(v);
    } else if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = p.title;
      img.loading = "lazy";
      el.appendChild(img);
    } else {
      el.classList.add("placeholder");
      if (opts.still) el.classList.add("static");
      el.style.setProperty("--tone", (p.tone || 0) + (opts.shift || 0));
      el.style.setProperty("--x", (opts.x ?? 30) + "%");
      el.style.setProperty("--y", (opts.y ?? 60) + "%");
      el.dataset.label = (opts.label || "Loop") + " · " + ratioLabel(ratio);
    }
    return el;
  }

  const play = (el) => { const v = el.querySelector("video"); if (v) v.play().catch(() => {}); };
  const pause = (el) => { const v = el.querySelector("video"); if (v) v.pause(); };

  // ---------- Homepage ----------
  const index = document.querySelector(".index");
  if (index) {
    const stage = document.querySelector(".stage");
    const stageFrames = {};
    const touch = window.matchMedia("(hover: none), (max-width: 720px)").matches;

    projects.forEach((p) => {
      const f = frame(p);
      stage.appendChild(f);
      stageFrames[p.slug] = f;

      const li = document.createElement("li");
      li.innerHTML = `<a href="project.html?p=${p.slug}"><span class="title"></span><span class="meta"></span></a>`;
      const a = li.firstChild;
      a.querySelector(".title").textContent = p.title;
      a.querySelector(".meta").textContent = `${p.role} · ${p.year}`;
      const inline = frame(p, { autoplay: touch });
      inline.classList.add("inline-frame");
      a.appendChild(inline);
      index.appendChild(li);

      const on = () => {
        index.classList.add("has-focus");
        index.querySelectorAll("a").forEach((x) => x.classList.toggle("is-active", x === a));
        Object.values(stageFrames).forEach((x) => { x.classList.remove("is-active"); pause(x); });
        f.classList.add("is-active");
        play(f);
      };
      const off = () => {
        index.classList.remove("has-focus");
        a.classList.remove("is-active");
        f.classList.remove("is-active");
        pause(f);
      };
      a.addEventListener("mouseenter", on);
      a.addEventListener("focus", on);
      a.addEventListener("mouseleave", off);
      a.addEventListener("blur", off);
    });
  }

  // ---------- Project page ----------
  const project = document.querySelector(".project");
  if (project) {
    const slug = new URLSearchParams(location.search).get("p");
    const i = Math.max(0, projects.findIndex((p) => p.slug === slug));
    const p = projects[i];
    document.title = `${p.title} · Mohamed Mabrook`;

    project.querySelector("h1").textContent = p.title;
    project.querySelector(".meta").textContent = [p.role, p.format, p.runtime, p.year].join(" · ");
    project.querySelector(".logline").textContent = p.logline;

    const stills = project.querySelector(".stills");
    const list = p.stills && p.stills.length
      ? p.stills
      : Array.from({ length: 7 }, (_, n) => ({ n }));
    list.forEach((s, n) => {
      const f = frame(p, {
        src: s.src,
        ratio: s.ratio,
        still: true,
        label: `Still ${String(n + 1).padStart(2, "0")}`,
        shift: (n * 17) % 40,
        x: (n * 37) % 100,
        y: (n * 53 + 20) % 100,
      });
      stills.appendChild(f);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    stills.querySelectorAll(".frame").forEach((f) => io.observe(f));

    const credits = project.querySelector(".credits");
    (p.credits || []).forEach(([k, v]) => {
      const dt = document.createElement("dt"); dt.textContent = k;
      const dd = document.createElement("dd"); dd.textContent = v;
      credits.append(dt, dd);
    });

    const next = projects[(i + 1) % projects.length];
    const nextLink = project.querySelector(".next");
    nextLink.href = `project.html?p=${next.slug}`;
    nextLink.querySelector("strong").textContent = next.title;
  }
})();
