/* ===========================
   MENU INTELIGENTE
=========================== */

const menu = document.querySelector(".menu-navegacao");

let ultimoScroll = 0;

window.addEventListener("scroll", () => {

    const scrollAtual = window.pageYOffset;

    if(scrollAtual <= 20){

        menu.classList.remove("menu-hide");
        menu.classList.remove("menu-scroll");
        menu.classList.add("menu-top");

    }else if(scrollAtual > ultimoScroll){

        menu.classList.add("menu-hide");

    }else{

        menu.classList.remove("menu-hide");
        menu.classList.add("menu-scroll");

    }

    ultimoScroll = scrollAtual;

});

// ===== CRIAÇÃO DE PARTÍCULAS =====
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

// ===== CARROSSEL DO HERO =====
const heroBgs = document.querySelectorAll('.hero-bg');
let heroIndex = 0;
let heroInterval;

function atualizarHeroBg(index) {
    heroBgs.forEach((bg, i) => {
        bg.classList.toggle('ativo', i === index);
    });
    heroIndex = index;
}

function proximoHeroBg() {
    const next = (heroIndex + 1) % heroBgs.length;
    atualizarHeroBg(next);
}

function iniciarHeroAutoplay() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(proximoHeroBg, 5000);
}

iniciarHeroAutoplay();

document.querySelector('.hero-container')?.addEventListener('mouseenter', () => {
    if (heroInterval) clearInterval(heroInterval);
});

document.querySelector('.hero-container')?.addEventListener('mouseleave', iniciarHeroAutoplay);

// ===== MENU DE NAVEGAÇÃO =====
const menuNav = document.getElementById('menuNav');
const hamburger = document.querySelector('.menu-hamburger');
const menuLinks = document.querySelector('.menu-links');
const links = document.querySelectorAll('.menu-links a');

hamburger?.addEventListener('click', () => {
    menuLinks.classList.toggle('ativo');
    hamburger.classList.toggle('ativo');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        menuLinks.classList.remove('ativo');
        hamburger.classList.remove('ativo');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        menuNav.classList.add('scrolled');
    } else {
        menuNav.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('ativo');
        }
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMAÇÃO DOS CARDS AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-card, .dragoon-card, .legendary-warrior-card, .boss-card, .location-card, .gallery-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
    observer.observe(card);
});

/*// ===== BOTÕES VIEW CHARACTER =====
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.hero-card');
        const name = card?.querySelector('h3')?.textContent || 'Character';
        alert(`📜 ${name}\n\nDetalhes do personagem em breve!\nEste é um projeto em desenvolvimento.`);
    });
});*/

// ===== SMOOTH SCROLL PARA O BOTÃO EXPLORE =====
document.querySelector('.hero-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#heroes');
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// ===== RESPONSIVO: AJUSTAR IMAGENS =====
function ajustarImagens() {
    const isMobile = window.innerWidth <= 768;
    document.querySelectorAll('.hero-bg').forEach(img => {
        if (isMobile) {
            img.style.objectPosition = 'center 30%';
        } else {
            img.style.objectPosition = 'center';
        }
    });
}

window.addEventListener('load', ajustarImagens);
window.addEventListener('resize', ajustarImagens);

// ===== PREVENT SCROLL BUG =====
document.querySelectorAll('.hero-card-overlay').forEach(el => {
    el.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    }, { passive: true });
});


// ===== HEROES - SISTEMA DE EXPANSÃO =====
const heroModal = document.getElementById('heroModal');
const heroModalImg = document.getElementById('heroModalImg');
const heroModalTitle = document.getElementById('heroModalTitle');
const heroModalType = document.getElementById('heroModalType');
const heroModalDesc = document.getElementById('heroModalDesc');
const heroModalAge = document.getElementById('heroModalAge');
const heroModalDragoon = document.getElementById('heroModalDragoon');
const heroModalWeapon = document.getElementById('heroModalWeapon');
const heroModalOrigin = document.getElementById('heroModalOrigin');
const heroModalClose = document.getElementById('heroModalClose');

