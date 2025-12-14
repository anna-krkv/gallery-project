
function filterPhotos(selectedTags) {
  return photos.filter(photo => {
    // Фото показываем, если у него есть хотя бы один выбранный тег
    return selectedTags.length === 0 || 
           selectedTags.some(tag => photo.tags.includes(tag));
  });
}

// Сохраняем выбранные теги в URL
function updateURL(tags) {
  const params = new URLSearchParams(window.location.search);
  params.set('tags', tags.join(','));
  window.history.replaceState({}, '', `?${params.toString()}`);
}

// При загрузке читаем из URL
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const tags = params.get('tags') ? params.get('tags').split(',') : [];
  return tags;
}


document.addEventListener('DOMContentLoaded', function() {
    // 1. Загружаем данные
    const photos =  [
  
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
  
]; // массив фото
    
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
    
    // 4. Показываем все фото
    renderPhotos(photos);
    setupModal();
    
    // 5. Добавляем обработчики кликов на теги
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });
    
    // 6. Кнопка сброса
    document.getElementById('clear-filters').addEventListener('click', function() {
        document.querySelectorAll('.tag-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
        applyFilters();
    });
    
    function applyFilters() {
        // Получаем выбранные теги
        const selectedTags = Array.from(document.querySelectorAll('.tag-btn.active'))
            .map(btn => btn.dataset.tag);
        
        // Фильтруем фото
        const filtered = selectedTags.length === 0 
            ? photos 
            : photos.filter(p => p.tags.some(tag => selectedTags.includes(tag)));
        
        // Показываем результат
        renderPhotos(filtered);
        
        // Сохраняем в URL
        updateURL(selectedTags);
    }
    
    function renderPhotos(photosToShow) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        
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
    }
    
    function updateURL(tags) {
        // Реализация выше
    }
});



function setupModal() {
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalTags = document.querySelector('.modal-tags');
    const closeBtn = document.querySelector('.close');
    
    document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            const tags = this.querySelectorAll('.photo-tags span');
            
            modalImage.src = img.src;
            modalTitle.textContent = title;
            modalTags.innerHTML = Array.from(tags).map(t => t.outerHTML).join('');
            
            modal.classList.remove('hidden');
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}