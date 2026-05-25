(function () {
  var storageKey = "motionforge.recipe.v2";
  var activeTab = "html";
  var previewTimeline = null;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var copy = {
    es: {
      navWhat: "Que hace",
      navScroll: "Scroll",
      navBuilder: "Editor",
      navExport: "Exportar",
      heroKicker: "GSAP + ScrollTrigger playground",
      heroLineOne: "Webs que se",
      heroLineTwo: "mueven",
      heroLineThree: "mientras bajas.",
      heroText: "MotionForge te deja entender, probar y exportar animaciones con scroll sin perderte en codigo raro.",
      tryScroll: "Baja y pruebalo",
      openBuilder: "Abrir editor",
      whatKicker: "Mas claro, menos humo",
      whatTitle: "Esto no es una landing formal: es un mini laboratorio visual.",
      ideaOneTitle: "Bajas la pagina",
      ideaOneText: "Las escenas reaccionan al scroll: texto, etiquetas, tarjetas y capas se mueven contigo.",
      ideaTwoTitle: "Ajustas una receta",
      ideaTwoText: "Cambias preset, velocidad, direccion, escala, rotacion y estilo desde controles simples.",
      ideaThreeTitle: "Copias el codigo",
      ideaThreeText: "Exporta una base HTML, CSS y JS con GSAP para llevarla a otra web.",
      phoneOne: "Texto entra con ritmo.",
      phoneTwo: "Las tarjetas se apilan.",
      phoneThree: "Las capas dan profundidad.",
      phoneFour: "Copias y lo usas.",
      stepOneTag: "Paso 1",
      stepOneTitle: "Primero aparece la idea.",
      stepOneText: "El usuario no lee una pared de texto: ve el mensaje entrando por partes, como un video corto pero dentro de la web.",
      stepTwoTag: "Paso 2",
      stepTwoTitle: "Luego el scroll controla la escena.",
      stepTwoText: "Con scrub y pin, el avance depende de cuanto bajas. Eso crea esa vibra de TikTok/web interactiva que querias.",
      stepThreeTag: "Paso 3",
      stepThreeTitle: "Despues entran capas y etiquetas.",
      stepThreeText: "Los elementos se cruzan, rotan y cambian de escala para que se sienta hecho a mano y no como plantilla repetida.",
      stepFourTag: "Paso 4",
      stepFourTitle: "Al final te llevas el codigo.",
      stepFourText: "MotionForge no solo presume animaciones: te da una receta editable para copiarla en tus proyectos.",
      effectsKicker: "Efectos incluidos",
      effectsTitle: "Cada tarjeta enseña una idea de animacion.",
      effectOne: "Titulos que aparecen palabra por palabra.",
      effectTwo: "Una escena fija mientras el contenido avanza.",
      effectThree: "Etiquetas que cruzan la pantalla con el scroll.",
      effectFour: "Codigo base listo para adaptar.",
      recipeKicker: "Editor rapido",
      recipeTitle: "Arma tu movimiento.",
      presetHero: "Entrada wow",
      presetHeroDesc: "Para el primer pantallazo.",
      presetCards: "Tarjetas vivas",
      presetCardsDesc: "Paneles que entran en grupo.",
      presetStory: "Historia con scroll",
      presetStoryDesc: "Seccion fijada y narrativa.",
      presetGallery: "Galeria con flow",
      presetGalleryDesc: "Imagenes y etiquetas con profundidad.",
      duration: "Duracion",
      distance: "Distancia",
      rotation: "Rotacion",
      scale: "Escala",
      direction: "Direccion",
      theme: "Color",
      splitText: "Separar texto",
      pin: "Fijar seccion",
      runMotion: "Animar preview",
      randomize: "Sorprendeme",
      saveRecipe: "Guardar",
      livePreview: "Preview",
      ready: "Listo",
      running: "Animando",
      exportKicker: "Codigo listo",
      exportTitle: "Copia la receta y adaptala a tu web.",
      copyCode: "Copiar",
      saved: "Receta guardada",
      copied: "Codigo copiado"
    },
    en: {
      navWhat: "What it does",
      navScroll: "Scroll",
      navBuilder: "Builder",
      navExport: "Export",
      heroKicker: "GSAP + ScrollTrigger playground",
      heroLineOne: "Websites that",
      heroLineTwo: "move",
      heroLineThree: "as you scroll.",
      heroText: "MotionForge helps you understand, test, and export scroll animations without getting lost in weird code.",
      tryScroll: "Scroll the demo",
      openBuilder: "Open builder",
      whatKicker: "Clearer, less noise",
      whatTitle: "This is not a formal landing page: it is a tiny visual lab.",
      ideaOneTitle: "You scroll",
      ideaOneText: "Scenes react to scroll: text, labels, cards, and layers move with you.",
      ideaTwoTitle: "You tune a recipe",
      ideaTwoText: "Change preset, speed, direction, scale, rotation, and style from simple controls.",
      ideaThreeTitle: "You copy the code",
      ideaThreeText: "Export an HTML, CSS, and JS base with GSAP for another website.",
      phoneOne: "Text enters with rhythm.",
      phoneTwo: "Cards stack into place.",
      phoneThree: "Layers add depth.",
      phoneFour: "Copy it and ship it.",
      stepOneTag: "Step 1",
      stepOneTitle: "The idea appears first.",
      stepOneText: "The user does not read a wall of text: the message arrives in pieces, like a short video inside the page.",
      stepTwoTag: "Step 2",
      stepTwoTitle: "Then scroll controls the scene.",
      stepTwoText: "With scrub and pin, the progress depends on how far you scroll. That creates the interactive web feel you wanted.",
      stepThreeTag: "Step 3",
      stepThreeTitle: "Layers and labels join in.",
      stepThreeText: "Elements cross, rotate, and scale so the interface feels handmade instead of template-like.",
      stepFourTag: "Step 4",
      stepFourTitle: "At the end, you take the code.",
      stepFourText: "MotionForge does not only show animation: it gives you an editable recipe for your projects.",
      effectsKicker: "Included effects",
      effectsTitle: "Each card teaches one animation idea.",
      effectOne: "Titles that appear word by word.",
      effectTwo: "A fixed scene while content moves.",
      effectThree: "Labels that cross the viewport with scroll.",
      effectFour: "Starter code ready to adapt.",
      recipeKicker: "Quick builder",
      recipeTitle: "Build your motion.",
      presetHero: "Wow entrance",
      presetHeroDesc: "For the first screen.",
      presetCards: "Living cards",
      presetCardsDesc: "Panels that arrive as a group.",
      presetStory: "Scroll story",
      presetStoryDesc: "Pinned section and narrative.",
      presetGallery: "Gallery flow",
      presetGalleryDesc: "Images and labels with depth.",
      duration: "Duration",
      distance: "Distance",
      rotation: "Rotation",
      scale: "Scale",
      direction: "Direction",
      theme: "Color",
      splitText: "Split text",
      pin: "Pin section",
      runMotion: "Animate preview",
      randomize: "Surprise me",
      saveRecipe: "Save",
      livePreview: "Preview",
      ready: "Ready",
      running: "Running",
      exportKicker: "Ready code",
      exportTitle: "Copy the recipe and adapt it to your site.",
      copyCode: "Copy",
      saved: "Recipe saved",
      copied: "Code copied"
    }
  };

  var presets = {
    hero: {
      title: { es: "Entrada wow", en: "Wow entrance" },
      kicker: { es: "Hero con ritmo", en: "Rhythmic hero" },
      headline: { es: "Tu seccion entra como escena.", en: "Your section enters like a scene." },
      text: { es: "Una entrada clara con palabras separadas, etiquetas flotando y tarjetas que aterrizan con personalidad.", en: "A clear entrance with split words, floating labels, and cards that land with personality." },
      chips: ["split text", "stagger", "hero"],
      cards: [
        { title: "01", es: "Mensaje primero", en: "Message first" },
        { title: "02", es: "Etiquetas despues", en: "Labels next" },
        { title: "03", es: "Accion al final", en: "Action last" }
      ],
      settings: { duration: 1.05, stagger: 0.07, distance: 80, rotation: -3, scale: 0.86, scrub: 0.8, direction: "up", ease: "expo.out", theme: "pop", split: true, scroll: true, pin: false }
    },
    cards: {
      title: { es: "Tarjetas vivas", en: "Living cards" },
      kicker: { es: "Paneles con flow", en: "Flow panels" },
      headline: { es: "Tus cards no tienen por que ser tiesas.", en: "Your cards do not have to feel stiff." },
      text: { es: "El preset mueve grupos, cambia escala y crea una entrada mas divertida para dashboards, features o portfolios.", en: "This preset moves groups, changes scale, and creates a more playful entrance for dashboards, features, or portfolios." },
      chips: ["cards", "depth", "flow"],
      cards: [
        { title: "Plan", es: "Ordena la idea", en: "Organize the idea" },
        { title: "Build", es: "Dale movimiento", en: "Add movement" },
        { title: "Ship", es: "Exporta codigo", en: "Export code" }
      ],
      settings: { duration: 0.9, stagger: 0.12, distance: 105, rotation: 7, scale: 0.82, scrub: 1, direction: "right", ease: "back.out(1.6)", theme: "fresh", split: false, scroll: true, pin: false }
    },
    story: {
      title: { es: "Historia con scroll", en: "Scroll story" },
      kicker: { es: "Seccion fijada", en: "Pinned section" },
      headline: { es: "El scroll cuenta la historia por ti.", en: "Scroll tells the story for you." },
      text: { es: "Ideal para explicar procesos, productos o proyectos sin que parezcan bloques aburridos de texto.", en: "Great for explaining processes, products, or projects without boring blocks of text." },
      chips: ["pin", "scrub", "labels"],
      cards: [
        { title: "Start", es: "Aparece el problema", en: "Problem appears" },
        { title: "Move", es: "Cambia la escena", en: "Scene shifts" },
        { title: "End", es: "Queda claro", en: "It clicks" }
      ],
      settings: { duration: 1.35, stagger: 0.05, distance: 130, rotation: 4, scale: 0.9, scrub: 1.2, direction: "left", ease: "power3.out", theme: "night", split: true, scroll: true, pin: true }
    },
    gallery: {
      title: { es: "Galeria con flow", en: "Gallery flow" },
      kicker: { es: "Capas visuales", en: "Visual layers" },
      headline: { es: "Imagenes, etiquetas y profundidad.", en: "Images, labels, and depth." },
      text: { es: "Una base para galerias, casos de estudio o paginas con mucho contenido visual.", en: "A base for galleries, case studies, or visual pages." },
      chips: ["parallax", "gallery", "motion"],
      cards: [
        { title: "A", es: "Frame amplio", en: "Wide frame" },
        { title: "B", es: "Entrada offset", en: "Offset entry" },
        { title: "C", es: "Cierre suave", en: "Soft landing" }
      ],
      settings: { duration: 1, stagger: 0.1, distance: 90, rotation: -9, scale: 0.8, scrub: 0.7, direction: "down", ease: "circ.out", theme: "pop", split: false, scroll: true, pin: false }
    }
  };

  var state = Object.assign({}, presets.hero.settings, { preset: "hero", lang: "es" });

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
  var codeOutput = document.getElementById("codeOutput");
  var toast = document.getElementById("toast");

  function t(key) {
    return copy[state.lang][key] || copy.es[key] || key;
  }

  function localize(value) {
    return value[state.lang] || value.es || value.en || "";
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.dataset.i18n;
      if (t(key)) {
        node.textContent = t(key);
      }
    });
    languageToggle.classList.toggle("is-en", state.lang === "en");
    languageToggle.setAttribute("aria-pressed", state.lang === "en" ? "true" : "false");
    statusPill.textContent = t("ready");
  }

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
      if (control.type === "checkbox") {
        control.checked = Boolean(state[key]);
      } else {
        control.value = state[key];
      }
    });
    syncOutputs();
  }

  function splitWords(element, content) {
    element.textContent = "";
    if (!state.split) {
      element.textContent = content;
      return;
    }
    content.split(" ").forEach(function (word, index, words) {
      var span = document.createElement("span");
      span.className = "split-unit";
      span.textContent = word;
      element.appendChild(span);
      if (index < words.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  }

  function renderPreview() {
    var preset = presets[state.preset];
    previewTitle.textContent = localize(preset.title);
    stageKicker.textContent = localize(preset.kicker);
    splitWords(stageTitle, localize(preset.headline));
    stageCopy.textContent = localize(preset.text);
    previewStage.className = "preview-stage theme-" + state.theme;
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
      article.innerHTML = "<strong>" + card.title + "</strong><span>" + (card[state.lang] || card.es) + "</span>";
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

    var selector = ".stage-kicker, .split-unit, #stageTitle, .preview-copy, .motion-card, .preview-chip";
    window.gsap.killTweensOf(selector);
    window.gsap.set(selector, { clearProps: "all" });

    var from = Object.assign(directionVars(), {
      autoAlpha: 0,
      rotation: Number(state.rotation),
      scale: Number(state.scale)
    });

    statusPill.textContent = t("running");
    previewTimeline = window.gsap.timeline({
      defaults: { ease: state.ease },
      onComplete: function () {
        statusPill.textContent = t("ready");
      }
    });

    previewTimeline
      .from(".stage-kicker", { y: 18, autoAlpha: 0, duration: 0.38 }, 0)
      .from(state.split ? ".split-unit" : "#stageTitle", Object.assign({}, from, { duration: Number(state.duration), stagger: Number(state.stagger) }), 0.05)
      .from(".preview-copy", { y: 22, autoAlpha: 0, duration: 0.55 }, 0.2)
      .from(".motion-card", Object.assign({}, from, { duration: Number(state.duration) * 0.82, stagger: Number(state.stagger) + 0.04 }), 0.28)
      .from(".preview-chip", { y: 18, x: 14, rotation: -8, autoAlpha: 0, duration: 0.42, stagger: 0.04 }, 0.36);
  }

  function markActivePreset() {
    presetList.querySelectorAll("[data-preset]").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.preset === state.preset);
    });
  }

  function refresh() {
    markActivePreset();
    syncControls();
    renderPreview();
    renderCode();
    runMotion();
  }

  function applyPreset(presetKey) {
    state = Object.assign({}, state, presets[presetKey].settings, { preset: presetKey });
    refresh();
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

  function randomize() {
    var presetKeys = Object.keys(presets);
    var eases = ["power3.out", "expo.out", "back.out(1.6)", "circ.out", "sine.inOut"];
    var directions = ["up", "down", "left", "right"];
    var themes = ["pop", "fresh", "night"];
    var presetKey = presetKeys[Math.floor(Math.random() * presetKeys.length)];
    state = Object.assign({}, state, presets[presetKey].settings, {
      preset: presetKey,
      duration: Number((0.55 + Math.random() * 1.45).toFixed(2)),
      stagger: Number((Math.random() * 0.18).toFixed(2)),
      distance: Math.round((35 + Math.random() * 130) / 5) * 5,
      rotation: Math.round(-14 + Math.random() * 28),
      scale: Number((0.78 + Math.random() * 0.24).toFixed(2)),
      scrub: Number((0.3 + Math.random() * 1.7).toFixed(1)),
      ease: eases[Math.floor(Math.random() * eases.length)],
      direction: directions[Math.floor(Math.random() * directions.length)],
      theme: themes[Math.floor(Math.random() * themes.length)],
      split: Math.random() > 0.32,
      scroll: true,
      pin: Math.random() > 0.55
    });
    refresh();
  }

  function htmlSnippet() {
    var preset = presets[state.preset];
    return "<section class=\"mf-scroll-scene\">\n" +
      "  <div class=\"mf-pin\">\n" +
      "    <span class=\"mf-label\">" + localize(preset.kicker) + "</span>\n" +
      "    <h2 class=\"mf-title\">" + localize(preset.headline) + "</h2>\n" +
      "    <p class=\"mf-copy\">" + localize(preset.text) + "</p>\n" +
      "    <div class=\"mf-cards\">\n" +
      preset.cards.map(function (card) {
        return "      <article><strong>" + card.title + "</strong><span>" + (card[state.lang] || card.es) + "</span></article>";
      }).join("\n") +
      "\n    </div>\n" +
      "  </div>\n" +
      "</section>";
  }

  function cssSnippet() {
    return ".mf-scroll-scene {\n" +
      "  min-height: 220vh;\n" +
      "  background: #f5f7f2;\n" +
      "  color: #141414;\n" +
      "}\n\n" +
      ".mf-pin {\n" +
      "  min-height: 100vh;\n" +
      "  display: grid;\n" +
      "  align-content: center;\n" +
      "  gap: 1rem;\n" +
      "  padding: clamp(1.2rem, 6vw, 6rem);\n" +
      "  overflow: hidden;\n" +
      "}\n\n" +
      ".mf-label { width: max-content; padding: .45rem .65rem; border: 2px solid currentColor; border-radius: 999px; background: #ffd84d; font-weight: 900; }\n" +
      ".mf-title { max-width: 900px; font-size: clamp(3rem, 9vw, 8rem); line-height: .82; }\n" +
      ".mf-title .word { display: inline-block; }\n" +
      ".mf-copy { max-width: 620px; color: #5c6462; font-size: 1.1rem; line-height: 1.6; }\n" +
      ".mf-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin-top: 1rem; }\n" +
      ".mf-cards article { min-height: 150px; border: 2px solid #141414; border-radius: 8px; padding: 1rem; background: white; box-shadow: 5px 5px 0 #141414; }\n" +
      "@media (max-width: 760px) { .mf-cards { grid-template-columns: 1fr; } }";
  }

  function jsSnippet() {
    var from = directionVars();
    var axis = from.x ? "x: " + from.x : "y: " + from.y;
    var trigger = state.scroll
      ? "\n  scrollTrigger: {\n    trigger: \".mf-scroll-scene\",\n    start: \"top top\",\n    end: \"+=1400\",\n    scrub: " + state.scrub + ",\n    pin: " + Boolean(state.pin) + ",\n    snap: \"labelsDirectional\"\n  }"
      : "";
    var split = state.split
      ? "document.querySelectorAll(\".mf-title\").forEach((title) => {\n  title.innerHTML = title.textContent.split(\" \").map((word) => `<span class=\"word\">${word}</span>`).join(\" \");\n});\n\n"
      : "";

    return "gsap.registerPlugin(ScrollTrigger);\n\n" +
      split +
      "const tl = gsap.timeline({" + trigger + "\n});\n\n" +
      "tl.addLabel(\"start\")\n" +
      "  .from(\".mf-label\", { y: 24, autoAlpha: 0, duration: 0.45 })\n" +
      "  .addLabel(\"title\")\n" +
      "  .from(\"" + (state.split ? ".mf-title .word" : ".mf-title") + "\", {\n" +
      "    " + axis + ",\n" +
      "    autoAlpha: 0,\n" +
      "    rotation: " + state.rotation + ",\n" +
      "    scale: " + state.scale + ",\n" +
      "    duration: " + state.duration + ",\n" +
      "    stagger: " + state.stagger + ",\n" +
      "    ease: \"" + state.ease + "\"\n" +
      "  })\n" +
      "  .addLabel(\"cards\")\n" +
      "  .from(\".mf-cards article\", {\n" +
      "    " + axis + ",\n" +
      "    autoAlpha: 0,\n" +
      "    rotation: " + state.rotation + ",\n" +
      "    scale: " + state.scale + ",\n" +
      "    duration: " + (Number(state.duration) * 0.82).toFixed(2) + ",\n" +
      "    stagger: " + (Number(state.stagger) + 0.04).toFixed(2) + ",\n" +
      "    ease: \"" + state.ease + "\"\n" +
      "  });";
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

  function saveRecipe() {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    showToast(t("saved"));
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

  function setScene(index) {
    var steps = document.querySelectorAll(".story-step");
    var frames = document.querySelectorAll(".phone-frame");
    steps.forEach(function (step, stepIndex) {
      step.classList.toggle("is-active", stepIndex === index);
    });
    frames.forEach(function (frame, frameIndex) {
      frame.classList.toggle("is-active", frameIndex === index);
    });
    document.getElementById("sceneCount").textContent = String(index + 1).padStart(2, "0");
  }

  function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion.matches) {
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.to(".scroll-meter span", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25
      }
    });

    window.gsap.from(".hero-line", {
      y: 90,
      autoAlpha: 0,
      rotate: -3,
      duration: 0.9,
      stagger: 0.08,
      ease: "expo.out"
    });

    window.gsap.to(".moving-card", {
      y: function (index) {
        return index % 2 ? 72 : -54;
      },
      x: function (index) {
        return index === 1 ? -36 : 26;
      },
      rotation: function (index) {
        return index % 2 ? -9 : 8;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    window.gsap.utils.toArray(".idea-card").forEach(function (card, index) {
      window.gsap.from(card, {
        y: 80,
        rotation: index === 1 ? 3 : -3,
        autoAlpha: 0,
        duration: 0.75,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });
    });

    window.gsap.to(".phone-strip", {
      yPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-story",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    window.gsap.to(".floating-tag", {
      x: function (index) {
        return [70, -80, -55, 80][index] || 40;
      },
      y: function (index) {
        return [-80, 90, -40, 70][index] || 50;
      },
      rotation: function (index) {
        return [10, -12, 8, -8][index] || 7;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-story",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    document.querySelectorAll(".story-step").forEach(function (step, index) {
      window.ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: function () {
          setScene(index);
        },
        onEnterBack: function () {
          setScene(index);
        }
      });

      window.gsap.from(step.querySelectorAll(".step-tag, h3, p"), {
        y: 42,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 72%",
          toggleActions: "play none none reverse"
        }
      });
    });

    var horizontalTrack = document.querySelector(".horizontal-track");
    if (horizontalTrack) {
      window.gsap.to(horizontalTrack, {
        x: function () {
          var travel = horizontalTrack.scrollWidth - window.innerWidth + 80;
          return travel > 0 ? -travel : 0;
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-section",
          start: "top top",
          end: function () {
            return "+=" + Math.max(900, horizontalTrack.scrollWidth - window.innerWidth + 700);
          },
          pin: ".horizontal-pin",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
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
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeOutput.textContent).then(function () {
        showToast(t("copied"));
      });
    } else {
      showToast(t("copied"));
    }
  });

  languageToggle.addEventListener("click", function () {
    state.lang = state.lang === "es" ? "en" : "es";
    applyLanguage();
    renderPreview();
    renderCode();
  });

  loadRecipe();
  applyLanguage();
  refresh();
  initScrollAnimations();
})();