// Dados dos Heróis
const heroesData = {
    'dart': {
        name: 'Dart Feld',
        type: 'Protagonista',
        desc: 'O protagonista de The Legend of Dragoon. Dart é um jovem guerreiro que busca vingança pela destruição de sua aldeia, Neet, e pelo sequestro de sua amiga de infância, Shana. Ao longo de sua jornada, ele descobre sua conexão com os dragões e o destino do mundo.',
        age: '23',
        dragoon: 'Red-Eyed Dragon',
        weapon: 'Espada de Duas Mãos',
        origin: 'Neet',
        img: './src/imagens/heroes/Dart-Feld-1.webp'
    },
    'shana': {
        name: 'Shana',
        type: 'Heroína',
        desc: 'Amiga de infância de Dart e filha do chefe da vila de Seles. Shana é sequestrada pelo Império de Sandora no início do jogo, o que motiva Dart a iniciar sua jornada. Ela possui um vínculo especial com os dragões e seu destino está intrinsecamente ligado ao de Dart.',
        age: '21',
        dragoon: 'White-Silver Dragon',
        weapon: 'Arco e Flecha',
        origin: 'Seles',
        img: './src/imagens/heroes/Shana.webp'
    },
    'rose': {
        name: 'Rose',
        type: 'Guerreira Misteriosa',
        desc: 'Uma guerreira enigmática com conhecimento profundo sobre os dragões e a história do mundo. Rose tem mais de 10.000 anos de idade e carrega o peso de seu passado. Ela se junta a Dart e se torna uma aliada valiosa, revelando segredos antigos.',
        age: '10.000+',
        dragoon: 'Dark Dragon',
        weapon: 'Espada Dupla',
        origin: 'Desconhecida',
        img: './src/imagens/heroes/Rose.webp'
    },
    'lavitz': {
        name: 'Lavitz Slambert',
        type: 'Cavaleiro',
        desc: 'Cavaleiro real de Basil e leal amigo de Dart. Lavitz é um guerreiro honorável que luta ao lado de Dart contra o Império de Sandora. Sua lealdade e bravura são lendárias, e ele se torna um dos companheiros mais confiáveis de Dart.',
        age: '28',
        dragoon: 'Jade Dragon (original)',
        weapon: 'Lança',
        origin: 'Basil',
        img: './src/imagens/heroes/Lavitz.webp'
    },
    'albert': {
        name: 'Albert',
        type: 'Príncipe',
        desc: 'Príncipe do reino de Basil, Albert assume o trono após a morte de seu pai. Ele busca restaurar a paz em seu reino e combater as forças que ameaçam o mundo. Albert é um guerreiro nobre e justo, sempre disposto a ajudar seus aliados.',
        age: '26',
        dragoon: 'Jade Dragon',
        weapon: 'Lança',
        origin: 'Basil',
        img: './src/imagens/heroes/Albert.webp'
    },
    'haschel': {
        name: 'Haschel',
        type: 'Veterano',
        desc: 'Um velho guerreiro que busca vingança pela morte de sua esposa. Haschel é sábio e experiente, com uma visão única do mundo. Ele se junta a Dart para alcançar seus objetivos pessoais e ajudar na luta contra as forças malignas que ameaçam o mundo.',
        age: '60+',
        dragoon: 'Violet Dragon',
        weapon: 'Punhos (Artes Marciais)',
        origin: 'Desconhecida',
        img: './src/imagens/heroes/Haschel.webp'
    },
    'meru': {
        name: 'Meru',
        type: 'Guerreira Alegre',
        desc: 'Uma jovem guerreira enérgica e cheia de vida que se junta ao grupo após um ataque ao seu vilarejo. Meru traz uma energia positiva para o grupo e está sempre pronta para uma aventura. Sua alegria contagiante esconde uma determinação inabalável.',
        age: '19',
        dragoon: 'Blue Sea Dragon',
        weapon: 'Martelo',
        origin: 'Vilarejo dos Winglys',
        img: './src/imagens/heroes/Meru.webp'
    },
    'kongol': {
        name: 'Kongol',
        type: 'Gigante',
        desc: 'Um gigante da tribo do Povo dos Gigantes. Kongol é imenso e poderoso, capaz de esmagar seus inimigos com um único golpe. Ele se une ao grupo após uma série de eventos que revelam seu passado e sua conexão com o enredo principal.',
        age: '150+',
        dragoon: 'Golden Dragon',
        weapon: 'Machado',
        origin: 'Montanhas dos Gigantes',
        img: './src/imagens/heroes/Kongol.webp'
    },
    'miranda': {
        name: 'Miranda',
        type: 'Personagem Marcante',
        desc: 'Uma personagem marcante e sofisticada que aparece em momentos cruciais da história. Miranda possui uma aparência distinta com cabelo longo e roupas elegantes, sendo uma figura enigmática que influencia os eventos ao seu redor.',
        age: 'Desconhecida',
        dragoon: 'Desconhecido',
        weapon: 'Cajado',
        origin: 'Desconhecida',
        img: './src/imagens/heroes/Miranda.webp'
    }
};

