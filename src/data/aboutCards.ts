import { AboutCard } from '../types';

export const initialAboutCards: AboutCard[] = [
  {
    id: "card-med",
    badge: "🎓 طالب طب",
    title: "الطب والعلوم السريرية",
    desc: "دراسة الطب والعلوم الصحية في جامعة العلوم والتقانة بالشرق بكسلا، مع شغف عميق بالعلوم السريرية وربطها بالتقنيات الصحية الحديثة.",
    iconName: "GraduationCap",
    order: 1
  },
  {
    id: "card-dev",
    badge: "💻 مطور برمجيات",
    title: "هندسة الويب والتطبيقات",
    desc: "بناء تطبيقات وأدوات رقمية عصرية، سريعة وسلسة باستخدام React و Vite و Tailwind CSS مع معايير برمجية نظيفة.",
    iconName: "Code2",
    order: 2
  },
  {
    id: "card-photo",
    badge: "📸 مصور فوتوغرافي",
    title: "السرد البصري والتوثيق",
    desc: "توثيق جمال الطبيعة السودانية، تفاصيل جبل توتيل وقت الشروق، ولحظات الحياة الأصيلة في شوارع وأسواق كسلا.",
    iconName: "Camera",
    order: 3
  },
  {
    id: "card-ai",
    badge: "🤖 شغوف بالذكاء الاصطناعي",
    title: "الذكاء الاصطناعي والأتمتة",
    desc: "استكشاف النماذج اللغوية، وهندسة الأوامر (Prompt Engineering)، ودمج وكلاء الذكاء الاصطناعي في حلول عملية ومفيدة.",
    iconName: "Bot",
    order: 4
  }
];
