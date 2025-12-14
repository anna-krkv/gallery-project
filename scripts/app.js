
document.addEventListener('DOMContentLoaded', function() {
    // 1. Данные фотографий 
    const photos = [
        {
    id: 1,
    url: 'images/1.jpeg',
    title: 'Город ночью',
    tags: ['город', 'ночь', 'архитектура'],
    category: 'архитектура'
  },
  {
    id: 2,
    url: 'images/2.jpg',
    title: 'Горный пейзаж',
    tags: ['природа', 'горы', 'пейзаж'],
    category: 'пейзаж'
  },
  {
    id: 3,
    url: 'images/3.avif',
    title: 'Морской берег',
    tags: ['море', 'пляж', 'отдых'],
    category: 'пейзаж'
  },
  {
    id: 4,
    url: 'images/4.avif',
    title: 'Лесная тропа',
    tags: ['лес', 'природа', 'тропа'],
    category: 'природа'
  },
  {
    id: 5,
    url: 'images/5.avif',
    title: 'Старый мост',
    tags: ['архитектура', 'мост', 'история'],
    category: 'архитектура'
  },
  {
    id: 6,
    url: 'images/6.avif',
    title: 'Зимний лес',
    tags: ['зима', 'снег', 'лес'],
    category: 'природа'
  },
  {
    id: 7,
    url: 'images/7.avif',
    title: 'Современный небоскреб',
    tags: ['город', 'архитектура', 'современность'],
    category: 'архитектура'
  },
  {
    id: 8,
    url: 'images/8.avif',
    title: 'Пустынный пейзаж',
    tags: ['пустыня', 'песок', 'природа'],
    category: 'пейзаж'
  },
  {
    id: 9,
    url: 'images/9.avif',
    title: 'Церковный купол',
    tags: ['архитектура', 'религия', 'история'],
    category: 'архитектура'
  },
  {
    id: 10,
    url: 'images/10.avif',
    title: 'Водопад в горах',
    tags: ['вода', 'горы', 'природа'],
    category: 'пейзаж'
  },
  {
    id: 11,
    url: 'images/11.avif',
    title: 'Уличное кафе',
    tags: ['город', 'кафе', 'улица'],
    category: 'город'
  },
  {
    id: 12,
    url: 'images/12.avif',
    title: 'Осенний парк',
    tags: ['осень', 'листья', 'парк'],
    category: 'природа'
  },
  {
    id: 13,
    url: 'images/13.avif',
    title: 'Стеклянный фасад',
    tags: ['архитектура', 'стекло', 'современность'],
    category: 'архитектура'
  },
  {
    id: 14,
    url: 'images/14.avif',
    title: 'Городской парк',
    tags: ['город', 'парк', 'отдых'],
    category: 'город'
  },
  {
    id: 15,
    url: 'images/15.avif',
    title: 'Скалистый берег',
    tags: ['море', 'скалы', 'природа'],
    category: 'пейзаж'
  },
  {
    id: 16,
    url: 'images/16.avif',
    title: 'Историческая площадь',
    tags: ['город', 'история', 'архитектура'],
    category: 'архитектура'
  },
  {
    id: 17,
    url: 'images/17.avif',
    title: 'Цветущее поле',
    tags: ['цветы', 'поле', 'природа'],
    category: 'природа'
  },
  {
    id: 18,
    url: 'images/18.avif',
    title: 'Ночная набережная',
    tags: ['город', 'ночь', 'вода'],
    category: 'город'
  },
  {
    id: 19,
    url: 'images/19.avif',
    title: 'Древний замок',
    tags: ['архитектура', 'история', 'замок'],
    category: 'архитектура'
  },
  {
    id: 20,
    url: 'images/20.avif',
    title: 'Туманное утро',
    tags: ['туман', 'утро', 'пейзаж'],
    category: 'пейзаж'
  }
    ];
    
    // 2. Получаем все уникальные теги
    const allTags = [...new Set(photos.flatMap(p => p.tags))];
    
    // 3. Создаем кнопки фильтров
    const tagsContainer = document.querySelector('.tags-container');
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-btn';
        button.textContent = `#${tag}`;
        button.dataset.tag = tag;
        tagsContainer.appendChild(button);
    });
    
    // 4. Функция рендера фото
    function renderPhotos(photosToShow) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        
        if (photosToShow.length === 0) {
            gallery.innerHTML = `
                <div class="no-results">
                    <p>Фотографий по выбранным тегам не найдено</p>
                    <p>Попробуйте другие фильтры</p>
                </div>
            `;
            return;
        }
        
        photosToShow.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'photo-item';
            item.innerHTML = `
                <img src="${photo.url}" alt="${photo.title}" loading="lazy">
                <div class="photo-overlay">
                    <h4>${photo.title}</h4>
                    <div class="photo-tags">
                        ${photo.tags.map(t => `<span>#${t}</span>`).join('')}
                    </div>
                </div>
            `;
            gallery.appendChild(item);
        });
        
        // Обновляем счетчик
        updateCounter(photosToShow.length);
    }
    
    // 5. Функция обновления счетчика
    function updateCounter(count) {
        let counter = document.querySelector('.photos-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'photos-counter';
            document.querySelector('.filters').appendChild(counter);
        }
        counter.textContent = `Найдено фотографий: ${count}`;
    }
    
    // 6. Функция применения фильтров
    function applyFilters() {
        const selectedTags = Array.from(document.querySelectorAll('.tag-btn.active'))
            .map(btn => btn.dataset.tag);
        
        const filtered = selectedTags.length === 0 
            ? photos 
            : photos.filter(p => p.tags.some(tag => selectedTags.includes(tag)));
        
        renderPhotos(filtered);
        updateURL(selectedTags);
    }
    
    // 7. Функция обновления URL
    function updateURL(tags) {
        const params = new URLSearchParams(window.location.search);
        
        if (tags.length > 0) {
            params.set('tags', tags.join(','));
        } else {
            params.delete('tags');
        }
        
        // Создаем новую историю без перезагрузки страницы
        const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
        window.history.replaceState({}, '', newURL);
        
        // Добавляем в заголовок для удобства
        updateTitle(tags);
    }
    
    // 8. Функция обновления заголовка вкладки
    function updateTitle(tags) {
        if (tags.length > 0) {
            document.title = `Фотогалерея | Фильтры: ${tags.join(', ')}`;
        } else {
            document.title = 'Фотогалерея | Все фото';
        }
    }
    
    // 9. Функция загрузки фильтров из URL
    function loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        const tagsParam = params.get('tags');
        
        if (tagsParam) {
            return tagsParam.split(',');
        }
        return [];
    }
    
    // 10. Функция восстановления фильтров из URL
    function restoreFiltersFromURL() {
        const savedTags = loadFiltersFromURL();
        
        if (savedTags.length > 0) {
            // Активируем соответствующие кнопки
            document.querySelectorAll('.tag-btn').forEach(btn => {
                if (savedTags.includes(btn.dataset.tag)) {
                    btn.classList.add('active');
                }
            });
            applyFilters(); // Применяем фильтры
        } else {
            renderPhotos(photos); // Показываем все фото
        }
        
        updateTitle(savedTags);
    }
    
    // 11. Функция настройки модального окна
    function setupModal() {
        const modal = document.querySelector('.modal');
        const modalImage = document.querySelector('.modal-image');
        const modalTitle = document.querySelector('.modal-title');
        const modalTags = document.querySelector('.modal-tags');
        const closeBtn = document.querySelector('.close');
        
        // Делегирование событий для динамических элементов
        document.querySelector('.gallery').addEventListener('click', function(e) {
            const photoItem = e.target.closest('.photo-item');
            if (!photoItem) return;
            
            const img = photoItem.querySelector('img');
            const title = photoItem.querySelector('h4').textContent;
            const tags = photoItem.querySelectorAll('.photo-tags span');
            
            modalImage.src = img.src;
            modalTitle.textContent = title;
            modalTags.innerHTML = Array.from(tags).map(t => t.outerHTML).join('');
            
            modal.classList.remove('hidden');
        });
        
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
        
        // Закрытие по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
    
    // 12. Функция копирования URL с фильтрами
    function setupShareButton() {
        const shareBtn = document.createElement('button');
        shareBtn.id = 'share-url';
        shareBtn.textContent = 'Копировать ссылку с фильтрами';
        shareBtn.className = 'share-btn';
        
        document.querySelector('.filters').appendChild(shareBtn);
        
        shareBtn.addEventListener('click', function() {
            const currentURL = window.location.href;
            
            navigator.clipboard.writeText(currentURL).then(() => {
                const originalText = shareBtn.textContent;
                shareBtn.textContent = 'Ссылка скопирована!';
                shareBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    shareBtn.textContent = originalText;
                    shareBtn.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                shareBtn.textContent = 'Ошибка копирования';
                setTimeout(() => {
                    shareBtn.textContent = 'Копировать ссылку с фильтрами';
                }, 2000);
            });
        });
    }
    
    // 13. Инициализация при загрузке страницы
    function init() {
        // Восстанавливаем фильтры из URL
        restoreFiltersFromURL();
        
        // Настраиваем модальное окно
        setupModal();
        
        // Добавляем кнопку "Поделиться"
        setupShareButton();
        
        // Обработчики для кнопок тегов
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                applyFilters();
            });
        });
        
        // Кнопка сброса фильтров
        document.getElementById('clear-filters').addEventListener('click', function() {
            document.querySelectorAll('.tag-btn.active').forEach(btn => {
                btn.classList.remove('active');
            });
            applyFilters();
        });
    }
    
    // Запускаем инициализацию
    init();
});