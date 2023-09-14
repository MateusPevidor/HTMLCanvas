let currentLanguage = 'en';
const translations = {
  en: {
    "welcome": "Welcome to my <span>Canvas Hub</span>",
    "welcome-description": "Explore my HTML canvas projects, showcasing my creativity and ideas. From animations to simulations, each project explores the canvas' potential for captivating and interactive web experiences."
  },
  pt: {
    "welcome": "Bem-vindo ao meu <span>Canvas Hub</span>",
    "welcome-description": "Explore meus projetos com o Canvas do HTML, mostrando minha criatividade e ideias. De animações a simulações, cada projeto explora o potencial do canvas para experiências interativas e cativantes na web."
  }
}

function changeLanguage(language) {
  currentLanguage = language;
  const elements = document.querySelectorAll('[data-translation]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-translation');
    if (translations[language] && translations[language][key]) {
      element.innerHTML = translations[language][key];
    }
  });
}

document.querySelector('#flags-container').addEventListener('click', () => {
  const flags = document.querySelectorAll('.flag');
  flags.forEach(flag => {
    flag.classList.toggle('hidden');
  });
  if (currentLanguage === 'en') {
    changeLanguage('pt');
  } else {
    changeLanguage('en');
  }
});