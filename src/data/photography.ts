import { PhotographyItem } from '../types';

export const initialPhotography: PhotographyItem[] = [
  {
    id: "photo-kassala-tootil",
    title: "جبل توتيل مع شروق الشمس",
    category: "كسلا",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "القباب الجرانيتية المهيبة لجبل توتيل تعانق ضباب الصباح الباكر في كسلا بشرق السودان.",
    location: "جبل توتيل، كسلا",
    cameraInfo: "50mm • f/2.8 • 1/500s • ISO 100",
    featured: true,
    published: true,
    order: 1
  },
  {
    id: "photo-nature-mist",
    title: "سكينة الساعة الذهبية",
    category: "طبيعة",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    description: "ضوء عنبري دافئ يتغلغل بين تضاريس ووديان شرق السودان عند الغروب.",
    location: "المنطقة الشرقية",
    cameraInfo: "35mm • f/1.8 • 1/250s • ISO 200",
    featured: true,
    published: true,
    order: 2
  },
  {
    id: "photo-portrait-expression",
    title: "نظرة عزيمة وإصرار",
    category: "بورتريه",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    description: "دراسة ضوئية طبيعية تعكس ملامح الشخصية والعمق الإنساني التعبيري.",
    location: "استوديو كسلا",
    cameraInfo: "85mm • f/1.4 • 1/400s • ISO 100",
    featured: true,
    published: true,
    order: 3
  },
  {
    id: "photo-night-stars",
    title: "سماء الصحراء وبريق النجوم",
    category: "ليلي",
    imageUrl: "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&w=1200&q=80",
    description: "تصوير فلكي بالتعريض الزمني الطويل يبرز ذراع درب التبانة متلألئاً فوق رمال الصحراء السودانية.",
    location: "الصحراء السودانية",
    cameraInfo: "24mm • f/2.0 • 20s • ISO 3200",
    featured: true,
    published: true,
    order: 4
  },
  {
    id: "photo-kassala-bazaar",
    title: "ألوان سوق كسلا العريق",
    category: "كسلا",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    description: "حيوية السوق الشعبي، البهارات، والتراث المعماري الأصيل تحت ظلال العصر.",
    location: "السوق الكبير، كسلا",
    cameraInfo: "50mm • f/2.0 • 1/320s • ISO 400",
    featured: true,
    published: true,
    order: 5
  },
  {
    id: "photo-street-motion",
    title: "إيقاع المدينة بالأبيض والأسود",
    category: "شارع",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
    description: "لقطة عفوية تلتقط انسيابية الحركة وتناغم الضوء والظلال في الشارع الحيوي.",
    location: "وسط المدينة",
    cameraInfo: "28mm • f/4.0 • 1/800s • ISO 200",
    featured: false,
    published: true,
    order: 6
  }
];
