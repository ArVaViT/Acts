// --- Data Storage ---
const courseData = {
    modules: [
        {
            id: 0,
            shortTitle: "Модуль I",
            title: "Модуль I: Основание Церкви",
            range: "Деян. 1–2",
            description: "Вводный, короткий блок (½). Фокус на вознесении, избрании Матфия и Пятидесятнице. Основные темы: пневматология и эсхатология.",
            color: "rgb(185, 28, 28)", // red-700
            profile: { history: 30, theology: 95, archaeology: 20, law: 10 }, 
            chaptersCount: 2,
            topics: [
                {
                    title: "Источниковедение и Предисловие",
                    details: "Проблема Лукино-Деянийского единства (Luke-Acts). Авторство, дата, цель написания. Обзор общей структуры книги (Деян. 1:8)."
                },
                {
                    title: "Вознесение и Избрание Матфия (Деян. 1)",
                    details: "Теологический смысл вознесения Христа. Юридический и общественный фон избрания апостола."
                },
                {
                    title: "Пятидесятница: Дух и Проповедь (Деян. 2)",
                    details: "Феномен глоссолалии. Анализ проповеди Петра: использование Ветхого Завета, мессианство, крещение. Богословие 'последних дней'."
                }
            ],
            analysis: "Этот модуль требует глубокого погружения в <strong>Теологию</strong> (Пневматология) как фундаментальную основу курса."
        },
        {
            id: 1,
            shortTitle: "Модуль II",
            title: "Модуль II: Расширение в Иудее и Самарии",
            range: "Деян. 3–12",
            description: "Полный блок. Расширение за пределы Иерусалима, служение Петра, появление Стефана и Филиппа, обращение Павла и включение язычников (Корнилий).",
            color: "rgb(194, 65, 12)", // orange-700
            profile: { history: 80, theology: 70, archaeology: 60, law: 30 },
            chaptersCount: 10,
            topics: [
                {
                    title: "Ранняя Община и Конфликты (Деян. 3–5)",
                    details: "Анализ социальной модели ('коммунизм любви'). Конфликт с Синедрионом. Юридический статус апостолов."
                },
                {
                    title: "Кризис и Первые Мученики (Деян. 6–7)",
                    details: "Конфликт 'евреев' и 'эллинистов'. Речь Стефана как теологический перелом, суд и казнь. Юридический фон (линчевание)."
                },
                {
                    title: "Географический Сдвиг (Деян. 8)",
                    details: "Миссия Филиппа в Самарии и к евнуху. Феномен Симона Волхва. Роль прозелитов."
                },
                {
                    title: "Обращение Павла (Деян. 9)",
                    details: "Текстологический анализ трёх версий обращения. Историческая реконструкция событий в Дамаске."
                },
                {
                    title: "Включение Язычников (Деян. 10–12)",
                    details: "Видение Петра и обращение Корнилия. Теологический сдвиг: отмена кошерности. Гонения Ирода Агриппы I. Антиохия как новый центр."
                }
            ],
            analysis: "Сбалансированный, но сложный модуль. <strong>История</strong> важна для реконструкции хронологии и географии (Иерусалим, Кесария, Антиохия)."
        },
        {
            id: 2,
            shortTitle: "Модуль III",
            title: "Модуль III: Миссия по Средиземноморью",
            range: "Деян. 13–20",
            description: "Полный блок. Все три миссионерских путешествия Павла. Ключевые решения Иерусалимского Собора. Столкновение с языческими и философскими культами.",
            color: "rgb(21, 128, 61)", // green-700
            profile: { history: 85, theology: 75, archaeology: 90, law: 70 }, 
            chaptersCount: 8,
            topics: [
                {
                    title: "Первое Путешествие (Деян. 13–14)",
                    details: "Кипр (Проконсул Сергий Павел: эпиграфика). Проповедь в синагогах и языческих городах (Листра, Дервия). Конфликт с иудействующими."
                },
                {
                    title: "Иерусалимский Собор (Деян. 15)",
                    details: "Доктринальное ядро: спасение по вере без обрезания. Анализ четырёх требований Собора (исторический компромисс)."
                },
                {
                    title: "Второе Путешествие: Македония (Деян. 16–17:15)",
                    details: "Филиппы: Павел как римский гражданин. Фессалоники: обвинение в 'нарушении указов кесаря'. Эпиграфика: надписи politarches."
                },
                {
                    title: "Второе Путешествие: Греция (Деян. 17:16–18:22)",
                    details: "Афины и Ареопаг (философский фон: стоики и эпикурейцы). Коринф: надпись Галлиона, датировка. Культурный диалог."
                },
                {
                    title: "Третье Путешествие: Ефес (Деян. 19–20)",
                    details: "Культ Артемиды Ефесской: археология. Экономический конфликт (Деметрий). Роль римской администрации. Прощальная речь в Милете."
                }
            ],
            analysis: "Самый богатый <strong>Археологический</strong> и <strong>Исторический</strong> модуль. Требует изучения карты и контекста городов (Коринф, Ефес)."
        },
        {
            id: 3,
            shortTitle: "Модуль IV",
            title: "Модуль IV: Арест, Рим и Итоги",
            range: "Деян. 21–28",
            description: "Заключительный, короткий блок (½). Судебные процессы над Павлом, его апелляция, путешествие в Рим. **Включает финальный обзор и экзамен.**",
            color: "rgb(71, 85, 105)", // slate-600
            profile: { history: 85, theology: 50, archaeology: 40, law: 95 }, 
            chaptersCount: 8,
            topics: [
                {
                    title: "Арест и Конфликт (Деян. 21–23)",
                    details: "Обвинение в осквернении Храма. Использование Павлом римского гражданства. Защитные речи перед Синедрионом."
                },
                {
                    title: "Суды в Кесарии (Деян. 24–26)",
                    details: "Прокураторы Феликс и Фест: исторические свидетельства. Юридический казус: lex maiestatis. **Апелляция к Цезарю (provocatio ad Caesarem)**."
                },
                {
                    title: "Путь в Рим (Деян. 27)",
                    details: "Географический и навигационный анализ маршрута (Мальта, Крит). Римская морская логистика."
                },
                {
                    title: "Финал Книги (Деян. 28)",
                    details: "Прибытие в Рим. Богословский смысл 'двух лет'. Литературный прием открытого финала."
                },
                {
                    title: "Обзор, Дополнение и Экзамен (½)",
                    details: "**Специальная лекция:** 'Влияние Деяний на современное право и миссиологию'. Итоговое сравнение теологии Деяний и Посланий Павла. Финальное тестирование."
                }
            ],
            analysis: "Доминанта <strong>Римского Права</strong>. Необходимо понимать судебную процедуру провинций и её влияние на судьбу Павла."
        }
    ]
};