// Abrir modal do herói
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.hero-card');
        const heroKey = card.dataset.character;
        const data = heroesData[heroKey];

        if (data) {
            heroModalImg.src = data.img;
            heroModalImg.alt = data.name;
            heroModalTitle.textContent = data.name;
            heroModalType.textContent = data.type;
            heroModalDesc.textContent = data.desc;
            heroModalAge.textContent = data.age;
            heroModalDragoon.textContent = data.dragoon;
            heroModalWeapon.textContent = data.weapon;
            heroModalOrigin.textContent = data.origin;

            heroModal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Abrir modal clicando no card (opcional)
document.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('click', () => {
        const btn = card.querySelector('.view-btn');
        if (btn) btn.click();
    });
});

// Fechar modal
function fecharHeroModal() {
    heroModal.classList.remove('ativo');
    document.body.style.overflow = '';
}

heroModalClose.addEventListener('click', fecharHeroModal);

heroModal.addEventListener('click', (e) => {
    if (e.target === heroModal) {
        fecharHeroModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && heroModal.classList.contains('ativo')) {
        fecharHeroModal();
    }
});

// ===== FALBACK PARA IMAGENS DOS HERÓIS =====
document.querySelectorAll('.hero-card-image img').forEach(img => {
    img.addEventListener('error', () => {
        const parent = img.closest('.hero-card-image');
        if (parent) {
            const overlay = parent.querySelector('.hero-card-overlay');
            if (overlay) {
                img.style.display = 'none';
            }
        }
    });
});

// ===== PRELOAD DAS IMAGENS DOS HERÓIS =====
function preloadHeroImages() {
    Object.values(heroesData).forEach(data => {
        if (data.img) {
            const img = new Image();
            img.src = data.img;
        }
    });
}

preloadHeroImages();

console.log('⚔️ Heróis carregados!');


// ===== DRAGOON SPIRITS - SISTEMA DE EXPANSÃO =====
const dragoonModal = document.getElementById('dragoonModal');
const dragoonModalImg = document.getElementById('dragoonModalImg');
const dragoonModalTitle = document.getElementById('dragoonModalTitle');
const dragoonModalDesc = document.getElementById('dragoonModalDesc');
const dragoonModalClose = document.getElementById('dragoonModalClose');

