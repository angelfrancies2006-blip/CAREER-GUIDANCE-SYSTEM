/* ===================================================================
   CAREER GUIDANCE SYSTEM - CORE DATA & SHARED JAVASCRIPT (main.js)
   =================================================================== */

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'cgs_registered_users',
  CURRENT_USER: 'cgs_current_user',
  SAVED_CAREERS: 'cgs_saved_careers',
  ASSESSMENT_RESULT: 'cgs_assessment_result'
};

// Initial Demo Student Account
const DEFAULT_DEMO_USER = {
  fullName: "Alex Morgan",
  email: "student@example.com",
  phone: "9876543210",
  dob: "2004-06-15",
  gender: "Female",
  educationLevel: "Undergraduate",
  qualification: "B.Tech Computer Science (3rd Year)",
  institution: "National Institute of Technology",
  stream: "Computer Science & Engineering",
  yearOfCompletion: "2026",
  username: "alex_morgan",
  password: "Password123",
  savedCareers: ["frontend-developer", "data-analyst", "ui-ux-designer"],
  assessmentResult: {
    topCategory: "Information Technology",
    score: "94%",
    date: "2026-11-15",
    secondaryCategory: "Arts and Design"
  }
};

// Comprehensive Career Categories
const CAREER_CATEGORIES = [
  {
    id: "it",
    name: "Information Technology",
    slug: "it",
    icon: "laptop",
    colorClass: "cat-it",
    description: "Explore high-growth careers in web development, AI, data science, cybersecurity, and cloud architecture.",
    count: 7
  },
  {
    id: "healthcare",
    name: "Healthcare",
    slug: "healthcare",
    icon: "activity",
    colorClass: "cat-healthcare",
    description: "Make a direct human impact with careers in clinical medicine, surgical care, biotechnology, and nursing.",
    count: 4
  },
  {
    id: "engineering",
    name: "Engineering",
    slug: "engineering",
    icon: "cpu",
    colorClass: "cat-engineering",
    description: "Design and build physical structures, smart machines, electrical networks, and aerospace systems.",
    count: 3
  },
  {
    id: "business",
    name: "Business and Management",
    slug: "business",
    icon: "trending-up",
    colorClass: "cat-business",
    description: "Drive enterprise strategy, financial modeling, marketing innovation, and product leadership.",
    count: 3
  },
  {
    id: "arts",
    name: "Arts and Design",
    slug: "arts",
    icon: "palette",
    colorClass: "cat-arts",
    description: "Transform ideas into compelling visuals, user experiences, digital animations, and creative media.",
    count: 2
  },
  {
    id: "government",
    name: "Government Jobs",
    slug: "government",
    icon: "landmark",
    colorClass: "cat-govt",
    description: "Serve the public sector through civil administration, policy leadership, and defense services.",
    count: 1
  },
  {
    id: "science",
    name: "Science and Research",
    slug: "science",
    icon: "microscope",
    colorClass: "cat-science",
    description: "Discover breakthrough solutions through scientific inquiry, genetic research, and laboratory trials.",
    count: 1
  }
];

