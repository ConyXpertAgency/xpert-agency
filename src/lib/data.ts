import { cache } from "react";
import { getSupabase } from "./supabase/client";
import type {
  AboutFirst,
  AboutSecond,
  CasesPage,
  ContactPage,
  HomeGlobalReach,
  HomeHero,
  HomePartners,
  HomeRoles,
  IndustriesPage,
  Lang,
  NavItem,
  ServicesPage,
  Settings,
} from "./supabase/types";

export const FALLBACK_LANG: Lang = "en";
export const LOCALES: Lang[] = ["en", "es", "de"];

async function getRow(
  collection: string,
  keyname: string,
  lang: Lang
): Promise<Record<string, unknown> | null> {
  try {
    const client = getSupabase();
    const { data } = await client
      .from("content")
      .select("data, lang")
      .eq("collection", collection)
      .eq("keyname", keyname)
      .in("lang", [lang, FALLBACK_LANG]);

    if (!data || data.length === 0) return null;
    const exact = data.find((r) => r.lang === lang);
    const fallback = data.find((r) => r.lang === FALLBACK_LANG);
    return (exact ?? fallback)?.data ?? null;
  } catch {
    return null;
  }
}

export const getContent = cache(getRow);

async function getTyped<T>(
  collection: string,
  keyname: string,
  lang: Lang,
  defaults: T
): Promise<T> {
  const raw = await getContent(collection, keyname, lang);
  if (!raw) return defaults;
  if (Array.isArray(defaults)) return (Array.isArray(raw) ? raw : defaults) as T;
  return { ...defaults, ...raw } as T;
}

export const getHomeHero = (lang: Lang) =>
  getTyped<HomeHero>("home", "hero", lang, {
    badge: "MANUFACTURING & LOGISTICS CONSULTING",
    // TODO: Replace with official logo when client provides final asset.
    // TODO: Add approved country points once map becomes data-driven or positions are approved.
    title: [
      "Experts in integration,",
      "improvement and engineering.",
    ],
    subtitle:
      "Process efficiency, automation, digital transformation and operational effectiveness.",
    cta_primary: "Contact us",
    cta_primary_href: "/contact",
    cta_secondary: "View services",
    cta_secondary_href: "/services",
    info_cards: [
      { title: "45+ years", text: "Experience + delivering results." },
      { title: "International reach", text: "Projects across the continents." },
      { title: "Measurable solutions", text: "Measurable solutions, data driven." },
    ],
    stat_impact: {
      title: "Operational impact",
      value: "+25%",
      label: "Average increase",
    },
    core_areas_title: "Core focus areas",
    core_areas: [
      "Process Optimization",
      "Automation & Digitalization",
      "Supply Chain Excellence",
      "Operational Reengineering",
    ],
    stat_success: {
      title: "Project success rate",
      value: "90%",
      label: "On time / In scope / In budget",
    },
    global_delivery: {
      title: "Global project delivery",
      text: "Delivering value across industries and borders.",
    },
  });

export const getHomePartners = (lang: Lang) =>
  getTyped<HomePartners>("home", "partners", lang, {
    badge: "OUR EXPERT NETWORK",
    title: "Partners driving operational excellence.",
    description: [
      "Our network of senior specialists combines deep industry experience with a hands-on approach to deliver measurable results.",
      "Trusted advisors. Proven operators. Real impact.",
    ],
    // TODO: Add Manuel profile once client provides photo, role, description and expertise.
    items: [
      {
        name: "Elmar A. Beckord",
        slug: "Logistics Manager, Engineer, Trainer",
        logo: "/uploads/elmar.png",
        description: [
          "Logistics Manager, Engineer, Trainer.",
          "Project management, logistics engineering",
          "and process improvement across global manufacturing.",
        ],
        tags: ["Project Management", "Logistics Management", "Process Improvement", "Training & Coaching"],
      },
      {
        name: "Lic. María Concepción Lona Romero",
        slug: "Manager, Marketing, Accountant, HR",
        logo: "/uploads/cony.png",
        description: [
          "Manager, Marketing, Accountant, Human Resources.",
          "HR management, business administration,",
          "public relations and coaching.",
        ],
        tags: ["HR Management", "Business Sales & Admin", "Project & Product Marketing", "Coaching"],
      },
      {
        name: "Eduardo Benítez",
        slug: "Quality Management",
        logo: "/uploads/eduardo.png",
        description: [
          "Quality Management specialist.",
          "Process mining, contracting, management",
          "control and coaching across industrial projects.",
        ],
        tags: ["Process Mining", "Contracting", "Management Control", "Coaching"],
      },
      {
        name: "Wissam El Khoury",
        slug: "Co-Founder ALS",
        logo: "/uploads/wissam-20260205-211612-ad8261.png",
        description: [
          "Co-Founder ALS, warehouse constructions.",
          "Integrated logistics systems and automation",
          "for airports and large-scale distribution.",
        ],
        tags: ["Warehouse Systems", "Integrated Logistics", "Automation", "Airport Logistics"],
      },
    ],
    stats: [
      { icon: "FiUsers", value: "20+", label: "Experts" },
      { icon: "CiGlobe", value: "25+", label: "Countries" },
      { icon: "PiSuitcaseSimpleDuotone", value: "300+", label: "Projects" },
      { icon: "GrLineChart", value: "95%", label: "Client Satisfaction" },
    ],
    about: {
      mission: "Build efficient communication bridges between people and industrial infrastructure, helping clients reach their goals through consulting, innovative solutions and quality process automation services focused on fast, results-centered competitiveness.",
      vision: "Guide our clients toward a successful future through our passion for process automation.",
      values: [
        "Customer satisfaction focus",
        "Trust / reliability",
        "Commitment",
        "Flexibility / multidisciplinarity",
        "Service and management quality",
      ],
    },
    footer: { text: "Looking for a specific expertise?", cta: "Let's connect" },
  });

