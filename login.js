/* ===================================================================
   CAREER GUIDANCE SYSTEM - STUDENT LOGIN JAVASCRIPT (login.js)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const alertBox = document.getElementById('login-alert');
  const quickDemoBtn = document.getElementById('btn-quick-demo');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const passToggleBtn = document.getElementById('login-password-toggle');
  const forgotPassLink = document.getElementById('forgot-password-link');

  // Handle URL parameters (e.g. redirected after registration)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('registered') === 'true') {
    showAlert('success', 'Registration complete! Please enter your password to log in.');
    const emailParam = urlParams.get('email');
    if (emailParam && emailInput) {
      emailInput.value = decodeURIComponent(emailParam);
      if (passwordInput) passwordInput.focus();
    }
  }

  // Password Visibility Toggle
  if (passToggleBtn && passwordInput) {
    passToggleBtn.addEventListener('click', () => {
      const icon = passToggleBtn.querySelector('i');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (icon) icon.setAttribute('data-lucide', 'eye-off');
      } else {
        passwordInput.type = 'password';
        if (icon) icon.setAttribute('data-lucide', 'eye');
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  // Forgot Password Link Click
  if (forgotPassLink) {
    forgotPassLink.addEventListener('click', (e) => {
      e.preventDefault();
      const enteredEmail = emailInput.value.trim().toLowerCase();
      const users = getRegisteredUsers();
      if (!enteredEmail) {
        alert("Password Recovery Assistance:\n\nFor demo testing, you can use the default demo account:\nEmail: student@example.com\nPassword: Password123\n\nOr enter your registered email in the form to look up your demo credentials.");
        return;
      }
      const found = users.find(u => u.email.toLowerCase() === enteredEmail);
      if (found) {
        alert(`Demo Password Reminder:\n\nAccount: ${found.fullName}\nEmail: ${found.email}\nYour Password is: ${found.password}`);
        passwordInput.value = found.password;
      } else {
        alert(`No account found matching "${enteredEmail}". Please check your email or register a new student account.`);
      }
    });
  }

  // 1-Click Demo Login Button
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener('click', () => {
      emailInput.value = DEFAULT_DEMO_USER.email;
      passwordInput.value = DEFAULT_DEMO_USER.password;
      clearValidationErrors();
      
      // Auto submit login
      setTimeout(() => {
        executeLogin(DEFAULT_DEMO_USER.email, DEFAULT_DEMO_USER.password);
      }, 200);
    });
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidationErrors();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    let hasErrors = false;

    // Validate email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showFieldError('login-email', 'err-login-email', 'Please provide a valid registered email address.');
      hasErrors = true;
    }

    // Validate password field
    if (!password) {
      showFieldError('login-password', 'err-login-password', 'Please enter your password.');
      hasErrors = true;
    }

    if (hasErrors) {
      showAlert('error', 'Please fill in both your email and password.');
      return;
    }

    executeLogin(email, password);
  });

  function executeLogin(email, password) {
    const users = getRegisteredUsers();
    
    // Check against registered users
    const matchedUser = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (matchedUser) {
      // Remember me handling
      setCurrentUser(matchedUser);

      showAlert('success', `Welcome back, ${matchedUser.fullName}! Directing to your student dashboard...`);
      showToast('success', 'Logged In!', `Welcome, ${matchedUser.fullName}.`);

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      // Check if email exists with different password
      const emailExists = users.some(u => u.email.toLowerCase() === email);
      if (emailExists) {
        showFieldError('login-password', 'err-login-password', 'Incorrect password. Please try again.');
        showAlert('error', 'Incorrect password for this student account. Try clicking "Forgot Password?" for a reminder.');
      } else {
        showFieldError('login-email', 'err-login-email', 'No student account found with this email.');
        showAlert('error', 'No student record found. Please verify your email or click "Register" to create an account.');
      }
    }
  }

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
  }
});
