(() => {
  const STORAGE_KEY = "lab-devspaces-ansible-pages";

  const DEFAULTS = {
    lang: "es",
    gitBase: "https://github.com/adelahozredhat",
    repoInstruction: "lab-devspaces-ansible-instruction",
    repoEx1: "lab-devspaces-ansible-exercise1",
    repoEx2: "lab-devspaces-ansible-exercise2",
    repoEx3: "lab-devspaces-ansible-exercise3",
    repoEx4: "lab-devspaces-ansible-exercise4",
    repoEx5: "lab-devspaces-ansible-exercise5",
    devspacesUrl: "",
    devspacesUser: "",
    devspacesPassword: "",
    giteaUrl: "",
    giteaUser: "",
    giteaPassword: "",
    ocpConsoleUrl: "",
    ocpApiUrl: "",
    ocpUser: "",
    ocpPassword: "",
    fedoraHost: "",
    fedoraUser: "user1",
    fedoraAlias: "fedora-user1",
  };

  const SECTIONS = [
    { id: "lab", file: "lab.md", title: { es: "Itinerario del laboratorio", en: "Lab path" } },
    { id: "ex1", file: "exercise1.md", title: { es: "Ejercicio 1 — Playbooks", en: "Exercise 1 — Playbooks" } },
    { id: "ex2", file: "exercise2.md", title: { es: "Ejercicio 2 — Roles en Git", en: "Exercise 2 — Roles in Git" } },
    { id: "ex3", file: "exercise3.md", title: { es: "Ejercicio 3 — Colecciones", en: "Exercise 3 — Collections" } },
    { id: "ex4", file: "exercise4.md", title: { es: "Ejercicio 4 — Execution Environments", en: "Exercise 4 — Execution Environments" } },
    { id: "ex5", file: "exercise5.md", title: { es: "Ejercicio 5 — Reto extra", en: "Exercise 5 — Extra challenge" } },
  ];

  const I18N = {
    es: {
      pageTitle: "Laboratorio OpenShift Dev Spaces — Ansible",
      kicker: "Guía del laboratorio",
      brand: "Dev Spaces · Ansible",
      index: "Índice",
      configTitle: "Datos del laboratorio",
      configHelp: "Rellena las cajas: se sustituyen en la guía (repositorios, URLs y credenciales). Se guardan en este navegador.",
      share: "Copiar enlace",
      reset: "Restablecer",
      collapse: "Ocultar",
      expand: "Mostrar",
      fsRepos: "Repositorios Git",
      gitBase: "URL base Git (sin barra final)",
      repoInstruction: "Repo instrucciones",
      repoEx1: "Repo ejercicio 1",
      repoEx2: "Repo ejercicio 2",
      repoEx3: "Repo ejercicio 3",
      repoEx4: "Repo ejercicio 4",
      repoEx5: "Repo ejercicio 5",
      fsDevspaces: "OpenShift Dev Spaces",
      fsGitea: "Gitea",
      fsOcp: "OpenShift",
      fsFedora: "VM Fedora",
      devspacesUrl: "URL de acceso",
      giteaUrl: "URL de Gitea",
      ocpConsoleUrl: "URL de la consola",
      ocpApiUrl: "URL de la API",
      fedoraHost: "Host o IP (ansible_host)",
      fedoraUser: "Usuario SSH",
      fedoraAlias: "Alias en el inventario",
      user: "Usuario",
      password: "Contraseña",
      accessTitle: "Tus datos de acceso",
      openDevspaces: "Abrir Dev Spaces",
      openGitea: "Abrir Gitea",
      openConsole: "Abrir consola OpenShift",
      cloneInstruction: "Repo instrucciones",
      copied: "Enlace copiado (sin contraseñas).",
      loadError: "No se pudieron cargar las guías. Sirve esta carpeta por HTTP (GitHub Pages o un servidor local).",
    },
    en: {
      pageTitle: "OpenShift Dev Spaces lab — Ansible",
      kicker: "Lab guide",
      brand: "Dev Spaces · Ansible",
      index: "Contents",
      configTitle: "Lab settings",
      configHelp: "Fill in the boxes: values replace repositories, URLs and credentials in the guide. Stored in this browser.",
      share: "Copy link",
      reset: "Reset",
      collapse: "Hide",
      expand: "Show",
      fsRepos: "Git repositories",
      gitBase: "Git base URL (no trailing slash)",
      repoInstruction: "Instruction repo",
      repoEx1: "Exercise 1 repo",
      repoEx2: "Exercise 2 repo",
      repoEx3: "Exercise 3 repo",
      repoEx4: "Exercise 4 repo",
      repoEx5: "Exercise 5 repo",
      fsDevspaces: "OpenShift Dev Spaces",
      fsGitea: "Gitea",
      fsOcp: "OpenShift",
      fsFedora: "Fedora VM",
      devspacesUrl: "Access URL",
      giteaUrl: "Gitea URL",
      ocpConsoleUrl: "Console URL",
      ocpApiUrl: "API URL",
      fedoraHost: "Host or IP (ansible_host)",
      fedoraUser: "SSH user",
      fedoraAlias: "Inventory alias",
      user: "Username",
      password: "Password",
      accessTitle: "Your access details",
      openDevspaces: "Open Dev Spaces",
      openGitea: "Open Gitea",
      openConsole: "Open OpenShift console",
      cloneInstruction: "Instruction repo",
      copied: "Link copied (passwords omitted).",
      loadError: "Could not load the guides. Serve this folder over HTTP (GitHub Pages or a local server).",
    },
  };

  const form = document.getElementById("lab-form");
  const guide = document.getElementById("guide");
  const toc = document.getElementById("toc");
  const statusEl = document.getElementById("status");
  const accessCard = document.getElementById("access-card");
  const accessGrid = document.getElementById("access-grid");
  const accessLinks = document.getElementById("access-links");
  const configBox = document.getElementById("config");
  const configToggle = document.getElementById("config-toggle");
  const tocPanel = document.getElementById("toc-panel");

  let cfg = loadConfig();
  let renderTimer = 0;
  let headingObserver = null;
  let markedReady = false;

  function loadConfig() {
    const fromStore = safeParse(localStorage.getItem(STORAGE_KEY));
    const fromQuery = Object.fromEntries(new URLSearchParams(location.search));
    const merged = { ...DEFAULTS, ...fromStore, ...fromQuery };
    merged.lang = merged.lang === "en" ? "en" : "es";
    return merged;
  }

  function safeParse(raw) {
    try {
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    const params = new URLSearchParams();
    const skip = new Set(["devspacesPassword", "giteaPassword", "ocpPassword"]);
    Object.entries(cfg).forEach(([key, value]) => {
      if (!value || value === DEFAULTS[key] || skip.has(key)) return;
      params.set(key, value);
    });
    const query = params.toString();
    history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }

  function fillForm() {
    [...form.elements].forEach((el) => {
      if (el.name && el.name in cfg) el.value = cfg[el.name] ?? "";
    });
  }

  function readForm() {
    const next = { ...cfg };
    [...form.elements].forEach((el) => {
      if (el.name) next[el.name] = el.value.trim();
    });
    next.lang = cfg.lang;
    cfg = next;
  }

  function t(key) {
    return I18N[cfg.lang][key] || I18N.es[key] || key;
  }

  function applyChrome() {
    document.documentElement.lang = cfg.lang;
    document.title = t("pageTitle");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key === "collapse") {
        el.textContent = configBox.classList.contains("is-collapsed") ? t("expand") : t("collapse");
        return;
      }
      el.textContent = t(key);
    });
    document.querySelectorAll(".lang button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === cfg.lang);
    });
  }

  function gitRoot() {
    if (cfg.giteaUrl && cfg.giteaUser) {
      return `${cfg.giteaUrl.replace(/\/$/, "")}/${cfg.giteaUser}`;
    }
    return (cfg.gitBase || DEFAULTS.gitBase).replace(/\/$/, "");
  }

  function repoUrl(name) {
    const owner = cfg.giteaUrl && cfg.giteaUser ? `${cfg.giteaUrl.replace(/\/$/, "")}/${cfg.giteaUser}` : gitRoot();
    return `${owner}/${name}`;
  }

  function applyVars(markdown) {
    let text = markdown;
    text = text.replace(/\*\*English version:\*\*.*\n+/g, "");
    text = text.replace(/\*\*Versión en castellano:\*\*.*\n+/g, "");
    const replacements = [
      ["https://github.com/adelahozredhat", gitRoot()],
      ["lab-devspaces-ansible-exercise5", cfg.repoEx5 || DEFAULTS.repoEx5],
      ["lab-devspaces-ansible-exercise4", cfg.repoEx4 || DEFAULTS.repoEx4],
      ["lab-devspaces-ansible-exercise3", cfg.repoEx3 || DEFAULTS.repoEx3],
      ["lab-devspaces-ansible-exercise2", cfg.repoEx2 || DEFAULTS.repoEx2],
      ["lab-devspaces-ansible-exercise1", cfg.repoEx1 || DEFAULTS.repoEx1],
      ["lab-devspaces-ansible-instruction", cfg.repoInstruction || DEFAULTS.repoInstruction],
    ];
    replacements.forEach(([from, to]) => {
      text = text.split(from).join(to);
    });
    if (cfg.fedoraHost) {
      text = text.replace(/ansible_host=<host_o_IP_del_Excel>/g, `ansible_host=${cfg.fedoraHost}`);
      text = text.replace(/ansible_host=<host_or_IP_from_Excel>/g, `ansible_host=${cfg.fedoraHost}`);
    }
    if (cfg.fedoraUser) {
      text = text.replace(/ansible_user=user1/g, `ansible_user=${cfg.fedoraUser}`);
    }
    if (cfg.fedoraAlias) {
      text = text.replace(/fedora-user1/g, cfg.fedoraAlias);
    }
    return text;
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);
  }

  function ensureMarked() {
    if (markedReady) return;
    marked.use({
      gfm: true,
      renderer: {
        // marked 11 llama code(text, lang, escaped); versiones nuevas pasan un token.
        code(token, infostring) {
          let lang = "";
          let text = "";
          if (typeof token === "string") {
            text = token;
            lang = infostring || "";
          } else if (token && typeof token === "object") {
            text = token.text || "";
            lang = token.lang || "";
          }
          if ((lang || "").trim() === "mermaid") {
            return `<div class="mermaid">${text}</div>`;
          }
          const escaped = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          const cls = lang ? ` class="language-${String(lang).split(/\s+/)[0]}"` : "";
          return `<pre><code${cls}>${escaped}</code></pre>`;
        },
      },
    });
    markedReady = true;
  }

  function renderMarkdown(md) {
    ensureMarked();
    return marked.parse(md);
  }

  function decorateHeadings(article, sectionId) {
    const used = new Set();
    article.querySelectorAll("h1, h2, h3").forEach((heading, index) => {
      let id = `${sectionId}-${slugify(heading.textContent || "s")}`;
      if (used.has(id)) id = `${id}-${index}`;
      used.add(id);
      heading.id = id;
    });
  }

  function buildToc() {
    toc.innerHTML = "";
    guide.querySelectorAll("article").forEach((article) => {
      const root = article.querySelector("h1");
      if (!root) return;
      const rootLink = document.createElement("a");
      rootLink.href = `#${root.id}`;
      rootLink.className = "toc-root";
      rootLink.textContent = root.textContent;
      toc.append(rootLink);
      article.querySelectorAll("h2, h3").forEach((heading) => {
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.className = heading.tagName === "H2" ? "toc-h2" : "toc-h3";
        link.textContent = heading.textContent;
        toc.append(link);
      });
    });
  }

  function observeToc() {
    headingObserver?.disconnect();
    const links = [...toc.querySelectorAll("a")];
    const map = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.classList.remove("is-active"));
          map.get(entry.target.id)?.classList.add("is-active");
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    guide.querySelectorAll("h1, h2, h3").forEach((heading) => headingObserver.observe(heading));
  }

  function renderAccess() {
    const rows = [
      [t("fsDevspaces"), cfg.devspacesUrl, cfg.devspacesUser, cfg.devspacesPassword],
      [t("fsGitea"), cfg.giteaUrl, cfg.giteaUser, cfg.giteaPassword],
      [t("fsOcp"), cfg.ocpConsoleUrl || cfg.ocpApiUrl, cfg.ocpUser, cfg.ocpPassword],
      [t("fsFedora"), cfg.fedoraHost, cfg.fedoraUser, ""],
    ];
    const hasAny = rows.some((row) => row.slice(1).some(Boolean));
    accessCard.hidden = !hasAny;
    accessGrid.innerHTML = "";
    accessLinks.innerHTML = "";
    if (!hasAny) return;

    const add = (label, value) => {
      if (!value) return;
      const item = document.createElement("div");
      item.className = "access-item";
      item.innerHTML = `<dt>${label}</dt><dd></dd>`;
      item.querySelector("dd").textContent = value;
      accessGrid.append(item);
    };

    add(t("devspacesUrl"), cfg.devspacesUrl);
    add(`${t("fsDevspaces")} · ${t("user")}`, cfg.devspacesUser);
    add(`${t("fsDevspaces")} · ${t("password")}`, cfg.devspacesPassword);
    add(t("giteaUrl"), cfg.giteaUrl);
    add(`${t("fsGitea")} · ${t("user")}`, cfg.giteaUser);
    add(`${t("fsGitea")} · ${t("password")}`, cfg.giteaPassword);
    add(t("ocpConsoleUrl"), cfg.ocpConsoleUrl);
    add(t("ocpApiUrl"), cfg.ocpApiUrl);
    add(`${t("fsOcp")} · ${t("user")}`, cfg.ocpUser);
    add(`${t("fsOcp")} · ${t("password")}`, cfg.ocpPassword);
    add(t("fedoraHost"), cfg.fedoraHost);
    add(t("fedoraUser"), cfg.fedoraUser);
    add(t("cloneInstruction"), `${repoUrl(cfg.repoInstruction)}.git`);

    const links = [
      [cfg.devspacesUrl, t("openDevspaces")],
      [cfg.giteaUrl, t("openGitea")],
      [cfg.ocpConsoleUrl, t("openConsole")],
    ];
    links.forEach(([href, label]) => {
      if (!href) return;
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = label;
      accessLinks.append(a);
    });
  }

  async function renderGuide() {
    applyChrome();
    renderAccess();
    const lang = cfg.lang === "en" ? "en" : "es";
    try {
      const parts = await Promise.all(
        SECTIONS.map(async (section) => {
          const res = await fetch(`content/${lang}/${section.file}`);
          if (!res.ok) throw new Error(res.statusText);
          return { section, markdown: applyVars(await res.text()) };
        })
      );
      guide.innerHTML = "";
      parts.forEach(({ section, markdown }) => {
        const article = document.createElement("article");
        article.id = `sec-${section.id}`;
        article.innerHTML = renderMarkdown(markdown);
        const first = article.querySelector("h1");
        if (first) first.textContent = section.title[lang];
        decorateHeadings(article, section.id);
        guide.append(article);
      });
      buildToc();
      observeToc();
      if (window.mermaid) {
        mermaid.initialize({ startOnLoad: false, theme: "neutral" });
        await mermaid.run({ querySelector: ".mermaid" });
      }
      if (location.hash) {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      }
      statusEl.hidden = true;
    } catch (err) {
      statusEl.hidden = false;
      statusEl.textContent = t("loadError");
      console.error(err);
    }
  }

  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      readForm();
      persist();
      renderGuide();
    }, 180);
  }

  form.addEventListener("input", scheduleRender);
  form.addEventListener("change", scheduleRender);

  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.addEventListener("click", () => {
      cfg.lang = btn.dataset.lang;
      persist();
      renderGuide();
    });
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    cfg = { ...DEFAULTS, lang: cfg.lang };
    fillForm();
    persist();
    renderGuide();
  });

  document.getElementById("btn-share").addEventListener("click", async () => {
    persist();
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      statusEl.hidden = false;
      statusEl.textContent = t("copied");
    } catch {
      prompt(t("share"), url);
    }
  });

  configToggle.addEventListener("click", () => {
    configBox.classList.toggle("is-collapsed");
    applyChrome();
  });

  document.getElementById("toc-open").addEventListener("click", () => tocPanel.classList.add("is-open"));
  document.getElementById("toc-close").addEventListener("click", () => tocPanel.classList.remove("is-open"));
  toc.addEventListener("click", () => tocPanel.classList.remove("is-open"));

  fillForm();
  applyChrome();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderGuide);
  } else {
    renderGuide();
  }
})();
