/* ===================================================================
   CAREER GUIDANCE SYSTEM - STUDENT DASHBOARD JAVASCRIPT (dashboard.js)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure user is logged in for dashboard view
  let user = getCurrentUser();

  // If no user is logged in, auto-login with default demo student for convenience
  if (!user) {
    user = DEFAULT_DEMO_USER;
    setCurrentUser(user);
    showToast('info', 'Demo Mode', 'Logged in as Demo Student (Alex Morgan).');
  }

  renderStudentProfile(user);
  renderAssessmentBanner(user);
  renderRecommendedCareers(user);
  renderSavedCareers(user);
  setupEditProfileModal(user);

  if (window.lucide) lucide.createIcons();
});

// Render Student Profile & Education Data
function renderStudentProfile(user) {
  if (!user) return;

  const initials = user.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'ST';

  const avatarEl = document.getElementById('dash-avatar-letter');
  if (avatarEl) avatarEl.textContent = initials;

  const welcomeNameEl = document.getElementById('dash-welcome-name');
  if (welcomeNameEl) welcomeNameEl.textContent = `Welcome, ${user.fullName || 'Student'}! 👋`;

  const eduSummaryEl = document.getElementById('dash-education-summary');
  if (eduSummaryEl) {
    eduSummaryEl.textContent = `${user.educationLevel || 'Student'} • ${user.institution || 'Enrolled Academic Institution'}`;
  }

  // Profile Details
  setText('profile-fullname', user.fullName);
  setText('profile-email', user.email);
  setText('profile-phone', user.phone || 'Not provided');
  setText('profile-username', user.username || '@student');
  setText('profile-dob', user.dob || 'Not provided');
  setText('profile-gender', user.gender || 'Not specified');

  // Educational Details
  setText('profile-edu-level', user.educationLevel || 'Undergraduate');
  setText('profile-qualification', user.qualification || 'Higher Secondary / Degree');
  setText('profile-institution', user.institution || 'Academic Institution');
  setText('profile-stream', user.stream || 'General Studies');
  setText('profile-year', user.yearOfCompletion || '2026');

  const badgeEl = document.getElementById('profile-level-badge');
  if (badgeEl && user.educationLevel) {
    badgeEl.textContent = user.educationLevel;
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '-';
}

// Render Assessment Status Banner
function renderAssessmentBanner(user) {
  const banner = document.getElementById('dash-assessment-banner');
  if (!banner) return;

  if (user && user.assessmentResult) {
    const res = user.assessmentResult;
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--secondary); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
          <i data-lucide="check-circle-2"></i>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="badge badge-success">Assessment Completed</span>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Match Score: <strong>${res.score || '94%'}</strong></span>
          </div>
          <h3 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 2px;">
            Top Recommended Pathway: <span style="color: var(--secondary);">${res.topCategory || 'Information Technology'}</span>
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            Based on your answers, you possess strong analytical and problem-solving aptitude.
          </p>
        </div>
      </div>
      <div style="display: flex; gap: 10px;">
        <a href="assessment.html" class="btn btn-outline btn-sm">Retake Assessment</a>
        <a href="careers.html?category=${getCategorySlug(res.topCategory)}" class="btn btn-secondary btn-sm">
          <span>View Matched Careers</span>
          <i data-lucide="arrow-right"></i>
        </a>
      </div>
    `;
  } else {
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--accent); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
          <i data-lucide="help-circle"></i>
        </div>
        <div>
          <span class="badge badge-accent" style="margin-bottom: 4px;">Interest Assessment Pending</span>
          <h3 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 2px;">
            Discover Your True Career Calling
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            Take our 8-question career interest questionnaire to unlock personalized career matches.
          </p>
        </div>
      </div>
      <div>
        <a href="assessment.html" class="btn btn-accent btn-sm">
          <i data-lucide="sparkles"></i> Take 3-Min Assessment
        </a>
      </div>
    `;
  }
}

function getCategorySlug(categoryName) {
  if (!categoryName) return 'it';
  const match = CAREER_CATEGORIES.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
  return match ? match.slug : 'it';
}

// Render Recommended Careers
function renderRecommendedCareers(user) {
  const container = document.getElementById('recommended-careers-grid');
  const countBadge = document.getElementById('recommended-count-badge');
  if (!container) return;

  let matchedCategory = "Information Technology";
  if (user && user.assessmentResult && user.assessmentResult.topCategory) {
    matchedCategory = user.assessmentResult.topCategory;
  } else if (user && user.stream) {
    const stream = user.stream.toLowerCase();
    if (stream.includes('med') || stream.includes('bio') || stream.includes('health')) {
      matchedCategory = "Healthcare";
    } else if (stream.includes('comm') || stream.includes('biz') || stream.includes('manage') || stream.includes('econ')) {
      matchedCategory = "Business and Management";
    } else if (stream.includes('art') || stream.includes('design')) {
      matchedCategory = "Arts and Design";
    } else if (stream.includes('eng') || stream.includes('mech') || stream.includes('civil')) {
      matchedCategory = "Engineering";
    }
  }

  // Filter recommendations matching the primary category, plus 1 cross-sector recommendation
  let recommendations = CAREER_DATABASE.filter(c => c.category === matchedCategory);
  if (recommendations.length < 3) {
    const remaining = CAREER_DATABASE.filter(c => c.category !== matchedCategory);
    recommendations = recommendations.concat(remaining.slice(0, 3 - recommendations.length));
  }

  if (countBadge) countBadge.textContent = recommendations.length.toString();

  container.innerHTML = recommendations.map(c => createDashboardCareerCard(c)).join('');
}

// Render Saved Careers
function renderSavedCareers(user) {
  const container = document.getElementById('saved-careers-grid');
  const countBadge = document.getElementById('saved-count-badge');
  if (!container) return;

  const savedIds = (user && user.savedCareers) ? user.savedCareers : [];
  if (countBadge) countBadge.textContent = savedIds.length.toString();

  if (savedIds.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <i data-lucide="bookmark-minus" style="width: 48px; height: 48px; color: var(--text-light); margin-bottom: 12px;"></i>
        <h3 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 8px;">No Saved Careers Yet</h3>
        <p style="color: var(--text-muted); font-size: 0.92rem; max-width: 450px; margin: 0 auto 20px;">
          You haven't bookmarked any careers yet. Browse our comprehensive career directory and click the bookmark icon to save careers here.
        </p>
        <a href="careers.html" class="btn btn-primary btn-sm">Explore Careers Now</a>
      </div>
    `;
    return;
  }

  const savedList = CAREER_DATABASE.filter(c => savedIds.includes(c.id));
  container.innerHTML = savedList.map(c => createDashboardCareerCard(c, true)).join('');
}

// Career Card Template for Dashboard
function createDashboardCareerCard(career, isSavedView = false) {
  const isSaved = isCareerSaved(career.id);

  return `
    <div class="career-card">
      <div class="career-card-top">
        <span class="career-meta-badge badge-secondary">${career.category}</span>
        <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" data-save-id="${career.id}" onclick="handleDashboardSaveToggle('${career.id}')" title="${isSaved ? 'Remove Bookmark' : 'Save Career'}">
          <i data-lucide="${isSaved ? 'bookmark-check' : 'bookmark'}"></i>
        </button>
      </div>
      <h3 class="career-title">${career.title}</h3>
      <p class="career-desc">${career.shortDesc}</p>
      
      <div class="career-info-group">
        <div class="career-info-label"><i data-lucide="graduation-cap" style="width: 14px; height: 14px;"></i> Required Degree</div>
        <div class="career-info-text">${career.qualifications}</div>
      </div>

      <div class="career-skills-tags">
        ${career.skills.slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>

      <div class="career-card-footer">
        <div class="salary-tag">
          <span>Avg. Salary</span>
          <span>${career.averageSalary.split('/')[0]}</span>
        </div>
        <button class="btn btn-outline btn-sm" onclick="openCareerModal('${career.id}')">
          <span>View Details</span>
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    </div>
  `;
}

// Save toggle within dashboard
window.handleDashboardSaveToggle = function(careerId) {
  toggleSaveCareer(careerId);
  const updatedUser = getCurrentUser();
  renderSavedCareers(updatedUser);
  renderRecommendedCareers(updatedUser);
  if (window.lucide) lucide.createIcons();
};

// Switch Tabs
window.switchDashboardTab = function(tabName) {
  const btnRec = document.getElementById('tab-btn-recommended');
  const btnSaved = document.getElementById('tab-btn-saved');
  const secRec = document.getElementById('tab-content-recommended');
  const secSaved = document.getElementById('tab-content-saved');

  if (tabName === 'recommended') {
    btnRec.classList.add('active');
    btnSaved.classList.remove('active');
    secRec.style.display = 'block';
    secSaved.style.display = 'none';
  } else {
    btnSaved.classList.add('active');
    btnRec.classList.remove('active');
    secSaved.style.display = 'block';
    secRec.style.display = 'none';
  }
};

// Setup Edit Profile Modal
function setupEditProfileModal(user) {
  const modal = document.getElementById('edit-profile-modal');
  const openBtn1 = document.getElementById('btn-open-edit-modal');
  const openBtn2 = document.getElementById('btn-edit-profile-trigger');
  const closeBtn = document.getElementById('modal-close-edit');
  const cancelBtn = document.getElementById('btn-cancel-edit');
  const saveBtn = document.getElementById('btn-save-profile');

  function openModal() {
    const cur = getCurrentUser() || user;
    document.getElementById('edit-fullname').value = cur.fullName || '';
    document.getElementById('edit-phone').value = cur.phone || '';
    document.getElementById('edit-edulevel').value = cur.educationLevel || 'Undergraduate';
    document.getElementById('edit-qualification').value = cur.qualification || '';
    document.getElementById('edit-institution').value = cur.institution || '';
    document.getElementById('edit-stream').value = cur.stream || '';
    document.getElementById('edit-year').value = cur.yearOfCompletion || '2026';

    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  if (openBtn1) openBtn1.addEventListener('click', openModal);
  if (openBtn2) openBtn2.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const cur = getCurrentUser() || user;
      cur.fullName = document.getElementById('edit-fullname').value.trim();
      cur.phone = document.getElementById('edit-phone').value.trim();
      cur.educationLevel = document.getElementById('edit-edulevel').value;
      cur.qualification = document.getElementById('edit-qualification').value.trim();
      cur.institution = document.getElementById('edit-institution').value.trim();
      cur.stream = document.getElementById('edit-stream').value.trim();
      cur.yearOfCompletion = document.getElementById('edit-year').value.trim();

      setCurrentUser(cur);
      closeModal();
      renderStudentProfile(cur);
      renderRecommendedCareers(cur);
      showToast('success', 'Profile Updated!', 'Your student details have been successfully updated.');
    });
  }
}
