// Criação de partículas
function criarParticulas() {
  const container = document.getElementById('particles');
  const numParticulas = 50;
  
  for (let i = 0; i < numParticulas; i++) {
    const particula = document.createElement('div');
    particula.classList.add('particle');
    particula.style.left = Math.random() * 100 + '%';
    particula.style.width = (Math.random() * 3 + 1) + 'px';
    particula.style.height = particula.style.width;
    particula.style.animationDuration = (Math.random() * 20 + 15) + 's';
    particula.style.animationDelay = (Math.random() * 15) + 's';
    container.appendChild(particula);
  }
}

criarParticulas();

// Carrossel principal
const botoes = document.querySelectorAll('.botao');
const imagens = document.querySelectorAll('.imagem');
const informacoes = document.querySelectorAll('.informacoes');
const progressoTexto = document.querySelector('.progresso-texto');

let indiceAtual = 0;
let autoPlayInterval;

function atualizarCarrossel(indice) {
  // Atualizar botões
  botoes.forEach((btn, i) => {
    btn.classList.toggle('selecionado', i === indice);
  });
  
  // Atualizar imagens
  imagens.forEach((img, i) => {
    img.classList.toggle('ativa', i === indice);
  });
  
  // Atualizar informações
  informacoes.forEach((info, i) => {
    info.classList.toggle('ativa', i === indice);
  });
  
  // Atualizar progresso
  progressoTexto.textContent = `${indice + 1} / ${imagens.length}`;
  
  indiceAtual = indice;
}

function proximoSlide() {
  const proximoIndice = (indiceAtual + 1) % imagens.length;
  atualizarCarrossel(proximoIndice);
}

function iniciarAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(proximoSlide, 6000);
}

function pararAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

// Event listeners para os botões
botoes.forEach((botao) => {
  botao.addEventListener('click', () => {
    const indice = parseInt(botao.dataset.indice);
    if (indice !== indiceAtual) {
      atualizarCarrossel(indice);
      // Reiniciar autoplay
      iniciarAutoPlay();
    }
  });
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    proximoSlide();
    iniciarAutoPlay();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const indiceAnterior = (indiceAtual - 1 + imagens.length) % imagens.length;
    atualizarCarrossel(indiceAnterior);
    iniciarAutoPlay();
  }
});

// Suporte a touch para dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > 50) { // Sensibilidade de swipe
    if (diff > 0) {
      proximoSlide();
    } else {
      const indiceAnterior = (indiceAtual - 1 + imagens.length) % imagens.length;
      atualizarCarrossel(indiceAnterior);
    }
    iniciarAutoPlay();
  }
});

// Pausar autoplay ao interagir
document.querySelector('.conteudo').addEventListener('mouseenter', pararAutoPlay);
document.querySelector('.conteudo').addEventListener('mouseleave', iniciarAutoPlay);

// Iniciar autoplay
iniciarAutoPlay();

// Inicializar
atualizarCarrossel(0);



// Adicione ao final do seu index.js

// ===== DETECTAR E AJUSTAR O OBJECT-POSITION DINAMICAMENTE =====
function ajustarPosicaoImagem() {
  const imagens = document.querySelectorAll('.imagem');
  const isMobile = window.innerWidth <= 768;
  const isLandscape = window.innerWidth > window.innerHeight;
  
  imagens.forEach(img => {
    if (isMobile) {
      if (isLandscape) {
        img.style.objectPosition = 'center 40%';
      } else {
        img.style.objectPosition = 'center 20%';
      }
    } else {
      img.style.objectPosition = 'center';
    }
  });
}

// Executar ao carregar e ao redimensionar
window.addEventListener('load', ajustarPosicaoImagem);
window.addEventListener('resize', ajustarPosicaoImagem);
window.addEventListener('orientationchange', () => {
  setTimeout(ajustarPosicaoImagem, 300);
});

// ===== MELHORAR O SCROLL EM MOBILE =====
document.querySelectorAll('.descricao').forEach(el => {
  el.addEventListener('touchstart', (e) => {
    e.stopPropagation();
  }, { passive: true });
});

// ===== PAUSAR AUTOPLAY AO INTERAGIR =====
let touchTimeout;
const conteudo = document.querySelector('.conteudo');

conteudo.addEventListener('touchstart', () => {
  pararAutoPlay();
  clearTimeout(touchTimeout);
}, { passive: true });

conteudo.addEventListener('touchend', () => {
  touchTimeout = setTimeout(() => {
    iniciarAutoPlay();
  }, 5000);
}, { passive: true });

// ===== GARANTIR QUE AS IMAGENS CARREGUEM COMPLETAMENTE =====
function preloadImagensMobile() {
  const imagens = document.querySelectorAll('.imagem');
  let carregadas = 0;
  
  imagens.forEach((img, index) => {
    if (img.complete) {
      carregadas++;
    } else {
      img.addEventListener('load', () => {
        carregadas++;
        if (carregadas === imagens.length) {
          document.querySelector('.imagem.ativa')?.classList.add('ativa');
        }
      });
    }
  });
}

if ('ontouchstart' in window) {
  preloadImagensMobile();
}