// --- State Management ---
let currentState = {
    activeModuleId: 0
};

let radarChartInstance = null;
let barChartInstance = null;

// --- Page Navigation Functions ---

function showHomePage() {
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('modules-page').classList.add('hidden');
    updateNavActive('home');
}

function showModulesPage() {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('modules-page').classList.remove('hidden');
    updateNavActive('modules');
}

function updateNavActive(page) {
    // No home button in nav anymore, logo is the home button
    // Clear all active states when on home page
    if (page === 'home') {
        clearNavActiveState();
    } else if (page === 'modules') {
        updateNavActiveState();
    }
}

function clearNavActiveState() {
    // Remove active state from all navigation buttons
    const container = document.getElementById('nav-container');
    const buttons = Array.from(container.querySelectorAll('button'));
    buttons.forEach(btn => {
        btn.classList.remove('active-nav');
    });
}

function updateNavActiveState() {
    // Update active state for module buttons
    const container = document.getElementById('nav-container');
    const buttons = Array.from(container.querySelectorAll('button'));
    buttons.forEach((btn, index) => {
        if (index === currentState.activeModuleId) {
            btn.classList.add('active-nav');
        } else {
            btn.classList.remove('active-nav');
        }
    });
}

// Make functions globally available (will be set after function declarations)
window.showHomePage = showHomePage;
window.showModulesPage = showModulesPage;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    renderNav();
    initCharts();

    // Mobile menu toggle
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });
    
    // Show home page by default
    showHomePage();
});

// --- Render Functions ---

function renderHomePage() {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';

    courseData.modules.forEach(mod => {
        const card = document.createElement('div');
        card.className = 'module-card';
        card.onclick = () => {
            showModulesPage();
            loadModule(mod.id);
        };
        
        card.innerHTML = `
            <div class="module-card-number">${mod.id + 1}</div>
            <h3 class="module-card-title">${mod.title}</h3>
            <div class="module-card-range">${mod.range}</div>
            <p class="module-card-description">${mod.description}</p>
        `;
        
        grid.appendChild(card);
    });

    // Additional cards
    const additionalCards = [
        {
            icon: '📖',
            title: 'Дополнительный материал',
            description: 'Дополнительные ресурсы, статьи и материалы для углубленного изучения'
        },
        {
            icon: '🗺️',
            title: 'Карты путешествий Павла',
            description: 'Интерактивные карты миссионерских путешествий апостола Павла'
        }
    ];

    additionalCards.forEach(cardData => {
        const card = document.createElement('div');
        card.className = 'module-card';
        // No onclick handler - cards don't lead anywhere yet
        
        card.innerHTML = `
            <div class="module-card-icon">${cardData.icon}</div>
            <h3 class="module-card-title">${cardData.title}</h3>
            <p class="module-card-description">${cardData.description}</p>
        `;
        
        grid.appendChild(card);
    });
}

