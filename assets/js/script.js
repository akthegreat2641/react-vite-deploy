// College Categories Data
const collegeCategories = [
    { icon: '🌾', label: 'Agriculture', count: '5 Colleges' },
    { icon: '🎬', label: 'Animation', count: '12 Colleges' },
    { icon: '🏛️', label: 'Architecture', count: '425 Colleges' },
    { icon: '🎨', label: 'Arts', count: '4608 Colleges' },
    { icon: '✈️', label: 'Aviation', count: '4 Colleges' },
    { icon: '🛒', label: 'Commerce', count: '3127 Colleges' },
    { icon: '💻', label: 'Computer', count: '3143 Colleges' },
    { icon: '🦷', label: 'Dental', count: '285 Colleges' },
    { icon: '✏️', label: 'Design', count: '337 Colleges' },
    { icon: '🎓', label: 'Education', count: '4729 Colleges' },
    { icon: '⚙️', label: 'Engineering', count: '4135 Colleges' },
    { icon: '🏨', label: 'Hotel Management', count: '364 Colleges' },
    { icon: '⚖️', label: 'Law', count: '756 Colleges' },
    { icon: '👥', label: 'Management', count: '5499 Colleges' },
    { icon: '📻', label: 'Mass Communication', count: '328 Colleges' },
    { icon: '❤️', label: 'Medical', count: '859 Colleges' },
    { icon: '➕', label: 'Paramedical', count: '349 Colleges' },
    { icon: '💊', label: 'Pharmacy', count: '930 Colleges' },
];

// Trending Exams Data
const examTabs = ['CLAT', 'CAT', 'NEET', 'JEE Main', 'JEE Advanced', 'WBJEE', 'CUET', 'AP EAMCET', 'TS EAMCET', 'TS LAWCET'];

const examsData = {
    'CLAT': [
        'CLAT 2026',
        'CLAT Mock Test 2026',
        'CLAT Exam Pattern 2026',
        'CLAT Exam Pattern 2026',
        'CLAT Exam Pattern 2026',
        'CLAT Exam Pattern 2026',
    ],
    'CAT': [
        'CAT Syllabus 2025',
        'CAT Exam Pattern 2025',
        'CAT Mock Test 2025',
        'CAT 2025',
        'NEET Mock Test 2025',
        'TS LAWCET Exam Dates 2025',
    ],
    'NEET': [
        'NEET Syllabus 2025',
        'NEET Exam Dates 2025',
        'JEE Main Mock Test 2025',
        'JEE Main Syllabus 2025',
        'JEE Main Exam Dates 2025',
        'JEE Advanced 2025',
    ],
    'JEE Main': [
        'JEE Main 2025',
        'JEE Main Syllabus 2025',
        'JEE Main Exam Dates 2025',
        'JEE Main Mock Test 2025',
        'JEE Main Admit Card 2025',
        'JEE Main Result 2025',
    ],
    'JEE Advanced': [
        'JEE Advanced 2025',
        'JEE Advanced Syllabus 2025',
        'JEE Advanced Exam Dates 2025',
        'JEE Advanced Mock Test 2025',
        'JEE Advanced Admit Card 2025',
        'JEE Advanced Result 2025',
    ],
    'WBJEE': [
        'WBJEE 2025',
        'WBJEE Syllabus 2025',
        'WBJEE Exam Dates 2025',
        'WBJEE Mock Test 2025',
        'WBJEE Admit Card 2025',
        'WBJEE Result 2025',
    ],
    'CUET': [
        'CUET 2025',
        'CUET Syllabus 2025',
        'CUET Exam Dates 2025',
        'CUET Mock Test 2025',
        'CUET Admit Card 2025',
        'CUET Result 2025',
    ],
    'AP EAMCET': [
        'AP EAMCET 2025',
        'AP EAMCET Syllabus 2025',
        'AP EAMCET Exam Dates 2025',
        'AP EAMCET Mock Test 2025',
        'AP EAMCET Admit Card 2025',
        'AP EAMCET Result 2025',
    ],
    'TS EAMCET': [
        'TS EAMCET 2025',
        'TS EAMCET Syllabus 2025',
        'TS EAMCET Exam Dates 2025',
        'TS EAMCET Mock Test 2025',
        'TS EAMCET Admit Card 2025',
        'TS EAMCET Result 2025',
    ],
    'TS LAWCET': [
        'TS LAWCET 2025',
        'TS LAWCET Syllabus 2025',
        'TS LAWCET Exam Dates 2025',
        'TS LAWCET Mock Test 2025',
        'TS LAWCET Admit Card 2025',
        'TS LAWCET Result 2025',
    ],
};

