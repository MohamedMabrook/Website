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
      el.dataset.label = opts.label ?? ratioLabel(ratio);
    }
    return el;
  }

  const play = (el) => { const v = el.querySelector("video"); if (v) v.play().catch(() => {}); };
  const pause = (el) => { const v = el.querySelector("video"); if (v) v.pause(); };

  // ---------- Homepage ----------
  // Scroll-driven sections. The section in the middle of the viewport sets the
  // atmosphere: its footage plays full-bleed over the page at low opacity.
  const sectionsEl = document.querySelector(".sections");
  if (sectionsEl) {
    const atmos = document.querySelector(".atmos");
    const hud = document.querySelector(".hud");
    const layers = {};
    let current = null;
    let sectionKey = null;

    const layer = (key, src) => {
      if (!layers[key]) {
        const f = frame(src, { label: "" });
        f.classList.add("atmos-layer");
        atmos.appendChild(f);
        layers[key] = f;
      }
      return layers[key];
    };
    const show = (key) => {
      if (key === current) return;
      if (current && layers[current]) { layers[current].classList.remove("is-active"); pause(layers[current]); }
      current = key;
      if (key && layers[key]) { layers[key].classList.add("is-active"); play(layers[key]); }
    };

    (window.SECTIONS || []).forEach((s) => {
      const sec = document.getElementById(s.id);
      if (!sec) return;
      layer("s:" + s.id, { title: s.label, ratio: 1.78, tone: s.tone, loop: s.loop, poster: s.poster });
      sec.dataset.hud = s.label;

      if (s.role) {
        const list = sec.querySelector(".rows");
        projects.filter((p) => p.role.includes(s.role)).forEach((p) => {
          layer("p:" + p.slug, { ...p, ratio: 1.78 });
          const a = document.createElement("a");
          a.className = "row";
          a.href = `project.html#${p.slug}`;
          a.innerHTML = '<span class="title"></span><span class="year"></span>';
          a.querySelector(".title").textContent = p.title;
          a.querySelector(".year").textContent = p.status || p.year || "";
          if (p.status) a.querySelector(".year").classList.add("status");
          const on = () => { list.classList.add("has-focus"); a.classList.add("is-active"); show("p:" + p.slug); };
          const off = () => { list.classList.remove("has-focus"); a.classList.remove("is-active"); show(sectionKey); };
          a.addEventListener("mouseenter", on);
          a.addEventListener("focus", on);
          a.addEventListener("mouseleave", off);
          a.addEventListener("blur", off);
          list.appendChild(a);
        });
      }
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        sectionKey = "s:" + e.target.id;
        show(sectionKey);
        if (hud) hud.textContent = e.target.dataset.hud;
      });
    }, { rootMargin: "-50% 0px -50% 0px" });
    sectionsEl.querySelectorAll("section").forEach((sec) => io.observe(sec));
  }

  // ---------- Project page ----------
  const project = document.querySelector(".project");
  if (project) {
    const slug = location.hash.slice(1);
    window.addEventListener("hashchange", () => location.reload());
    const i = Math.max(0, projects.findIndex((p) => p.slug === slug));
    const p = projects[i];
    document.title = `${p.title} · Mohamed Mabrok`;

    project.querySelector("h1").textContent = p.title;
    project.querySelector(".meta").textContent = [p.format, p.status || p.year].filter(Boolean).join(" · ");
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
        label: String(n + 1).padStart(2, "0"),
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
    nextLink.href = `project.html#${next.slug}`;
    nextLink.querySelector("strong").textContent = next.title;
  }
})();