const dragoonData = {
    'red-eyed': {
        name: 'Red-Eyed Dragon',
        desc: 'O espírito do dragão de olhos vermelhos, ligado a Dart. Representa a força e a determinação do protagonista.',
        img: './src/imagens/dragoes/red-eyed-dragon.webp'
    },
    'white-silver': {
        name: 'White-Silver Dragon',
        desc: 'O dragão prateado, ligado a Shana. Simboliza pureza e proteção.',
        img: './src/imagens/dragoes/white-silver-dragon.webp'
    },
    'dark': {
        name: 'Dark Dragon',
        desc: 'O dragão das trevas, ligado a Rose. Carrega o peso de séculos de batalhas.',
        img: './src/imagens/dragoes/dark-dragon.webp'
    },
    'jade': {
        name: 'Jade Dragon',
        desc: 'O dragão de jade, ligado a Albert. Representa a nobreza e a justiça.',
        img: './src/imagens/dragoes/jade-dragon.webp'
    },
    'violet': {
        name: 'Violet Dragon',
        desc: 'O dragão violeta, ligado a Haschel. Simboliza sabedoria e experiência.',
        img: './src/imagens/dragoes/violet-dragon.webp'
    },
    'blue-sea': {
        name: 'Blue Sea Dragon',
        desc: 'O dragão do mar azul, ligado a Meru. Representa a liberdade e a alegria.',
        img: './src/imagens/dragoes/blue-sea-dragon.webp'
    },
    'golden': {
        name: 'Golden Dragon',
        desc: 'O dragão dourado, ligado a Kongol. Simboliza poder e lealdade.',
        img: './src/imagens/dragoes/golden-dragon.webp'
    },
    'divine': {
        name: 'Divine Dragon',
        desc: 'O dragão divino, o mais poderoso de todos. Uma entidade lendária que transcende o tempo.',
        img: './src/imagens/dragoes/divine-dragon.webp'
    }
};

document.querySelectorAll('.dragoon-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.dragoon-card');
        const dragonKey = card.dataset.dragon;
        const data = dragoonData[dragonKey];

        if (data) {
            dragoonModalImg.src = data.img;
            dragoonModalImg.alt = data.name;
            dragoonModalTitle.textContent = data.name;
            dragoonModalDesc.textContent = data.desc;
            dragoonModal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('.dragoon-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const card = thumb.closest('.dragoon-card');
        const btn = card.querySelector('.dragoon-expand-btn');
        if (btn) btn.click();
    });
});

function fecharDragoonModal() {
    dragoonModal.classList.remove('ativo');
    document.body.style.overflow = '';
}

dragoonModalClose.addEventListener('click', fecharDragoonModal);

dragoonModal.addEventListener('click', (e) => {
    if (e.target === dragoonModal) {
        fecharDragoonModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dragoonModal.classList.contains('ativo')) {
        fecharDragoonModal();
    }
});

// ===== GUERREIROS LENDÁRIOS - SISTEMA DE EXPANSÃO =====
const warriorModal = document.getElementById('warriorModal');
const warriorModalImg = document.getElementById('warriorModalImg');
const warriorModalTitle = document.getElementById('warriorModalTitle');
const warriorModalType = document.getElementById('warriorModalType');
const warriorModalDesc = document.getElementById('warriorModalDesc');
const warriorModalTitle2 = document.getElementById('warriorModalTitle2');
const warriorModalDragoon = document.getElementById('warriorModalDragoon');
const warriorModalAffiliation = document.getElementById('warriorModalAffiliation');
const warriorModalClose = document.getElementById('warriorModalClose');

