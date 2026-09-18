import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: "easy-convert",
    title: "إيزي كونفرت (Easy Convert)",
    description: "تطبيق ويب متكامل لتحويل وإدارة ملفات PDF بواجهة استخدام مرنة وسريعة الاستجابة.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Vite", "Firebase", "JavaScript"],
    liveUrl: "https://easyconvert.example.com",
    githubUrl: "https://github.com",
    featured: true,
    published: true,
    order: 1
  },
  {
    id: "rased-al-geneh",
    title: "راصد الجنيه",
    description: "منظومة وتطبيق لمتابعة أسعار صرف العملات في السودان لحظة بلحظة وعرضها في واجهة بيانات ورسوم بيانية مبسطة.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
    technologies: ["تطبيق ويب", "واجهات برمجية API", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://rased.example.com",
    githubUrl: "https://github.com",
    featured: true,
    published: true,
    order: 2
  },
  {
    id: "sear-al-geneh",
    title: "سعر الجنيه",
    description: "منصة ذكية لمتابعة أسعار الصرف ومؤشرات الأسواق المحلية في السودان مع معالجة البيانات وتصنيفها.",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80",
    technologies: ["ويب", "OCR", "معالجة بيانات", "React"],
    liveUrl: "https://sear.example.com",
    githubUrl: "https://github.com",
    featured: true,
    published: true,
    order: 3
  },
  {
    id: "more-projects",
    title: "مشاريع ونماذج أولية قادمة",
    description: "مجموعة من التجارب الرقمية والحلول في مجالات الذكاء الاصطناعي، التقنيات الطبية، وتطبيقات الويب الحديثة.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    technologies: ["ذكاء اصطناعي", "TypeScript", "Next.js", "تطوير شامل"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    featured: false,
    published: true,
    order: 4
  }
];
