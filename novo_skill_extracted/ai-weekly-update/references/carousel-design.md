# Carousel Design — Especificações e Código Base

## Especificações Técnicas

- **Formato**: 1080x1080px (quadrado, padrão Instagram)
- **Slides**: 7 slides (capa + 5 notícias + CTA final)
- **Formato arquivo**: HTML com CSS inline + JavaScript
- **Uso**: Abrir no navegador → tirar print de cada slide

## Paleta Padrão (quando usuário não informou identidade visual)

```
Background principal: #0f0f1a (azul-escuro quase preto)
Background card: #1a1a2e
Cor primária (acentos): #7c3aed (roxo vibrante)
Cor secundária (acentos): #06b6d4 (ciano)
Texto principal: #ffffff
Texto secundário: #a1a1aa
Gradiente capa: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b69 100%)
```

## Código Base HTML

Ao gerar o carrossel, use este código como base e preencha com o conteúdo real:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Carrossel IA Semanal</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }

  .controls {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    align-items: center;
  }

  .btn {
    background: #7c3aed;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: opacity 0.2s;
  }
  .btn:hover { opacity: 0.85; }
  .btn:disabled { opacity: 0.3; cursor: not-allowed; }

  .slide-counter {
    color: #a1a1aa;
    font-size: 14px;
    min-width: 60px;
    text-align: center;
  }

  .slide-wrapper {
    width: 1080px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }

  .slide {
    display: none;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .slide.active { display: flex; }

  /* ===== SLIDE CAPA ===== */
  .slide-cover {
    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b69 100%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px;
  }

  .cover-tag {
    background: rgba(124, 58, 237, 0.3);
    border: 1px solid rgba(124, 58, 237, 0.6);
    color: #c4b5fd;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 10px 28px;
    border-radius: 100px;
    margin-bottom: 48px;
  }

  .cover-emoji {
    font-size: 100px;
    margin-bottom: 40px;
    display: block;
    filter: drop-shadow(0 0 40px rgba(124,58,237,0.6));
  }

  .cover-title {
    color: #ffffff;
    font-size: 72px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 28px;
    letter-spacing: -1px;
  }

  .cover-subtitle {
    color: #a1a1aa;
    font-size: 32px;
    font-weight: 400;
    line-height: 1.4;
    max-width: 700px;
  }

  .cover-date {
    position: absolute;
    bottom: 60px;
    color: #52525b;
    font-size: 22px;
  }

  /* ===== SLIDES DE NOTÍCIA ===== */
  .slide-news {
    background: #0f0f1a;
    flex-direction: column;
    padding: 80px;
  }

  .news-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 60px;
  }

  .news-number {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .news-source-tag {
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.4);
    color: #06b6d4;
    font-size: 20px;
    font-weight: 600;
    padding: 8px 20px;
    border-radius: 100px;
  }

  .news-emoji {
    font-size: 64px;
    display: block;
    margin-bottom: 32px;
  }

  .news-title {
    color: #ffffff;
    font-size: 56px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 40px;
    letter-spacing: -0.5px;
  }

  .news-body {
    color: #d4d4d8;
    font-size: 32px;
    line-height: 1.5;
    margin-bottom: 48px;
    flex: 1;
  }

  .news-insight {
    background: rgba(124, 58, 237, 0.15);
    border-left: 4px solid #7c3aed;
    padding: 28px 32px;
    border-radius: 0 12px 12px 0;
  }

  .news-insight-label {
    color: #a78bfa;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .news-insight-text {
    color: #e4e4e7;
    font-size: 28px;
    line-height: 1.45;
  }

  .slide-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .footer-brand {
    color: #52525b;
    font-size: 20px;
    font-weight: 600;
  }

  .footer-dots {
    display: flex;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3f3f46;
    transition: all 0.3s;
  }
  .dot.active {
    background: #7c3aed;
    width: 24px;
    border-radius: 4px;
  }

  /* ===== SLIDE CTA ===== */
  .slide-cta {
    background: linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px;
  }

  .cta-emoji { font-size: 80px; margin-bottom: 48px; }

  .cta-title {
    color: #ffffff;
    font-size: 68px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 32px;
    letter-spacing: -1px;
  }

  .cta-subtitle {
    color: #a1a1aa;
    font-size: 32px;
    line-height: 1.5;
    margin-bottom: 60px;
    max-width: 700px;
  }

  .cta-handle {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    font-size: 36px;
    font-weight: 800;
    padding: 20px 52px;
    border-radius: 100px;
    display: inline-block;
  }

  .decorative-circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.08;
    background: #7c3aed;
  }
</style>
</head>
<body>

<div class="controls">
  <button class="btn" id="prevBtn" onclick="changeSlide(-1)" disabled>← Anterior</button>
  <span class="slide-counter" id="counter">1 / 7</span>
  <button class="btn" id="nextBtn" onclick="changeSlide(1)">Próximo →</button>
</div>

