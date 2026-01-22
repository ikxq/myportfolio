// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Modal Functionality
class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.init();
    }

    init() {
        // Open modal buttons
        document.querySelectorAll('[data-modal]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const modalId = button.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal(closeBtn.closest('.modal'));
            });
        });

        // Close on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                this.closeModal(overlay.closest('.modal'));
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Project card click handlers (open corresponding modal)
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
                this.style.cursor = 'pointer';
            });

            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });

            // Click card to open modal
            card.addEventListener('click', function(e) {
                // Don't open modal if clicking on a link or button
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }

                let modalId;
                if (index === 0) modalId = 'mazad-modal';
                else if (index === 1) modalId = 'shen-modal';
                else if (index === 2) modalId = 'cafeconnect-modal';

                if (modalId) {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        new ModalManager().openModal(modalId);
                    }
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Scroll modal content to top
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }

    closeModal(modal) {
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeAllModals() {
        this.modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// Initialize modal manager
document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add click animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary, .cta-button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic year in footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} My Portfolio. All rights reserved.`;
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
console.log('%c Looking for a developer? Let\'s connect! ', 'color: #667eea; font-size: 14px;');

// Typing Effect
const typingText = document.querySelector('.typing-text');
const textToType = 'Welcome to My Portfolio';
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing when page loads
setTimeout(typeText, 500);

// Enhanced Scroll Animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe project cards with stagger effect
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(card);
});

// Observe skill categories with stagger effect
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.15}s`;
    scrollObserver.observe(category);
});

// Animate skill bars when they come into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 300);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe skills section
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Scroll reveal for section titles
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// Scroll Progress Indicator
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
    }
});

// Animated Number Counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Floating Action Button
const fabButton = document.getElementById('fabButton');
const fabMenu = document.querySelector('.fab-menu');

if (fabButton) {
    fabButton.addEventListener('click', () => {
        fabButton.classList.toggle('active');
        fabMenu.classList.toggle('active');
    });
}

// Close FAB menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.fab-container') && fabMenu && fabMenu.classList.contains('active')) {
        fabButton.classList.remove('active');
        fabMenu.classList.remove('active');
    }
});

// Scroll to top button in FAB
const scrollToTopBtn = document.querySelector('.scroll-to-top');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        fabButton.classList.remove('active');
        fabMenu.classList.remove('active');
    });
}

// Close FAB menu when clicking any menu item
document.querySelectorAll('.fab-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        setTimeout(() => {
            fabButton.classList.remove('active');
            fabMenu.classList.remove('active');
        }, 300);
    });
});

// Animate stat icons on hover
document.querySelectorAll('.stat-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
});

// 3D Tilt Effect for Project Cards
function add3DTiltEffect(selector, intensity = 10, scale = 1.05) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / intensity;
            const rotateY = (centerX - x) / intensity;

            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(${scale}, ${scale}, ${scale})
            `;

            // Update shine effect position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            this.style.setProperty('--mouse-x', `${percentX}%`);
            this.style.setProperty('--mouse-y', `${percentY}%`);
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
            this.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `;
        });
    });
}

// Apply 3D tilt to project cards
add3DTiltEffect('.project-card', 10, 1.05);

// Apply subtle 3D tilt to skill categories
add3DTiltEffect('.skill-category', 15, 1.03);

// Apply subtle 3D tilt to stat items
add3DTiltEffect('.stat-item', 12, 1.02);

