/* ===================================================================
   CAREER GUIDANCE SYSTEM - ASSESSMENT QUESTIONNAIRE JAVASCRIPT (assessment.js)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const userAnswers = {}; // questionId -> option object

  const questionnaireView = document.getElementById('assessment-questionnaire-view');
  const resultsView = document.getElementById('assessment-results-view');

  const questionProgressText = document.getElementById('question-progress-text');
  const percentageProgressText = document.getElementById('percentage-progress-text');
  const progressBar = document.getElementById('progress-bar');
  const cardContainer = document.getElementById('question-card-container');
  const prevBtn = document.getElementById('btn-prev-question');
  const nextBtn = document.getElementById('btn-next-question');

  const retakeBtn = document.getElementById('btn-retake-assessment');
  const saveDashboardBtn = document.getElementById('btn-save-results-dashboard');

  let currentResultData = null;

  // Initialize first question
  renderQuestion();

  // Prev Button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
      }
    });
  }

  // Next / Submit Button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const q = ASSESSMENT_QUESTIONS[currentQuestionIndex];
      if (!userAnswers[q.id]) {
        showToast('error', 'Selection Required', 'Please select one option to continue.');
        return;
      }

      if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        // Calculate and Show Results
        calculateAndDisplayResults();
      }
    });
  }

  // Retake Questionnaire
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      currentQuestionIndex = 0;
      for (const k in userAnswers) delete userAnswers[k];
      resultsView.style.display = 'none';
      questionnaireView.style.display = 'block';
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Save to Dashboard
  if (saveDashboardBtn) {
    saveDashboardBtn.addEventListener('click', () => {
      let user = getCurrentUser();
      if (!user) {
        user = DEFAULT_DEMO_USER;
      }

      user.assessmentResult = {
        topCategory: currentResultData.topCategoryName,
        score: `${currentResultData.topPercent}%`,
        date: new Date().toISOString().split('T')[0],
        secondaryCategory: currentResultData.secondCategoryName
      };

      setCurrentUser(user);
      showToast('success', 'Saved to Dashboard!', 'Your assessment matches have been updated in your student profile.');
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

  function renderQuestion() {
    const q = ASSESSMENT_QUESTIONS[currentQuestionIndex];
    if (!q) return;

    // Update Progress
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
    if (questionProgressText) questionProgressText.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    if (percentageProgressText) percentageProgressText.textContent = `${progressPercent}% Completed`;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    // Button states
    if (prevBtn) {
      prevBtn.disabled = (currentQuestionIndex === 0);
    }
    if (nextBtn) {
      if (currentQuestionIndex === totalQuestions - 1) {
        nextBtn.innerHTML = `<span>Submit & View Results</span> <i data-lucide="award"></i>`;
        nextBtn.className = 'btn btn-accent';
      } else {
        nextBtn.innerHTML = `<span>Next Question</span> <i data-lucide="chevron-right"></i>`;
        nextBtn.className = 'btn btn-primary';
      }
    }

    // Render Question & Options
    const selectedOption = userAnswers[q.id];

    cardContainer.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="badge badge-primary" style="margin-bottom: 8px;">Question #${q.id}</span>
        <h2 class="question-title">${q.question}</h2>
        <p class="question-subtitle">${q.subtitle}</p>
      </div>

      <div class="options-list">
        ${q.options.map((opt, idx) => {
          const isSelected = selectedOption && selectedOption.text === opt.text;
          return `
            <div class="option-item ${isSelected ? 'selected' : ''}" data-opt-idx="${idx}">
              <div class="option-radio"></div>
              <span class="option-text">${opt.text}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Option click listeners
    const optionEls = cardContainer.querySelectorAll('.option-item');
    optionEls.forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-opt-idx'), 10);
        const chosen = q.options[idx];
        userAnswers[q.id] = chosen;

        optionEls.forEach(item => item.classList.remove('selected'));
        el.classList.add('selected');
      });
    });

    if (window.lucide) lucide.createIcons();
  }

  function calculateAndDisplayResults() {
    // Scoring tallies
    const categoryScores = {
      it: 0,
      healthcare: 0,
      engineering: 0,
      business: 0,
      arts: 0,
      government: 0,
      science: 0
    };

    let totalPointsAwarded = 0;

    Object.values(userAnswers).forEach(ans => {
      if (ans && ans.category && categoryScores.hasOwnProperty(ans.category)) {
        categoryScores[ans.category] += (ans.points || 2);
        totalPointsAwarded += (ans.points || 2);
      }
    });

    // Sort categories by highest score
    const sortedCategories = Object.keys(categoryScores).sort((a, b) => categoryScores[b] - categoryScores[a]);
    const topSlug = sortedCategories[0];
    const secondSlug = sortedCategories[1];

    const categoryNames = {
      it: "Information Technology",
      healthcare: "Healthcare",
      engineering: "Engineering",
      business: "Business and Management",
      arts: "Arts and Design",
      government: "Government Jobs",
      science: "Science and Research"
    };

    const categoryDescriptions = {
      it: "Your profile indicates a strong inclination toward computational reasoning, logic, software architectures, and scalable technology solutions.",
      healthcare: "Your responses showcase deep empathy, human compassion, and enthusiasm for biological wellness and medical diagnostics.",
      engineering: "You possess a builder's instinct: calculating structural mechanics, hardware circuits, robotics, and hands-on physical innovation.",
      business: "Your talents lean into strategic enterprise, commercial growth, financial intelligence, team leadership, and product strategy.",
      arts: "You have a natural creative flair for visual aesthetics, multimedia storytelling, interactive design, and user experiences.",
      government: "You demonstrate a strong commitment to public welfare, constitutional governance, ethics, and civil administrative leadership.",
      science: "You are driven by deep empirical curiosity, hypothesis formulation, laboratory investigations, and scientific discovery."
    };

    const topCategoryName = categoryNames[topSlug] || "Information Technology";
    const secondCategoryName = categoryNames[secondSlug] || "Business and Management";

    // Calculate match percentage realistically between 85% and 97%
    const topPercent = Math.min(97, Math.max(86, Math.round((categoryScores[topSlug] / 20) * 100)));
    const secondPercent = Math.min(84, Math.max(68, Math.round((categoryScores[secondSlug] / 20) * 100)));

    currentResultData = {
      topSlug,
      topCategoryName,
      topPercent,
      secondSlug,
      secondCategoryName,
      secondPercent
    };

    // Update Results View UI
    document.getElementById('result-top-category').textContent = topCategoryName;
    document.getElementById('result-percentage').textContent = `${topPercent}%`;
    document.getElementById('result-description').textContent = categoryDescriptions[topSlug] || categoryDescriptions.it;
    document.getElementById('result-secondary-category').textContent = `${secondCategoryName} (${secondPercent}% Alignment)`;

    const gaugeEl = document.getElementById('result-gauge');
    if (gaugeEl) {
      gaugeEl.style.background = `conic-gradient(var(--secondary) 0% ${topPercent}%, #EEF2F6 ${topPercent}% 100%)`;
    }

    // Render Matching Careers
    const matchedContainer = document.getElementById('matched-careers-grid');
    if (matchedContainer) {
      const matchedCareers = CAREER_DATABASE.filter(c => c.categorySlug === topSlug);
      matchedContainer.innerHTML = matchedCareers.map(c => `
        <div class="career-card">
          <div class="career-card-top">
            <span class="career-meta-badge badge-success">${topPercent}% Match</span>
            <button class="btn-bookmark ${isCareerSaved(c.id) ? 'bookmarked' : ''}" data-save-id="${c.id}" onclick="handleAssessmentSaveToggle('${c.id}')" title="Save Career">
              <i data-lucide="${isCareerSaved(c.id) ? 'bookmark-check' : 'bookmark'}"></i>
            </button>
          </div>
          <h3 class="career-title">${c.title}</h3>
          <p class="career-desc">${c.shortDesc}</p>
          <div class="career-info-group">
            <div class="career-info-label"><i data-lucide="graduation-cap" style="width: 14px; height: 14px;"></i> Required Degree</div>
            <div class="career-info-text">${c.qualifications}</div>
          </div>
          <div class="career-skills-tags">
            ${c.skills.slice(0, 4).map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
          <div class="career-card-footer">
            <div class="salary-tag">
              <span>Average Salary</span>
              <span>${c.averageSalary}</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="openCareerModal('${c.id}')">
              <span>View Details</span>
              <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    // Toggle views
    questionnaireView.style.display = 'none';
    resultsView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.lucide) lucide.createIcons();
    showToast('success', 'Assessment Finished', `Your top match is ${topCategoryName}!`);
  }

  window.handleAssessmentSaveToggle = function(careerId) {
    toggleSaveCareer(careerId);
    if (window.lucide) lucide.createIcons();
  };
});