function renderNav() {
    const container = document.getElementById('nav-container');
    const mobileContainer = document.getElementById('mobile-nav-container');
    
    // Clear all buttons
    container.innerHTML = '';
    mobileContainer.innerHTML = '';

    courseData.modules.forEach(mod => {
        // Desktop
        const btn = document.createElement('button');
        btn.className = `px-3 py-2 rounded-md text-sm font-medium transition-colors nav-link ${currentState.activeModuleId === mod.id ? 'active-nav' : ''}`;
        btn.textContent = mod.shortTitle;
        btn.onclick = () => {
            showModulesPage();
            loadModule(mod.id);
        };
        container.appendChild(btn);

        // Mobile
        const mobBtn = document.createElement('button');
        mobBtn.className = "block px-3 py-2 rounded-md text-base font-medium cursor-pointer mobile-nav-link";
        mobBtn.textContent = mod.shortTitle;
        mobBtn.onclick = () => {
            showModulesPage();
            loadModule(mod.id);
            document.getElementById('mobile-menu').classList.add('hidden');
        };
        mobileContainer.appendChild(mobBtn);
    });
}

function loadModule(id) {
    currentState.activeModuleId = id;
    const data = courseData.modules[id];

    // Show modules page if not already shown
    if (document.getElementById('modules-page').classList.contains('hidden')) {
        showModulesPage();
    }

    // Update UI Text
    document.getElementById('module-title').textContent = data.title;
    document.getElementById('module-desc').textContent = data.description;
    document.getElementById('profile-analysis').innerHTML = data.analysis;

    // Update Nav State - update active state without full re-render
    updateNavActiveState();

    // Render Syllabus List
    const listContainer = document.getElementById('syllabus-list');
    listContainer.innerHTML = '';
    
    data.topics.forEach((topic, index) => {
        const item = document.createElement('div');
        item.className = "bg-white border border-stone-200 rounded-lg overflow-hidden card-hover transition-all duration-300";
        item.innerHTML = `
            <button class="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center bg-stone-50 hover:bg-stone-100" onclick="toggleAccordion(${index})">
                <span class="font-bold text-lg text-stone-800">${index + 1}. ${topic.title}</span>
                <span id="icon-${index}" class="text-stone-400 text-xl transform transition-transform">▼</span>
            </button>
            <div id="content-${index}" class="hidden px-6 py-4 bg-white text-stone-600 border-t border-stone-100">
                <p class="mb-2">${topic.details}</p>
                <div class="mt-3 flex gap-2">
                     <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Ключевая тема</span>
                </div>
            </div>
        `;
        listContainer.appendChild(item);
    });

    // Update Charts
    updateCharts(data);
}

function toggleAccordion(index) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Make additional functions globally available
window.loadModule = loadModule;
window.toggleAccordion = toggleAccordion;

// --- Chart Logic ---

function initCharts() {
    // Radar Chart
    const ctxRadar = document.getElementById('radarChart').getContext('2d');
    radarChartInstance = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['История', 'Теология', 'Археология', 'Римское Право'],
            datasets: [{
                label: 'Уровень фокуса',
                data: [0, 0, 0, 0],
                backgroundColor: 'rgba(185, 28, 28, 0.2)',
                borderColor: 'rgba(185, 28, 28, 0.8)',
                pointBackgroundColor: 'rgba(185, 28, 28, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#e7e5e4' },
                    grid: { color: '#e7e5e4' },
                    pointLabels: {
                        font: { size: 12, family: "'Noto Sans', sans-serif" },
                        color: '#44403c'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false } // hide numbers for cleaner look
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Bar Chart
    const ctxBar = document.getElementById('barChart').getContext('2d');
    barChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: courseData.modules.map(m => m.shortTitle),
            datasets: [{
                label: 'Глав в модуле',
                data: courseData.modules.map(m => m.chaptersCount),
                backgroundColor: courseData.modules.map(m => m.id === 0 ? 'rgba(185, 28, 28, 0.8)' : '#e7e5e4'),
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { display: false }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function updateCharts(data) {
    // Update Radar
    radarChartInstance.data.datasets[0].data = [
        data.profile.history,
        data.profile.theology,
        data.profile.archaeology,
        data.profile.law
    ];
    
    // Update Radar appearance based on the active module color
    const moduleColorRgb = data.color.match(/\d+/g); // Extract R, G, B components
    const rgbaPrimary = `rgba(${moduleColorRgb[0]}, ${moduleColorRgb[1]}, ${moduleColorRgb[2]}, 0.8)`;
    const rgbaBackground = `rgba(${moduleColorRgb[0]}, ${moduleColorRgb[1]}, ${moduleColorRgb[2]}, 0.2)`;

    radarChartInstance.data.datasets[0].borderColor = rgbaPrimary;
    radarChartInstance.data.datasets[0].backgroundColor = rgbaBackground;
    radarChartInstance.data.datasets[0].pointBackgroundColor = rgbaPrimary.replace('0.8', '1');
    
    radarChartInstance.update();

    // Update Bar Color Highlight
    const colors = courseData.modules.map(m => 
        m.id === data.id ? rgbaPrimary : '#e7e5e4'
    );
    barChartInstance.data.datasets[0].backgroundColor = colors;
    barChartInstance.update();
}