<div class="slide-wrapper" id="slideWrapper">

  <!-- SLIDE 1: CAPA -->
  <div class="slide slide-cover active">
    <div class="cover-tag">🤖 IA Esta Semana</div>
    <span class="cover-emoji">⚡</span>
    <h1 class="cover-title">INSERIR TÍTULO<br>IMPACTANTE</h1>
    <p class="cover-subtitle">Resumo do que aconteceu de mais importante em IA esta semana</p>
    <span class="cover-date">Semana de DD/MM a DD/MM/AAAA</span>
  </div>

  <!-- SLIDES 2-6: NOTÍCIAS (copie e ajuste para cada notícia) -->
  <div class="slide slide-news">
    <div class="news-header">
      <div class="news-number">1</div>
      <span class="news-source-tag">FONTE AQUI</span>
    </div>
    <span class="news-emoji">🔥</span>
    <h2 class="news-title">TÍTULO DA<br>NOTÍCIA AQUI</h2>
    <p class="news-body">Explicação simples em até 30 palavras para o público leigo entender.</p>
    <div class="news-insight">
      <div class="news-insight-label">💡 Por que importa</div>
      <div class="news-insight-text">Uma frase de contexto/impacto real.</div>
    </div>
    <div class="slide-footer">
      <span class="footer-brand">@SEU_PERFIL</span>
      <div class="footer-dots" id="dots1"></div>
    </div>
  </div>

  <!-- Repita o bloco acima para notícias 2, 3, 4, 5 -->

  <!-- SLIDE 7: CTA -->
  <div class="slide slide-cta">
    <div class="decorative-circle" style="width:600px;height:600px;top:-200px;right:-200px;"></div>
    <div class="decorative-circle" style="width:400px;height:400px;bottom:-150px;left:-150px;"></div>
    <div class="cta-emoji">🔔</div>
    <h2 class="cta-title">Gostou?<br>Segue pra mais!</h2>
    <p class="cta-subtitle">Toda semana as principais novidades de IA explicadas de forma simples.</p>
    <span class="cta-handle">@SEU_PERFIL</span>
  </div>

</div>

<script>
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;

  function updateDots() {
    document.querySelectorAll('[id^="dots"]').forEach(container => {
      container.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === current ? ' active' : '');
        container.appendChild(dot);
      }
    });
  }

  function changeSlide(dir) {
    slides[current].classList.remove('active');
    current = Math.max(0, Math.min(total - 1, current + dir));
    slides[current].classList.add('active');
    document.getElementById('counter').textContent = (current + 1) + ' / ' + total;
    document.getElementById('prevBtn').disabled = current === 0;
    document.getElementById('nextBtn').disabled = current === total - 1;
    updateDots();
  }

  updateDots();
</script>
</body>
</html>
```

## Personalização por Identidade Visual

Quando o usuário fornecer cores/nome do perfil, substitua:

| Elemento | Padrão | Personalizado |
|---|---|---|
| `@SEU_PERFIL` | placeholder | Handle real do usuário |
| `#7c3aed` (roxo) | cor primária padrão | Cor primária do usuário |
| `#06b6d4` (ciano) | cor secundária padrão | Cor secundária do usuário |
| Background | `#0f0f1a` escuro | Ajustar se tema claro preferido |

## Instruções de Geração

Ao gerar o HTML final:
1. **Preencha todos os slides** com conteúdo real das notícias selecionadas
2. **Adapte o título da capa** para ser impactante (ex: "A IA que Vai Mudar Tudo" ou "5 Coisas que Aconteceram em IA Esta Semana")
3. **Limite o texto** a no máximo 30 palavras por slide (exceto capa e CTA)
4. **Use emojis relevantes** para cada notícia
5. **Replique os slides de notícia** para todas as 5 notícias selecionadas
6. **Ajuste os dots de navegação** para o número correto de slides

---

## Botão de Download por Slide (html2canvas)

Adicione no `<head>` do HTML:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

Adicione o botão de download (posicionado FORA do `.slide-wrapper` mas visível para o usuário):
```html
<style>
  .download-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    border: none;
    padding: 14px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 4px 20px rgba(124,58,237,0.4);
    z-index: 100;
    transition: transform 0.2s, opacity 0.2s;
  }
  .download-btn:hover { transform: translateY(-2px); opacity: 0.9; }
  .download-btn:active { transform: scale(0.97); }
</style>

<button class="download-btn" onclick="downloadSlide()">
  📥 Salvar este slide
</button>
```

Adicione a função JavaScript no `<script>` existente:
```javascript
function downloadSlide() {
  const btn = document.querySelector('.download-btn');
  const wrapper = document.getElementById('slideWrapper');
  const controls = document.querySelector('.controls');
  
  // Oculta controles durante a captura
  btn.style.display = 'none';
  controls.style.display = 'none';
  
  const today = new Date().toISOString().slice(0,10);
  const filename = `slide-${current + 1}-${today}.png`;
  
  html2canvas(wrapper, {
    scale: 1,
    useCORS: true,
    logging: false,
    width: 1080,
    height: 1080,
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Restaura controles
    btn.style.display = 'block';
    controls.style.display = 'flex';
    
    btn.textContent = '✅ Salvo!';
    setTimeout(() => { btn.textContent = '📥 Salvar este slide'; }, 2000);
  });
}
```

## Instrução ao Usuário (incluir no entregável)

> **Como usar:** Abra o arquivo HTML no seu navegador. Navegue até cada slide usando os botões "Anterior / Próximo" e clique em **"📥 Salvar este slide"** para baixar cada um como imagem PNG 1080×1080px pronta para publicar no Instagram.
