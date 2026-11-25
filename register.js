/* ===================================================================
   CAREER GUIDANCE SYSTEM - STUDENT REGISTRATION JAVASCRIPT (register.js)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const alertBox = document.getElementById('register-alert');
  const autoFillBtn = document.getElementById('btn-fill-sample');
  const termsLink = document.getElementById('view-terms-link');

  // Setup Password Visibility Toggles
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.setAttribute('data-lucide', 'eye-off');
      } else {
        input.type = 'password';
        if (icon) icon.setAttribute('data-lucide', 'eye');
      }
      if (window.lucide) lucide.createIcons();
    });
  });

  // Password Strength Meter
  const passwordInput = document.getElementById('password');
  const strengthFill = document.getElementById('strength-fill');
  const strengthText = document.getElementById('strength-text');

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;
    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val) && val.length >= 8) strength++;

    strengthFill.className = 'password-strength-fill';
    if (val.length === 0) {
      strengthFill.style.width = '0%';
      strengthText.textContent = 'Password strength: Empty';
      strengthText.style.color = 'var(--text-light)';
    } else if (strength === 1) {
      strengthFill.classList.add('strength-weak');
      strengthText.textContent = 'Password strength: Weak (Include capital letters & numbers)';
      strengthText.style.color = 'var(--danger)';
    } else if (strength === 2) {
      strengthFill.classList.add('strength-medium');
      strengthText.textContent = 'Password strength: Medium (Add special symbols for strong)';
      strengthText.style.color = 'var(--accent-dark)';
    } else {
      strengthFill.classList.add('strength-strong');
      strengthText.textContent = 'Password strength: Strong & Secure!';
      strengthText.style.color = 'var(--success)';
    }
  });

  // Terms and conditions modal popup
  if (termsLink) {
    termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Terms & Conditions:\n\n1. By registering, you confirm that your entered educational details are accurate to the best of your knowledge.\n2. Career recommendations are provided as guidance indicators and do not guarantee university admission or employment.\n3. Your credentials are saved locally in your browser demo environment.\n\nThank you for choosing Career Guidance System!");
    });
  }

  // Quick Auto-Fill Sample for Evaluator Testing
  if (autoFillBtn) {
    autoFillBtn.addEventListener('click', () => {
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      document.getElementById('full-name').value = "Priya Sharma";
      document.getElementById('email').value = `priya.sharma${randomSuffix}@example.com`;
      document.getElementById('phone').value = "9840123456";
      document.getElementById('dob').value = "2005-08-22";
      document.getElementById('gender').value = "Female";
      document.getElementById('education-level').value = "Undergraduate";
      document.getElementById('qualification').value = "B.Sc Computer Science (2nd Year)";
      document.getElementById('school-name').value = "Loyola College, Chennai";
      document.getElementById('stream').value = "Computer Applications";
      document.getElementById('completion-year').value = "2027";
      document.getElementById('username').value = `priya_sharma${randomSuffix}`;
      document.getElementById('password').value = "Priya@2026";
      document.getElementById('confirm-password').value = "Priya@2026";
      document.getElementById('terms-agree').checked = true;

      // Trigger password strength update
      passwordInput.dispatchEvent(new Event('input'));
      clearValidationErrors();
      showToast('info', 'Auto-Filled!', 'Sample student information populated. Ready to register.');
    });
  }

  // Form Validation & Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidationErrors();

    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const educationLevel = document.getElementById('education-level').value;
    const qualification = document.getElementById('qualification').value.trim();
    const institution = document.getElementById('school-name').value.trim();
    const stream = document.getElementById('stream').value.trim();
    const yearOfCompletion = document.getElementById('completion-year').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms-agree').checked;

    let hasErrors = false;

    // Validate Full Name
    if (!fullName || fullName.length < 2) {
      showFieldError('full-name', 'err-full-name', 'Please enter your full name (minimum 2 characters).');
      hasErrors = true;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showFieldError('email', 'err-email', 'Please enter a valid email address.');
      hasErrors = true;
    }

    // Validate Phone (10 digits)
    const phoneClean = phone.replace(/[^0-9]/g, '');
    if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 13) {
      showFieldError('phone', 'err-phone', 'Please enter a valid 10-digit phone number.');
      hasErrors = true;
    }

    // Validate DOB
    if (!dob) {
      showFieldError('dob', 'err-dob', 'Please select your date of birth.');
      hasErrors = true;
    }

    // Validate Gender
    if (!gender) {
      showFieldError('gender', 'err-gender', 'Please select your gender.');
      hasErrors = true;
    }

    // Validate Education Level
    if (!educationLevel) {
      showFieldError('education-level', 'err-education-level', 'Please select your education level.');
      hasErrors = true;
    }

    // Validate Qualification
    if (!qualification) {
      showFieldError('qualification', 'err-qualification', 'Please specify your qualification or standard.');
      hasErrors = true;
    }

    // Validate Institution
    if (!institution) {
      showFieldError('school-name', 'err-school-name', 'Please enter your school or college name.');
      hasErrors = true;
    }

    // Validate Stream
    if (!stream) {
      showFieldError('stream', 'err-stream', 'Please enter your academic stream or department.');
      hasErrors = true;
    }

    // Validate Year of Completion
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(yearOfCompletion, 10);
    if (!yearNum || yearNum < 1990 || yearNum > 2040) {
      showFieldError('completion-year', 'err-completion-year', 'Please enter a valid year between 1990 and 2040.');
      hasErrors = true;
    }

    // Validate Username
    if (!username || username.length < 3) {
      showFieldError('username', 'err-username', 'Username must be at least 3 characters.');
      hasErrors = true;
    }

    // Validate Password
    if (!password || password.length < 6) {
      showFieldError('password', 'err-password', 'Password must be at least 6 characters long.');
      hasErrors = true;
    }

    // Validate Password Match
    if (password !== confirmPassword) {
      showFieldError('confirm-password', 'err-confirm-password', 'Passwords do not match.');
      hasErrors = true;
    }

    // Validate Terms
    if (!terms) {
      showFieldError('terms-agree', 'err-terms', 'You must agree to the terms and privacy policy.');
      hasErrors = true;
    }

    if (hasErrors) {
      showAlert('error', 'Please resolve the highlighted errors in the form.');
      return;
    }

    // Check duplicate email in localStorage
    const users = getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      showFieldError('email', 'err-email', 'This email address is already registered. Please log in.');
      showAlert('error', 'An account with this email already exists. Try logging in.');
      return;
    }

    // Construct new student profile
    const newStudent = {
      fullName,
      email,
      phone,
      dob,
      gender,
      educationLevel,
      qualification,
      institution,
      stream,
      yearOfCompletion: yearNum.toString(),
      username,
      password,
      savedCareers: [],
      assessmentResult: null,
      registeredAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newStudent);
    saveRegisteredUsers(users);

    // Save active session for instant convenience
    setCurrentUser(newStudent);

    // Display Success Feedback
    showAlert('success', 'Registration successful! Setting up your student account...');
    showToast('success', 'Account Created!', 'Welcome to Career Guidance System.');

    // Redirect to login page or directly to dashboard
    setTimeout(() => {
      window.location.href = `login.html?registered=true&email=${encodeURIComponent(email)}`;
    }, 1200);
  });

  function showFieldError(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    const errSpan = document.getElementById(errId);
    if (input) input.classList.add('input-error');
    if (errSpan) {
      errSpan.textContent = msg;
      errSpan.classList.add('show');
    }
  }

  function clearValidationErrors() {
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.field-error-message').forEach(el => el.classList.remove('show'));
    if (alertBox) {
      alertBox.className = 'auth-alert';
      alertBox.textContent = '';
    }
  }

  function showAlert(type, msg) {
    if (!alertBox) return;
    alertBox.className = `auth-alert show auth-alert-${type}`;
    alertBox.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" style="width: 20px; height: 20px; flex-shrink: 0;"></i>
      <span>${msg}</span>
    `;
    if (window.lucide) lucide.createIcons();
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