// Language Switching Functionality
const translations = {
    en: {
        // Navbar
        home: "Home",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        langButton: "عربي",

        // Hero Section
        heroTitle: "Welcome to My Portfolio",
        heroSubtitle: "Showcasing my best work in web and mobile development",
        ctaButton: "View My Work",

        // Stats Section
        statProjects: "Projects Completed",
        statTech: "Technologies Mastered",
        statUsers: "Happy Users",
        statCode: "Lines of Code",

        // Projects Section
        projectsTitle: "Featured Projects",
        projectsSubtitle: "Here are some of my recent projects",
        viewDetails: "View Details",
        viewProject: "View Project",
        github: "GitHub",

        // Skills Section
        skillsTitle: "Technical Skills",
        skillsSubtitle: "Technologies I work with",
        frontendDev: "Frontend Development",
        backendDev: "Backend Development",
        mobileDev: "Mobile Development",
        otherTech: "Other Technologies",

        // Contact Section
        contactTitle: "Get In Touch",
        contactSubtitle: "Let's work together on your next project",

        // Contact Form
        formNameLabel: "Your Name",
        formNamePlaceholder: "John Doe",
        formEmailLabel: "Your Email",
        formEmailPlaceholder: "john@example.com",
        formPhoneLabel: "Phone Number",
        formPhonePlaceholder: "+968 1234 5678",
        formProjectTypeLabel: "Project Type",
        formProjectTypePlaceholder: "Select a project type",
        formProjectTypeWeb: "Web Application",
        formProjectTypeMobile: "Mobile App",
        formProjectTypeBoth: "Both (Web & Mobile)",
        formMessageLabel: "Project Details",
        formMessagePlaceholder: "Tell me about your project...",
        formSubmitBtn: "Send Message",

        // Footer
        footerText: "My Portfolio. All rights reserved.",

        // Mazad Oman Project
        mazadTitle: "Mazad Oman",
        mazadSubtitle: "Online Car Auction Platform for Oman",
        mazadDesc: "An online car auction platform designed for the Omani market where users can upload car images and detailed information for sale. Features admin panel with email notifications, approval system, and built-in chat for buyer-seller communication.",
        mazadSection1Title: "Car Listing & Image Upload",
        mazadSection1Desc: "Users can easily upload car images and detailed information for sale. The platform is specifically designed for the Omani market, allowing sellers to showcase their vehicles with comprehensive details and multiple photos to attract potential buyers.",
        mazadSection2Title: "Email & Account Verification",
        mazadSection2Desc: "Secure account verification system that sends verification codes to users' email addresses. This ensures that all accounts are verified and authentic, protecting both buyers and sellers from fraudulent activity and maintaining platform integrity.",
        mazadSection3Title: "Admin Panel with Approval System",
        mazadSection3Desc: "Comprehensive admin dashboard for managing car listings. Admins can review, approve or reject submissions, ensuring quality control. Real-time notifications keep admins informed of new submissions requiring attention.",
        mazadSection4Title: "Built-in Chat System",
        mazadSection4Desc: "Real-time messaging system enabling direct communication between buyers and sellers. Features include message notifications, chat history, and user-friendly interface for seamless negotiation and inquiry handling.",
        techUsed: "Technologies Used",

        // Shen Project
        shenTitle: "Shen",
        shenSubtitle: "E-Commerce Platform for Home-Made Products",
        shenDesc: "An e-commerce website for selling home-made products such as sweets. Features separate customer and admin interfaces, order management system, product control, and daily income monitoring to simplify small business operations.",
        shenSection1Title: "User-Friendly Shopping Experience",
        shenSection1Desc: "Intuitive interface for customers to browse and purchase home-made sweets. Features include product search, detailed descriptions, shopping cart, and secure checkout process for a seamless buying experience.",
        shenSection2Title: "Admin Dashboard & Analytics",
        shenSection2Desc: "Powerful admin panel with comprehensive order management, product inventory control, and real-time sales analytics. Track daily income, manage customer orders, and monitor business performance all in one place.",
        shenSection3Title: "Real-Time Order Tracking",
        shenSection3Desc: "Live order status updates using Socket.io technology. Customers receive instant notifications about their order progress, while admins can efficiently manage and update order statuses in real-time.",

        // CafeConnect Project
        cafeTitle: "CafeConnect",
        cafeSubtitle: "Mobile App for Discovering Best Cafés",
        cafeDesc: "A mobile application that helps users find nearest cafés using Google Maps integration. Features QR code-based reward system where users scan codes to rate products and earn points redeemable for free drinks, with admin controls for café management.",
        cafeSection1Title: "Location-Based Café Discovery",
        cafeSection1Desc: "Integrated Google Maps functionality to help users discover nearby cafés. View café details, ratings, opening hours, and navigate with ease. Perfect for coffee lovers exploring new places.",
        cafeSection2Title: "QR Code Rewards & Rating System",
        cafeSection2Desc: "Innovative reward system where customers scan QR codes to rate products and earn loyalty points. Points can be redeemed for free drinks, encouraging customer engagement and feedback collection.",
        cafeSection3Title: "Admin Café Management",
        cafeSection3Desc: "Comprehensive admin interface for café owners to manage their listings, view customer feedback, track reward redemptions, and analyze ratings to improve their services and customer satisfaction."
    },
    ar: {
        // Navbar
        home: "الرئيسية",
        projects: "المشاريع",
        skills: "المهارات",
        contact: "تواصل",
        langButton: "English",

        // Hero Section
        heroTitle: "مرحباً بك في معرض أعمالي",
        heroSubtitle: "عرض أفضل أعمالي في تطوير الويب والتطبيقات",
        ctaButton: "شاهد أعمالي",

        // Stats Section
        statProjects: "مشاريع منجزة",
        statTech: "تقنيات متقنة",
        statUsers: "مستخدم سعيد",
        statCode: "سطر برمجي",

        // Projects Section
        projectsTitle: "المشاريع المميزة",
        projectsSubtitle: "إليك بعض من أحدث مشاريعي",
        viewDetails: "عرض التفاصيل",
        viewProject: "عرض المشروع",
        github: "جيت هاب",

        // Skills Section
        skillsTitle: "المهارات التقنية",
        skillsSubtitle: "التقنيات التي أعمل بها",
        frontendDev: "تطوير الواجهة الأمامية",
        backendDev: "تطوير الواجهة الخلفية",
        mobileDev: "تطوير تطبيقات الجوال",
        otherTech: "تقنيات أخرى",

        // Contact Section
        contactTitle: "تواصل معي",
        contactSubtitle: "دعنا نعمل معاً على مشروعك القادم",

        // Contact Form
        formNameLabel: "الاسم الكامل",
        formNamePlaceholder: "أحمد محمد",
        formEmailLabel: "البريد الإلكتروني",
        formEmailPlaceholder: "ahmed@example.com",
        formPhoneLabel: "رقم الهاتف",
        formPhonePlaceholder: "١٢٣٤ ٥٦٧٨ ٩٦٨+",
        formProjectTypeLabel: "نوع المشروع",
        formProjectTypePlaceholder: "اختر نوع المشروع",
        formProjectTypeWeb: "تطبيق ويب",
        formProjectTypeMobile: "تطبيق جوال",
        formProjectTypeBoth: "كلاهما (ويب وجوال)",
        formMessageLabel: "تفاصيل المشروع",
        formMessagePlaceholder: "أخبرني عن مشروعك...",
        formSubmitBtn: "إرسال الرسالة",

        // Footer
        footerText: "معرض أعمالي. جميع الحقوق محفوظة.",

        // Mazad Oman Project
        mazadTitle: "مزاد عُمان",
        mazadSubtitle: "منصة مزادات السيارات عبر الإنترنت في عُمان",
        mazadDesc: "منصة مزادات سيارات عبر الإنترنت مصممة للسوق العماني حيث يمكن للمستخدمين تحميل صور السيارات والمعلومات التفصيلية للبيع. تتميز بلوحة تحكم الإدارة مع إشعارات البريد الإلكتروني ونظام الموافقة ودردشة مدمجة للتواصل بين المشترين والبائعين.",
        mazadSection1Title: "قائمة السيارات وتحميل الصور",
        mazadSection1Desc: "يمكن للمستخدمين تحميل صور السيارات والمعلومات التفصيلية للبيع بسهولة. المنصة مصممة خصيصاً للسوق العماني، مما يتيح للبائعين عرض مركباتهم بتفاصيل شاملة وصور متعددة لجذب المشترين المحتملين.",
        mazadSection2Title: "التحقق من البريد الإلكتروني والحساب",
        mazadSection2Desc: "نظام تحقق آمن من الحساب يرسل رموز التحقق إلى عناوين البريد الإلكتروني للمستخدمين. هذا يضمن أن جميع الحسابات موثقة وأصلية، مما يحمي المشترين والبائعين من الأنشطة الاحتيالية ويحافظ على سلامة المنصة.",
        mazadSection3Title: "لوحة الإدارة مع نظام الموافقة",
        mazadSection3Desc: "لوحة تحكم إدارية شاملة لإدارة قوائم السيارات. يمكن للمسؤولين مراجعة الطلبات والموافقة عليها أو رفضها، مما يضمن مراقبة الجودة. الإشعارات الفورية تبقي المسؤولين على اطلاع بالطلبات الجديدة التي تتطلب الاهتمام.",
        mazadSection4Title: "نظام الدردشة المدمج",
        mazadSection4Desc: "نظام مراسلة فوري يتيح التواصل المباشر بين المشترين والبائعين. يتضمن ميزات إشعارات الرسائل وسجل الدردشة وواجهة سهلة الاستخدام للتفاوض السلس ومعالجة الاستفسارات.",
        techUsed: "التقنيات المستخدمة",

        // Shen Project
        shenTitle: "شن",
        shenSubtitle: "منصة تجارة إلكترونية للمنتجات المنزلية",
        shenDesc: "موقع للتجارة الإلكترونية لبيع المنتجات المنزلية مثل الحلويات. يتميز بواجهات منفصلة للعملاء والإدارة ونظام إدارة الطلبات والتحكم في المنتجات ومراقبة الدخل اليومي لتبسيط عمليات الأعمال الصغيرة.",
        shenSection1Title: "تجربة تسوق سهلة الاستخدام",
        shenSection1Desc: "واجهة بديهية للعملاء لتصفح وشراء الحلويات المنزلية. تتضمن الميزات البحث عن المنتجات والأوصاف التفصيلية وعربة التسوق وعملية دفع آمنة لتجربة شراء سلسة.",
        shenSection2Title: "لوحة الإدارة والتحليلات",
        shenSection2Desc: "لوحة تحكم إدارية قوية مع إدارة شاملة للطلبات والتحكم في مخزون المنتجات وتحليلات المبيعات في الوقت الفعلي. تتبع الدخل اليومي وإدارة طلبات العملاء ومراقبة أداء الأعمال كل ذلك في مكان واحد.",
        shenSection3Title: "تتبع الطلبات في الوقت الفعلي",
        shenSection3Desc: "تحديثات مباشرة لحالة الطلب باستخدام تقنية Socket.io. يتلقى العملاء إشعارات فورية حول تقدم طلباتهم، بينما يمكن للمسؤولين إدارة وتحديث حالات الطلبات بكفاءة في الوقت الفعلي.",

        // CafeConnect Project
        cafeTitle: "كافي كونكت",
        cafeSubtitle: "تطبيق جوال لاكتشاف أفضل المقاهي",
        cafeDesc: "تطبيق جوال يساعد المستخدمين في العثور على أقرب المقاهي باستخدام خرائط جوجل. يتميز بنظام مكافآت يعتمد على رمز الاستجابة السريعة حيث يقوم المستخدمون بمسح الرموز لتقييم المنتجات وكسب نقاط يمكن استبدالها بمشروبات مجانية، مع ضوابط إدارية لإدارة المقهى.",
        cafeSection1Title: "اكتشاف المقاهي القريبة",
        cafeSection1Desc: "وظيفة خرائط جوجل المتكاملة لمساعدة المستخدمين على اكتشاف المقاهي القريبة. عرض تفاصيل المقهى والتقييمات وساعات العمل والتنقل بسهولة. مثالي لمحبي القهوة الذين يستكشفون أماكن جديدة.",
        cafeSection2Title: "نظام المكافآت والتقييم بالباركود",
        cafeSection2Desc: "نظام مكافآت مبتكر حيث يقوم العملاء بمسح رموز الاستجابة السريعة لتقييم المنتجات وكسب نقاط الولاء. يمكن استبدال النقاط بمشروبات مجانية، مما يشجع على مشاركة العملاء وجمع التقييمات.",
        cafeSection3Title: "إدارة المقهى للمسؤولين",
        cafeSection3Desc: "واجهة إدارية شاملة لأصحاب المقاهي لإدارة قوائمهم وعرض ملاحظات العملاء وتتبع استرداد المكافآت وتحليل التقييمات لتحسين خدماتهم ورضا العملاء."
    }
};