const warriorData = {
    'zieg': {
        name: 'Zieg Feld',
        type: 'Herói da Guerra dos Dragões',
        desc: 'Herói lendário da Guerra dos Dragões e pai de Dart. Zieg foi um dos maiores guerreiros que já existiu, mas foi corrompido pelo poder de Melbu Frahma. Sua história é uma das mais trágicas do mundo de Dragoon.',
        title2: 'O Herói Caído',
        dragoon: 'Red-Eyed Dragon (original)',
        affiliation: 'Neet / Dragões',
        img: './src/imagens/guerreiros-lendarios/zieg-feld.webp'
    },
    'lloyd': {
        name: 'Lloyd',
        type: 'Guerreiro Enigmático',
        desc: 'Um guerreiro habilidoso e misterioso que busca reunir todos os Dragoon Spirits. Lloyd é um dos antagonistas mais complexos do jogo, com motivações que vão além do bem e do mal.',
        title2: 'O Caçador de Dragões',
        dragoon: 'Nenhum (busca todos)',
        affiliation: 'Independente',
        img: './src/imagens/guerreiros-lendarios/lloyd.webp'
    },
    'greham': {
        name: 'Greham',
        type: 'Guerreiro Lendário',
        desc: 'Um guerreiro lendário cujo nome ecoa através dos tempos. Greham busca poder absoluto e não hesita em enfrentar qualquer desafio para alcançar seus objetivos.',
        title2: 'O Buscador do Poder',
        dragoon: 'Desconhecido',
        affiliation: 'Independente',
        img: './src/imagens/guerreiros-lendarios/greham.webp'
    },
    'doel': {
        name: 'Doel',
        type: 'Imperador de Sandora',
        desc: 'O imponente Imperador de Sandora, uma figura imponente e misteriosa que governa com mão de ferro. Doel esconde segredos antigos e possui uma conexão profunda com os eventos do jogo.',
        title2: 'O Imperador das Trevas',
        dragoon: 'Desconhecido',
        affiliation: 'Império de Sandora',
        img: './src/imagens/guerreiros-lendarios/doel.webp'
    }
};

document.querySelectorAll('.warrior-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.legendary-warrior-card');
        const warriorKey = card.dataset.warrior;
        const data = warriorData[warriorKey];

        if (data) {
            warriorModalImg.src = data.img;
            warriorModalImg.alt = data.name;
            warriorModalTitle.textContent = data.name;
            warriorModalType.textContent = data.type;
            warriorModalDesc.textContent = data.desc;
            warriorModalTitle2.textContent = data.title2;
            warriorModalDragoon.textContent = data.dragoon;
            warriorModalAffiliation.textContent = data.affiliation;
            warriorModal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('.warrior-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const card = thumb.closest('.legendary-warrior-card');
        const btn = card.querySelector('.warrior-expand-btn');
        if (btn) btn.click();
    });
});

function fecharWarriorModal() {
    warriorModal.classList.remove('ativo');
    document.body.style.overflow = '';
}

warriorModalClose.addEventListener('click', fecharWarriorModal);

warriorModal.addEventListener('click', (e) => {
    if (e.target === warriorModal) {
        fecharWarriorModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && warriorModal.classList.contains('ativo')) {
        fecharWarriorModal();
    }
});

// ===== BOSSES - SISTEMA DE EXPANSÃO =====
const bossModal = document.getElementById('bossModal');
const bossModalImg = document.getElementById('bossModalImg');
const bossModalTitle = document.getElementById('bossModalTitle');
const bossModalType = document.getElementById('bossModalType');
const bossModalDesc = document.getElementById('bossModalDesc');
const bossModalHp = document.getElementById('bossModalHp');
const bossModalLocation = document.getElementById('bossModalLocation');
const bossModalWeakness = document.getElementById('bossModalWeakness');
const bossModalClose = document.getElementById('bossModalClose');

