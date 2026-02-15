/* MUSIQUE AUTOPLAY FIX */
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bg-music");

    setTimeout(() => {
        music.muted = false;
        music.volume = 1;
        music.play().catch(() => {});
    }, 500);
});

/* LOADING */
const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const status = document.getElementById("status");
const mapSpan = document.getElementById("map");
const gamemodeSpan = document.getElementById("gamemode");
const tip = document.getElementById("tip");

const tips = [
    "Astuce : Night City récompense les joueurs intelligents.",
    "Astuce : Les interactions sociales sont la clé.",
    "Astuce : Explorez, discutez, vivez l’expérience.",
    "Astuce : Les règles garantissent une ambiance unique.",
    "Astuce : Votre histoire commence maintenant."
];

let progress = 0;

function updateTip() {
    tip.textContent = tips[Math.floor(Math.random() * tips.length)];
}

function fakeLoading() {
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            status.textContent = "Connexion au serveur...";
            return;
        }

        progress += Math.floor(Math.random() * 4) + 1;
        if (progress > 100) progress = 100;

        fill.style.width = progress + "%";
        percent.textContent = progress + "%";

        if (progress < 30) status.textContent = "Téléchargement des ressources...";
        else if (progress < 60) status.textContent = "Chargement de la carte...";
        else if (progress < 90) status.textContent = "Initialisation des entités...";
        else status.textContent = "Préparation de l’environnement...";
    }, 250);
}

/* PARTICULES COMPATIBLES GMOD */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function initParticles() {
    particles = [];
    for (let i = 0; i < 70; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.6 + 0.2
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = "rgba(0, 200, 255, 0.7)";
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(animateParticles);
}

function init() {
    mapSpan.textContent = "rp_nightcity";
    gamemodeSpan.textContent = "CyberRP";
    updateTip();
    setInterval(updateTip, 7000);
    fakeLoading();
    initParticles();
    animateParticles();
}

document.addEventListener("DOMContentLoaded", init);