let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update body direction
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update language button
    document.querySelector('.lang-text').textContent = t.langButton;

    // Update navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        const key = link.getAttribute('href').substring(1);
        link.textContent = t[key] || link.textContent;
    });

    // Update hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        // For Arabic, just set the text directly without typing animation
        // For English, use typing animation
        if (lang === 'ar') {
            typingText.textContent = t.heroTitle;
        } else {
            typingText.textContent = '';
            charIndex = 0;
            setTimeout(() => {
                startTypingAnimation(t.heroTitle);
            }, 500);
        }
    }

    document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
    document.querySelector('.cta-button').textContent = t.ctaButton;

    // Update stats section
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels[0].textContent = t.statProjects;
    statLabels[1].textContent = t.statTech;
    statLabels[2].textContent = t.statUsers;
    statLabels[3].textContent = t.statCode;

    // Update projects section
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    sectionTitles[0].textContent = t.projectsTitle;
    sectionSubtitles[0].textContent = t.projectsSubtitle;

    // Update skills section
    if (sectionTitles[1]) sectionTitles[1].textContent = t.skillsTitle;
    if (sectionSubtitles[1]) sectionSubtitles[1].textContent = t.skillsSubtitle;

    // Update skill categories
    const skillCategories = document.querySelectorAll('.skill-category h3');
    if (skillCategories[0]) skillCategories[0].textContent = t.frontendDev;
    if (skillCategories[1]) skillCategories[1].textContent = t.backendDev;
    if (skillCategories[2]) skillCategories[2].textContent = t.mobileDev;
    if (skillCategories[3]) skillCategories[3].textContent = t.otherTech;

    // Update contact section
    if (sectionTitles[2]) sectionTitles[2].textContent = t.contactTitle;
    if (sectionSubtitles[2]) sectionSubtitles[2].textContent = t.contactSubtitle;

    // Update contact form
    const formLabels = document.querySelectorAll('.form-label');
    const formInputs = document.querySelectorAll('.form-input');
    const formSubmitBtn = document.querySelector('.form-submit-btn .btn-text');

    if (formLabels[0]) formLabels[0].textContent = t.formNameLabel;
    if (formLabels[1]) formLabels[1].textContent = t.formEmailLabel;
    if (formLabels[2]) formLabels[2].textContent = t.formPhoneLabel;
    if (formLabels[3]) formLabels[3].textContent = t.formProjectTypeLabel;
    if (formLabels[4]) formLabels[4].textContent = t.formMessageLabel;

    if (formInputs[0]) formInputs[0].placeholder = t.formNamePlaceholder;
    if (formInputs[1]) formInputs[1].placeholder = t.formEmailPlaceholder;
    if (formInputs[2]) formInputs[2].placeholder = t.formPhonePlaceholder;
    if (formInputs[4]) formInputs[4].placeholder = t.formMessagePlaceholder;

    // Update project type dropdown options
    const projectTypeSelect = document.getElementById('projectType');
    if (projectTypeSelect) {
        projectTypeSelect.options[0].text = t.formProjectTypePlaceholder;
        projectTypeSelect.options[1].text = t.formProjectTypeWeb;
        projectTypeSelect.options[2].text = t.formProjectTypeMobile;
        projectTypeSelect.options[3].text = t.formProjectTypeBoth;
    }

    if (formSubmitBtn) formSubmitBtn.textContent = t.formSubmitBtn;

    // Update footer
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} ${t.footerText}`;
    }

    // Update buttons text
    document.querySelectorAll('.btn-primary').forEach((btn, index) => {
        if (index === 1) { // Shen project - View Project
            btn.textContent = t.viewProject;
        } else {
            btn.textContent = t.viewDetails;
        }
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.textContent = t.github;
    });

    // Update project card descriptions
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards[0]) { // Mazad
        projectCards[0].querySelector('.project-title').textContent = t.mazadTitle;
        projectCards[0].querySelector('.project-description').textContent = t.mazadDesc;
    }
    if (projectCards[1]) { // Shen
        projectCards[1].querySelector('.project-title').textContent = t.shenTitle;
        projectCards[1].querySelector('.project-description').textContent = t.shenDesc;
    }
    if (projectCards[2]) { // CafeConnect
        projectCards[2].querySelector('.project-title').textContent = t.cafeTitle;
        projectCards[2].querySelector('.project-description').textContent = t.cafeDesc;
    }

    // Update Mazad Oman modal content
    const mazadModal = document.getElementById('mazad-modal');
    if (mazadModal) {
        const mazadDetails = mazadModal;
        mazadDetails.querySelector('.detail-title').textContent = t.mazadTitle;
        mazadDetails.querySelector('.detail-subtitle').textContent = t.mazadSubtitle;
        const mazadSections = mazadDetails.querySelectorAll('.showcase-item');
        if (mazadSections[0]) {
            mazadSections[0].querySelector('h3').textContent = t.mazadSection1Title;
            mazadSections[0].querySelector('p').textContent = t.mazadSection1Desc;
        }
        if (mazadSections[1]) {
            mazadSections[1].querySelector('h3').textContent = t.mazadSection2Title;
            mazadSections[1].querySelector('p').textContent = t.mazadSection2Desc;
        }
        if (mazadSections[2]) {
            mazadSections[2].querySelector('h3').textContent = t.mazadSection3Title;
            mazadSections[2].querySelector('p').textContent = t.mazadSection3Desc;
        }
        if (mazadSections[3]) {
            mazadSections[3].querySelector('h3').textContent = t.mazadSection4Title;
            mazadSections[3].querySelector('p').textContent = t.mazadSection4Desc;
        }
        const mazadTechTitle = mazadDetails.querySelector('.tech-details h3');
        if (mazadTechTitle) mazadTechTitle.textContent = t.techUsed;
    }

    // Update Shen modal content
    const shenModal = document.getElementById('shen-modal');
    if (shenModal) {
        const shenDetails = shenModal;
        shenDetails.querySelector('.detail-title').textContent = t.shenTitle;
        shenDetails.querySelector('.detail-subtitle').textContent = t.shenSubtitle;
        const shenSections = shenDetails.querySelectorAll('.showcase-item');
        if (shenSections[0]) {
            shenSections[0].querySelector('h3').textContent = t.shenSection1Title;
            shenSections[0].querySelector('p').textContent = t.shenSection1Desc;
        }
        if (shenSections[1]) {
            shenSections[1].querySelector('h3').textContent = t.shenSection2Title;
            shenSections[1].querySelector('p').textContent = t.shenSection2Desc;
        }
        if (shenSections[2]) {
            shenSections[2].querySelector('h3').textContent = t.shenSection3Title;
            shenSections[2].querySelector('p').textContent = t.shenSection3Desc;
        }
        const shenTechTitle = shenDetails.querySelector('.tech-details h3');
        if (shenTechTitle) shenTechTitle.textContent = t.techUsed;
    }

    // Update CafeConnect modal content
    const cafeModal = document.getElementById('cafeconnect-modal');
    if (cafeModal) {
        const cafeDetails = cafeModal;
        cafeDetails.querySelector('.detail-title').textContent = t.cafeTitle;
        cafeDetails.querySelector('.detail-subtitle').textContent = t.cafeSubtitle;
        const cafeSections = cafeDetails.querySelectorAll('.showcase-item');
        if (cafeSections[0]) {
            cafeSections[0].querySelector('h3').textContent = t.cafeSection1Title;
            cafeSections[0].querySelector('p').textContent = t.cafeSection1Desc;
        }
        if (cafeSections[1]) {
            cafeSections[1].querySelector('h3').textContent = t.cafeSection2Title;
            cafeSections[1].querySelector('p').textContent = t.cafeSection2Desc;
        }
        if (cafeSections[2]) {
            cafeSections[2].querySelector('h3').textContent = t.cafeSection3Title;
            cafeSections[2].querySelector('p').textContent = t.cafeSection3Desc;
        }
        const cafeTechTitle = cafeDetails.querySelector('.tech-details h3');
        if (cafeTechTitle) cafeTechTitle.textContent = t.techUsed;
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

function startTypingAnimation(text) {
    const typingTextElement = document.querySelector('.typing-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

// Language toggle button
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        switchLanguage(newLang);
    });
}

// Load saved language preference on page load
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'en') {
        // Delay to allow initial typing animation to complete
        setTimeout(() => {
            switchLanguage(savedLang);
        }, 100);
    }
});

// EmailJS Configuration and Form Submission
(function() {
    // Initialize EmailJS with your public key
    emailjs.init('hRUMTuUifgkmuFkzx');
})();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.form-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formMessage = this.querySelector('.form-message');

        // Get form data
        const formData = {
            from_name: this.name.value,
            from_email: this.email.value,
            reply_to: this.email.value,
            phone: this.phone.value || 'Not provided',
            project_type: this.projectType.value,
            message: this.message.value
        };

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        formMessage.style.display = 'none';

        // Send email using EmailJS
        emailjs.send('service_604x7hg', 'template_aymjfmi', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                // Show success message
                formMessage.textContent = currentLang === 'ar'
                    ? 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.'
                    : 'Message sent successfully! I will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.style.display = 'block';
                    btnLoader.style.display = 'none';
                    formMessage.style.display = 'none';
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                console.log('Error details:', JSON.stringify(error));

                // Show error message with details
                const errorMsg = currentLang === 'ar'
                    ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل معي مباشرة عبر البريد الإلكتروني.'
                    : 'Failed to send message. Please try again or contact me directly via email.';

                formMessage.textContent = errorMsg + (error.text ? ` (${error.text})` : '');
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                // Reset button
                submitBtn.disabled = false;
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
            });
    });
}
