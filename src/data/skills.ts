import { SkillItem } from '../types';

export const initialSkills: SkillItem[] = [
  // البرمجة والتطوير
  { id: "dev-html", name: "HTML5", group: "البرمجة والتطوير", iconName: "Code2", order: 1 },
  { id: "dev-css", name: "CSS3 و Tailwind", group: "البرمجة والتطوير", iconName: "Palette", order: 2 },
  { id: "dev-js", name: "JavaScript (ES6+)", group: "البرمجة والتطوير", iconName: "FileCode", order: 3 },
  { id: "dev-react", name: "React", group: "البرمجة والتطوير", iconName: "Atom", order: 4 },
  { id: "dev-vite", name: "Vite", group: "البرمجة والتطوير", iconName: "Zap", order: 5 },
  { id: "dev-firebase", name: "Firebase", group: "البرمجة والتطوير", iconName: "Flame", order: 6 },
  { id: "dev-git", name: "Git", group: "البرمجة والتطوير", iconName: "GitBranch", order: 7 },
  { id: "dev-github", name: "GitHub", group: "البرمجة والتطوير", iconName: "Github", order: 8 },

  // الإبداع والتصميم
  { id: "cr-photo", name: "التصوير الفوتوغرافي", group: "الإبداع والتصميم", iconName: "Camera", order: 9 },
  { id: "cr-editing", name: "تعديل ومعالجة الصور (Lightroom/PS)", group: "الإبداع والتصميم", iconName: "Sliders", order: 10 },
  { id: "cr-ui", name: "تصميم واجهات المستخدم UI/UX", group: "الإبداع والتصميم", iconName: "Layout", order: 11 },
  { id: "cr-video", name: "مونتاج الفيديو", group: "الإبداع والتصميم", iconName: "Film", order: 12 },

  // الذكاء الاصطناعي والتقنية
  { id: "ai-tools", name: "أدوات ونماذج الذكاء الاصطناعي", group: "الذكاء الاصطناعي والتقنية", iconName: "Cpu", order: 13 },
  { id: "ai-prompt", name: "هندسة الأوامر (Prompt Engineering)", group: "الذكاء الاصطناعي والتقنية", iconName: "Sparkles", order: 14 },
  { id: "ai-dev", name: "التطوير بمساعدة الذكاء الاصطناعي", group: "الذكاء الاصطناعي والتقنية", iconName: "Bot", order: 15 },

  // الطب والعلوم الصحية
  { id: "med-studies", name: "دراسة الطب والعلوم السريرية", group: "الطب والعلوم الصحية", iconName: "Stethoscope", order: 16 },
  { id: "med-research", name: "البحث العلمي الطبي", group: "الطب والعلوم الصحية", iconName: "BookOpen", order: 17 },
  { id: "med-writing", name: "الكتابة والتوثيق الأكاديمي", group: "الطب والعلوم الصحية", iconName: "FileText", order: 18 }
];