// Trending Courses Data
const courseTabs = ['B.Ed', 'BBA', 'BCA', 'BCom', 'MBA in Finance', 'MCA', 'BSc Nursing', 'MBA', 'BTech', 'BSc'];

const coursesData = [
    'BBA Admission',
    'BSc Nursing Jobs',
    'BSc Nursing Syllabus',
    'BSc Nursing Course',
    'MCA Jobs',
    'MCA Syllabus',
    'MCA Course',
    'MBA in Finance Jobs',
    'MBA in Finance Syllabus',
    'MBA in Finance Course',
    'BCom Specialization',
    'BCom Fees',
    'BCom Admission',
    'BSc Syllabus',
    'BSc Jobs',
    'BSc Admission',
    'BSc Fees',
    'BSc Specialization',
];

// School Exams Data
const schoolExamTabs = ['B.Ed', 'BBA', 'BCA', 'BCom', 'MBA in Finance', 'MCA', 'BSc Nursing', 'MBA', 'BTech', 'BSc'];

const schoolExamsData = [
    'Tamil Nadu Class 12th Time Table 2026',
    'Tamil Nadu Class 12th Hall Ticket 2026',
    'Tamil Nadu Class 12th Syllabus 2026',
    'Tamil Nadu Class 12th Preparation Tips 2026',
    'Tamil Nadu Class 10th Exam Pattern 2026',
    'Tamil Nadu Class 10th Time Table 2026',
    'Tamil Nadu Class 10th Hall Ticket 2026',
    'Tamil Nadu Class 10th Syllabus 2026',
    'TS Intermediate Exam Pattern 2026',
    'TS Intermediate Time Table 2026',
    'TS Intermediate Time Table 2026',
    'TS Intermediate Syllabus 2026',
    'TS Intermediate Preparation Tips 2026',
    'TS SSC Exam Pattern 2026',
    'TS SSC Time Table 2026',
    'TS SSC Hall Ticket 2026',
    'TS SSC Syllabus 2026',
    'Karnataka 2nd PUC Time Table 2026',
];

// Articles Data
const articleCategories = ['Agiculture', 'Animation', 'Architecture', 'Arts', 'Aviation', 'Commerce', 'Computer', 'Dental', 'Design', 'Education'];

const articlesData = [
    {
        title: 'Good Score in AIEEA UG 2024: Check Marks vs Rank, Cut off Trends',
        category: 'Agiculture',
        colleges: 5,
        image: 'public/college-building-with-green-lawn.jpg',
    },
    {
        title: 'Good Score in AIEEA UG 2024: Check Marks vs Rank, Cut off Trends',
        category: 'Agiculture',
        colleges: 5,
        image: 'public/college-building-with-green-lawn.jpg',
    },
    {
        title: 'Good Score in AIEEA UG 2024: Check Marks vs Rank, Cut off Trends',
        category: 'Agiculture',
        colleges: 5,
        image: 'public/college-building-with-green-lawn.jpg',
    },
    {
        title: 'Good Score in AIEEA UG 2024: Check Marks vs Rank, Cut off Trends',
        category: 'Agiculture',
        colleges: 5,
        image: 'public/college-building-with-green-lawn.jpg',
    },
];

// Scholarships Data
const scholarshipsData = [
    'Scholarships Offered by Country',
    'Country-Specific Scholarship Programs',
    'Scholarships Supporting Female Education',
    'Scholarships Supporting Female Education',
    'Scholarships for Reserved Categories',
    'Scholarships by Course Type',
    'Scholarships by Academic Discipline',
    'Scholarships by Academic Class',
];

