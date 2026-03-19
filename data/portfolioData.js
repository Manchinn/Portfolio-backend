// ============================================
// Portfolio Data - Centralized Data Store (Multi-language Support)
// ============================================

const portfolioData = {
    // Profile - separate for each language
    profile: {
        en: {
            name: "Chinnakrit Sripan",
            title: "Frontend Developer / Full-stack Developer",
            bio: "I'm a passionate React & Web Developer who loves building beautiful and functional web applications.",
            shortBio: "My Portfolio Website to showcase my projects and skills",
            location: "Thailand",
        },
        th: {
            name: "ชินกฤต (Chinnakrit Sripan)",
            title: "Frontend Developer / Full-stack Developer",
            bio: "นักพัฒนา React & Web Developer ที่มีความหลงใหลในการสร้างเว็บไซต์ที่สวยงามและใช้งานได้ดี",
            shortBio: "เว็บ Portfolio แสดงผลงานและทักษะของผม",
            location: "ประเทศไทย",
        },
        zh: {
            name: "Chinnakrit Sripan",
            title: "前端开发者 / 全栈开发者",
            bio: "我是一位热爱构建美观且实用的Web应用的React和Web开发者。",
            shortBio: "展示我的项目和技能的個人作品集網站",
            location: "泰国",
        }
    },

    // Common profile fields (not translated)
    profileCommon: {
        image: "/static/profile/profile2.jpeg",
        email: "chinnakrit.srp@gmail.com",
        phone: "+66 94 665 0259",
        resume: "/Chinnakrit-Sripan_CV.pdf"
    },

    // Skills - separate for each language
    skills: {
        en: [
            {
                category: "Frontend",
                items: [
                    { name: "React", level: "Advanced" },
                    { name: "JavaScript", level: "Advanced" },
                    { name: "Tailwind CSS", level: "Advanced" },
                    { name: "HTML/CSS", level: "Advanced" },
                    { name: "Responsive Design", level: "Advanced" }
                ]
            },
            {
                category: "Backend",
                items: [
                    { name: "Node.js", level: "Intermediate" },
                    { name: "Express.js", level: "Intermediate" },
                    { name: "MongoDB", level: "Intermediate" },
                    { name: "RESTful API", level: "Intermediate" }
                ]
            },
            {
                category: "Tools & Others",
                items: [
                    { name: "Git/GitHub", level: "Advanced" },
                    { name: "Vite", level: "Advanced" },
                    { name: "VS Code", level: "Advanced" },
                    { name: "Figma", level: "Intermediate" },
                    { name: "Docker", level: "Beginner" }
                ]
            },
            {
                category: "Languages",
                items: [
                    { name: "Thai", level: "Native" },
                    { name: "English", level: "Intermediate" }
                ]
            }
        ],
        th: [
            {
                category: "ส่วนหน้าเว็บ (Frontend)",
                items: [
                    { name: "React", level: "Advanced" },
                    { name: "JavaScript", level: "Advanced" },
                    { name: "Tailwind CSS", level: "Advanced" },
                    { name: "HTML/CSS", level: "Advanced" },
                    { name: "Responsive Design", level: "Advanced" }
                ]
            },
            {
                category: "ส่วนหลัง (Backend)",
                items: [
                    { name: "Node.js", level: "Intermediate" },
                    { name: "Express.js", level: "Intermediate" },
                    { name: "MongoDB", level: "Intermediate" },
                    { name: "RESTful API", level: "Intermediate" }
                ]
            },
            {
                category: "เครื่องมืออื่นๆ",
                items: [
                    { name: "Git/GitHub", level: "Advanced" },
                    { name: "Vite", level: "Advanced" },
                    { name: "VS Code", level: "Advanced" },
                    { name: "Figma", level: "Intermediate" },
                    { name: "Docker", level: "Beginner" }
                ]
            },
            {
                category: "ภาษา",
                items: [
                    { name: "ไทย", level: "Native" },
                    { name: "อังกฤษ", level: "Intermediate" }
                ]
            }
        ],
        zh: [
            {
                category: "前端开发",
                items: [
                    { name: "React", level: "Advanced" },
                    { name: "JavaScript", level: "Advanced" },
                    { name: "Tailwind CSS", level: "Advanced" },
                    { name: "HTML/CSS", level: "Advanced" },
                    { name: "响应式设计", level: "Advanced" }
                ]
            },
            {
                category: "后端开发",
                items: [
                    { name: "Node.js", level: "Intermediate" },
                    { name: "Express.js", level: "Intermediate" },
                    { name: "MongoDB", level: "Intermediate" },
                    { name: "RESTful API", level: "Intermediate" }
                ]
            },
            {
                category: "工具和其他",
                items: [
                    { name: "Git/GitHub", level: "Advanced" },
                    { name: "Vite", level: "Advanced" },
                    { name: "VS Code", level: "Advanced" },
                    { name: "Figma", level: "Intermediate" },
                    { name: "Docker", level: "Beginner" }
                ]
            },
            {
                category: "语言能力",
                items: [
                    { name: "泰语", level: "Native" },
                    { name: "英语", level: "Intermediate" }
                ]
            }
        ]
    },

    // Experiences - separate for each language
    experiences: {
        en: [
            {
                id: 1,
                year: "2024 - Present",
                position: "Frontend Developer",
                company: "Company Name",
                description: "Developed React applications and web interfaces for...",
                achievements: [
                    "Built responsive web application with 50,000+ users",
                    "Improved performance reducing load time by 40%",
                    "Worked with design team to implement UI/UX designs"
                ]
            },
            {
                id: 2,
                year: "2023 - 2024",
                position: "Junior Web Developer",
                company: "Previous Company",
                description: "Worked as a junior developer...",
                achievements: [
                    "Developed new features for web application",
                    "Performed unit testing and integration testing",
                    "Helped debug and fix bugs in the system"
                ]
            },
            {
                id: 3,
                year: "2022 - 2023",
                position: "Internship",
                company: "Internship Company",
                description: "Learned web development fundamentals",
                achievements: [
                    "Completed internship program successfully",
                    "Built graduation project",
                    "Received certificate"
                ]
            }
        ],
        th: [
            {
                id: 1,
                year: "2024 - ปัจจุบัน",
                position: "Frontend Developer",
                company: "ชื่อบริษัท",
                description: "พัฒนา React applications และ web interfaces สำหรับ...",
                achievements: [
                    "สร้าง responsive web application ที่ใช้ 50,000+ users",
                    "ปรับปรุง performance ลด load time 40%",
                    "ทำงานร่วม design team เพื่อ implement UI/UX designs"
                ]
            },
            {
                id: 2,
                year: "2023 - 2024",
                position: "Junior Web Developer",
                company: "บริษัทเดิม",
                description: "ปฏิบัติงานเป็น junior developer ทำ...",
                achievements: [
                    "พัฒนา features ใหม่ๆ เพื่อ web application",
                    "ทำ unit testing และ integration testing",
                    "ช่วย debug และ fix bugs ในโปรแกรม"
                ]
            },
            {
                id: 3,
                year: "2022 - 2023",
                position: "Internship",
                company: "บริษัทฝึกงาน",
                description: "ได้เรียนรู้ web development fundamentals",
                achievements: [
                    "จบ internship program successfully",
                    "ทำโปรเจคจบปริญญา",
                    "ได้รับ certificate"
                ]
            }
        ],
        zh: [
            {
                id: 1,
                year: "2024 - 至今",
                position: "前端开发者",
                company: "公司名称",
                description: "开发React应用和网页界面...",
                achievements: [
                    "构建了拥有50,000+用户的响应式网页应用",
                    "优化性能，减少加载时间40%",
                    "与设计团队合作实施UI/UX设计"
                ]
            },
            {
                id: 2,
                year: "2023 - 2024",
                position: "初级网页开发者",
                company: "前公司",
                description: "担任初级开发者...",
                achievements: [
                    "为网页应用开发新功能",
                    "进行单元测试和集成测试",
                    "帮助调试和修复系统中的bug"
                ]
            },
            {
                id: 3,
                year: "2022 - 2023",
                position: "实习",
                company: "实习公司",
                description: "学习网页开发基础知识",
                achievements: [
                    "成功完成实习项目",
                    "完成毕业项目",
                    "获得证书"
                ]
            }
        ]
    },

    // Projects - separate for each language
    projects: {
        en: [
            {
                id: 1,
                title: "CS Logbook System",
                description: "Logbook system for university students",
                longDescription: "A logbook system designed for university students to track their work and progress.",
                tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
                image: "https://placehold.co/600x400/3b82f6/ffffff?text=CS+Logbook",
                github: "https://github.com/yourusername/cs-logbook",
                demo: "https://cs-logbook-demo.vercel.app",
                date: "2024",
                category: "Web App",
                highlights: [
                    "Designed database schema",
                    "Created authentication system",
                    "Built dashboard for statistics"
                ]
            },
            {
                id: 2,
                title: "Shoe Store E-commerce",
                description: "Online shoe store",
                longDescription: "E-commerce website for selling shoes with payment integration.",
                tech: ["React", "Stripe API", "MongoDB", "Node.js", "Tailwind CSS"],
                image: "https://placehold.co/600x400/f59e0b/000000?text=Shoe+Store",
                github: "https://github.com/yourusername/shoe-store",
                demo: "https://shoe-store-demo.vercel.app",
                date: "2024",
                category: "E-commerce",
                highlights: [
                    "Stripe payment integration",
                    "Cart and checkout system",
                    "Inventory management"
                ]
            },
            {
                id: 3,
                title: "Personal Portfolio Website",
                description: "Neo-Brutalism style portfolio",
                longDescription: "Personal portfolio website designed with Neo-Brutalism style.",
                tech: ["React", "Tailwind CSS", "Vite", "React Router"],
                image: "https://placehold.co/600x400/ec4899/ffffff?text=Portfolio",
                github: "https://github.com/yourusername/portfolio",
                demo: "https://your-portfolio.vercel.app",
                date: "2024",
                category: "Portfolio",
                highlights: [
                    "Responsive design",
                    "Smooth scrolling",
                    "Contact form",
                    "SEO optimized"
                ]
            }
        ],
        th: [
            {
                id: 1,
                title: "CS Logbook System",
                description: "ระบบบันทึกงานภาควิชาสำหรับนักศึกษา",
                longDescription: "ระบบการบันทึกงาน (Logbook) ที่ออกแบบมาสำหรับนักศึกษาภาควิชา",
                tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
                image: "https://placehold.co/600x400/3b82f6/ffffff?text=CS+Logbook",
                github: "https://github.com/yourusername/cs-logbook",
                demo: "https://cs-logbook-demo.vercel.app",
                date: "2024",
                category: "Web App",
                highlights: [
                    "ออกแบบ database schema",
                    "สร้าง authentication system",
                    "ทำ dashboard สำหรับแสดงผลสถิติ"
                ]
            },
            {
                id: 2,
                title: "Shoe Store E-commerce",
                description: "เว็บร้านขายรองเท้าออนไลน์",
                longDescription: "โปรเจคเว็บ e-commerce สำหรับขายรองเท้า",
                tech: ["React", "Stripe API", "MongoDB", "Node.js", "Tailwind CSS"],
                image: "https://placehold.co/600x400/f59e0b/000000?text=Shoe+Store",
                github: "https://github.com/yourusername/shoe-store",
                demo: "https://shoe-store-demo.vercel.app",
                date: "2024",
                category: "E-commerce",
                highlights: [
                    "ชำระเงินผ่าน Stripe",
                    "ระบบ cart และ checkout",
                    "ระบบจัดการ inventory"
                ]
            },
            {
                id: 3,
                title: "Personal Portfolio Website",
                description: "เว็บแนะนำตัวสไตล์ Neo-Brutalism",
                longDescription: "โปรเจค Portfolio ส่วนตัวที่ออกแบบด้วย Neo-Brutalism style",
                tech: ["React", "Tailwind CSS", "Vite", "React Router"],
                image: "https://placehold.co/600x400/ec4899/ffffff?text=Portfolio",
                github: "https://github.com/yourusername/portfolio",
                demo: "https://your-portfolio.vercel.app",
                date: "2024",
                category: "Portfolio",
                highlights: [
                    "Responsive design",
                    "Smooth scrolling",
                    "Contact form",
                    "SEO optimized"
                ]
            }
        ],
        zh: [
            {
                id: 1,
                title: "CS日志系统",
                description: "大学生工作记录系统",
                longDescription: "为大学生设计的工作记录系统，用于跟踪他们的学习和工作进度。",
                tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
                image: "https://placehold.co/600x400/3b82f6/ffffff?text=CS+Logbook",
                github: "https://github.com/yourusername/cs-logbook",
                demo: "https://cs-logbook-demo.vercel.app",
                date: "2024",
                category: "Web应用",
                highlights: [
                    "设计数据库结构",
                    "创建认证系统",
                    "构建统计仪表板"
                ]
            },
            {
                id: 2,
                title: "鞋店电商",
                description: "在线鞋店",
                longDescription: "支持支付的在线鞋店电商网站。",
                tech: ["React", "Stripe API", "MongoDB", "Node.js", "Tailwind CSS"],
                image: "https://placehold.co/600x400/f59e0b/000000?text=Shoe+Store",
                github: "https://github.com/yourusername/shoe-store",
                demo: "https://shoe-store-demo.vercel.app",
                date: "2024",
                category: "电商",
                highlights: [
                    "Stripe支付集成",
                    "购物车和结账系统",
                    "库存管理"
                ]
            },
            {
                id: 3,
                title: "个人作品集网站",
                description: "新粗野主义风格作品集",
                longDescription: "采用新粗野主义风格设计的个人作品集网站。",
                tech: ["React", "Tailwind CSS", "Vite", "React Router"],
                image: "https://placehold.co/600x400/ec4899/ffffff?text=Portfolio",
                github: "https://github.com/yourusername/portfolio",
                demo: "https://your-portfolio.vercel.app",
                date: "2024",
                category: "作品集",
                highlights: [
                    "响应式设计",
                    "平滑滚动",
                    "联系表单",
                    "SEO优化"
                ]
            }
        ]
    },

    // Socials - same for all languages
    socials: [
        {
            name: "GitHub",
            url: "https://github.com/Manchinn",
            icon: "github",
            color: "hover:text-gray-800"
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/chinnakrit-sripan-4674a436a",
            icon: "linkedin",
            color: "hover:text-blue-600"
        },
        {
            name: "Email",
            url: "mailto:chinnakrit.srp@gmail.com",
            icon: "mail",
            color: "hover:text-red-600"
        },
        {
            name: "Phone",
            url: "tel:+66946650259",
            icon: "phone",
            color: "hover:text-green-600"
        },
        {
            name: "Twitter",
            url: "https://twitter.com/Manchinn",
            icon: "twitter",
            color: "hover:text-blue-400"
        }
    ],

    // Notifications - separate for each language
    notifications: {
        en: [
            { id: 1, type: "success", title: "Portfolio Launched!", message: "My personal portfolio website is now live. Check it out and feel free to reach out!", date: "2026-03-15", read: false },
            { id: 2, type: "info", title: "New Article Published", message: "I just published a new article: 'Portfolio Website Techniques Overview'. Give it a read!", date: "2026-03-02", read: false },
            { id: 3, type: "success", title: "New Project Added", message: "CS Logbook System has been added to the projects section. Check out the details and demo!", date: "2025-12-20", read: false },
            { id: 4, type: "warning", title: "Site Maintenance", message: "Brief maintenance scheduled on March 20, 2026. The site may be unavailable for a short period.", date: "2026-03-10", read: false },
            { id: 5, type: "info", title: "Open to Opportunities", message: "I am currently open to new job opportunities and freelance projects. Feel free to contact me!", date: "2026-01-01", read: false }
        ],
        th: [
            { id: 1, type: "success", title: "เปิดตัว Portfolio แล้ว!", message: "เว็บ Portfolio ส่วนตัวของผมเปิดตัวแล้ว ลองเข้าชมและติดต่อผมได้เลย!", date: "2026-03-15", read: false },
            { id: 2, type: "info", title: "บทความใหม่เผยแพร่แล้ว", message: "ผมเพิ่งเผยแพร่บทความใหม่: 'ภาพรวมเทคนิคการสร้างเว็บ Portfolio' ลองอ่านดูนะครับ!", date: "2026-03-02", read: false },
            { id: 3, type: "success", title: "เพิ่มโปรเจคใหม่แล้ว", message: "CS Logbook System ถูกเพิ่มเข้าในส่วนโปรเจคแล้ว ลองดูรายละเอียดและ demo ได้เลย!", date: "2025-12-20", read: false },
            { id: 4, type: "warning", title: "ปิดปรับปรุงระบบ", message: "มีกำหนดปิดปรับปรุงระบบในวันที่ 20 มีนาคม 2026 เว็บอาจไม่สามารถเข้าใช้งานได้ชั่วคราว", date: "2026-03-10", read: false },
            { id: 5, type: "info", title: "พร้อมรับโอกาสใหม่", message: "ผมพร้อมรับงานประจำและงาน freelance ใหม่ๆ ติดต่อผมได้เลยนะครับ!", date: "2026-01-01", read: false }
        ],
        zh: [
            { id: 1, type: "success", title: "作品集已上线！", message: "我的个人作品集网站现已正式上线，欢迎访问并与我联系！", date: "2026-03-15", read: false },
            { id: 2, type: "info", title: "新文章已发布", message: "我刚刚发布了一篇新文章：《作品集网站技术概览》，欢迎阅读！", date: "2026-03-02", read: false },
            { id: 3, type: "success", title: "新项目已添加", message: "CS日志系统已添加到项目板块，欢迎查看详情和演示！", date: "2025-12-20", read: false },
            { id: 4, type: "warning", title: "网站维护通知", message: "计划于2026年3月20日进行短暂维护，届时网站可能暂时无法访问。", date: "2026-03-10", read: false },
            { id: 5, type: "info", title: "欢迎工作机会", message: "我目前正在寻找新的工作机会和自由职业项目，欢迎随时联系我！", date: "2026-01-01", read: false }
        ]
    },

    // Articles/Blog - separate for each language
    articles: {
        en: [
            {
                id: 1,
                slug: "portfolio-techniques-overview",
                title: "Portfolio Website Techniques Overview",
                excerpt: "A comprehensive guide to the techniques used in building this portfolio website - React, Tailwind CSS, i18n, and more.",
                content: `## Introduction

This portfolio website is built using modern web development techniques. Here's a detailed breakdown of each technology and approach used.

## 1. React + Vite

The frontend is built with React, a popular JavaScript library for building user interfaces. We use Vite as the build tool because it's extremely fast and provides instant server start.

### Key Benefits:
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Simple configuration

## 2. Tailwind CSS

We use Tailwind CSS for styling - a utility-first CSS framework that allows rapid UI development.

### Why Tailwind?
- No need to write custom CSS files
- Consistent design system
- Easy responsive design
- Small bundle size (purges unused styles)

## 3. Custom Hooks

We created a custom hook called \`usePortfolioData\` to handle data fetching across the application.

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

This pattern allows reusable data fetching logic across all components.

## 4. Internationalization (i18n)

The website supports 3 languages: English, Thai, and Chinese. We implemented a custom i18n solution using context and localStorage.

### Features:
- Language switcher in navbar
- Persists language preference
- All text translatable

## 5. Service Layer Pattern

We separated API calls from components using a service layer:

- \`api.js\` - Low-level API functions
- \`portfolioService.js\` - Business logic layer

This makes the code more maintainable and testable.

## 6. Neo-Brutalism Design

The UI follows Neo-Brutalism style with:
- Bold black borders (4px)
- Hard shadows (no blur)
- Vibrant colors
- Comic/sans-serif fonts

## 7. Component Architecture

We organized components into:
- \`components/Sections\` - Page sections (About, Skills, Projects, etc.)
- \`components/ui\` - Reusable UI components
- \`components/layout\` - Layout components (Navbar, Footer)
- \`hooks\` - Custom React hooks
- \`services\` - API and business logic
- \`i18n\` - Internationalization

## Conclusion

These techniques combine to create a fast, maintainable, and visually distinctive portfolio website.`,
                coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
                tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
                category: "Development",
                readTime: "8 min read",
                date: "2026-03-02",
                featured: true
            },
            {
                id: 3,
                slug: "react-best-practices-2024",
                title: "React Best Practices for 2024",
                excerpt: "Essential React best practices that every developer should know in 2024.",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
                tags: ["React", "JavaScript", "Best Practices"],
                category: "Development",
                readTime: "5 min read",
                date: "2024-12-15",
                featured: true
            },
            {
                id: 4,
                slug: "tailwind-css-tips",
                title: "Tailwind CSS Tips & Tricks",
                excerpt: "Learn how to use Tailwind CSS more effectively with these tips.",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
                tags: ["Tailwind", "CSS", "Frontend"],
                category: "Tutorial",
                readTime: "3 min read",
                date: "2024-11-20",
                featured: false
            },
            {
                id: 5,
                slug: "portfolio-development-journey",
                title: "My Portfolio Development Journey",
                excerpt: "How I built this portfolio website from scratch.",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
                tags: ["Portfolio", "React", "Vite"],
                category: "Story",
                readTime: "7 min read",
                date: "2024-10-10",
                featured: true
            }
        ],
        th: [
            {
                id: 1,
                slug: "portfolio-techniques-overview",
                title: "ภาพรวมเทคนิคการสร้างเว็บ Portfolio",
                excerpt: "คู่มือที่ครอบคลุมเกี่ยวกับเทคนิคที่ใช้ในการสร้างเว็บ Portfolio นี้ - React, Tailwind CSS, i18n และอื่นๆ",
                content: `## บทนำ

เว็บ Portfolio นี้สร้างขึ้นโดยใช้เทคนิคการพัฒนาเว็บสมัยใหม่ ต่อไปนี้คือรายละเอียดของแต่ละเทคโนโลยีและวิธีการที่ใช้

## 1. React + Vite

Frontend สร้างด้วย React ซึ่งเป็นไลบรารี JavaScript ยอดนิยมสำหรับสร้างส่วนติดต่อผู้ใช้ เราใช้ Vite เป็นเครื่องมือ build เพราะมันเร็วมากและให้การเริ่มต้น server ทันที

### ข้อดีหลัก:
- HMR (Hot Module Replacement) ที่รวดเร็ว
- Build production ที่ได้รับการ optimize
- การตั้งค่าที่ง่าย

## 2. Tailwind CSS

เราใช้ Tailwind CSS สำหรับ styling - framework CSS ที่เน้น utility-first ช่วยให้พัฒนา UI ได้รวดเร็ว

### ทำไมต้อง Tailwind?
- ไม่ต้องเขียนไฟล์ CSS เอง
- ระบบ design ที่สม่ำเสมอ
- ทำ responsive design ได้ง่าย
- ขนาด bundle เล็ก (ลบ styles ที่ไม่ได้ใช้ออก)

## 3. Custom Hooks

เราสร้าง custom hook ชื่อ \`usePortfolioData\` สำหรับจัดการดึงข้อมูลทั่วทั้งแอป

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

รูปแบบนี้ทำให้ logic การดึงข้อมูลสามารถ reuse ได้ในทุก components

## 4. Internationalization (i18n)

เว็บรองรับ 3 ภาษา: อังกฤษ, ไทย และจีน เราใช้ i18n แบบกำหนดเองโดยใช้ context และ localStorage

### คุณสมบัติ:
- ปุ่มเปลี่ยนภาษาใน navbar
- บันทึกการตั้งค่าภาษา
- แปลได้ทุกข้อความ

## 5. Service Layer Pattern

เราแยก API calls ออกจาก components โดยใช้ service layer:

- \`api.js\` - ฟังก์ชัน API ระดับต่ำ
- \`portfolioService.js\` - layer สำหรับ business logic

ทำให้โค้ดมีความสามารถในการดูแลรักษาและทดสอบได้ดีขึ้น

## 6. Neo-Brutalism Design

UI ใช้สไตล์ Neo-Brutalism มี:
- ขอบดำหนา (4px)
- เงาแข็ง (ไม่มี blur)
- สีสดใส
- ฟอนต์ sans-serif

## 7. สถาปัตยกรรม Component

เราจัดระเบียบ components เป็น:
- \`components/Sections\` - ส่วนต่างๆ ของหน้า (About, Skills, Projects และอื่นๆ)
- \`components/ui\` - UI components ที่ใช้ซ้ำได้
- \`components/layout\` - components สำหรับ layout (Navbar, Footer)
- \`hooks\` - React hooks ที่กำหนดเอง
- \`services\` - API และ business logic
- \`i18n\` - การแปลภาษา

## สรุป

เทคนิคเหล่านี้รวมกันเพื่อสร้างเว็บ Portfolio ที่เร็ว ดูแลรักษาได้ และมีดีไซน์ที่โดดเด่น`,
                coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
                tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
                category: "Development",
                readTime: "8 นาที",
                date: "2026-03-02",
                featured: true
            },
            {
                id: 3,
                slug: "react-best-practices-2024",
                title: "แนวปฏิบัติที่ดีที่สุดของ React ในปี 2024",
                excerpt: "แนวปฏิบัติที่ดีที่สุดของ React ที่ทุกคนควรรู้ในปี 2024",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
                tags: ["React", "JavaScript", "Best Practices"],
                category: "Development",
                readTime: "5 นาที",
                date: "2024-12-15",
                featured: true
            },
            {
                id: 4,
                slug: "tailwind-css-tips",
                title: "เทคนิค Tailwind CSS ที่ควรรู้",
                excerpt: "เรียนรู้วิธีใช้ Tailwind CSS ให้มีประสิทธิภาพมากขึ้น",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
                tags: ["Tailwind", "CSS", "Frontend"],
                category: "Tutorial",
                readTime: "3 นาที",
                date: "2024-11-20",
                featured: false
            },
            {
                id: 5,
                slug: "portfolio-development-journey",
                title: "การพัฒนาเว็บ Portfolio ของผม",
                excerpt: "วิธีที่ผมสร้างเว็บ Portfolio นี้ตั้งแต่เริ่มต้น",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
                tags: ["Portfolio", "React", "Vite"],
                category: "Story",
                readTime: "7 นาที",
                date: "2024-10-10",
                featured: true
            }
        ],
        zh: [
            {
                id: 1,
                slug: "portfolio-techniques-overview",
                title: "作品集网站技术概览",
                excerpt: "构建此作品集网站所使用的技术综合指南 - React、Tailwind CSS、i18n 等。",
                content: `## 简介

这个作品集网站采用现代网页开发技术构建。以下是所使用每种技术和方法的详细说明。

## 1. React + Vite

前端使用 React 构建，这是一个流行的 JavaScript 库，用于构建用户界面。我们使用 Vite 作为构建工具，因为它非常快速并能即时启动服务器。

### 主要优势：
- 快速的 HMR（热模块替换）
- 优化的生产构建
- 简单的配置

## 2. Tailwind CSS

我们使用 Tailwind CSS 进行样式设计——一个实用优先的 CSS 框架，可快速开发用户界面。

### 为什么选择 Tailwind？
- 不需要编写自定义 CSS 文件
- 一致的设计系统
- 简单的响应式设计
- 小体积（清除未使用的样式）

## 3. Custom Hooks

我们创建了一个名为 \`usePortfolioData\` 的自定义钩子来处理整个应用程序的数据获取。

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

这种模式允许在所有组件中重用数据获取逻辑。

## 4. Internationalization (i18n)

网站支持 3 种语言：英语、泰语和中文。我们使用上下文和 localStorage 实现了自定义 i18n 解决方案。

### 功能：
- 导航栏中的语言切换器
- 保存语言偏好设置
- 所有文本可翻译

## 5. Service Layer Pattern

我们使用服务层将 API 调用与组件分离：

- \`api.js\` - 底层 API 函数
- \`portfolioService.js\` - 业务逻辑层

这使代码更易于维护和测试。

## 6. Neo-Brutalism Design

UI 采用 Neo-Brutalism 风格：
- 粗黑边框（4px）
- 硬阴影（无模糊）
- 鲜艳的颜色
- 无衬线字体

## 7. 组件架构

我们将组件组织为：
- \`components/Sections\` - 页面部分（关于、技能、项目等）
- \`components/ui\` - 可重用的 UI 组件
- \`components/layout\` - 布局组件（导航栏、页脚）
- \`hooks\` - 自定义 React 钩子
- \`services\` - API 和业务逻辑
- \`i18n\` - 国际化

## 结论

这些技术结合在一起，创造了一个快速、易于维护且视觉独特的作品集网站。`,
                coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
                tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
                category: "Development",
                readTime: "8分钟阅读",
                date: "2026-03-02",
                featured: true
            },
            {
                id: 3,
                slug: "react-best-practices-2024",
                title: "2024年React最佳实践",
                excerpt: "2024年每个开发者都应该知道的React最佳实践。",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
                tags: ["React", "JavaScript", "Best Practices"],
                category: "Development",
                readTime: "5分钟阅读",
                date: "2024-12-15",
                featured: true
            },
            {
                id: 4,
                slug: "tailwind-css-tips",
                title: "Tailwind CSS技巧和窍门",
                excerpt: "学习如何更有效地使用Tailwind CSS。",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
                tags: ["Tailwind", "CSS", "Frontend"],
                category: "Tutorial",
                readTime: "3分钟阅读",
                date: "2024-11-20",
                featured: false
            },
            {
                id: 5,
                slug: "portfolio-development-journey",
                title: "我的作品集开发历程",
                excerpt: "我是如何从头开始构建这个作品集网站的。",
                content: "Full article content here...",
                coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
                tags: ["Portfolio", "React", "Vite"],
                category: "Story",
                readTime: "7分钟阅读",
                date: "2024-10-10",
                featured: true
            }
        ]
    }
}

// Helper function to get data with language support
export const getData = (lang = 'en') => {
    // Fallback to English if language not supported
    const language = ['en', 'th', 'zh'].includes(lang) ? lang : 'en'

    return {
        profile: {
            ...portfolioData.profile[language],
            ...portfolioData.profileCommon
        },
        skills: portfolioData.skills[language] || portfolioData.skills.en,
        experiences: portfolioData.experiences[language] || portfolioData.experiences.en,
        projects: portfolioData.projects[language] || portfolioData.projects.en,
        articles: portfolioData.articles[language] || portfolioData.articles.en,
        notifications: portfolioData.notifications[language] || portfolioData.notifications.en,
        socials: portfolioData.socials
    }
}

export default portfolioData