const bossData = {
    'feyrbrand': {
        name: 'Feyrbrand',
        type: 'Dragão',
        desc: 'Um dragão imponente que guarda os segredos das montanhas. Feyrbrand é o primeiro grande desafio enfrentado por Dart e seus aliados.',
        hp: '8.000',
        location: 'Montanhas',
        weakness: 'Fogo',
        img: './src/imagens/chefes/feyrbrand.webp'
    },
    'urobolus': {
        name: 'Urobolus',
        type: 'Serpente',
        desc: 'Uma serpente ancestral que se enrola nas ruínas antigas. Seu corpo massivo e veneno letal a tornam uma adversária temível.',
        hp: '12.000',
        location: 'Ruínas',
        weakness: 'Gelo',
        img: './src/imagens/chefes/urobolus.webp'
    },
    'polter-armor': {
        name: 'Polter Armor',
        type: 'Armadura Amaldiçoada',
        desc: 'Uma armadura possuída por espíritos vingativos. Flutua no ar e ataca com precisão sobrenatural.',
        hp: '10.500',
        location: 'Castelo',
        weakness: 'Luz',
        img: './src/imagens/chefes/polter-armor.webp'
    },
    'drake': {
        name: 'Drake',
        type: 'Guerreiro',
        desc: 'Um guerreiro implacável que busca provar sua força. Drake é conhecido por sua habilidade com a espada e sua resistência.',
        hp: '15.000',
        location: 'Arena',
        weakness: 'Magia',
        img: './src/imagens/chefes/drake.webp'
    },
    'mappi': {
        name: 'Mappi',
        type: 'Mercenário',
        desc: 'Um mercenário astuto que luta por dinheiro. Mappi usa táticas sujas e ataques rápidos para vencer seus oponentes.',
        hp: '9.000',
        location: 'Estrada',
        weakness: 'Fogo',
        img: './src/imagens/chefes/mappi.webp'
    },
    'ghost-commander': {
        name: 'Ghost Commander',
        type: 'Espectro',
        desc: 'Um comandante fantasma que lidera um exército de almas perdidas. Seu grito de guerra paralisa os inimigos.',
        hp: '14.000',
        location: 'Cemitério',
        weakness: 'Sagrado',
        img: './src/imagens/chefes/ghost-commander.webp'
    },
    'kongol-boss': {
        name: 'Kongol',
        type: 'Gigante',
        desc: 'Um gigante da tribo dos Gigantes. Kongol é imenso e poderoso, capaz de esmagar seus inimigos com um único golpe.',
        hp: '18.000',
        location: 'Montanha',
        weakness: 'Velocidade',
        img: './src/imagens/chefes/kongol-boss.webp'
    },
    'virage': {
        name: 'Virage',
        type: 'Criatura Antiga',
        desc: 'Uma criatura das eras antigas, parte homem, parte besta. Virage é implacável e não conhece a piedade.',
        hp: '20.000',
        location: 'Caverna',
        weakness: 'Relâmpago',
        img: './src/imagens/chefes/virage.webp'
    },
    'grand-jewel': {
        name: 'Grand Jewel',
        type: 'Jóia Mística',
        desc: 'Uma joia encantada que adquiriu consciência. Grand Jewel manipula a energia elemental para atacar.',
        hp: '16.500',
        location: 'Templo',
        weakness: 'Trevas',
        img: './src/imagens/chefes/grand-jewel.webp'
    },
    'faust': {
        name: 'Faust',
        type: 'Lenda Viva',
        desc: 'Uma figura lendária que transcende o tempo. Faust possui conhecimentos arcanos e poder incomensurável.',
        hp: '35.000',
        location: 'Dimensão Oculta',
        weakness: 'Desconhecida',
        img: './src/imagens/chefes-lendarios/faust.webp',
        isLegendary: true
    },
    'divine-dragon-boss': {
        name: 'Divine Dragon',
        type: 'Dragão Divino',
        desc: 'O dragão mais poderoso que já existiu. Divine Dragon é uma entidade celestial que desafia as leis da realidade.',
        hp: '50.000',
        location: 'Céu',
        weakness: 'Nenhuma',
        img: './src/imagens/chefes-lendarios/divine-dragon-boss.webp',
        isLegendary: true
    },
    'melbu-frahma': {
        name: 'Melbu Frahma',
        type: 'Vilão Final',
        desc: 'O arquiteto da destruição. Melbu Frahma é o vilão final, cujo poder ameaça consumir todo o mundo.',
        hp: '60.000',
        location: 'Núcleo',
        weakness: 'Luz',
        img: './src/imagens/chefes-lendarios/melbu-frahma.webp',
        isLegendary: true
    }
};