// Comprehensive Career Database (21 Detailed Careers)
const CAREER_DATABASE = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Information Technology",
    categorySlug: "it",
    icon: "code",
    shortDesc: "Designs and builds engaging, responsive user interfaces and interactive web experiences.",
    overview: "Frontend Developers are architects of user delight. They translate wireframes and user needs into polished web and mobile web applications using modern web technologies.",
    qualifications: "B.Tech/B.E in Computer Science, BCA, B.Sc IT, or certified Web Development Bootcamp.",
    skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React / Vue / Angular", "Responsive Design", "Git & GitHub", "REST APIs", "Web Performance"],
    courses: ["The Complete Web Development Bootcamp", "Advanced React & Redux", "Frontend Masters Core Track", "Meta Front-End Developer Professional Certificate"],
    opportunities: "Junior Web Developer → Frontend Specialist → Senior Frontend Engineer → Staff UI Engineer / Solutions Architect.",
    averageSalary: "$70,000 - $130,000 / ₹6.5 - ₹22 LPA",
    jobOutlook: "High Demand (+22% Growth over next decade)",
    dailyResponsibilities: [
      "Building modular, scalable UI components with HTML, CSS, and modern JavaScript frameworks.",
      "Optimizing web applications for cross-browser compatibility and lightning-fast loading speeds.",
      "Collaborating closely with UI/UX designers, backend engineers, and product managers.",
      "Implementing accessibility standards (WCAG) and responsive design principles."
    ],
    topRecruiters: ["Google", "Microsoft", "Amazon", "Adobe", "Shopify", "Top High-Growth Startups"]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Information Technology",
    categorySlug: "it",
    icon: "server",
    shortDesc: "Engineers server-side architectures, databases, application logic, and microservices.",
    overview: "Backend Developers create the invisible backbone that powers web and cloud applications. They handle high-concurrency systems, data consistency, and enterprise security.",
    qualifications: "B.Tech/B.E in CS/IT, MCA, B.Sc Computer Science or equivalent software engineering background.",
    skills: ["Node.js / Python / Java / Go", "SQL & NoSQL (PostgreSQL, MongoDB)", "API Architecture (REST & GraphQL)", "Docker & Microservices", "System Design", "Cloud (AWS/GCP)"],
    courses: ["Distributed Systems Design", "Database Internals & Optimization", "AWS Certified Developer", "Backend Engineering with Node.js & Docker"],
    opportunities: "Junior Backend Engineer → Senior Backend Architect → Lead Systems Architect → Principal Engineer.",
    averageSalary: "$78,000 - $145,000 / ₹8 - ₹26 LPA",
    jobOutlook: "Very High Demand (+24% Growth)",
    dailyResponsibilities: [
      "Architecting robust server-side APIs and connecting them with frontend interfaces.",
      "Designing relational schemas and managing high-performance databases.",
      "Implementing strict authentication, authorization, and data encryption mechanisms.",
      "Diagnosing system latency, monitoring uptime, and optimizing query throughput."
    ],
    topRecruiters: ["Amazon Web Services", "Meta", "Oracle", "Uber", "Stripe", "Netflix"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Information Technology",
    categorySlug: "it",
    icon: "bar-chart-2",
    shortDesc: "Translates complex datasets into actionable business intelligence, charts, and forecasts.",
    overview: "Data Analysts bridge raw telemetry with business decision-making. They clean, aggregate, and visualize data to unearth key trends and growth opportunities.",
    qualifications: "Bachelor’s in Statistics, Mathematics, Computer Science, Economics, or Data Analytics.",
    skills: ["SQL", "Python / R", "PowerBI / Tableau", "Excel Advanced Modeling", "Data Cleaning", "Statistical Analysis", "Business Storytelling"],
    courses: ["Google Data Analytics Professional Certificate", "Applied Data Science with Python", "Advanced SQL for Data Analysts", "Tableau Desktop Specialist"],
    opportunities: "Data Analyst → Senior Business Intelligence Analyst → Analytics Manager → Head of Data & Strategy.",
    averageSalary: "$65,000 - $115,000 / ₹6 - ₹18 LPA",
    jobOutlook: "Rapidly Expanding (+28% Growth)",
    dailyResponsibilities: [
      "Writing SQL queries to extract data across enterprise data warehouses.",
      "Designing automated interactive dashboards and operational KPI trackers.",
      "Conducting exploratory data analysis to discover user retention patterns.",
      "Presenting analytical findings to executive stakeholders in actionable reports."
    ],
    topRecruiters: ["McKinsey & Company", "Deloitte", "Goldman Sachs", "Spotify", "Apple", "Accenture"]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Information Technology",
    categorySlug: "it",
    icon: "layout",
    shortDesc: "Designs intuitive, beautiful, and human-centered user experiences for web and mobile products.",
    overview: "UI/UX Designers conduct user research, craft wireframes, define design systems, and prototype seamless interactions that delight users.",
    qualifications: "Degree in Design (B.Des/M.Des), Human-Computer Interaction (HCI), Computer Science, or verified portfolio.",
    skills: ["Figma & FigJam", "User Journey Mapping", "Wireframing & Prototyping", "Design Systems", "Usability Testing", "Information Architecture", "Design Thinking"],
    courses: ["Google UX Design Certificate", "Interaction Design Foundation (IxDF)", "Advanced Figma Design Systems", "Mastering User Research Methodologies"],
    opportunities: "Junior UX Designer → Senior Product Designer → Design Lead → Head of Design / VP Experience.",
    averageSalary: "$68,000 - $125,000 / ₹6 - ₹20 LPA",
    jobOutlook: "High Demand (+18% Growth)",
    dailyResponsibilities: [
      "Conducting qualitative user interviews and synthesizing behavioral insights.",
      "Building high-fidelity interactive prototypes in Figma for user testing.",
      "Maintaining comprehensive component design libraries and tokens.",
      "Collaborating with software developers to ensure flawless design implementation."
    ],
    topRecruiters: ["Airbnb", "Apple", "Spotify", "Figma", "Canva", "Top Global Design Agencies"]
  },
  {
    id: "software-tester",
    title: "Software Tester / QA Engineer",
    category: "Information Technology",
    categorySlug: "it",
    icon: "check-circle",
    shortDesc: "Ensures software quality, stability, and security through manual and automated testing.",
    overview: "Software Quality Assurance (QA) Engineers safeguard product integrity. They design test suites, execute regression checks, and develop automated scripts to catch bugs before release.",
    qualifications: "B.Tech/B.E in Computer Science, BCA, B.Sc IT or ISTQB Certification.",
    skills: ["Selenium / Cypress / Playwright", "API Testing (Postman)", "Test Automation", "Defect Tracking (Jira)", "Regression Testing", "CI/CD Integration", "Performance Testing (JMeter)"],
    courses: ["ISTQB Foundation Certification", "Selenium WebDriver with Java/Python", "Automated API Testing with Postman", "Modern Web Testing with Cypress"],
    opportunities: "QA Analyst → Automation Test Engineer → QA Lead → Director of Quality Engineering.",
    averageSalary: "$60,000 - $110,000 / ₹5 - ₹16 LPA",
    jobOutlook: "Stable Demand (+15% Growth)",
    dailyResponsibilities: [
      "Drafting detailed test plans, scenarios, and test cases from product requirements.",
      "Writing automation scripts for end-to-end user workflows and stress tests.",
      "Logging and prioritizing bugs in Jira with step-by-step reproduction guidelines.",
      "Verifying security patches and participating in pre-release sprint sign-offs."
    ],
    topRecruiters: ["TCS", "Infosys", "IBM", "Cognizant", "Cisco", "Electronic Arts"]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Information Technology",
    categorySlug: "it",
    icon: "shield",
    shortDesc: "Protects sensitive networks, cloud assets, and student/customer data from cyber threats.",
    overview: "Cybersecurity Specialists monitor network traffic, perform vulnerability assessments, investigate security breaches, and fortify enterprise infrastructure against hackers.",
    qualifications: "B.Tech/B.E in Computer Science, Information Security, or certifications like CompTIA Security+, CEH, CISSP.",
    skills: ["Network Security", "Threat Hunting", "Penetration Testing", "SIEM Tools (Splunk)", "Cryptography", "Incident Response", "Firewall Configuration"],
    courses: ["CompTIA Security+ Certification", "Certified Ethical Hacker (CEH)", "Google Cybersecurity Certificate", "SANS GIAC Security Essentials"],
    opportunities: "Security Operations Analyst → Penetration Tester → Cybersecurity Consultant → Chief Information Security Officer (CISO).",
    averageSalary: "$82,000 - $150,000 / ₹8 - ₹28 LPA",
    jobOutlook: "Explosive Growth (+33% over next decade)",
    dailyResponsibilities: [
      "Monitoring real-time intrusion alarms and investigating unauthorized access attempts.",
      "Running routine vulnerability scans and ethical vulnerability exploitation.",
      "Developing emergency incident response protocols and disaster recovery plans.",
      "Enforcing strict access policies and compliance with privacy regulations."
    ],
    topRecruiters: ["Palo Alto Networks", "CrowdStrike", "Lockheed Martin", "Cisco", "Department of Defense", "Major Financial Banks"]
  },
  {
    id: "cloud-architect",
    title: "Cloud Solutions Architect",
    category: "Information Technology",
    categorySlug: "it",
    icon: "cloud",
    shortDesc: "Architects scalable, fault-tolerant cloud infrastructures on AWS, Azure, and Google Cloud.",
    overview: "Cloud Architects design enterprise cloud environments, optimize serverless architectures, and guide cloud migration strategies for mission-critical applications.",
    qualifications: "B.Tech in CS/IT, with AWS Solutions Architect or Azure Solutions Architect Expert Certification.",
    skills: ["AWS / Azure / GCP", "Infrastructure as Code (Terraform)", "Kubernetes & Docker", "High Availability & DR", "Cost Optimization", "Networking (VPC, DNS)"],
    courses: ["AWS Certified Solutions Architect Associate & Professional", "Architecting on Microsoft Azure", "Google Cloud Professional Cloud Architect"],
    opportunities: "DevOps Engineer → Cloud Engineer → Cloud Architect → VP of Cloud Infrastructure.",
    averageSalary: "$110,000 - $185,000 / ₹14 - ₹38 LPA",
    jobOutlook: "Very High Demand (+27% Growth)",
    dailyResponsibilities: [
      "Designing multi-region, resilient cloud infrastructure topologies.",
      "Managing cloud deployment pipelines with automated Terraform scripts.",
      "Analyzing cloud billing metrics to optimize infrastructure costs.",
      "Ensuring regulatory adherence for cloud storage and customer compute workloads."
    ],
    topRecruiters: ["Amazon Web Services", "Microsoft Azure", "Google Cloud", "IBM Cloud", "Accenture", "Salesforce"]
  },
  {
    id: "doctor-physician",
    title: "Doctor / General Physician",
    category: "Healthcare",
    categorySlug: "healthcare",
    icon: "stethoscope",
    shortDesc: "Diagnoses illnesses, prescribes treatments, and guides patients towards long-term wellness.",
    overview: "Doctors provide primary clinical care, evaluate patient symptoms, diagnose diseases, recommend medical tests, and manage treatment courses for diverse health conditions.",
    qualifications: "MBBS (Bachelor of Medicine & Bachelor of Surgery) + MD/MS or equivalent Board Certification.",
    skills: ["Clinical Diagnosis", "Patient Care", "Emergency Medicine", "Pharmacology Knowledge", "Medical Ethics", "Empathy & Communication", "Surgical Basics"],
    courses: ["MBBS Degree Program (5.5 Years)", "Postgraduate Residency (MD/MS)", "Advanced Cardiac Life Support (ACLS)", "Continuing Medical Education (CME)"],
    opportunities: "Junior Resident Doctor → Attending Physician → Specialist / Surgeon → Medical Director / Hospital Chief.",
    averageSalary: "$120,000 - $260,000 / ₹10 - ₹40 LPA",
    jobOutlook: "Steady High Demand (+12% Growth)",
    dailyResponsibilities: [
      "Examining patients, reviewing medical histories, and diagnosing acute or chronic conditions.",
      "Prescribing pharmaceutical medications and ordering laboratory or diagnostic imaging.",
      "Counseling patients on preventative health, diet, and lifestyle improvements.",
      "Coordinating specialized treatment plans with surgeons and medical consultants."
    ],
    topRecruiters: ["Apollo Hospitals", "Fortis Healthcare", "Mayo Clinic", "AIIMS", "NHS", "Max Healthcare"]
  },
  {
    id: "nurse-practitioner",
    title: "Nursing Professional / Practitioner",
    category: "Healthcare",
    categorySlug: "healthcare",
    icon: "heart",
    shortDesc: "Administers compassionate medical care, patient monitoring, and critical health assistance.",
    overview: "Nurses are the frontline heroes of healthcare. They manage daily patient recovery, administer treatments, monitor vital signs, and provide emotional support to families.",
    qualifications: "B.Sc Nursing, General Nursing and Midwifery (GNM), or Master of Science in Nursing (MSN).",
    skills: ["Patient Triage", "Vital Signs Monitoring", "Medication Administration", "Wound Care", "Critical Thinking", "Compassion", "Infection Control"],
    courses: ["B.Sc Nursing Accredited Program", "Basic & Advanced Life Support (BLS/ACLS)", "Pediatric and Geriatric Nursing Certifications"],
    opportunities: "Staff Nurse → ICU / Critical Care Specialist → Nursing Supervisor → Chief Nursing Officer.",
    averageSalary: "$60,000 - $115,000 / ₹4.5 - ₹12 LPA",
    jobOutlook: "Rapidly Expanding (+16% Growth)",
    dailyResponsibilities: [
      "Administering intravenous medications and recording patient vital trends.",
      "Assisting physicians and surgeons in outpatient procedures and intensive care units.",
      "Educating patients on post-operative care and rehabilitation routines.",
      "Maintaining meticulous patient charts and healthcare compliance documents."
    ],
    topRecruiters: ["Manipal Hospitals", "Cleveland Clinic", "Kaiser Permanente", "Government Health Services", "Red Cross"]
  },
  {
    id: "pharmacist",
    title: "Clinical Pharmacist",
    category: "Healthcare",
    categorySlug: "healthcare",
    icon: "pill",
    shortDesc: "Dispenses medications, ensures pharmacological safety, and counsels patients on drug therapy.",
    overview: "Pharmacists ensure safe, effective use of medications. They check drug-drug interactions, formulate pharmaceutical compounds, and advise doctors and patients on dosage regimens.",
    qualifications: "B.Pharm (Bachelor of Pharmacy), Pharm.D (Doctor of Pharmacy), and State Pharmacy Council Registration.",
    skills: ["Drug Formulation", "Therapeutic Knowledge", "Prescription Auditing", "Clinical Research", "Customer Counseling", "Regulatory Compliance"],
    courses: ["B.Pharm / Pharm.D Degree Programs", "Hospital Pharmacy Certification", "Clinical Trial Management"],
    opportunities: "Retail / Hospital Pharmacist → Clinical Research Associate → Quality Control Manager → Pharmaceutical Director.",
    averageSalary: "$55,000 - $120,000 / ₹4 - ₹15 LPA",
    jobOutlook: "Steady Growth (+8% Growth)",
    dailyResponsibilities: [
      "Reviewing prescriptions for safety, correct dosage, and potential drug interactions.",
      "Advising patients on potential side effects and optimal administration schedules.",
      "Managing temperature-controlled pharmaceutical inventories and narcotics logs.",
      "Collaborating with physicians on complex patient antimicrobial therapies."
    ],
    topRecruiters: ["Pfizer", "Novartis", "Cipla", "Dr. Reddy's Laboratories", "Walgreens / CVS Health", "Apollo Pharmacy"]
  },
  {
    id: "biomedical-engineer",
    title: "Biomedical Engineer",
    category: "Healthcare",
    categorySlug: "healthcare",
    icon: "activity",
    shortDesc: "Designs advanced medical devices, prosthetics, diagnostic machinery, and artificial organs.",
    overview: "Biomedical Engineers apply engineering principles to medicine and biology. They innovate life-saving technologies like MRI machines, pacemakers, and robotic surgical tools.",
    qualifications: "B.Tech/B.E in Biomedical Engineering, Bioengineering, or Electrical Engineering with medical focus.",
    skills: ["Biomaterials", "Medical Device Design", "CAD / SolidWorks", "Bio-signal Processing", "FDA / CE Regulations", "Prototyping", "Biomechanics"],
    courses: ["Biomedical Sensors & Instrumentation", "Medical Robotics & Automation", "ISO 13485 Medical Device Standards"],
    opportunities: "Biomedical Equipment Specialist → R&D Engineer → Medical Device Project Lead → VP Medical Tech.",
    averageSalary: "$72,000 - $135,000 / ₹6 - ₹20 LPA",
    jobOutlook: "High Demand (+10% Growth)",
    dailyResponsibilities: [
      "Designing electronic sensors and embedded circuits for biometric monitoring devices.",
      "Conducting biocompatibility and stress testing on new medical implants.",
      "Collaborating with doctors to evaluate surgical tool usability and clinical efficacy.",
      "Drafting regulatory documentation for health authority approvals."
    ],
    topRecruiters: ["Medtronic", "Johnson & Johnson", "GE Healthcare", "Siemens Healthineers", "Stryker", "Philips Medical"]
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Engineering",
    categorySlug: "engineering",
    icon: "settings",
    shortDesc: "Designs, analyzes, and manufactures physical mechanical systems, engines, and robotics.",
    overview: "Mechanical Engineers invent and refine mechanical devices, thermal sensors, automotive drivetrains, robotics, and manufacturing machinery across industries.",
    qualifications: "B.Tech/B.E in Mechanical Engineering, Automotive Engineering, or Mechatronics.",
    skills: ["CAD (AutoCAD, SolidWorks, CATIA)", "Thermodynamics & Fluid Dynamics", "Finite Element Analysis (FEA)", "Materials Science", "Robotics Basics", "Rapid Prototyping"],
    courses: ["Advanced SolidWorks 3D Modeling", "Computational Fluid Dynamics (CFD)", "Finite Element Analysis with ANSYS", "Industrial Automation Fundamentals"],
    opportunities: "Junior Design Engineer → Mechanical Systems Engineer → Lead R&D Engineer → VP of Engineering.",
    averageSalary: "$68,000 - $125,000 / ₹5.5 - ₹20 LPA",
    jobOutlook: "Steady Demand (+9% Growth)",
    dailyResponsibilities: [
      "Creating 3D models and manufacturing blueprints for mechanical assemblies.",
      "Simulating stress, heat transfer, and aerodynamic drag using FEA software.",
      "Prototyping parts via CNC machining and high-precision 3D printing.",
      "Overseeing factory quality control and optimizing thermal performance."
    ],
    topRecruiters: ["Tesla", "Boeing", "General Electric", "Tata Motors", "Larsen & Toubro (L&T)", "Bosch"]
  },
  {
    id: "civil-engineer",
    title: "Civil & Structural Engineer",
    category: "Engineering",
    categorySlug: "engineering",
    icon: "briefcase",
    shortDesc: "Plans, designs, and oversees construction of bridges, highways, skyscrapers, and infrastructure.",
    overview: "Civil Engineers turn architectural visions into enduring reality. They calculate structural loads, manage construction sites, and ensure civil works withstand natural elements.",
    qualifications: "B.Tech/B.E in Civil Engineering or Structural Engineering.",
    skills: ["Structural Analysis (STAAD Pro / ETABS)", "AutoCAD & Revit", "Geotechnical Engineering", "Site Management", "Project Budgeting", "Building Codes & Safety"],
    courses: ["Advanced Structural Analysis", "Building Information Modeling (BIM)", "Project Management Professional (PMP)", "Sustainable Green Building Standards"],
    opportunities: "Site Engineer → Structural Designer → Project Manager → Chief Infrastructure Consultant.",
    averageSalary: "$65,000 - $120,000 / ₹5 - ₹18 LPA",
    jobOutlook: "Strong Growth (+11% Growth)",
    dailyResponsibilities: [
      "Calculating stress tolerances and structural load distributions for bridges and towers.",
      "Reviewing architectural drafts and soil mechanics reports.",
      "Inspecting physical job sites to ensure compliance with construction blueprints.",
      "Coordinating contractors, concrete testing, and environmental impact assessments."
    ],
    topRecruiters: ["Larsen & Toubro", "Bechtel", "AECOM", "Shapoorji Pallonji", "Jacobs", "Government PWD & Highways"]
  },
  {
    id: "electrical-engineer",
    title: "Electrical & Electronics Engineer",
    category: "Engineering",
    categorySlug: "engineering",
    icon: "zap",
    shortDesc: "Develops electrical systems, renewable power grids, microchips, and embedded circuits.",
    overview: "Electrical Engineers power our modern world. They innovate smart power grids, EV battery management systems, microelectronics, and automated industrial drives.",
    qualifications: "B.Tech/B.E in Electrical & Electronics Engineering (EEE) or Electronics & Communication (ECE).",
    skills: ["Circuit Design & Simulation (MATLAB, SPICE)", "Power Systems & Smart Grids", "Embedded C / Microcontrollers", "Renewable Energy Tech", "PCB Layout (Altium)", "IoT"],
    courses: ["Embedded Systems & Microcontroller Programming", "Renewable Power Grid Integration", "PCB Design Masterclass", "Power Electronics Design"],
    opportunities: "Electrical Designer → Power Systems Engineer → Chief Hardware Engineer → Technical Director.",
    averageSalary: "$70,000 - $130,000 / ₹6 - ₹22 LPA",
    jobOutlook: "High Demand (+10% Growth)",
    dailyResponsibilities: [
      "Designing circuit schematics and laying out high-frequency PCBs.",
      "Programming microcontrollers for smart home and industrial automation hardware.",
      "Testing power distribution transformers and battery energy storage modules.",
      "Conducting electromagnetic interference (EMI) and safety certifications."
    ],
    topRecruiters: ["Siemens", "Intel", "Schneider Electric", "Texas Instruments", "ABB", "Tesla Energy"]
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant / Financial Analyst",
    category: "Business and Management",
    categorySlug: "business",
    icon: "dollar-sign",
    shortDesc: "Directs financial auditing, corporate taxation, investments, and risk management.",
    overview: "Chartered Accountants and Financial Analysts provide critical fiscal stewardship. They audit financial statements, formulate investment portfolios, and ensure tax law compliance.",
    qualifications: "CA (ICAI) / CPA / CFA / ACCA or Bachelor's in Commerce / Finance.",
    skills: ["Financial Auditing", "Corporate Taxation", "Financial Modeling & Valuation", "ERP Systems (SAP)", "Risk Assessment", "IFRS & GAAP Standards", "Advanced Excel"],
    courses: ["Chartered Accountancy Curriculum", "Chartered Financial Analyst (CFA) Level 1-3", "Financial Modeling and Valuation Analyst (FMVA)"],
    opportunities: "Audit Associate → Senior Financial Analyst → Finance Manager → Chief Financial Officer (CFO).",
    averageSalary: "$75,000 - $160,000 / ₹8 - ₹30 LPA",
    jobOutlook: "High Demand (+9% Growth)",
    dailyResponsibilities: [
      "Auditing statutory financial records to ensure rigorous compliance with tax codes.",
      "Building discounted cash flow (DCF) models for mergers and private equity investments.",
      "Preparing comprehensive quarterly earnings forecasts and budget allocations.",
      "Advising corporate boards on strategic tax planning and balance sheet health."
    ],
    topRecruiters: ["PwC", "EY (Ernst & Young)", "KPMG", "Deloitte", "Goldman Sachs", "J.P. Morgan"]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business and Management",
    categorySlug: "business",
    icon: "briefcase",
    shortDesc: "Leads cross-functional teams to discover, build, and launch high-impact digital products.",
    overview: "Product Managers sit at the intersection of business, technology, and user experience. They define product visions, prioritize feature backlogs, and drive market success.",
    qualifications: "Bachelor’s in Engineering, Business, or MBA; relevant Product Management portfolio.",
    skills: ["Product Roadmap Strategy", "User Journey Discovery", "Agile & Scrum Methodologies", "A/B Testing & Metrics", "Stakeholder Alignment", "Go-To-Market Execution"],
    courses: ["Product School PM Certification", "Reforge Product Strategy Track", "Agile Certified Product Owner (CSPO)", "Data-Driven Product Management"],
    opportunities: "Associate Product Manager → Product Manager → Principal PM → VP of Product / Chief Product Officer.",
    averageSalary: "$90,000 - $170,000 / ₹12 - ₹35 LPA",
    jobOutlook: "Very High Demand (+20% Growth)",
    dailyResponsibilities: [
      "Interviewing customers and synthesizing feedback into prioritized product specifications.",
      "Leading sprint planning, grooming backlogs, and working alongside engineers and designers.",
      "Tracking product health KPIs including adoption, churn, NPS, and conversion rates.",
      "Formulating commercial go-to-market strategies with sales and marketing teams."
    ],
    topRecruiters: ["Uber", "Google", "Amazon", "Microsoft", "Atlassian", "Flipkart"]
  },
  {
    id: "digital-marketing-strategist",
    title: "Digital Marketing Strategist",
    category: "Business and Management",
    categorySlug: "business",
    icon: "trending-up",
    shortDesc: "Drives customer acquisition and brand growth through SEO, paid ads, and content campaigns.",
    overview: "Digital Marketing Strategists build brand awareness and revenue pipelines through search engine optimization, performance advertising, social media, and lifecycle emails.",
    qualifications: "Degree in Marketing, Communications, Business Administration, or Google/HubSpot Certifications.",
    skills: ["SEO & SEM", "Google Ads & Meta Ads", "Content Strategy", "Email Automation (HubSpot)", "Google Analytics 4", "Conversion Rate Optimization (CRO)", "Copywriting"],
    courses: ["Google Digital Garage & Ads Certification", "HubSpot Inbound Marketing", "Meta Certified Digital Marketing Associate"],
    opportunities: "Marketing Executive → Growth Marketing Lead → Performance Marketing Director → Chief Marketing Officer.",
    averageSalary: "$55,000 - $110,000 / ₹5 - ₹18 LPA",
    jobOutlook: "Rapid Growth (+14% Growth)",
    dailyResponsibilities: [
      "Managing pay-per-click (PPC) campaigns across Google, LinkedIn, and Instagram.",
      "Conducting keyword research and auditing technical SEO parameters.",
      "Designing automated customer onboarding and email nurture sequences.",
      "Measuring return on ad spend (ROAS) and optimizing conversion funnels."
    ],
    topRecruiters: ["Ogilvy", "Publicis Groupe", "Shopify", "Unilever", "Amazon Advertising", "HubSpot"]
  },
  {
    id: "graphic-designer",
    title: "Graphic & Brand Designer",
    category: "Arts and Design",
    categorySlug: "arts",
    icon: "image",
    shortDesc: "Creates memorable visual identities, marketing assets, typography, and branded illustrations.",
    overview: "Graphic Designers communicate messages visually. They design brand logos, digital media graphics, packaging, typography, and visual assets that captivate audiences.",
    qualifications: "Bachelor of Fine Arts (BFA), Graphic Design Degree, or strong creative portfolio.",
    skills: ["Adobe Illustrator & Photoshop", "Brand Identity Design", "Typography & Color Theory", "InDesign & Layouts", "Visual Storytelling", "Vector Art"],
    courses: ["Graphic Design Specialization (CalArts)", "Logo Design & Brand Identity Mastery", "Typography Essentials Course"],
    opportunities: "Junior Graphic Designer → Senior Visual Artist → Art Director → Creative Director.",
    averageSalary: "$50,000 - $95,000 / ₹4 - ₹15 LPA",
    jobOutlook: "Steady Demand (+8% Growth)",
    dailyResponsibilities: [
      "Designing brand identity suites including logos, color palettes, and brand guidelines.",
      "Creating engaging visual creatives for digital advertising and social media.",
      "Preparing print-ready artwork for packaging, magazines, and event displays.",
      "Collaborating with marketing managers to produce cohesive brand collateral."
    ],
    topRecruiters: ["Pentagram", "Nike", "Vogue", "Walt Disney", "Apple Design Studio", "Top Advertising Agencies"]
  },
  {
    id: "game-artist",
    title: "3D Game & VFX Artist",
    category: "Arts and Design",
    categorySlug: "arts",
    icon: "play-circle",
    shortDesc: "Builds stunning 3D characters, cinematic environments, and visual effects for games and movies.",
    overview: "3D Game Artists sculpt virtual worlds. They create textured 3D models, character rigs, lighting setups, and particle visual effects for triple-A video games and film productions.",
    qualifications: "Degree in Animation, Game Art, Computer Graphics, or dedicated showreel.",
    skills: ["Blender / Maya / 3ds Max", "ZBrush Digital Sculpting", "Substance 3D Painter", "Unreal Engine 5 / Unity", "Rigging & Texturing", "Lighting & Shading"],
    courses: ["Unreal Engine 5 Game Art Masterclass", "ZBrush Character Sculpting Essentials", "CGSpectrum 3D Animation & VFX Diploma"],
    opportunities: "Junior 3D Modeler → Environment Artist → Lead Technical Artist → Art Director for Interactive Media.",
    averageSalary: "$62,000 - $125,000 / ₹5 - ₹20 LPA",
    jobOutlook: "Rapid Growth (+16% Growth)",
    dailyResponsibilities: [
      "Sculpting high-poly characters and optimizing low-poly models for real-time engines.",
      "Authoring realistic PBR (physically-based rendering) textures in Substance Painter.",
      "Setting up dynamic lighting and post-processing volumes in Unreal Engine.",
      "Collaborating with game designers to balance artistic fidelity and frame-rate performance."
    ],
    topRecruiters: ["Electronic Arts", "Ubisoft", "Sony PlayStation Studios", "Rockstar Games", "ILM (Industrial Light & Magic)", "Epic Games"]
  },
  {
    id: "civil-services-officer",
    title: "Civil Services / Administrative Officer",
    category: "Government Jobs",
    categorySlug: "government",
    icon: "landmark",
    shortDesc: "Administers government policies, public services, and law & order at district and national levels.",
    overview: "Civil Servants are the administrators of the nation. They implement government welfare schemes, oversee law enforcement, manage district revenues, and formulate public policy.",
    qualifications: "Any recognized Bachelor’s Degree + Qualifying Civil Services Examination (e.g. UPSC CSE).",
    skills: ["Public Administration", "Policy Analysis", "Crisis Management", "Constitutional Law Basics", "Leadership & Ethics", "District Governance", "Decision Making"],
    courses: ["UPSC Civil Services Foundation Course", "Public Administration & Governance Seminars", "LBSNAA Training Academy Program"],
    opportunities: "Sub-Divisional Magistrate (SDM) → District Collector / Magistrate → Joint Secretary → Cabinet Secretary.",
    averageSalary: "$50,000 - $110,000 / ₹7 - ₹25 LPA (with official perks & housing)",
    jobOutlook: "High Prestige & Permanent Tenure",
    dailyResponsibilities: [
      "Overseeing the implementation of social welfare, education, and infrastructure projects.",
      "Directing crisis response during natural disasters, public health, and civil events.",
      "Conducting public hearings to address citizen grievances and community needs.",
      "Formulating policy briefs and coordinating inter-departmental government initiatives."
    ],
    topRecruiters: ["Union Public Service Commission (UPSC)", "State Public Service Commissions", "Ministry of Home Affairs", "Department of Administrative Reforms"]
  },
  {
    id: "educator-teacher",
    title: "High School / College Teacher & Educator",
    category: "Science and Research",
    categorySlug: "science",
    icon: "book-open",
    shortDesc: "Inspires, educates, and shapes the minds of future generations across academic disciplines.",
    overview: "Teachers and educators deliver curriculum, mentor student development, create engaging instructional materials, and evaluate academic growth in schools and colleges.",
    qualifications: "Bachelor’s / Master’s Degree in subject matter + B.Ed (Bachelor of Education) or NET / CTET qualification.",
    skills: ["Curriculum Planning", "Instructional Pedagogy", "Classroom Leadership", "Student Mentoring", "Educational Tech & LMS", "Patience & Empathy", "Public Speaking"],
    courses: ["Bachelor of Education (B.Ed)", "Master of Arts / Science in Education", "Digital Teaching & Pedagogy Certifications", "CTET Exam Preparation"],
    opportunities: "School Teacher → Senior Subject Specialist → Head of Department (HOD) → Vice Principal / School Principal.",
    averageSalary: "$48,000 - $95,000 / ₹4 - ₹12 LPA",
    jobOutlook: "Consistent High Demand (+12% Growth)",
    dailyResponsibilities: [
      "Designing structured lesson plans, homework assignments, and assessment rubrics.",
      "Conducting interactive classroom lectures, laboratory demonstrations, and discussions.",
      "Providing one-on-one mentorship to students facing academic or personal hurdles.",
      "Communicating student progress reports and growth opportunities with parents."
    ],
    topRecruiters: ["Kendriya Vidyalaya Sangathan (KVS)", "DPS Society", "Leading International Schools", "State Department of Education", "EdTech Institutions"]
  },
  {
    id: "research-scientist",
    title: "Research Scientist (Biotechnology & Genetics)",
    category: "Science and Research",
    categorySlug: "science",
    icon: "microscope",
    shortDesc: "Conducts breakthrough laboratory research in genomics, vaccine development, and sustainable biology.",
    overview: "Research Scientists pioneer advancements at the molecular level. They design lab experiments, analyze genetic sequences, publish peer-reviewed papers, and discover novel therapies.",
    qualifications: "Master’s or Ph.D. in Biotechnology, Genetics, Molecular Biology, or Biochemistry.",
    skills: ["Laboratory Experimentation", "PCR & DNA Sequencing", "CRISPR Gene Editing Basics", "Bioinformatics (BLAST, Python)", "Scientific Writing", "Statistical Hypothesis Testing"],
    courses: ["Ph.D. Doctoral Research Fellowship", "Bioinformatics Specialization (Coursera)", "Advanced Molecular Cloning & Genetics Lab"],
    opportunities: "Postdoctoral Researcher → Senior Scientist → Principal Investigator (PI) → Director of Research & Development.",
    averageSalary: "$75,000 - $145,000 / ₹7 - ₹24 LPA",
    jobOutlook: "Strong Demand (+17% Growth)",
    dailyResponsibilities: [
      "Formulating research hypotheses and executing controlled in-vitro biological experiments.",
      "Analyzing genomic sequencing data using high-performance bioinformatics pipelines.",
      "Authoring comprehensive scientific research papers for peer-reviewed journal publication.",
      "Securing research grant funding from governmental and private scientific foundations."
    ],
    topRecruiters: ["CSIR Labs", "AstraZeneca", "Genentech", "National Institutes of Health (NIH)", "Biocon", "Max Planck Institute"]
  }
];

