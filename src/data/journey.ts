import { JourneyItem, StatItem } from '../types';

export const initialJourney: JourneyItem[] = [
  {
    id: "journey-med-2026",
    year: "2026",
    title: "طالب طب بشري",
    institution: "جامعة العلوم والتقانة بالشرق — كسلا، السودان",
    description: "مواصلة التحصيل الأكاديمي والسريري والبحث في تقنيات الرعاية الصحية الحديثة والابتكار الطبي.",
    order: 1
  },
  {
    id: "journey-web-2026",
    year: "2026",
    title: "تطوير تطبيقات ومواقع الويب",
    institution: "مشاريع مستقلة ومفتوحة المصدر",
    description: "بناء تطبيقات ويب تفاعلية حديثة تلبي الاحتياجات الرقمية والمحلية بأحدث تقنيات الويب السريعة.",
    order: 2
  },
  {
    id: "journey-photo-2026",
    year: "2026",
    title: "التصوير الفوتوغرافي والسرد البصري",
    institution: "ممارسة إبداعية وتوثيقية",
    description: "توثيق المعالم الطبيعية والتراث الإنساني لمدينة كسلا وربوع السودان بعدسة فنية معبّرة.",
    order: 3
  }
];

export const initialStats: StatItem[] = [
  {
    id: "stat-projects",
    label: "مشاريع مميزة",
    value: "+3",
    description: "تطبيقات ويب ونماذج رقمية",
    order: 1
  },
  {
    id: "stat-interests",
    label: "مجالات شغف",
    value: "4",
    description: "الطب، البرمجة، التصوير، الذكاء الاصطناعي",
    order: 2
  },
  {
    id: "stat-medical",
    label: "المسيرة الطبية",
    value: "1",
    description: "شغف بالعلوم السريرية",
    order: 3
  },
  {
    id: "stat-ideas",
    label: "أفكار واستكشافات",
    value: "∞",
    description: "ابتكار وتعلّم بلا حدود",
    order: 4
  }
];
