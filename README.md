# Career Guidance System 🎓✨
> **Explore • Discover • Choose** — Helping every student find the right direction for their future.

A modern, responsive, frontend web platform developed in accordance with the **Product Requirements Document (PRD) Version 1.0**.

---

## 🚀 Key Features & Modules

### 1. 🏠 Module 1: Home Page (`index.html`)
- **Header & Navigation**: Sticky navbar with brand logo (`assets/images/logo.png`), navigation links, dynamic auth buttons (Login/Register or Student Profile & Logout), and mobile hamburger drawer.
- **Hero Section**:
  - Main heading: *"Discover Your Future. Choose Your Career."*
  - Subtitle: *"Your future starts with the right decision. Explore career opportunities, discover your interests and find the right path for your future."*
  - CTA buttons: **Explore Careers** and **Get Started** (Assessment).
  - Floating metric badges and platform highlights.
- **Why Choose Our Platform?**:
  - Personalized career guidance
  - Explore different career paths
  - Discover your interests
  - Educational guidance
- **How It Works**: 4-step roadmap from Registration ➔ Education Details ➔ Interest Assessment ➔ Recommendations.
- **Popular Career Categories**: Interactive sector cards for Information Technology, Healthcare, Engineering, Business, Arts & Design, Government Jobs, and Science & Research.
- **Featured Career Profiles**: High-demand career spotlights with live modal preview.
- **Call-to-Action & Mission Statement**: Inspiring section for student onboarding.
- **Comprehensive Footer**: Quick links, career categories, contact information, privacy policy, and PRD tagline.

---

### 2. 📝 Module 2: Student Registration (`register.html` & `js/register.js`)
- **Page Title**: *Create Your Student Account*
- **Personal Information**: Full Name, Email Address, Phone Number, Date of Birth, Gender.
- **Educational Information**:
  - Current Education Level: SSLC (10th), Higher Secondary (11th/12th), Diploma, Undergraduate, Postgraduate, Graduate.
  - Current Qualification / Completed Qualification.
  - School / College / Institution Name.
  - Stream / Course.
  - Year of Completion.
- **Account Security**:
  - Username & Password (with real-time password strength meter).
  - Confirm Password with match checking.
  - Show / Hide password visibility toggles.
- **Demo Auto-Fill Button**: 1-click **"Auto-Fill Sample"** button for quick evaluator testing.
- **Validation**:
  - Validates required fields, email format regex, 10-digit phone number, password length >= 6, matching passwords, and terms acceptance.
  - Duplicate email prevention in LocalStorage demo database.
  - Smooth redirect to login with prefilled credentials.

---

### 3. 🔐 Module 3: Student Login (`login.html` & `js/login.js`)
- Email & Password fields with visibility toggles.
- Remember Me option.
- **1-Click Demo Login Button**: Automatically authenticates as sample student (`student@example.com` / `Password123`).
- **Forgot Password Recovery**: Self-serve demo password lookup.
- Form validation and dynamic redirect to the Student Dashboard.

---

### 4. 📊 Module 4: Student Dashboard (`dashboard.html` & `js/dashboard.js`)
- **Personalized Header**: Dynamic student avatar with initials, greeting (*"Welcome back, [Name]! 👋"*), and education summary.
- **Student Profile Summary Card**: Full contact information, username, and "Edit Profile" trigger.
- **Education Details Card**: Current level badge, degree, institution, stream, and graduation year.
- **Career Assessment Status Banner**: Displays completed match score or prompts students to take the questionnaire.
- **Recommended Careers Tab**: Tailored career suggestions based on the student's assessment results and academic stream.
- **Saved Careers Tab**: Manage and review bookmarked careers with 1-click removal.
- **Interactive Edit Profile Modal**: Modify personal & educational details, instantly updated in LocalStorage and reflected on the page without reload.
- **Logout Functionality**: Safely clears session and returns to homepage.

---

