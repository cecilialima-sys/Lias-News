const page = document.body.dataset.page;
const topbar = document.querySelector(".topbar");
const neuralBlueprint = {
  nodes: [
    { x: 4, y: 88 }, { x: 10, y: 82 }, { x: 18, y: 90 }, { x: 26, y: 80 },
    { x: 35, y: 92 }, { x: 46, y: 84 }, { x: 56, y: 91 }, { x: 66, y: 79 },
    { x: 76, y: 90 }, { x: 86, y: 82 }, { x: 96, y: 91 }, { x: 16, y: 72 },
    { x: 31, y: 70 }, { x: 52, y: 72 }, { x: 72, y: 68 }, { x: 88, y: 71 }
  ],
  links: [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    [1, 11], [3, 12], [5, 13], [7, 14], [9, 15], [11, 12], [12, 13], [13, 14], [14, 15],
    [2, 12], [4, 13], [6, 14], [8, 15]
  ]
};

const endpoints = {
  home: {
    targetId: "latest-news",
    filter: (items) => items.slice(0, 3),
  },
  "ai-news": {
    targetId: "category-news",
    filter: (items) => items.filter((item) => item.categoria === "ai-news"),
  },
  "ai-health": {
    targetId: "category-news",
    filter: (items) => items.filter((item) => item.categoria === "ai-health"),
  },
  article: {
    targetId: "article-content",
    filter: (items) => items,
  },
};

createNeuralBackground();
setupTopbar();
initPage();

async function initPage() {
  const pageConfig = endpoints[page];
  if (!pageConfig) {
    return;
  }

  const target = document.getElementById(pageConfig.targetId);
  if (!target) {
    return;
  }

  const items = await loadNewsItems();
  const filteredItems = pageConfig.filter(items);

  if (page === "article") {
    renderArticle(target, filteredItems);
    return;
  }

  if (!filteredItems.length) {
    target.innerHTML = '<div class="empty-state">Nenhuma publicação encontrada nesta seção.</div>';
    return;
  }

  target.innerHTML = filteredItems
    .map((item, index) => createNewsCard(item, page === "home" && index === 0))
    .join("");
}

async function loadNewsItems() {
  if (Array.isArray(window.LIAS_NEWS) && window.LIAS_NEWS.length) {
    return window.LIAS_NEWS;
  }

  const jsonPath = page === "home" || page === "article"
    ? "data/noticias.json"
    : "../data/noticias.json";

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error("Falha ao carregar as notícias.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function setupTopbar() {
  if (!topbar) {
    return;
  }

  const syncTopbarState = () => {
    topbar.classList.toggle("is-condensed", window.scrollY > 24);
  };

  syncTopbarState();
  window.addEventListener("scroll", syncTopbarState, { passive: true });
}

function createNeuralBackground() {
  const background = document.createElement("div");
  background.className = "neural-bg";
  background.setAttribute("aria-hidden", "true");

  const emblem = document.createElement("img");
  emblem.className = "neural-emblem";
  emblem.src = page === "home" || page === "article"
    ? "assets/neural-health-emblem.svg"
    : "../assets/neural-health-emblem.svg";
  emblem.alt = "";
  background.appendChild(emblem);

  const cluster = document.createElement("div");
  cluster.className = "neural-cluster";
  background.appendChild(cluster);
  document.body.prepend(background);

  const nodeElements = neuralBlueprint.nodes.map((node) => {
    const el = document.createElement("span");
    el.className = "neural-node";
    el.style.left = `${node.x}%`;
    el.style.top = `${node.y}%`;
    cluster.appendChild(el);
    return el;
  });

  const linkElements = neuralBlueprint.links.map(([startIndex, endIndex]) => {
    const start = neuralBlueprint.nodes[startIndex];
    const end = neuralBlueprint.nodes[endIndex];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const el = document.createElement("span");
    el.className = "neural-link";
    el.style.left = `${start.x}%`;
    el.style.top = `${start.y}%`;
    el.style.width = `${length}%`;
    el.style.transform = `rotate(${angle}deg)`;
    cluster.appendChild(el);
    return { el, start, end };
  });

  let rafId = null;
  window.addEventListener("mousemove", (event) => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      energizeNetwork(event.clientX, event.clientY, nodeElements, linkElements);
    });
  }, { passive: true });
}

function energizeNetwork(clientX, clientY, nodeElements, linkElements) {
  const pointerX = (clientX / window.innerWidth) * 100;
  const pointerY = (clientY / window.innerHeight) * 100;

  neuralBlueprint.nodes.forEach((node, index) => {
    const distance = Math.hypot(node.x - pointerX, node.y - pointerY);
    nodeElements[index].classList.toggle("is-energized", distance < 12);
  });

  linkElements.forEach((link) => {
    const midX = (link.start.x + link.end.x) / 2;
    const midY = (link.start.y + link.end.y) / 2;
    const distance = Math.hypot(midX - pointerX, midY - pointerY);
    link.el.classList.toggle("is-energized", distance < 14);
  });
}

function createNewsCard(item, isFeatured = false) {
  const referenceLabel = item.fonte || item.referencia || "Fonte institucional";
  const articleUrl = page === "home"
    ? `noticia.html?id=${item.id}`
    : `../noticia.html?id=${item.id}`;

  return `
    <article class="news-card ${isFeatured ? "featured" : ""}">
      <span class="meta-pill">${item.rotulo}</span>
      <div class="news-meta">
        <span>${item.data}</span>
        <span>${item.area}</span>
      </div>
      <h3>${item.titulo}</h3>
      <p>${item.resumo}</p>
      <p class="news-meta">${referenceLabel}</p>
      <a class="card-link" href="${articleUrl}">Ler matéria no portal</a>
    </article>
  `;
}

function renderArticle(target, items) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    target.innerHTML = `
      <div class="empty-state">
        A notícia solicitada não foi encontrada.
      </div>
    `;
    return;
  }

  const referenceLabel = item.fonte || item.referencia || "Fonte institucional";
  const sourceAction = item.fonteUrl
    ? `<a class="button secondary" href="${item.fonteUrl}" target="_blank" rel="noopener noreferrer">Ver fonte original</a>`
    : "";
  const originLink = item.categoria === "ai-news" ? "pages/ai-news.html" : "pages/ai-health.html";
  const originLabel = item.categoria === "ai-news"
    ? "Voltar para Atualizações em Inteligência Artificial"
    : "Voltar para Inteligência Artificial na Saúde";
  const paragraphs = (item.conteudo || [item.resumo])
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  document.title = `${item.titulo} | LIAS News`;

  target.innerHTML = `
    <div class="article-header">
      <span class="meta-pill">${item.rotulo}</span>
      <div class="article-meta">
        <span>${item.data}</span>
        <span>${item.area}</span>
      </div>
      <h1>${item.titulo}</h1>
      <p>${item.resumo}</p>
    </div>
    <div class="article-body">
      ${paragraphs}
      <div class="article-reference">
        <p><strong>Fonte ou referência:</strong> ${referenceLabel}</p>
      </div>
    </div>
    <div class="article-actions">
      ${sourceAction}
      <a class="button secondary" href="${originLink}">${originLabel}</a>
      <a class="button primary" href="index.html">Voltar para Home</a>
    </div>
  `;
}
