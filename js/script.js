// 1) Scroll suave para links do menu
document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const alvo = document.querySelector(link.getAttribute("href"));
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// 2) Botão "Get Started" leva para contato
const ctaButton = document.querySelector(".hero button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    const contato = document.querySelector("#contact");
    if (contato) contato.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// 3) Header com efeito ao rolar
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// 4) Link ativo no menu conforme seção visível
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const atualizarLinkAtivo = () => {
  let secaoAtual = "";
  const y = window.scrollY + 120;

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    if (y >= top && y < top + h) secaoAtual = sec.id;
  });

  navLinks.forEach((link) => {
    const ativo = link.getAttribute("href") === `#${secaoAtual}`;
    link.classList.toggle("active", ativo);
  });
};

window.addEventListener("scroll", atualizarLinkAtivo);
window.addEventListener("load", atualizarLinkAtivo);

// 5) Animação de entrada nas seções
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section, .hero").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});
