import fs from 'fs';
import path from 'path';

export interface DatabaseSchema {
  profile: any;
  aboutCards?: any[];
  projects: any[];
  photography: any[];
  blog?: any[];
  skills: any[];
  journey: any[];
  stats: any[];
  socials: any[];
  messages: any[];
  settings: any;
  activityLog: { id: string; action: string; timestamp: string }[];
}

const DB_DIR = path.join(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let inMemoryDb: DatabaseSchema | null = null;

function loadInitialData(): DatabaseSchema {
  return {
    profile: {
      name: "حيان محمد",
      titles: [
        "طالب طب بشري",
        "مطور ويب وتطبيقات",
        "مصور فوتوغرافي",
        "شغوف بالذكاء الاصطناعي والتقنية"
      ],
      heroGreeting: "مرحباً، أنا حيان محمد",
      heroDescription: "أبني تجارب رقمية متميزة، أستكشف آفاق التقنية والذكاء الاصطناعي، وأوثق جمال اللحظات بعدستي.",
      locationBadge: "كسلا، السودان 🇸🇩",
      aboutIntro: "أهلاً بك! أنا حيان محمد، طالب طب بشري من السودان، أجمع بين العلوم السريرية والطبية وشغفي العميق بهندسة البرمجيات، فن التصوير الفوتوغرافي، واستخدامات الذكاء الاصطناعي.",
      aboutBio: "أستمتع ببناء منتجات رقمية مفيدة، وتعلّم التقنيات الحديثة، وتحويل الأفكار إلى مشاريع واقعية تخدم المجتمع. إلى جانب دراستي الطبية، أعتبر البرمجة والتصوير مساحتين للإبداع والابتكار والتطوير المستمر.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    },
    projects: [
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
    ],
    photography: [
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
    ],
    skills: [
      { id: "dev-html", name: "HTML5", group: "البرمجة والتطوير", iconName: "Code2", order: 1 },
      { id: "dev-css", name: "CSS3 و Tailwind", group: "البرمجة والتطوير", iconName: "Palette", order: 2 },
      { id: "dev-js", name: "JavaScript (ES6+)", group: "البرمجة والتطوير", iconName: "FileCode", order: 3 },
      { id: "dev-react", name: "React", group: "البرمجة والتطوير", iconName: "Atom", order: 4 },
      { id: "dev-vite", name: "Vite", group: "البرمجة والتطوير", iconName: "Zap", order: 5 },
      { id: "dev-firebase", name: "Firebase", group: "البرمجة والتطوير", iconName: "Flame", order: 6 },
      { id: "dev-git", name: "Git", group: "البرمجة والتطوير", iconName: "GitBranch", order: 7 },
      { id: "dev-github", name: "GitHub", group: "البرمجة والتطوير", iconName: "Github", order: 8 },
      { id: "cr-photo", name: "التصوير الفوتوغرافي", group: "الإبداع والتصميم", iconName: "Camera", order: 9 },
      { id: "cr-editing", name: "تعديل ومعالجة الصور (Lightroom/PS)", group: "الإبداع والتصميم", iconName: "Sliders", order: 10 },
      { id: "cr-ui", name: "تصميم واجهات المستخدم UI/UX", group: "الإبداع والتصميم", iconName: "Layout", order: 11 },
      { id: "cr-video", name: "مونتاج الفيديو", group: "الإبداع والتصميم", iconName: "Film", order: 12 },
      { id: "ai-tools", name: "أدوات ونماذج الذكاء الاصطناعي", group: "الذكاء الاصطناعي والتقنية", iconName: "Cpu", order: 13 },
      { id: "ai-prompt", name: "هندسة الأوامر (Prompt Engineering)", group: "الذكاء الاصطناعي والتقنية", iconName: "Sparkles", order: 14 },
      { id: "ai-dev", name: "التطوير بمساعدة الذكاء الاصطناعي", group: "الذكاء الاصطناعي والتقنية", iconName: "Bot", order: 15 },
      { id: "med-studies", name: "دراسة الطب والعلوم السريرية", group: "الطب والعلوم الصحية", iconName: "Stethoscope", order: 16 },
      { id: "med-research", name: "البحث العلمي الطبي", group: "الطب والعلوم الصحية", iconName: "BookOpen", order: 17 },
      { id: "med-writing", name: "الكتابة والتوثيق الأكاديمي", group: "الطب والعلوم الصحية", iconName: "FileText", order: 18 }
    ],
    journey: [
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
    ],
    stats: [
      { id: "stat-projects", label: "مشاريع مميزة", value: "+3", description: "تطبيقات ويب ونماذج رقمية", order: 1 },
      { id: "stat-interests", label: "مجالات شغف", value: "4", description: "الطب، البرمجة، التصوير، الذكاء الاصطناعي", order: 2 },
      { id: "stat-medical", label: "المسيرة الطبية", value: "1", description: "شغف بالعلوم السريرية", order: 3 },
      { id: "stat-ideas", label: "أفكار واستكشافات", value: "∞", description: "ابتكار وتعلّم بلا حدود", order: 4 }
    ],
    socials: [
      { id: "social-whatsapp", platform: "WhatsApp", label: "واتساب (WhatsApp)", url: "https://wa.me/249912345678", active: true },
      { id: "social-instagram", platform: "Instagram", label: "انستغرام (Instagram)", url: "https://instagram.com", active: true },
      { id: "social-tiktok", platform: "TikTok", label: "تيك توك (TikTok)", url: "https://tiktok.com", active: true },
      { id: "social-github", platform: "GitHub", label: "جيت هاب (GitHub)", url: "https://github.com", active: true },
      { id: "social-email", platform: "Email", label: "البريد الإلكتروني", url: "mailto:hayyan@example.com", active: true },
      { id: "social-linkedin", platform: "LinkedIn", label: "لينكد إن (LinkedIn)", url: "https://linkedin.com", active: false },
      { id: "social-youtube", platform: "YouTube", label: "يوتيوب (YouTube)", url: "https://youtube.com", active: false }
    ],
    messages: [
      {
        id: "msg-welcome-1",
        name: "نظام الموقع",
        email: "system@hayyanmohamed.me",
        subject: "مرحباً بك في لوحة تحكم موقعك الشخصي",
        message: "أهلاً بك حيان! تم تفعيل موقعك الشخصي ولوحة التحكم باللغة العربية بنجاح، ويمكنك إدارة المحتوى وتلقي الرسائل هنا بكل سهولة.",
        read: false,
        createdAt: new Date().toISOString()
      }
    ],
    aboutCards: [
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
    ],
    settings: {
      siteTitle: "حيان محمد — طالب طب، مطور برمجيات ومصور فوتوغرافي",
      metaDescription: "الموقع الشخصي الرسمي لحيان محمد — طالب طب، مطور ويب وتطبيقات، مصور فوتوغرافي وشغوف بالذكاء الاصطناعي من السودان.",
      logoText: "حيان",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      accentColor: "#38BDF8",
      darkModeDefault: true,
      showWhatsAppButton: true,
      showPhotographySection: true,
      showProjectsSection: true,
      showSkillsSection: true,
      showJourneySection: true,
      showStatsSection: true,
      whatsAppNumber: "+249912345678",
      whatsappNumber: "+249912345678",
      whatsAppMessage: "مرحباً حيان، اطلعت على موقعك وأود التواصل معك.",
      whatsappDefaultMessage: "مرحباً حيان، اطلعت على موقعك وأود التواصل معك.",
      footerText: "© 2026 حيان محمد. جميع الحقوق محفوظة.",
      footerCopyright: "© 2026 حيان محمد. تم البناء بإتقان وعناية.",
      footerSubtitle: "طالب طب • مطور برمجيات • مصور فوتوغرافي • كسلا، السودان",
      contactEmail: "hayyan@example.com",
      contactLocationText: "كسلا، السودان"
    },
    activityLog: [
      { id: "act-1", action: "تهيئة قاعدة البيانات باللغة العربية", timestamp: new Date().toISOString() }
    ]
  };
}

export function getDb(): DatabaseSchema {
  if (inMemoryDb) return inMemoryDb;

  const BAK_FILE = path.join(DB_DIR, 'db.json.bak');

  // 1. Try reading primary db.json
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      if (data && data.trim().length > 0) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object' && parsed.profile) {
          if (!parsed.aboutCards || !Array.isArray(parsed.aboutCards)) {
            parsed.aboutCards = loadInitialData().aboutCards;
          }
          if (!parsed.blog || !Array.isArray(parsed.blog)) {
            parsed.blog = [];
          }
          if (!parsed.settings) {
            parsed.settings = loadInitialData().settings;
          }
          inMemoryDb = parsed;
          return inMemoryDb!;
        }
      }
    } catch (err) {
      console.warn("Notice: Reading primary db.json encountered parse error, trying backup:", err);
    }
  }

  // 2. Try reading backup db.json.bak
  if (fs.existsSync(BAK_FILE)) {
    try {
      const bakData = fs.readFileSync(BAK_FILE, 'utf-8');
      if (bakData && bakData.trim().length > 0) {
        const parsed = JSON.parse(bakData);
        if (parsed && typeof parsed === 'object' && parsed.profile) {
          const restoredDb: DatabaseSchema = parsed;
          if (!restoredDb.aboutCards || !Array.isArray(restoredDb.aboutCards)) {
            restoredDb.aboutCards = loadInitialData().aboutCards;
          }
          inMemoryDb = restoredDb;
          saveDb(restoredDb);
          return restoredDb;
        }
      }
    } catch (bakErr) {
      console.warn("Notice: Backup db.json.bak also unreadable:", bakErr);
    }
  }

  // 3. Defaults only if neither exists
  inMemoryDb = loadInitialData();
  saveDb(inMemoryDb);
  return inMemoryDb;
}

export function saveDb(data: DatabaseSchema): void {
  inMemoryDb = data;
  try {
    const TEMP_FILE = path.join(DB_DIR, `db.json.tmp.${Date.now()}`);
    const BAK_FILE = path.join(DB_DIR, 'db.json.bak');
    const jsonStr = JSON.stringify(data, null, 2);

    // Write to atomic temp file
    fs.writeFileSync(TEMP_FILE, jsonStr, 'utf-8');

    // Keep backup copy of current valid file
    if (fs.existsSync(DB_FILE)) {
      try {
        fs.copyFileSync(DB_FILE, BAK_FILE);
      } catch {
        // non-blocking
      }
    }

    // Atomically swap file into place
    fs.renameSync(TEMP_FILE, DB_FILE);
  } catch (err) {
    console.error("Critical error while saving database file:", err);
  }
}

export function logActivity(action: string): void {
  const db = getDb();
  db.activityLog = [
    { id: 'act-' + Date.now(), action, timestamp: new Date().toISOString() },
    ...db.activityLog.slice(0, 19)
  ];
  saveDb(db);
}
