// ============================================
// Portfolio Data - Centralized Data Store
// ============================================

const portfolioData = {
    profile: {
        name: "ชินกฤต (Chinnakrit Sripan)",
        title: "Frontend Developer / Full-stack Developer",
        bio: "นักพัฒนา React & Web Developer ที่มีความหลงใหลในการสร้างเว็บไซต์ที่สวยงามและใช้งานได้ดี",
        shortBio: "My Portfolio Website to showcase my projects and skills",
        image: "https://placehold.co/400x400/000000/FFF?text=Profile",
        email: "chinnakrit.srp@gmail.com",
        phone: "+66 94 665 0259",
        location: "Thailand",
        resume: "/Chinnakrit-Sripan_CV.pdf"
    },

    skills: [
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

    experiences: [
        {
            id: 1,
            year: "2024 - Present",
            position: "Frontend Developer",
            company: "Company Name",
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
            company: "Previous Company",
            description: "ปฏิบัติงานเป็น junior developer ทำ...",
            achievements: [
                "พัฒนา features ใหม่ ๆ เพื่อ web application",
                "ทำ unit testing และ integration testing",
                "ช่วย debug และ fix bugs ในโปรแกรม"
            ]
        },
        {
            id: 3,
            year: "2022 - 2023",
            position: "Internship",
            company: "Internship Company",
            description: "ได้เรียนรู้ web development fundamentals",
            achievements: [
                "จบ internship program successfully",
                "ทำโปรเจคจบปริญญา",
                "ได้รับ certificate"
            ]
        }
    ],

    projects: [
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
            highlights: [
                "Responsive design",
                "Smooth scrolling",
                "Contact form",
                "SEO optimized"
            ]
        }
    ],

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
    ]
}

export default portfolioData