### 5. 🔍 Module 5: Career Exploration (`careers.html` & `js/careers.js`)
- **Over 22+ In-Depth Career Profiles**: Covers all example roles from PRD:
  - *Frontend Developer, Backend Developer, Data Analyst, UI/UX Designer, Software Tester (QA), Cybersecurity Analyst, Cloud Solutions Architect, Doctor (Physician), Nursing Professional, Pharmacist, Biomedical Engineer, Mechanical Engineer, Civil Engineer, Electrical Engineer, Chartered Accountant (CA), Product Manager, Digital Marketing Strategist, Graphic & Brand Designer, 3D Game & VFX Artist, Civil Services Officer (IAS/IPS), Research Scientist, and High School / College Teacher & Educator.*
- **Live Search**: Instant keyword filtering across career titles, descriptions, required qualifications, and skills.
- **Sector Filtering Pills**: Filter by Information Technology, Healthcare, Engineering, Business, Arts, Government, and Science with dynamic counts.
- **Sorting**: Featured, Alphabetical (A-Z, Z-A), and Category.
- **Career Cards Contain**:
  - Category badge & icon
  - Career title & description
  - Required qualifications & skills pills
  - Relevant courses & career progression opportunities
  - Average compensation & outlook
  - Bookmark / Save Career toggle button
  - **View Details Button**: Opens comprehensive interactive modal with day-to-day duties, education roadmaps, and top recruiting companies.

---

### 6. 🧠 Module 6: Career Interest Assessment (`assessment.html` & `js/assessment.js`)
- 8-question step-by-step questionnaire evaluating student subject enjoyment, problem-solving mindset, interpersonal preference, long-term impact, and technical appetite.
- Visual progress bar and question tracker.
- **Scoring Engine**: Evaluates answers and determines primary and secondary category matches.
- **Rich Results View**:
  - Circular match percentage gauge (e.g. 94% Match).
  - Primary sector title and deep personality profile description.
  - Secondary category alignment badge.
  - Curated list of matched careers directly from the career database.
  - **"Save Results to My Dashboard"**: Stores assessment results directly to the student profile in LocalStorage.
  - **"Retake Questionnaire"**: Reset and retake anytime.

---

## 🎨 UI/UX Design System (Per PRD)
- **Primary Navy Blue**: `#142B55`
- **Secondary Royal Blue**: `#356AE6`
- **Accent Gold**: `#F5B544`
- **Background Light Grey**: `#F7F9FC`
- **Text Dark Navy**: `#202B3C`
- **Typography**: `Poppins` (Brand/Headings) and `Inter` (Body/UI)
- **Icons**: Lucide Icons (with offline-bundled `js/lucide.min.js` and CDN fallback)
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices.

---

## 📂 Project Structure

```
CAREER GUIDANCE STSTEM/
│
├── index.html               # Module 1: Home Page
├── register.html            # Module 2: Student Registration Page
├── login.html               # Module 3: Student Login Page
├── dashboard.html           # Module 4: Student Dashboard
├── careers.html             # Module 5: Career Exploration Directory
├── assessment.html          # Module 6: Career Interest Assessment
├── README.md                # Project Documentation & Guide
│
├── css/
│   ├── style.css            # Core design system, navbar, cards, modals, toast
│   ├── auth.css             # Registration and login form styles, strength meter
│   └── responsive.css       # Mobile & tablet breakpoints, mobile drawer
│
├── js/
│   ├── main.js              # Shared career database (22+ careers), auth helpers, modals, toast
│   ├── register.js          # Registration validation, strength meter, localStorage
│   ├── login.js             # Login verification, 1-click demo login, password assistance
│   ├── dashboard.js         # Student profile display, edit profile modal, recommended & saved tabs
│   ├── careers.js           # Search, category filtering, sorting, bookmarking
│   ├── assessment.js        # 8-question assessment engine, scoring, results display
│   └── lucide.min.js        # Offline-first Lucide icons bundle
│
└── assets/
    └── images/
        └── logo.png         # Official Project Logo
```

---

## ⚡ How to Run

1. Open any of the `.html` files (e.g., `index.html`) directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Alternatively, serve via any local static server:
   ```powershell
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.

### 🔑 Demo Credentials
- **Email:** `student@example.com`
- **Password:** `Password123`
- *Or click the "1-Click Demo Login" button on `login.html`!*