// Assessment Questions Database (8 Comprehensive Questions)
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "Which academic subject or field do you genuinely enjoy the most?",
    subtitle: "Think about which subjects spark your curiosity when you study them.",
    options: [
      { text: "Computers, Coding, Math & Logic", category: "it", points: 3 },
      { text: "Biology, Human Anatomy & Medicine", category: "healthcare", points: 3 },
      { text: "Physics, Mechanics, Building & Electronics", category: "engineering", points: 3 },
      { text: "Economics, Finance, Business & Entrepreneurship", category: "business", points: 3 },
      { text: "Visual Arts, Literature, Drawing & Media", category: "arts", points: 3 },
      { text: "Civics, Law, History & Social Governance", category: "government", points: 3 },
      { text: "Scientific Research, Chemistry & Lab Experiments", category: "science", points: 3 }
    ]
  },
  {
    id: 2,
    question: "Do you prefer technical, creative, or interpersonal work?",
    subtitle: "Select the work style that makes you feel most in your element.",
    options: [
      { text: "Technical & Analytical: Writing code, solving complex algorithms, and optimizing systems", category: "it", points: 3 },
      { text: "Caring & Compassionate: Directly diagnosing, treating, and helping patients recover", category: "healthcare", points: 3 },
      { text: "Hands-on Engineering: Designing blueprints, physical machines, circuits, and structures", category: "engineering", points: 3 },
      { text: "Strategic & Commercial: Leading teams, managing finances, and growing businesses", category: "business", points: 3 },
      { text: "Creative & Visual: Designing graphics, animations, user interfaces, and multimedia", category: "arts", points: 3 },
      { text: "Public Service & Leadership: Serving citizens, enforcing policy, and public welfare", category: "government", points: 3 },
      { text: "Inquisitive & Scientific: Conducting deep research, trials, and discovering truth", category: "science", points: 3 }
    ]
  },
  {
    id: 3,
    question: "How do you naturally approach solving difficult problems?",
    subtitle: "What is your instinctive mindset when facing a tough challenge?",
    options: [
      { text: "I break it down into logical steps, write code scripts, or analyze data patterns", category: "it", points: 2 },
      { text: "I observe physical symptoms, consult medical knowledge, and prescribe care", category: "healthcare", points: 2 },
      { text: "I test material limits, draw diagrams, calculate forces, and prototype physical solutions", category: "engineering", points: 2 },
      { text: "I evaluate market risks, calculate return on investment, and rally a team to execute", category: "business", points: 2 },
      { text: "I brainstorm unconventional visual ideas, sketch concepts, and craft aesthetic solutions", category: "arts", points: 2 },
      { text: "I review rules, assess public impact, mediate between stakeholders, and decide equitably", category: "government", points: 2 },
      { text: "I form a scientific hypothesis, design a controlled trial, and scrutinize empirical evidence", category: "science", points: 2 }
    ]
  },
  {
    id: 4,
    question: "How much do you like working with people versus systems?",
    subtitle: "Your social and interpersonal preference plays a huge role in career happiness.",
    options: [
      { text: "I enjoy deep focus on computers, software codebases, and digital architecture", category: "it", points: 2 },
      { text: "I want deeply personal, 1-on-1 interactions providing medical healing and comfort", category: "healthcare", points: 2 },
      { text: "I like collaborating with engineering crews on industrial plants or construction sites", category: "engineering", points: 2 },
      { text: "I thrive in negotiations, client meetings, public presentations, and executive leadership", category: "business", points: 2 },
      { text: "I prefer expressing stories and emotions to audiences through visuals and interactive design", category: "arts", points: 2 },
      { text: "I want to lead large administrative bodies and safeguard community welfare", category: "government", points: 2 },
      { text: "I work best in specialized laboratory teams making collaborative breakthroughs", category: "science", points: 2 }
    ]
  },
  {
    id: 5,
    question: "What type of long-term legacy or impact do you want to create?",
    subtitle: "What would make you feel most proud of your life's work 20 years from now?",
    options: [
      { text: "Building software platforms, apps, or AI systems that empower millions daily", category: "it", points: 3 },
      { text: "Saving human lives, alleviating physical suffering, and advancing public health", category: "healthcare", points: 3 },
      { text: "Erecting iconic bridges, sustainable green grids, and pioneering spacecraft", category: "engineering", points: 3 },
      { text: "Founding thriving corporations, managing billion-dollar investments, and creating jobs", category: "business", points: 3 },
      { text: "Creating unforgettable works of art, video game universes, and visual designs", category: "arts", points: 3 },
      { text: "Shaping national policy, eradicating social inequities, and serving the nation", category: "government", points: 3 },
      { text: "Unraveling genetic mysteries, curing diseases, and advancing human science", category: "science", points: 3 }
    ]
  },
  {
    id: 6,
    question: "Which daily activity sounds most enjoyable to you?",
    subtitle: "Imagine an ideal, fulfilling day on the job.",
    options: [
      { text: "Debugging a tricky algorithm, shipping a new feature, or querying data", category: "it", points: 2 },
      { text: "Checking patient vitals, discussing symptoms, and recommending effective recovery plans", category: "healthcare", points: 2 },
      { text: "Calibrating 3D CAD models, running structural simulations, or testing robotics", category: "engineering", points: 2 },
      { text: "Pitching an ambitious business plan, closing strategic deals, or auditing balance sheets", category: "business", points: 2 },
      { text: "Illustrating brand concepts, styling UI wireframes, or texturing 3D digital worlds", category: "arts", points: 2 },
      { text: "Reviewing district development projects and presiding over community sessions", category: "government", points: 2 },
      { text: "Pipetting biological samples, operating electron microscopes, or analyzing DNA", category: "science", points: 2 }
    ]
  },
  {
    id: 7,
    question: "What is your approach toward tools and technology?",
    subtitle: "How eager are you to adopt modern tools in your daily craft?",
    options: [
      { text: "I love learning programming languages, cloud frameworks, and AI workflows", category: "it", points: 2 },
      { text: "I rely on precise medical diagnostic instruments, imaging scanners, and surgical tech", category: "healthcare", points: 2 },
      { text: "I use precision engineering software, laser cutting, 3D printers, and sensors", category: "engineering", points: 2 },
      { text: "I harness CRM platforms, financial valuation spreadsheets, and marketing automation", category: "business", points: 2 },
      { text: "I master creative software suites like Figma, Photoshop, Illustrator, and Blender", category: "arts", points: 2 },
      { text: "I leverage public e-governance portals and official institutional communication systems", category: "government", points: 2 },
      { text: "I utilize high-precision spectrometers, CRISPR tools, and bioinformatics databases", category: "science", points: 2 }
    ]
  },
  {
    id: 8,
    question: "What is your preferred educational pathway?",
    subtitle: "Which degree or certification route aligns best with your aspirations?",
    options: [
      { text: "B.Tech/B.E in CS, BCA/MCA, or intensive software engineering credentials", category: "it", points: 2 },
      { text: "MBBS, B.Sc Nursing, B.Pharm, or healthcare clinical residency programs", category: "healthcare", points: 2 },
      { text: "B.Tech/B.E in Mechanical, Civil, Electrical, or Mechatronics Engineering", category: "engineering", points: 2 },
      { text: "BBA/MBA, CA / CPA / CFA, or Finance & Management degrees", category: "business", points: 2 },
      { text: "B.Des/BFA in Visual Design, Animation, Multimedia, or Creative Arts", category: "arts", points: 2 },
      { text: "Any recognized undergraduate degree with dedicated Civil Services Exam prep", category: "government", points: 2 },
      { text: "Master's and Ph.D. in Biological Sciences, Biotechnology, or Physical Sciences", category: "science", points: 2 }
    ]
  }
];