document.querySelectorAll('.boss-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.boss-card');
        const bossKey = card.dataset.boss;
        const data = bossData[bossKey];

        if (data) {
            bossModalImg.src = data.img;
            bossModalImg.alt = data.name;
            bossModalTitle.textContent = data.name;
            bossModalType.textContent = data.type;
            bossModalDesc.textContent = data.desc;
            bossModalHp.textContent = data.hp;
            bossModalLocation.textContent = data.location;
            bossModalWeakness.textContent = data.weakness;

            if (data.isLegendary) {
                bossModal.querySelector('.boss-modal-info h3').style.color = '#ffd700';
                bossModal.querySelector('.boss-modal-info h3').style.textShadow = '0 0 30px rgba(255,215,0,0.2)';
            } else {
                bossModal.querySelector('.boss-modal-info h3').style.color = '#ffd700';
                bossModal.querySelector('.boss-modal-info h3').style.textShadow = 'none';
            }

            bossModal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('.boss-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const card = thumb.closest('.boss-card');
        const btn = card.querySelector('.boss-expand-btn');
        if (btn) btn.click();
    });
});

function fecharBossModal() {
    bossModal.classList.remove('ativo');
    document.body.style.overflow = '';
}

bossModalClose.addEventListener('click', fecharBossModal);

bossModal.addEventListener('click', (e) => {
    if (e.target === bossModal) {
        fecharBossModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bossModal.classList.contains('ativo')) {
        fecharBossModal();
    }
});

// ===== FALBACK PARA IMAGENS =====
document.querySelectorAll('.dragoon-thumb img, .warrior-thumb img, .boss-thumb img').forEach(img => {
    img.addEventListener('error', () => {
        const parent = img.closest('.dragoon-thumb, .warrior-thumb, .boss-thumb');
        if (parent) {
            const overlay = parent.querySelector('.dragoon-thumb-overlay, .warrior-thumb-overlay, .boss-thumb-overlay');
            if (overlay) {
                img.style.display = 'none';
                overlay.style.position = 'absolute';
                overlay.style.top = '50%';
                overlay.style.left = '50%';
                overlay.style.transform = 'translate(-50%, -50%)';
                overlay.style.fontSize = '48px';
                overlay.style.background = 'transparent';
            }
        }
    });
});

// ===== PRELOAD DAS IMAGENS =====
function preloadImages() {
    const allData = { ...dragoonData, ...warriorData, ...bossData };
    Object.values(allData).forEach(data => {
        if (data.img) {
            const img = new Image();
            img.src = data.img;
        }
    });
}

preloadImages();

console.log('🐉 The Legend of Dragoon - Fan Project');
console.log('✨ Created by Richard Marques');
console.log('📖 "The Legend of Dragoon" é propriedade da Sony Computer Entertainment.');


// ===== ANTAGONISTAS PRINCIPAIS - SISTEMA DE EXPANSÃO =====
const antagonistModal = document.getElementById('antagonistModal');
const antagonistModalImg = document.getElementById('antagonistModalImg');
const antagonistModalTitle = document.getElementById('antagonistModalTitle');
const antagonistModalType = document.getElementById('antagonistModalType');
const antagonistModalDesc = document.getElementById('antagonistModalDesc');
const antagonistModalTitle2 = document.getElementById('antagonistModalTitle2');
const antagonistModalAffiliation = document.getElementById('antagonistModalAffiliation');
const antagonistModalDragoon = document.getElementById('antagonistModalDragoon');
const antagonistModalClose = document.getElementById('antagonistModalClose');