export const getHomeGlobalReach = (lang: Lang) =>
  getTyped<HomeGlobalReach>("home", "global_reach", lang, {
    badge: "GLOBAL REACH",
    title: "Delivering impact across borders.",
    description: [
      "We partner with organizations worldwide to deliver integrated manufacturing and logistics solutions that drive operational excellence and sustainable growth.",
    ],
    features: [
      {
        icon: "CiGlobe",
        title: "Local expertise, global standard",
        text: "On-the-ground teams with deep industry knowledge.",
      },
      {
        icon: "IoShieldCheckmarkOutline",
        title: "Cross-border execution",
        text: "Seamless coordination across regions and time zones.",
      },
      {
        icon: "GrLineChart",
        title: "Trusted by industry leaders",
        text: "Long-term partnerships built on results and reliability.",
      },
    ],
    stats: [
      { icon: "CiGlobe", value: "5", label: "Continents Served", text: "Operational presence across five continents." },
      { icon: "FiUsers", value: "50+", label: "Cross-border Projects", text: "Seamless coordination across regions and time zones." },
      { icon: "IoChatboxEllipsesOutline", value: "10+", label: "Languages Supported", text: "Multilingual teams ensuring clear communication everywhere." },
      { icon: "AiOutlineTruck", value: "Delivering", label: "Impact Across Borders", text: "End-to-end delivery across complex global operations." },
    ],
    // TODO: Add country-level map points for South Africa, Malaysia, Thailand, Vietnam, Myanmar, Scotland, Russia and Morocco once the map becomes data-driven or positions are approved.
    cta: "Explore our global capabilities",
  });

export const getHomeRoles = (lang: Lang) =>
  getTyped<HomeRoles>("home", "roles", lang, {
    badge: "ROLES & CAPABILITIES",
    title: "The expertise to transform operations.",
    description: [
      "Xpert.agency connects organizations with a curated network of senior experts who drive project execution and operational transformation across industrial and logistics environments.",
    ],
    features: [
      { icon: "GrGroup", title: "Senior specialists" },
      { icon: "IoShieldCheckmarkOutline", title: "Proven impact" },
      { icon: "CiGlobe", title: "Global coverage" },
    ],
    items: [
      { title: "Project Management", text: "Plan, execute and deliver complex projects on time, on scope and on budget." },
      { title: "Operations Leadership", text: "Lead operations with focus on performance, efficiency, and team development." },
      { title: "Systems Integration", text: "Integrate people, processes and technologies to create seamless and scalable operations." },
      { title: "Process Optimization", text: "Identify bottlenecks and redesign processes to improve productivity and reduce costs." },
      { title: "Data & Analytics", text: "Turn operational data into actionable insights that drive better decisions." },
      { title: "Continuous Improvement", text: "Implement Lean, Six Sigma and best practices for sustainable performance gains." },
      { title: "Supply Chain Consulting", text: "Optimize end-to-end supply chains for resilience, visibility and cost efficiency." },
      { title: "Change Management", text: "Guide people through change and ensure adoption for lasting business results." },
    ],
    stats: [
      { icon: "GrGroup", value: "500+", label: "Vetted experts", text: "Senior professionals with real-world industrial experience." },
      { icon: "BiTargetLock", value: "Tailored matching", label: "Right expert for your challenge", text: "We match expertise to your industry, context and goals." },
      { icon: "IoRocketOutline", value: "Measurable impact", label: "Results that move the needle", text: "Experts focused on delivering outcomes that matter." },
    ],
  });

