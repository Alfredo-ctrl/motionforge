(function () {
  var storageKey = "motionforge.recipe";
  var activeTab = "html";
  var previewTimeline = null;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var presets = {
    hero: {
      title: "Hero Reveal",
      kicker: "Portfolio launch",
      headline: "Make the first screen feel alive.",
      copy: "A layered entrance with split text, controlled distance, and soft stagger for portfolio-ready sections.",
      chips: ["split text", "hero rhythm", "clean entrance"],
      cards: [
        { title: "01", text: "Title lands first" },
        { title: "02", text: "Support copy follows" },
        { title: "03", text: "Actions arrive last" }
      ],
      settings: { duration: 1.2, stagger: 0.08, distance: 70, rotation: 0, scale: 0.9, scrub: 0.8, direction: "up", ease: "power3.out", theme: "ink", split: true, scroll: false, pin: false }
    },
    cards: {
      title: "Product Cards",
      kicker: "Feature board",
      headline: "Stack the interface like a premium product demo.",
      copy: "Animate cards with stagger, depth, and a small rotation that keeps dense UI sections feeling deliberate.",
      chips: ["cards", "stagger", "product UI"],
      cards: [
        { title: "Plan", text: "Clarify the flow" },
        { title: "Build", text: "Move in groups" },
        { title: "Polish", text: "Finish with intent" }
      ],
      settings: { duration: 0.95, stagger: 0.12, distance: 90, rotation: -6, scale: 0.86, scrub: 1, direction: "right", ease: "back.out(1.6)", theme: "paper", split: false, scroll: false, pin: false }
    },
    story: {
      title: "Scroll Story",
      kicker: "Narrative section",
      headline: "Guide attention while the page moves.",
      copy: "Use ScrollTrigger, scrub, and optional pinning to turn a long explanation into a calm interactive story.",
      chips: ["scroll", "scrub", "pin ready"],
      cards: [
        { title: "Start", text: "Problem appears" },
        { title: "Shift", text: "Context transforms" },
        { title: "Result", text: "Decision becomes clear" }
      ],
      settings: { duration: 1.4, stagger: 0.06, distance: 120, rotation: 4, scale: 0.92, scrub: 1.2, direction: "left", ease: "expo.out", theme: "signal", split: true, scroll: true, pin: true }
    },
    gallery: {
      title: "Gallery Motion",
      kicker: "Visual system",
      headline: "Reveal images with enough movement to feel custom.",
      copy: "A compact grid pattern for portfolios, case studies, and visual project breakdowns with practical parallax energy.",
      chips: ["gallery", "parallax", "case study"],
      cards: [
        { title: "Frame A", text: "Wide reveal" },
        { title: "Frame B", text: "Offset entry" },
        { title: "Frame C", text: "Soft landing" }
      ],
      settings: { duration: 1.05, stagger: 0.1, distance: 80, rotation: 8, scale: 0.82, scrub: 0.7, direction: "down", ease: "circ.out", theme: "ink", split: false, scroll: false, pin: false }
    }
  };

  var text = {
    en: {
      navBuilder: "Builder",
      navTimeline: "Timeline",
      navExport: "Export",
      eyebrow: "GSAP motion studio",
      headline: "Design scroll animations you can actually ship.",
      subhead: "Tune a preset, test it live, then export clean GSAP code for web sections, cards, galleries, and portfolio stories.",
      meterOne: "4 animation presets",
      meterTwo: "copy-ready code",
      meterThree: "ScrollTrigger aware",
      recipeEyebrow: "Motion recipe",
      recipeTitle: "Build the sequence",
      presetHero: "Hero Reveal",
      presetHeroDesc: "Bold entrance for a first section.",
      presetCards: "Product Cards",
      presetCardsDesc: "Staggered panels with useful depth.",
      presetStory: "Scroll Story",
      presetStoryDesc: "Pinned narrative movement.",
      presetGallery: "Gallery Motion",
      presetGalleryDesc: "Image grid reveal with parallax feel.",
      duration: "Duration",
      stagger: "Stagger",
      distance: "Distance",
      rotation: "Rotation",
      scale: "Scale",
      scrub: "Scrub",
      direction: "Direction",
      ease: "Ease",
      theme: "Theme",
      splitText: "Split text",
      pin: "Pin section",
      runMotion: "Run motion",
      randomize: "Randomize",
      saveRecipe: "Save recipe",
      livePreview: "Live preview",
      ready: "Ready",
      running: "Running",
      timelineEyebrow: "Timeline",
      timelineTitle: "See the motion as a sequence.",
      exportEyebrow: "Export",
      exportTitle: "Take the recipe into your next project.",
      copyCode: "Copy code",
      saved: "Recipe saved",
      copied: "Code copied"
    },
    es: {
      navBuilder: "Editor",
      navTimeline: "Linea",
      navExport: "Exportar",
      eyebrow: "Estudio GSAP",
      headline: "Disena animaciones web que si puedes usar.",
      subhead: "Ajusta un preset, pruebalo en vivo y exporta codigo GSAP limpio para secciones, tarjetas, galerias y portafolios.",
      meterOne: "4 presets",
      meterTwo: "codigo listo",
      meterThree: "con ScrollTrigger",
      recipeEyebrow: "Receta de movimiento",
      recipeTitle: "Construye la secuencia",
      presetHero: "Hero Reveal",
      presetHeroDesc: "Entrada fuerte para primera seccion.",
      presetCards: "Product Cards",
      presetCardsDesc: "Paneles con profundidad util.",
      presetStory: "Scroll Story",
      presetStoryDesc: "Narrativa fijada con scroll.",
      presetGallery: "Gallery Motion",
      presetGalleryDesc: "Grid visual con energia parallax.",
      duration: "Duracion",
      stagger: "Stagger",
      distance: "Distancia",
      rotation: "Rotacion",
      scale: "Escala",
      scrub: "Scrub",
      direction: "Direccion",
      ease: "Ease",
      theme: "Tema",
      splitText: "Separar texto",
      pin: "Fijar seccion",
      runMotion: "Ejecutar",
      randomize: "Variar",
      saveRecipe: "Guardar",
      livePreview: "Vista en vivo",
      ready: "Listo",
      running: "Animando",
      timelineEyebrow: "Timeline",
      timelineTitle: "Mira el movimiento como secuencia.",
      exportEyebrow: "Exportar",
      exportTitle: "Lleva la receta a tu siguiente proyecto.",
      copyCode: "Copiar codigo",
      saved: "Receta guardada",
      copied: "Codigo copiado"
    }
  };

  var state = Object.assign({}, presets.hero.settings, { preset: "hero", lang: "en" });

  var controls = {
    duration: document.getElementById("duration"),
    stagger: document.getElementById("stagger"),
    distance: document.getElementById("distance"),
    rotation: document.getElementById("rotation"),
    scale: document.getElementById("scale"),
    scrub: document.getElementById("scrub"),
    direction: document.getElementById("direction"),
    ease: document.getElementById("ease"),
    theme: document.getElementById("theme"),
    split: document.getElementById("split"),
    scroll: document.getElementById("scroll"),
    pin: document.getElementById("pin")
  };

  var output = {
    duration: document.getElementById("durationValue"),
    stagger: document.getElementById("staggerValue"),
    distance: document.getElementById("distanceValue"),
    rotation: document.getElementById("rotationValue"),
    scale: document.getElementById("scaleValue"),
    scrub: document.getElementById("scrubValue")
  };

  var presetList = document.getElementById("presetList");
  var languageToggle = document.getElementById("languageToggle");
  var previewStage = document.getElementById("previewStage");
  var previewTitle = document.getElementById("previewTitle");
  var statusPill = document.getElementById("statusPill");
  var stageKicker = document.getElementById("stageKicker");
  var stageTitle = document.getElementById("stageTitle");
  var stageCopy = document.getElementById("stageCopy");
  var previewChips = document.getElementById("previewChips");
  var motionCards = document.getElementById("motionCards");
  var timelineBoard = document.getElementById("timelineBoard");
  var codeOutput = document.getElementById("codeOutput");
  var toast = document.getElementById("toast");

  function syncOutputs() {
    output.duration.value = Number(state.duration).toFixed(2) + "s";
    output.stagger.value = Number(state.stagger).toFixed(2) + "s";
    output.distance.value = state.distance + "px";
    output.rotation.value = state.rotation + "deg";
    output.scale.value = Number(state.scale).toFixed(2) + "x";
    output.scrub.value = Number(state.scrub).toFixed(2) + "s";
  }

  function syncControls() {
    Object.keys(controls).forEach(function (key) {
      var control = controls[key];
      if (!control) {
        return;
      }
      if (control.type === "checkbox") {
        control.checked = Boolean(state[key]);
      } else {
        control.value = state[key];
      }
    });
    syncOutputs();
  }

  function applyLanguage() {
    var dictionary = text[state.lang];
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.dataset.i18n;
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });
    languageToggle.setAttribute("aria-pressed", state.lang === "es" ? "true" : "false");
    languageToggle.classList.toggle("is-es", state.lang === "es");
    statusPill.textContent = dictionary.ready;
  }

  function splitWords(element, content) {
    element.textContent = "";
    if (!state.split) {
      element.textContent = content;
      return;
    }
    content.split(" ").forEach(function (word, index) {
      var span = document.createElement("span");
      span.className = "split-unit";
      span.textContent = word;
      element.appendChild(span);
      if (index < content.split(" ").length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  }

  function renderPreview() {
    var preset = presets[state.preset];
    previewTitle.textContent = preset.title;
    stageKicker.textContent = preset.kicker;
    splitWords(stageTitle, preset.headline);
    stageCopy.textContent = preset.copy;
    previewStage.className = "preview-stage theme-" + state.theme;
    previewStage.dataset.preset = state.preset;
    previewChips.innerHTML = "";
    preset.chips.forEach(function (chip) {
      var span = document.createElement("span");
      span.className = "preview-chip";
      span.textContent = chip;
      previewChips.appendChild(span);
    });
    motionCards.innerHTML = "";
    preset.cards.forEach(function (card) {
      var article = document.createElement("article");
      article.className = "motion-card";
      article.innerHTML = "<strong>" + card.title + "</strong><span>" + card.text + "</span>";
      motionCards.appendChild(article);
    });
  }

  function directionVars() {
    var distance = Number(state.distance);
    if (state.direction === "down") {
      return { y: -distance };
    }
    if (state.direction === "left") {
      return { x: distance };
    }
    if (state.direction === "right") {
      return { x: -distance };
    }
    return { y: distance };
  }

  function runMotion() {
    if (!window.gsap || prefersReducedMotion.matches) {
      return;
    }
    if (previewTimeline) {
      previewTimeline.kill();
    }
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach(function (trigger) {
        trigger.kill();
      });
    }

    window.gsap.set(".stage-kicker, .split-unit, #stageTitle, .preview-copy, .motion-card, .preview-chip, .flow-line", { clearProps: "all" });

    var from = Object.assign(directionVars(), {
      autoAlpha: 0,
      rotation: Number(state.rotation),
      scale: Number(state.scale)
    });

    statusPill.textContent = text[state.lang].running;
    previewTimeline = window.gsap.timeline({
      defaults: { ease: state.ease },
      onComplete: function () {
        statusPill.textContent = text[state.lang].ready;
      }
    });

    previewTimeline
      .from(".stage-kicker", { y: 18, autoAlpha: 0, duration: 0.45 }, 0)
      .from(state.split ? ".split-unit" : "#stageTitle", Object.assign({}, from, { duration: Number(state.duration), stagger: Number(state.stagger) }), 0.08)
      .from(".preview-copy", { y: 22, autoAlpha: 0, duration: 0.65 }, 0.22)
      .from(".motion-card", Object.assign({}, from, { duration: Number(state.duration) * 0.82, stagger: Number(state.stagger) + 0.04 }), 0.38)
      .from(".preview-chip", { y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.04 }, 0.55)
      .from(".flow-line", { scaleX: 0, transformOrigin: "left", duration: 0.8, stagger: 0.12 }, 0.04);

    if (state.scroll && window.ScrollTrigger) {
      window.gsap.from(".timeline-item", {
        y: 32,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.07,
        scrollTrigger: {
          trigger: "#timeline",
          start: "top 76%",
          scrub: Number(state.scrub) > 1.5 ? 1.5 : false,
          pin: false
        }
      });
    }
  }

  function renderTimeline() {
    var timeline = [
      { label: "Kicker", start: 0, span: 18 },
      { label: "Headline", start: 8, span: 42 },
      { label: "Copy", start: 22, span: 28 },
      { label: "Cards", start: 38, span: 44 },
      { label: "Chips", start: 55, span: 26 }
    ];
    timelineBoard.innerHTML = "";
    timeline.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "timeline-item";
      row.innerHTML = "<span>" + item.label + "</span><div class=\"timeline-track\"><i style=\"--start:" + item.start + "%; --span:" + item.span + "%\"></i></div>";
      timelineBoard.appendChild(row);
    });
  }

  function htmlSnippet() {
    var preset = presets[state.preset];
    return "<section class=\"mf-section\">\n" +
      "  <p class=\"mf-kicker\">" + preset.kicker + "</p>\n" +
      "  <h2 class=\"mf-title\">" + preset.headline + "</h2>\n" +
      "  <p class=\"mf-copy\">" + preset.copy + "</p>\n" +
      "  <div class=\"mf-cards\">\n" +
      preset.cards.map(function (card) {
        return "    <article><strong>" + card.title + "</strong><span>" + card.text + "</span></article>";
      }).join("\n") +
      "\n  </div>\n</section>";
  }

  function cssSnippet() {
    return ".mf-section {\n" +
      "  min-height: 88vh;\n" +
      "  display: grid;\n" +
      "  align-content: center;\n" +
      "  gap: 1.2rem;\n" +
      "  padding: clamp(2rem, 7vw, 7rem);\n" +
      "  color: #f8f2e6;\n" +
      "  background: #101314;\n" +
      "  overflow: hidden;\n" +
      "}\n\n" +
      ".mf-kicker { text-transform: uppercase; letter-spacing: .12em; color: #f0b84b; }\n" +
      ".mf-title { max-width: 820px; font-size: clamp(2.8rem, 8vw, 7rem); line-height: .9; }\n" +
      ".mf-copy { max-width: 640px; color: #b9c0bd; font-size: 1.08rem; }\n" +
      ".mf-title .word { display: inline-block; }\n" +
      ".mf-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .8rem; margin-top: 1rem; }\n" +
      ".mf-cards article { border: 1px solid rgba(248,242,230,.18); padding: 1rem; background: rgba(248,242,230,.06); }\n" +
      "@media (max-width: 720px) { .mf-cards { grid-template-columns: 1fr; } }";
  }

  function jsSnippet() {
    var from = directionVars();
    var axis = from.x ? "x: " + from.x : "y: " + from.y;
    var scrollConfig = state.scroll
      ? ",\n  scrollTrigger: {\n    trigger: \".mf-section\",\n    start: \"top 72%\",\n    end: \"bottom 35%\",\n    scrub: " + state.scrub + ",\n    pin: " + Boolean(state.pin) + "\n  }"
      : "";
    var split = state.split
      ? "\ndocument.querySelectorAll(\".mf-title\").forEach((title) => {\n  title.innerHTML = title.textContent.split(\" \").map((word) => `<span class=\"word\">${word}</span>`).join(\" \");\n});\n"
      : "";

    return "gsap.registerPlugin(ScrollTrigger);\n" +
      split +
      "\nconst timeline = gsap.timeline({" + scrollConfig + "\n});\n\n" +
      "timeline\n" +
      "  .from(\".mf-kicker\", { y: 18, autoAlpha: 0, duration: 0.45 })\n" +
      "  .from(\"" + (state.split ? ".mf-title .word" : ".mf-title") + "\", {\n" +
      "    " + axis + ",\n" +
      "    autoAlpha: 0,\n" +
      "    rotation: " + state.rotation + ",\n" +
      "    scale: " + state.scale + ",\n" +
      "    duration: " + state.duration + ",\n" +
      "    stagger: " + state.stagger + ",\n" +
      "    ease: \"" + state.ease + "\"\n" +
      "  }, 0.08)\n" +
      "  .from(\".mf-copy\", { y: 22, autoAlpha: 0, duration: 0.65 }, 0.22)\n" +
      "  .from(\".mf-cards article\", {\n" +
      "    " + axis + ",\n" +
      "    autoAlpha: 0,\n" +
      "    rotation: " + state.rotation + ",\n" +
      "    scale: " + state.scale + ",\n" +
      "    duration: " + (Number(state.duration) * 0.82).toFixed(2) + ",\n" +
      "    stagger: " + (Number(state.stagger) + 0.04).toFixed(2) + ",\n" +
      "    ease: \"" + state.ease + "\"\n" +
      "  }, 0.38);";
  }

  function renderCode() {
    var snippets = {
      html: htmlSnippet(),
      css: cssSnippet(),
      js: jsSnippet()
    };
    codeOutput.textContent = snippets[activeTab];
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function updateFromControl(event) {
    var target = event.target;
    var key = target.id;
    if (!key || !(key in state)) {
      return;
    }
    state[key] = target.type === "checkbox" ? target.checked : target.value;
    if (target.type === "range") {
      state[key] = Number(target.value);
    }
    syncOutputs();
    renderPreview();
    renderCode();
    runMotion();
  }

  function markActivePreset(presetKey) {
    presetList.querySelectorAll("[data-preset]").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.preset === presetKey);
    });
  }

  function refresh() {
    markActivePreset(state.preset);
    syncControls();
    renderPreview();
    renderTimeline();
    renderCode();
    runMotion();
  }

  function applyPreset(presetKey) {
    var preset = presets[presetKey];
    state = Object.assign({}, state, preset.settings, { preset: presetKey });
    refresh();
  }

  function randomize() {
    var presetKeys = Object.keys(presets);
    var eases = ["power3.out", "expo.out", "back.out(1.6)", "circ.out", "sine.inOut"];
    var directions = ["up", "down", "left", "right"];
    var themes = ["ink", "paper", "signal"];
    var presetKey = presetKeys[Math.floor(Math.random() * presetKeys.length)];
    state = Object.assign({}, state, presets[presetKey].settings, {
      preset: presetKey,
      duration: Number((0.55 + Math.random() * 1.45).toFixed(2)),
      stagger: Number((Math.random() * 0.18).toFixed(2)),
      distance: Math.round((30 + Math.random() * 130) / 5) * 5,
      rotation: Math.round(-14 + Math.random() * 28),
      scale: Number((0.78 + Math.random() * 0.24).toFixed(2)),
      scrub: Number((0.3 + Math.random() * 1.7).toFixed(1)),
      ease: eases[Math.floor(Math.random() * eases.length)],
      direction: directions[Math.floor(Math.random() * directions.length)],
      theme: themes[Math.floor(Math.random() * themes.length)],
      split: Math.random() > 0.35,
      scroll: Math.random() > 0.55,
      pin: Math.random() > 0.68
    });
    refresh();
  }

  function saveRecipe() {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    showToast(text[state.lang].saved);
  }

  function loadRecipe() {
    var stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return;
    }
    try {
      var parsed = JSON.parse(stored);
      if (parsed && presets[parsed.preset]) {
        state = Object.assign({}, state, parsed);
      }
    } catch (error) {
      window.localStorage.removeItem(storageKey);
    }
  }

  document.querySelectorAll("input, select").forEach(function (control) {
    control.addEventListener("input", updateFromControl);
    control.addEventListener("change", updateFromControl);
  });

  presetList.addEventListener("click", function (event) {
    var button = event.target.closest("[data-preset]");
    if (button) {
      applyPreset(button.dataset.preset);
    }
  });

  document.getElementById("runMotion").addEventListener("click", runMotion);
  document.getElementById("randomize").addEventListener("click", randomize);
  document.getElementById("saveRecipe").addEventListener("click", saveRecipe);

  document.querySelectorAll("[data-tab]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeTab = button.dataset.tab;
      document.querySelectorAll("[data-tab]").forEach(function (tab) {
        tab.classList.toggle("is-active", tab === button);
        tab.setAttribute("aria-selected", tab === button ? "true" : "false");
      });
      renderCode();
    });
  });

  document.getElementById("copyCode").addEventListener("click", function () {
    var code = codeOutput.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(function () {
        showToast(text[state.lang].copied);
      });
    } else {
      showToast(text[state.lang].copied);
    }
  });

  languageToggle.addEventListener("click", function () {
    state.lang = state.lang === "en" ? "es" : "en";
    applyLanguage();
    renderCode();
  });

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  loadRecipe();
  applyLanguage();
  refresh();
})();