// Popular Colleges Data
const collegesData = [
    {
        name: 'Kalinga University',
        location: 'Raipur, Chhattisgarh',
        image: 'public/kalinga-university-white-building-modern-architect.jpg',
        logo: 'public/kalinga-university-logo-red-gold-emblem.jpg',
    },
    {
        name: 'IIT Bombay',
        location: 'Raipur, Chhattisgarh',
        image: 'public/iit-bombay-main-building-golden-dome-architecture.jpg',
        logo: 'public/iit-bombay-logo-orange-emblem.jpg',
    },
    {
        name: 'IIT Kharagpur',
        location: 'Raipur, Chhattisgarh',
        image: 'public/iit-kharagpur-campus-building-clock-tower.jpg',
        logo: 'public/iit-kharagpur-logo-blue-white-emblem.jpg',
    },
    {
        name: 'IIT Kanpur',
        location: 'Raipur, Chhattisgarh',
        image: 'public/iit-kanpur-white-building-dome-palm-trees.jpg',
        logo: 'public/iit-kanpur-logo-orange-bird-emblem.jpg',
    },
];

// Latest News Data
const sideNewsData = [
    {
        title: 'NEET UGC Admit Card 2023 Expected Date: Last 3 Year Trends',
        author: 'Sudeshna Chakrabarti',
        date: 'Apr 28 2025',
        image: 'public/college-building-with-green-lawn.jpg',
    },
    {
        title: 'NEET UGC Admit Card 2023 Expected Date: Last 3 Year Trends',
        author: 'Sudeshna Chakrabarti',
        date: 'Apr 28 2025',
        image: 'public/college-building-with-green-lawn.jpg',
    },
    {
        title: 'NEET UGC Admit Card 2023 Expected Date: Last 3 Year Trends',
        author: 'Sudeshna Chakrabarti',
        date: 'Apr 28 2025',
        image: 'public/college-building-with-green-lawn.jpg',
    },
    {
        title: 'NEET UGC Admit Card 2023 Expected Date: Last 3 Year Trends',
        author: 'Sudeshna Chakrabarti',
        date: 'Apr 28 2025',
        image: 'public/college-building-with-green-lawn.jpg',
    },
];

// Testimonials Data
const testimonialsData = [
    {
        id: 1,
        name: 'Mridul Bindal',
        program: 'B.Tech CSE, Amity University Noida',
        quote: "I am Mridul Binal from Rudrapur, Uttarakhand. My experience at Amity University, Noida, in the B.Tech CSE program has been incredible. I got admitted in June 2022. Thank you, CollegeRefer.com, for guiding me toward the right path for my future.",
        image: 'public/young-indian-woman-professional-headshot.png',
    },
    {
        id: 2,
        name: 'Priya Sharma',
        program: 'MBA, IIM Bangalore',
        quote: 'CollegeRefer.com helped me find the perfect MBA program. The guidance I received was exceptional and helped me secure admission at IIM Bangalore.',
        image: 'public/indian-woman-with-glasses-professional-headshot.jpg',
    },
    {
        id: 3,
        name: 'Anjali Verma',
        program: 'B.Tech ECE, VIT Vellore',
        quote: 'Thanks to CollegeRefer.com, I found my dream college. The counselors were very helpful throughout my admission process.',
        image: 'public/young-indian-woman-smiling-white-top-headshot.jpg',
    },
    {
        id: 4,
        name: 'Sneha Patel',
        program: 'MBBS, AIIMS Delhi',
        quote: "The platform provided comprehensive information about medical colleges. I'm grateful for their support in my NEET journey.",
        image: 'public/indian-woman-curly-hair-smiling-headshot.jpg',
    },
    {
        id: 5,
        name: 'Fatima Khan',
        program: 'B.Des, NID Ahmedabad',
        quote: 'CollegeRefer.com made my design college search so much easier. Their personalized recommendations were spot on.',
        image: 'public/indian-woman-wearing-colorful-hijab-headshot.jpg',
    },
];