export const getAboutFirst = (lang: Lang) =>
  getTyped<AboutFirst>("about", "first", lang, {
    badge: "| ABOUT XPERT.AGENCY",
    title: "Who we are",
    heading: [
      "Experts in integrated improvement of",
      "manufacturing and logistics.",
    ],
    text: [
      "Xpert.agency, based in Germany, helps organizations optimize manufacturing, logistics and business processes through integrated continuous improvement, automation, digital transformation and operational reengineering solutions.",
    ],
    features: [
      { icon: "FaChartLine", title: "Interim Experts", text: "Experienced specialists supporting operational transformation projects." },
      { icon: "IoIosSettings", title: "Trainers & Coaches", text: "Training and coaching support for teams and leaders." },
      { icon: "GrGroup", title: "Interim Managers", text: "Temporary management support for critical operational needs." },
      { icon: "RiTargetLine", title: "Consultants", text: "Consulting support across manufacturing, logistics and business processes." },
    ],
    stats: [
      { icon: "IoShieldCheckmarkOutline", value: "45+", label: "Years of experience", text: "Delivering measurable results." },
      { icon: "CiGlobe", value: "25+", label: "Countries", text: "Projects across Europe, Americas & Asia" },
      { icon: "FaChartLine", value: "300+", label: "Projects", text: "Across industries and company sizes" },
      { icon: "GrGroup", value: "20+", label: "Experts", text: "Experienced specialists across disciplines" },
    ],
    // TODO: Add new country map points once the map becomes data-driven or positions are approved.
    right_card: {
      title: ["Global perspective.", "Local understanding."],
      text: "We work side by side with our clients to deliver value that transcends borders.",
    },
  });

export const getAboutSecond = (lang: Lang) =>
  getTyped<AboutSecond>("about", "second", lang, {
    badge: "HOW WE WORK.",
    title: ["A proven methodology.", "Measurable results."],
    text: [
      "We combine operational expertise, advanced analytics and hands-on execution to deliver integrated solutions that drive efficiency, agility and sustainable growth in manufacturing and logistics.",
    ],
    quote: {
      lines: ["We don't just advise.", "We work side by side with your team to deliver change that lasts."],
      author: "Execution. Teamwork. Impact.",
      sub: "That's how we work.",
    },
    // TODO: Elmar will provide final detailed points for each methodology step.
    steps: [
      {
        number: "01",
        icon: "IoIosSearch",
        title: "Data mining analysis & diagnosis",
        text: ["Assessment of operational data and processes to identify priorities."],
        bullets: [],
      },
      {
        number: "02",
        icon: "IoMdClipboard",
        title: "Survey & quick wins",
        text: ["Survey work to surface opportunities and define immediate improvements."],
        bullets: [],
      },
      {
        number: "03",
        icon: "FaChartLine",
        title: "Improvement roadmap",
        text: ["Prioritized roadmap for improvement initiatives."],
        bullets: [],
      },
      {
        number: "04",
        icon: "HiOutlineCog6Tooth",
        title: "Agile and classic project management",
        text: ["Project execution using agile and classic management practices."],
        bullets: [],
      },
      {
        number: "05",
        icon: "FiBarChart",
        title: "Performance measurement",
        text: ["Measurement of performance and progress against agreed indicators."],
        bullets: [],
      },
    ],
    // TODO: Add separate English RBE page with Preparing / Safeguarding / Performing and 10+1 elements.
    footer_card: {
      title: "Continuous improvement cycle",
      text: "We learn, adapt and evolve — driving sustained impact across your organization.",
    },
    stats: [
      { icon: "IoShieldCheckmarkOutline", value: "45+ years", label: "Of combined experience delivering results" },
      { icon: "CiGlobe", value: "Global perspective", label: "Projects across Europe, Americas & Asia" },
      { icon: "FaChartLine", value: "Measurable impact", label: "Data-driven solutions that scale" },
      { icon: "FiUsers", value: "Client partnership", label: "Collaborative approach focused on your success" },
    ],
  });

