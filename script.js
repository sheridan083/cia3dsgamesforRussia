const searchInput = document.querySelector('#search');
const cards = [...document.querySelectorAll('.game-card')];
const tabs = [...document.querySelectorAll('.tab-btn')];
const count = document.querySelector('#game-count');
const emptyState = document.querySelector('#empty-state');
let currentCategory = 'popular';

function filterGames() {
  const query = searchInput.value.trim().toLocaleLowerCase('ru');
  let visible = 0;

  cards.forEach((card) => {
    const title = card.querySelector('h3').textContent.toLocaleLowerCase('ru');
    const matchesSearch = title.includes(query);
    const matchesCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
    const show = matchesSearch && matchesCategory;

    card.hidden = !show;
    if (show) {
      visible += 1;
      card.style.animationDelay = `${Math.min(visible * 35, 280)}ms`;
    }
  });

  count.textContent = `${visible} ${pluralize(visible)}`;
  emptyState.hidden = visible !== 0;
}

function pluralize(number) {
  const lastTwo = number % 100;
  const last = number % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'игр';
  if (last === 1) return 'игра';
  if (last >= 2 && last <= 4) return 'игры';
  return 'игр';
}

tabs.forEach((button) => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    tabs.forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    filterGames();
  });
});

searchInput.addEventListener('input', filterGames);

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    filterGames();
    searchInput.blur();
  }
});

filterGames();