// State Management
let state = {
    activeFindTab: 'Colleges',
    activeExamTab: 'CLAT',
    activeCourseTab: 'B.Ed',
    activeSchoolExamTab: 'B.Ed',
    activeArticleCategory: 'Agiculture',
    activeCountry: 'CANADA',
    activeTestimonialIndex: 2,
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeFindSection();
    initializeExamSection();
    initializeCourseSection();
    initializeSchoolExamSection();
    initializeArticlesSection();
    initializeScholarshipsSection();
    initializeCollegesSection();
    initializeLatestNews();
    initializeTestimonials();
    initializeCountrySelection();
});

// Find Section
function initializeFindSection() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            state.activeFindTab = this.dataset.tab;
            renderCategories();
        });
    });
    
    renderCategories();
}

function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = collegeCategories.map(category => `
        <div class="category-item">
            <div class="category-icon">${category.icon}</div>
            <h3 class="category-label">${category.label}</h3>
            <p class="category-count">${category.count}</p>
        </div>
    `).join('');
}

// Exam Section
function initializeExamSection() {
    const examTabsContainer = document.getElementById('examTabs');
    const examsGrid = document.getElementById('examsGrid');
    
    if (examTabsContainer) {
        examTabsContainer.innerHTML = examTabs.map(tab => `
            <button class="exam-tab ${state.activeExamTab === tab ? 'active' : ''}" data-tab="${tab}">${tab}</button>
        `).join('');
        
        examTabsContainer.querySelectorAll('.exam-tab').forEach(btn => {
            btn.addEventListener('click', function() {
                state.activeExamTab = this.dataset.tab;
                examTabsContainer.querySelectorAll('.exam-tab').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderExams();
            });
        });
    }
    
    renderExams();
    
    // Carousel navigation
    const prevBtn = document.getElementById('examsPrev');
    const nextBtn = document.getElementById('examsNext');
    
    if (prevBtn) prevBtn.addEventListener('click', () => scrollExams('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollExams('next'));
}

function renderExams() {
    const examsGrid = document.getElementById('examsGrid');
    if (!examsGrid) return;
    
    const exams = examsData[state.activeExamTab] || examsData['CLAT'];
    
    examsGrid.innerHTML = exams.map(exam => `
        <div class="exam-card">
            <h3 class="exam-card-title">${exam}</h3>
            <div class="exam-card-bar"></div>
        </div>
    `).join('');
}

function scrollExams(direction) {
    const grid = document.getElementById('examsGrid');
    if (!grid) return;
    const scrollAmount = 300;
    grid.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
}

// Course Section
function initializeCourseSection() {
    const courseTabsContainer = document.getElementById('courseTabs');
    
    if (courseTabsContainer) {
        courseTabsContainer.innerHTML = courseTabs.map(tab => `
            <button class="course-tab ${state.activeCourseTab === tab ? 'active' : ''}" data-tab="${tab}">${tab}</button>
        `).join('');
        
        courseTabsContainer.querySelectorAll('.course-tab').forEach(btn => {
            btn.addEventListener('click', function() {
                state.activeCourseTab = this.dataset.tab;
                courseTabsContainer.querySelectorAll('.course-tab').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderCourses();
            });
        });
    }
    
    renderCourses();
    
    // Carousel navigation
    const prevBtn = document.getElementById('coursesPrev');
    const nextBtn = document.getElementById('coursesNext');
    
    if (prevBtn) prevBtn.addEventListener('click', () => scrollCourses('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollCourses('next'));
}

function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = coursesData.map(course => `
        <div class="course-card">
            <h3 class="course-card-title">${course}</h3>
            <div class="course-card-bar"></div>
        </div>
    `).join('');
}

function scrollCourses(direction) {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    const scrollAmount = 300;
    grid.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
}

// School Exam Section
function initializeSchoolExamSection() {
    const schoolExamTabsContainer = document.getElementById('schoolExamTabs');
    
    if (schoolExamTabsContainer) {
        schoolExamTabsContainer.innerHTML = schoolExamTabs.map(tab => `
            <button class="school-exam-tab ${state.activeSchoolExamTab === tab ? 'active' : ''}" data-tab="${tab}">${tab}</button>
        `).join('');
        
        schoolExamTabsContainer.querySelectorAll('.school-exam-tab').forEach(btn => {
            btn.addEventListener('click', function() {
                state.activeSchoolExamTab = this.dataset.tab;
                schoolExamTabsContainer.querySelectorAll('.school-exam-tab').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderSchoolExams();
            });
        });
    }
    
    renderSchoolExams();
    
    // Carousel navigation
    const prevBtn = document.getElementById('schoolExamsPrev');
    const nextBtn = document.getElementById('schoolExamsNext');
    
    if (prevBtn) prevBtn.addEventListener('click', () => scrollSchoolExams('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollSchoolExams('next'));
}

function renderSchoolExams() {
    const schoolExamsGrid = document.getElementById('schoolExamsGrid');
    if (!schoolExamsGrid) return;
    
    schoolExamsGrid.innerHTML = schoolExamsData.map(exam => `
        <div class="school-exam-card">
            <h3 class="school-exam-card-title">${exam}</h3>
            <div class="school-exam-card-bar"></div>
        </div>
    `).join('');
}

function scrollSchoolExams(direction) {
    const grid = document.getElementById('schoolExamsGrid');
    if (!grid) return;
    const scrollAmount = 300;
    grid.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
}

// Articles Section
function initializeArticlesSection() {
    const articleCategoriesContainer = document.getElementById('articleCategories');
    const recentArticlesContainer = document.getElementById('recentArticles');
    const popularArticlesContainer = document.getElementById('popularArticles');
    
    if (articleCategoriesContainer) {
        articleCategoriesContainer.innerHTML = articleCategories.map(cat => `
            <button class="article-category ${state.activeArticleCategory === cat ? 'active' : ''}" data-category="${cat}">${cat}</button>
        `).join('');
        
        articleCategoriesContainer.querySelectorAll('.article-category').forEach(btn => {
            btn.addEventListener('click', function() {
                state.activeArticleCategory = this.dataset.category;
                articleCategoriesContainer.querySelectorAll('.article-category').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderArticles();
            });
        });
    }
    
    renderArticles();
}

function renderArticles() {
    const recentArticlesContainer = document.getElementById('recentArticles');
    const popularArticlesContainer = document.getElementById('popularArticles');
    
    const renderArticleItem = (article) => `
        <div class="article-item">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <span class="article-badge">${article.category}</span>
                <h3 class="article-title">${article.title}</h3>
                <div class="article-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                    </svg>
                    <span>${article.colleges} Colleges</span>
                </div>
            </div>
        </div>
    `;
    
    if (recentArticlesContainer) {
        recentArticlesContainer.innerHTML = articlesData.map(article => renderArticleItem(article)).join('');
    }
    
    if (popularArticlesContainer) {
        popularArticlesContainer.innerHTML = articlesData.map(article => renderArticleItem(article)).join('');
    }
}

// Scholarships Section
function initializeScholarshipsSection() {
    const scholarshipsGrid = document.getElementById('scholarshipsGrid');
    if (!scholarshipsGrid) return;
    
    scholarshipsGrid.innerHTML = scholarshipsData.map(scholarship => `
        <div class="scholarship-card">
            <h3 class="scholarship-title">${scholarship}</h3>
        </div>
    `).join('');
}

// Colleges Section
function initializeCollegesSection() {
    const collegesGrid = document.getElementById('collegesGrid');
    if (!collegesGrid) return;
    
    collegesGrid.innerHTML = collegesData.map(college => `
        <div class="college-card">
            <div class="college-image-wrapper">
                <img src="${college.image}" alt="${college.name}" class="college-image">
                <div class="college-logo">
                    <div class="college-logo-wrapper">
                        <img src="${college.logo}" alt="${college.name} logo">
                    </div>
                </div>
            </div>
            <div class="college-info">
                <h3 class="college-name">${college.name}</h3>
                <div class="college-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p class="college-location-text">${college.location}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Carousel navigation
    const prevBtn = document.getElementById('collegesPrev');
    const nextBtn = document.getElementById('collegesNext');
    
    if (prevBtn) prevBtn.addEventListener('click', () => scrollColleges('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollColleges('next'));
}

function scrollColleges(direction) {
    const grid = document.getElementById('collegesGrid');
    if (!grid) return;
    const scrollAmount = 300;
    grid.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
}

// Latest News Section
function initializeLatestNews() {
    const sideNewsContainer = document.getElementById('sideNews');
    if (!sideNewsContainer) return;
    
    sideNewsContainer.innerHTML = sideNewsData.map(news => `
        <div class="side-news-item">
            <img src="${news.image}" alt="${news.title}">
            <div class="side-news-content">
                <h3 class="side-news-title">${news.title}</h3>
                <p class="side-news-author">${news.author}</p>
                <span class="side-news-date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    ${news.date}
                </span>
            </div>
        </div>
    `).join('');
}

// Testimonials Section
function initializeTestimonials() {
    renderTestimonial();
    
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (prevBtn) prevBtn.addEventListener('click', handleTestimonialPrev);
    if (nextBtn) nextBtn.addEventListener('click', handleTestimonialNext);
    
    renderTestimonialAvatars();
}

function handleTestimonialPrev() {
    state.activeTestimonialIndex = state.activeTestimonialIndex === 0 
        ? testimonialsData.length - 1 
        : state.activeTestimonialIndex - 1;
    renderTestimonial();
    renderTestimonialAvatars();
}

function handleTestimonialNext() {
    state.activeTestimonialIndex = state.activeTestimonialIndex === testimonialsData.length - 1 
        ? 0 
        : state.activeTestimonialIndex + 1;
    renderTestimonial();
    renderTestimonialAvatars();
}

function renderTestimonial() {
    const testimonial = testimonialsData[state.activeTestimonialIndex];
    const textEl = document.getElementById('testimonialText');
    const nameEl = document.getElementById('testimonialName');
    const programEl = document.getElementById('testimonialProgram');
    
    if (textEl) textEl.textContent = testimonial.quote;
    if (nameEl) nameEl.textContent = testimonial.name;
    if (programEl) programEl.textContent = testimonial.program;
}

function renderTestimonialAvatars() {
    const avatarsList = document.getElementById('avatarsList');
    if (!avatarsList) return;
    
    const getVisibleIndices = () => {
        const indices = [];
        for (let i = -2; i <= 2; i++) {
            let index = state.activeTestimonialIndex + i;
            if (index < 0) index = testimonialsData.length + index;
            if (index >= testimonialsData.length) index = index - testimonialsData.length;
            indices.push(index);
        }
        return indices;
    };
    
    const indices = getVisibleIndices();
    
    avatarsList.innerHTML = indices.map((index, i) => {
        const isCenter = i === 2;
        const testimonial = testimonialsData[index];
        return `
            <button class="testimonial-avatar ${isCenter ? 'center' : ''}" onclick="setTestimonialIndex(${index})">
                <img src="${testimonial.image}" alt="${testimonial.name}">
            </button>
        `;
    }).join('');
}

function setTestimonialIndex(index) {
    state.activeTestimonialIndex = index;
    renderTestimonial();
    renderTestimonialAvatars();
}

// Make function globally available
window.setTestimonialIndex = setTestimonialIndex;

// Country Selection
function initializeCountrySelection() {
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach(card => {
        card.addEventListener('click', function() {
            countryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            state.activeCountry = this.dataset.country;
        });
    });
}

// Stats Bar Scroll
document.addEventListener('DOMContentLoaded', function() {
    const statsPrev = document.getElementById('statsPrev');
    const statsNext = document.getElementById('statsNext');
    const statsContent = document.querySelector('.stats-content');
    
    if (statsPrev && statsContent) {
        statsPrev.addEventListener('click', () => {
            statsContent.scrollBy({ left: -200, behavior: 'smooth' });
        });
    }
    
    if (statsNext && statsContent) {
        statsNext.addEventListener('click', () => {
            statsContent.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
});