export const getServicesPage = (lang: Lang) =>
  getTyped<ServicesPage>("services", "page", lang, {
    badge: "AREAS OF EXPERTISE",
    title: "Services",
    subtitle:
      "End-to-end expertise to optimize operations, accelerate transformation, and drive measurable results.",
    intro: {
      title: "Expert-led transformation",
      text: "across manufacturing and logistics — combining deep industry knowledge with proven methodologies.",
    },
    areas: [
      { icon: "HiOutlineCog", title: "Process Optimization", text: "Improve efficiency and reduce waste across your operations." },
      { icon: "GiRobotGrab", title: "Automation & Digitalization", text: "Leverage automation and digital tools to boost productivity." },
      { icon: "FiClipboard", title: "Project Management", text: "Deliver projects on time, on scope, and on budget." },
      { icon: "FaRegUser", title: "Interim Management", text: "Experienced leaders to drive results during critical transitions." },
      { icon: "PiFactory", title: "Lean Manufacturing", text: "Eliminate waste and build a culture of continuous improvement." },
      { icon: "AiOutlineTruck", title: "Supply Chain Consulting", text: "Strengthen supply chains for agility, resilience, and performance." },
      { icon: "LuPuzzle", title: "Systems Integration", text: "Connect people, processes, and systems for seamless operations." },
      { icon: "RiGraduationCapLine", title: "Coaching & Training", text: "Build capabilities and empower teams to excel." },
      { icon: "IoBarChartOutline", title: "KPI Development", text: "Define and track the metrics that drive meaningful results." },
      { icon: "IoShieldCheckmarkOutline", title: "Solution Validation", text: "Test, validate, and ensure solutions deliver real-world impact." },
    ],
    footer: {
      title: "Need a tailored approach?",
      text: "Let's discuss how our experts can help you achieve your goals.",
      cta: "Contact us",
    },
  });

export const getIndustriesPage = (lang: Lang) =>
  getTyped<IndustriesPage>("industries", "page", lang, {
    badge: "OUR INDUSTRIES",
    title: "Industries.",
    subtitle:
      "We combine domain expertise with digital innovation to solve complex challenges and drive measurable impact across key industries.",
    items: [
      { icon: "HiOutlineCog", title: "Manufacturing", text: "Optimizing production, quality, and supply chains with smart automation and data-driven insights." },
      { icon: "FiCoffee", title: "Food & Beverage", text: "Ensuring safety, traceability, and efficiency across the entire value chain." },
      { icon: "MdOutlineShoppingCart", title: "Retail & E-commerce", text: "Enhancing customer experiences and streamlining operations across omnichannel ecosystems." },
      { icon: "AiOutlineTruck", title: "Warehousing & Logistics", text: "Driving visibility, agility, and on-time delivery through intelligent logistics solutions." },
      { icon: "IoBagHandleOutline", title: "Consumer Goods", text: "Accelerating innovation and ensuring consistency from product development to delivery." },
    ],
    info_card: {
      title: "Cross-industry expertise. Measurable results.",
      text: "We bring proven frameworks and deep industry knowledge to every engagement — delivering solutions that scale.",
      cta: "View all services",
      cta_href: "/services",
    },
  });

export const getCasesPage = (lang: Lang) =>
  getTyped<CasesPage>("cases", "page", lang, {
    header: {
      badge: "CASES",
      title: "Proven impact across industries and challenges.",
      text: "We partner with organizations worldwide to solve complex operational challenges through integrated improvement, automation, and logistics solutions.",
    },
    // TODO: Confirm final featured cases with client. Landmark appears twice in annotation; sixth slot left pending.
    // TODO: Add View all cases page/list with the remaining real cases: Pistor AG, FENIX Outdoor Supply, Schuh Schmid, Birkenstock, HYMMEN Pisos, XOX Snacks, Giesecke+Devrient (G+D), Zeitfracht Medien, Weig-Karton, Kymmene Papier.
    // TODO: Add client logos when provided; current project has no client logo assets.
    items: [
      {
        title: "Almarai",
        slug: "KSA",
        description: "Project leader for distribution automation and new Distribution Centers in the Middle East.",
        stats: [
          { icon: "FaRegChartBar", value: ">50%", text: "reduction in personnel" },
          { icon: "FaRegClock", value: ">30%", text: "reduction in delivery time" },
          { icon: "IoShieldCheckmarkOutline", value: ">20%", text: "reduction in waste" },
        ],
      },
      {
        title: "Landmark",
        slug: "Channel Distribution",
        description: "Project Head for warehouse, sorting and fashion distribution integration across a large group.",
        stats: [
          { icon: "FaRegChartBar", value: ">70%", text: "reduction in personnel" },
          { icon: "FaRegClock", value: ">50%", text: "reduction in delivery time" },
          { icon: "IoShieldCheckmarkOutline", value: ">40%", text: "reduction in waste" },
        ],
      },
      {
        // TODO: Add project/results details for Heineken when provided by client.
        title: "Heineken",
        slug: "Client",
        description: "Case details pending from client.",
        stats: [],
      },
      {
        // TODO: Add project/results details for Diageo when provided by client.
        title: "Diageo",
        slug: "Client",
        description: "Case details pending from client.",
        stats: [],
      },
      {
        // TODO: Add project/results details for Nestlé when provided by client.
        title: "Nestlé",
        slug: "Client",
        description: "Case details pending from client.",
        stats: [],
      },
    ],
  });