// ===================================================================
// STORAGE & AUTHENTICATION UTILITIES
// ===================================================================

// Ensure demo user is present in localStorage on first run
function initializeDemoData() {
  const users = getRegisteredUsers();
  const demoExists = users.some(u => u.email.toLowerCase() === DEFAULT_DEMO_USER.email.toLowerCase());
  if (!demoExists) {
    users.push(DEFAULT_DEMO_USER);
    saveRegisteredUsers(users);
  }

  // If no user is logged in, optionally initialize with demo user for seamless preview
  if (!getCurrentUser()) {
    // We don't force login by default on landing, but demo is ready
  }
}

function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading users:", e);
    return [];
  }
}

function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users:", e);
  }
}

function getCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error reading current user:", e);
    return null;
  }
}

function setCurrentUser(user) {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    // Keep in registered users list as well
    const users = getRegisteredUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    saveRegisteredUsers(users);
  } catch (e) {
    console.error("Error saving current user:", e);
  }
}

function clearCurrentUser() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (e) {
    console.error("Error clearing user:", e);
  }
}

// Bookmark / Save Career Helper
function toggleSaveCareer(careerId) {
  let user = getCurrentUser();
  if (!user) {
    showToast('error', 'Login Required', 'Please log in to save careers to your student dashboard.');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
    return false;
  }

  if (!user.savedCareers) {
    user.savedCareers = [];
  }

  const index = user.savedCareers.indexOf(careerId);
  let isSaved = false;
  if (index >= 0) {
    user.savedCareers.splice(index, 1);
    showToast('info', 'Removed', 'Career removed from your saved list.');
    isSaved = false;
  } else {
    user.savedCareers.push(careerId);
    showToast('success', 'Career Saved!', 'Added to your student dashboard favorites.');
    isSaved = true;
  }

  setCurrentUser(user);
  updateBookmarkButtons();
  return isSaved;
}

