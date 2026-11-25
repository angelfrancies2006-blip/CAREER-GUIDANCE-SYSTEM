/* ===================================================================
   CAREER GUIDANCE SYSTEM - CAREER EXPLORATION JAVASCRIPT (careers.js)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('career-search-input');
  const sortSelect = document.getElementById('sort-select');
  const pillsContainer = document.getElementById('category-pills');
  const resultsGrid = document.getElementById('careers-directory-grid');
  const resultsCountText = document.getElementById('results-count-text');

  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'featured';

  // Read URL query parameter for category if navigated from Homepage/Dashboard
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  if (paramCategory) {
    activeCategory = paramCategory.toLowerCase();
  }

  // Update counts on filter pills
  updateCategoryPillCounts();

  // Set active pill
  activatePill(activeCategory);

  // Initial Render
  renderFilteredCareers();

  // Search input handler with debounce
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderFilteredCareers();
    });
  }

  // Sort select handler
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderFilteredCareers();
    });
  }

  // Pill click handlers
  if (pillsContainer) {
    pillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      const category = pill.getAttribute('data-category');
      if (category) {
        activeCategory = category;
        activatePill(category);
        renderFilteredCareers();
      }
    });
  }

  function activatePill(catSlug) {
    const pills = document.querySelectorAll('.filter-pill');
    let matched = false;
    pills.forEach(p => {
      if (p.getAttribute('data-category') === catSlug) {
        p.classList.add('active');
        matched = true;
      } else {
        p.classList.remove('active');
      }
    });
    if (!matched) {
      // Fallback to all
      const allPill = document.querySelector('[data-category="all"]');
      if (allPill) allPill.classList.add('active');
      activeCategory = 'all';
    }
  }

  function updateCategoryPillCounts() {
    const totalCount = CAREER_DATABASE.length;
    const countAllEl = document.getElementById('count-all');
    if (countAllEl) countAllEl.textContent = totalCount;

    const slugs = ['it', 'healthcare', 'engineering', 'business', 'arts', 'government', 'science'];
    slugs.forEach(slug => {
      const el = document.getElementById(`count-${slug}`);
      if (el) {
        const c = CAREER_DATABASE.filter(item => item.categorySlug === slug).length;
        el.textContent = c;
      }
    });
  }

  function renderFilteredCareers() {
    let filtered = CAREER_DATABASE.filter(item => {
      // Category filter
      const matchesCategory = (activeCategory === 'all') || (item.categorySlug === activeCategory);

      // Search filter
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery) ||
        item.shortDesc.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.skills.some(s => s.toLowerCase().includes(searchQuery)) ||
        item.qualifications.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (sortBy === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'za') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'category') {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    // Update count text
    if (resultsCountText) {
      if (filtered.length === 0) {
        resultsCountText.textContent = `No careers found matching your criteria`;
      } else if (activeCategory === 'all' && !searchQuery) {
        resultsCountText.textContent = `Showing all ${filtered.length} curated career pathways`;
      } else {
        resultsCountText.textContent = `Showing ${filtered.length} career${filtered.length === 1 ? '' : 's'} found`;
      }
    }

    // Render cards
    if (filtered.length === 0) {
      resultsGrid.innerHTML = `
        <div class="empty-state-box" style="grid-column: 1 / -1; padding: 50px 20px;">
          <i data-lucide="search-x" style="width: 52px; height: 52px; color: var(--text-light); margin-bottom: 14px;"></i>
          <h3 style="font-size: 1.3rem; color: var(--primary); margin-bottom: 8px;">No Careers Found</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 20px;">
            We couldn't find any career profiles matching "${searchQuery}". Try searching with different keywords like "Code", "Doctor", "Engineer", "Design", or "Manager".
          </p>
          <button class="btn btn-secondary btn-sm" onclick="resetCareerFilters()">Clear Search & Reset Filters</button>
        </div>
      `;
    } else {
      resultsGrid.innerHTML = filtered.map(c => `
        <div class="career-card">
          <div class="career-card-top">
            <span class="career-meta-badge badge-secondary">${c.category}</span>
            <button class="btn-bookmark ${isCareerSaved(c.id) ? 'bookmarked' : ''}" data-save-id="${c.id}" onclick="handleExploreSaveToggle('${c.id}')" title="${isCareerSaved(c.id) ? 'Remove Bookmark' : 'Save Career'}">
              <i data-lucide="${isCareerSaved(c.id) ? 'bookmark-check' : 'bookmark'}"></i>
            </button>
          </div>
          <h3 class="career-title">${c.title}</h3>
          <p class="career-desc">${c.shortDesc}</p>

          <div class="career-info-group">
            <div class="career-info-label"><i data-lucide="graduation-cap" style="width: 14px; height: 14px;"></i> Required Qualifications</div>
            <div class="career-info-text">${c.qualifications}</div>
          </div>

          <div class="career-info-group">
            <div class="career-info-label"><i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> Career Opportunities</div>
            <div class="career-info-text">${c.opportunities}</div>
          </div>

          <div class="career-info-group">
            <div class="career-info-label"><i data-lucide="book" style="width: 14px; height: 14px;"></i> Relevant Courses</div>
            <div class="career-info-text" style="font-size: 0.85rem; color: var(--text-muted);">${c.courses.slice(0, 2).join(' • ')}</div>
          </div>

          <div class="career-skills-tags">
            ${c.skills.slice(0, 4).map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>

          <div class="career-card-footer">
            <div class="salary-tag">
              <span>Avg. Compensation</span>
              <span>${c.averageSalary}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="openCareerModal('${c.id}')">
              <span>View Details</span>
              <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  window.handleExploreSaveToggle = function(careerId) {
    toggleSaveCareer(careerId);
    renderFilteredCareers();
  };

  window.resetCareerFilters = function() {
    searchQuery = '';
    activeCategory = 'all';
    if (searchInput) searchInput.value = '';
    activatePill('all');
    renderFilteredCareers();
  };
});