export const getContactPage = (lang: Lang) =>
  getTyped<ContactPage>("contact", "page", lang, {
    badge: "LET'S BUILD WHAT'S NEXT",
    title: "Get in contact",
    subtitle:
      "Share your goals and challenges. Our experts will help you design practical solutions that drive measurable results.",
    features: [
      { icon: "IoShieldCheckmarkOutline", title: "Confidential & secure", text: "Your information is safe with us." },
      { icon: "FaRegClock", title: "Quick response", text: "We typically reply within 1 business day." },
      { icon: "FaRegCheckCircle", title: "No commitment", text: "Initial consultation is 100% free." },
    ],
    team_section: {
      title: "TALK TO OUR TEAM",
      footer: "Trusted by manufacturers and logistics leaders across Latin America, North America, and Europe.",
    },
    methods: [
      { icon: "FiPhone", title: "WhatsApp / Phone", value: "+52 55 2654 8997", cta: "Chat on WhatsApp", href: "" },
      { icon: "MdOutlineEmail", title: "Email", value: "contacto@xpert.agency", cta: "Send email", href: "" },
      { icon: "GrLocation", title: "Headquarters", value: "Mexico City, Mexico", cta: "View on map", href: "" },
    ],
    regions: [
      {
        region: "Europe",
        name: "Elmar A. Beckord",
        locations: ["Brunnthal / Otterloh, Germany", "Wakefield, UK"],
        phone: ["+49 171 8892 788", "+55 52 3431 5953"],
        email: "xpert.agency@hotmail.com",
      },
      {
        // TODO: confirm if Manuel replaces or complements Cony in Americas
        region: "Americas",
        name: "Lic. Mar\u00eda Concepci\u00f3n Lona Romero",
        locations: ["Mexico City (CDMX), Mexico", "Belo Horizonte, Brazil"],
        phone: ["+52 55 34315953"],
        email: "coniromero8@gmail.com",
      },
      {
        region: "Arab Region",
        name: "Wissam El Khoury",
        locations: ["Dubai JLT, UAE", "Velenje, Slovenia"],
        phone: ["+971 58540 4180"],
        email: "info@als.systems",
      },
      {
        // TODO: confirm Eduardo's direct contact — phone in source matches Europe team
        region: "Asia",
        name: "Eduardo Ben\u00edtez",
        locations: ["Sansia Township, Taipei County, Taiwan"],
        phone: ["+49 171 8892 788"],
        email: "",
      },
    ],
    form: {
      title: "Send us a message",
      subtitle: "Tell us about your project and we'll get back to you.",
      fields: [
        { name: "name", label: "Full name *", placeholder: "Your name", type: "text", required: true },
        { name: "cname", label: "Company *", placeholder: "Company name", type: "text", required: true },
        { name: "email", label: "Work email *", placeholder: "you@company.com", type: "email", required: true },
        { name: "topic", label: "Area of interest", type: "select", required: false, options: ["Select a topic", "Consulting", "Partnership", "Other"] },
        { name: "message", label: "Project brief *", placeholder: "Tell us about your objectives, current challenges, and what success looks like...", type: "textarea", required: true },
      ],
      privacy: "By submitting, you agree to our Privacy Policy.",
      footer_note: "We respect your time. No spam, ever.",
      buttons: [
        { label: "Book a consultation", variant: "full" },
        { label: "Send message", variant: "outline" },
      ],
      trust: "We respect your time. No spam, ever.",
    },
  });

export const getNav = (lang: Lang) =>
  getTyped<NavItem[]>("nav", "items", lang, [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/industries", label: "Industries", hasDropdown: true },
    { href: "/cases", label: "Cases" },
    { href: "/contact", label: "Contact us" },
  ]);

export const getSettings = (lang: Lang) =>
  getTyped<Settings>("settings", "general", lang, {
    contact_email: "",
    whatsapp: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    theme: {},
  });