function isCareerSaved(careerId) {
  const user = getCurrentUser();
  return user && user.savedCareers && user.savedCareers.includes(careerId);
}

function updateBookmarkButtons() {
  const buttons = document.querySelectorAll(`[data-save-id]`);
  buttons.forEach(btn => {
    const id = btn.getAttribute('data-save-id');
    if (isCareerSaved(id)) {
      btn.classList.add('bookmarked');
      btn.innerHTML = `<i data-lucide="bookmark-check"></i>`;
      btn.setAttribute('title', 'Remove from Saved Careers');
    } else {
      btn.classList.remove('bookmarked');
      btn.innerHTML = `<i data-lucide="bookmark"></i>`;
      btn.setAttribute('title', 'Save Career');
    }
  });
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Toast Notification System
function showToast(type = 'info', title = '', message = '') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle-2';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `
    <div class="toast-icon"><i data-lucide="${iconName}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Career Details Modal System
function openCareerModal(careerId) {
  const career = CAREER_DATABASE.find(c => c.id === careerId);
  if (!career) return;

  let modalOverlay = document.getElementById('career-detail-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'career-detail-modal';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const isSaved = isCareerSaved(career.id);

  modalOverlay.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="category-icon-box" style="background: rgba(53, 106, 230, 0.12); color: var(--secondary); width: 42px; height: 42px;">
            <i data-lucide="${career.icon}"></i>
          </div>
          <div>
            <span class="badge badge-secondary" style="margin-bottom: 4px;">${career.category}</span>
            <h3 class="modal-title">${career.title}</h3>
          </div>
        </div>
        <button class="modal-close" onclick="closeCareerModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1.05rem; margin-bottom: 8px; color: var(--primary);">Career Overview</h4>
          <p style="color: var(--text-muted); line-height: 1.65; font-size: 0.95rem;">${career.overview}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; background: var(--bg-main); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Average Salary</div>
            <div style="font-size: 1rem; font-weight: 700; color: var(--success);">${career.averageSalary}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Industry Outlook</div>
            <div style="font-size: 0.95rem; font-weight: 600; color: var(--secondary);">${career.jobOutlook}</div>
          </div>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; color: var(--primary);">Educational Pathway & Qualifications</h4>
          <p style="font-size: 0.92rem; color: var(--text-main); background: #FFFFFF; border: 1px solid var(--border-color); padding: 12px 16px; border-radius: var(--radius-sm);">
            <i data-lucide="graduation-cap" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px; color: var(--secondary);"></i>
            ${career.qualifications}
          </p>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; color: var(--primary);">Core Technical & Soft Skills</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${career.skills.map(skill => `<span class="skill-tag" style="padding: 5px 12px; font-size: 0.82rem; background: #EEF2F6;">${skill}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; color: var(--primary);">Day in the Life & Key Responsibilities</h4>
          <ul style="padding-left: 20px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
            ${career.dailyResponsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; color: var(--primary);">Recommended Courses & Certifications</h4>
          <ul style="padding-left: 20px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
            ${career.courses.map(course => `<li>${course}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; color: var(--primary);">Career Progression & Top Recruiters</h4>
          <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 8px;"><strong>Ladder:</strong> ${career.opportunities}</p>
          <p style="font-size: 0.9rem; color: var(--text-main);"><strong>Recruiters:</strong> ${career.topRecruiters.join(', ')}</p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline btn-sm" onclick="closeCareerModal()">Close</button>
        <button class="btn btn-primary btn-sm" onclick="toggleSaveCareer('${career.id}'); closeCareerModal();">
          <i data-lucide="${isSaved ? 'bookmark-check' : 'bookmark'}"></i> ${isSaved ? 'Saved to Favorites' : 'Save Career'}
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeCareerModal();
  };

  if (window.lucide) lucide.createIcons();
}

function closeCareerModal() {
  const modal = document.getElementById('career-detail-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Update Top Navigation Bar according to Authentication State
function updateNavigationAuthUI() {
  const user = getCurrentUser();
  const navActions = document.querySelector('.nav-actions');
  const mobileActions = document.querySelector('.mobile-actions');

  if (!navActions) return;

  if (user) {
    const userHtml = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <a href="dashboard.html" class="btn btn-outline-primary btn-sm" style="display: flex; align-items: center; gap: 8px;">
          <i data-lucide="user-check"></i>
          <span>${user.fullName ? user.fullName.split(' ')[0] : 'Dashboard'}</span>
        </a>
        <button onclick="handleLogout()" class="btn btn-outline btn-sm" title="Log Out" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3);">
          <i data-lucide="log-out"></i>
          <span>Logout</span>
        </button>
      </div>
    `;

    navActions.innerHTML = userHtml;
    if (mobileActions) {
      mobileActions.innerHTML = `
        <a href="dashboard.html" class="btn btn-primary btn-full"><i data-lucide="layout-dashboard"></i> My Dashboard</a>
        <button onclick="handleLogout()" class="btn btn-outline btn-full" style="color: var(--danger); border-color: var(--danger);"><i data-lucide="log-out"></i> Logout</button>
      `;
    }
  } else {
    const guestHtml = `
      <a href="login.html" class="btn btn-outline btn-sm">Log In</a>
      <a href="register.html" class="btn btn-primary btn-sm">Register</a>
    `;

    navActions.innerHTML = guestHtml;
    if (mobileActions) {
      mobileActions.innerHTML = `
        <a href="login.html" class="btn btn-outline btn-full">Log In</a>
        <a href="register.html" class="btn btn-primary btn-full">Register Free</a>
      `;
    }
  }

  if (window.lucide) lucide.createIcons();
}

// Logout handler
function handleLogout() {
  clearCurrentUser();
  showToast('info', 'Logged Out', 'You have been successfully signed out.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

// Setup Mobile Navigation Menu
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) lucide.createIcons();
      }
    });

    // Close when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.setAttribute('data-lucide', 'menu');
        if (window.lucide) lucide.createIcons();
      });
    });
  }
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeDemoData();
  setupMobileMenu();
  updateNavigationAuthUI();
  updateBookmarkButtons();
  if (window.lucide) lucide.createIcons();
});