// Dados dos Antagonistas
const antagonistData = {
    'melbu-frahma': {
        name: 'Melbu Frahma',
        type: 'Vilão Final',
        desc: 'O arquiteto da destruição. Melbu Frahma é o vilão final de The Legend of Dragoon, cujo poder ameaça consumir todo o mundo. Sua ambição pelo poder dos dragões o levou a cometer atrocidades inimagináveis.',
        title2: 'O Arquitet da Destruição',
        affiliation: 'Império de Sandora / Divine Dragon',
        dragoon: 'Divine Dragon',
        img: './src/imagens/antagonistas/melbu-frahma-antagonist.webp'
    },
    'emperor-diaz': {
        name: 'Emperor Diaz',
        type: 'Imperador',
        desc: 'O misterioso Imperador que governa com mão de ferro. Emperor Diaz é uma figura enigmática cujas verdadeiras intenções vão além do que aparentam. Seu poder e influência são temidos por todos.',
        title2: 'O Imperador das Sombras',
        affiliation: 'Império de Sandora',
        dragoon: 'Desconhecido',
        img: './src/imagens/antagonistas/emperor-diaz.webp'
    },
    'lenus': {
        name: 'Lenus',
        type: 'Guerreira Misteriosa',
        desc: 'Uma guerreira enigmática que aparece nos momentos mais cruciais. Lenus possui habilidades incomuns e uma conexão profunda com os eventos que moldam o destino do mundo.',
        title2: 'A Guerreira do Destino',
        affiliation: 'Independente',
        dragoon: 'Desconhecido',
        img: './src/imagens/antagonistas/lenus.webp'
    },
    'fruegel': {
        name: 'Fruegel',
        type: 'General de Sandora',
        desc: 'Um general implacável do Império de Sandora. Fruegel é conhecido por sua crueldade e habilidade tática, liderando as forças imperiais com mão de ferro.',
        title2: 'O General Implacável',
        affiliation: 'Império de Sandora',
        dragoon: 'Nenhum',
        img: './src/imagens/antagonistas/fruegel.webp'
    }
};

// Abrir modal do antagonista
document.querySelectorAll('.antagonist-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.antagonist-card');
        const antagonistKey = card.dataset.antagonist;
        const data = antagonistData[antagonistKey];

        if (data) {
            antagonistModalImg.src = data.img;
            antagonistModalImg.alt = data.name;
            antagonistModalTitle.textContent = data.name;
            antagonistModalType.textContent = data.type;
            antagonistModalDesc.textContent = data.desc;
            antagonistModalTitle2.textContent = data.title2;
            antagonistModalAffiliation.textContent = data.affiliation;
            antagonistModalDragoon.textContent = data.dragoon;

            antagonistModal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Abrir modal clicando na thumbnail
document.querySelectorAll('.antagonist-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const card = thumb.closest('.antagonist-card');
        const btn = card.querySelector('.antagonist-expand-btn');
        if (btn) btn.click();
    });
});

// Fechar modal
function fecharAntagonistModal() {
    antagonistModal.classList.remove('ativo');
    document.body.style.overflow = '';
}

antagonistModalClose.addEventListener('click', fecharAntagonistModal);

antagonistModal.addEventListener('click', (e) => {
    if (e.target === antagonistModal) {
        fecharAntagonistModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && antagonistModal.classList.contains('ativo')) {
        fecharAntagonistModal();
    }
});

// ===== FALBACK PARA IMAGENS =====
document.querySelectorAll('.antagonist-thumb img').forEach(img => {
    img.addEventListener('error', () => {
        const parent = img.closest('.antagonist-thumb');
        if (parent) {
            const overlay = parent.querySelector('.antagonist-thumb-overlay');
            if (overlay) {
                img.style.display = 'none';
                overlay.style.position = 'absolute';
                overlay.style.top = '50%';
                overlay.style.left = '50%';
                overlay.style.transform = 'translate(-50%, -50%)';
                overlay.style.fontSize = '48px';
                overlay.style.background = 'transparent';
            }
        }
    });
});

// ===== PRELOAD DAS IMAGENS =====
function preloadAntagonistImages() {
    Object.values(antagonistData).forEach(data => {
        if (data.img) {
            const img = new Image();
            img.src = data.img;
        }
    });
}

preloadAntagonistImages();

console.log('👹 Antagonistas Principais carregados!');