import { cache } from "react";
import { getSupabase, resolveStorageUrl } from "./supabase/client";
import { DEFAULT_GLOBAL_REACH_NODES } from "./adminSchema";
import { expertiseGroups } from "./expertiseGroups";
import { serviceGroups } from "./serviceGroups";
import { getUiCopy } from "./i18n";
import { SEO_DEFAULTS, type SeoEntry, type SeoPageKey } from "./seoDefaults";
import type {
  AboutFirst,
  AboutSecond,
  CasesClients,
  CasesPage,
  CasesStudies,
  CaseStudy,
  ContactPage,
  ContactTeams,
  FillingPackagingPage,
  HomeGlobalReach,
  HomeHero,
  HomeFinalCta,
  HomePartners,
  HomeRoles,
  HomeTrustBand,
  HomeFillingBanner,
  IndustriesPage,
  Lang,
  NavItem,
  RbeFirst,
  RbeFive,
  RbeFooter,
  RbeFour,
  RbeSecond,
  RbeThird,
  ServicesPage,
  Settings,
} from "./supabase/types";

export const FALLBACK_LANG: Lang = "en";
export const LOCALES: Lang[] = ["en", "es", "de"];

// Idiomas disponibles en la web: los base + cualquiera que ya tenga contenido
// creado desde el admin. El navbar y generateStaticParams los consumen, así
// que un idioma nuevo se vuelve seleccionable apenas tiene un apartado.
export const getAvailableLangs = cache(async (): Promise<Lang[]> => [...LOCALES]);

async function getRow(
  collection: string,
  keyname: string,
  lang: Lang
): Promise<Record<string, unknown> | null> {
  const client = getSupabase();
  const { data, error } = await client
    .from("content")
    .select("data, lang")
    .eq("collection", collection)
    .eq("keyname", keyname)
    .in("lang", [lang, FALLBACK_LANG]);

  if (error) {
    // Keep database failures distinct from an intentionally missing content
    // row. During static regeneration, throwing preserves the last good page
    // instead of replacing it with fallback copy.
    console.error("[CMS] Content read failed", {
      collection,
      keyname,
      lang,
      code: error.code,
    });
    throw error;
  }

  if (!data || data.length === 0) return null;
  const exact = data.find((r) => r.lang === lang);
  const fallback = data.find((r) => r.lang === FALLBACK_LANG);
  return (exact ?? fallback)?.data ?? null;
}

export const getContent = cache(getRow);

export type ContentReader = (collection: string, keyname: string, lang: Lang) => Promise<Record<string, unknown> | null>;

export async function getPageSeo(lang: Lang, page: SeoPageKey, fallback: SeoEntry = SEO_DEFAULTS[lang][page]): Promise<SeoEntry> {
  const content = await getContent("settings", "seo", lang);
  const saved = content?.[page];
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return fallback;
  const values = saved as Partial<SeoEntry>;
  return {
    title: typeof values.title === "string" && values.title.trim() ? values.title : fallback.title,
    description: typeof values.description === "string" && values.description.trim() ? values.description : fallback.description,
  };
}

async function getTyped<T>(
  collection: string,
  keyname: string,
  lang: Lang,
  defaults: T,
  reader: ContentReader = getContent
): Promise<T> {
  const raw = await reader(collection, keyname, lang);
  if (!raw) return defaults;
  return mergeContent(defaults, raw);
}

function mergeContent<T>(defaults: T, raw: unknown): T {
  if (Array.isArray(defaults)) return (Array.isArray(raw) ? raw : defaults) as T;
  if (defaults !== null && typeof defaults === "object") {
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return defaults;
    const source = raw as Record<string, unknown>;
    const result: Record<string, unknown> = { ...(defaults as Record<string, unknown>), ...source };
    for (const [key, fallback] of Object.entries(defaults as Record<string, unknown>)) {
      if (key in source) result[key] = mergeContent(fallback, source[key]);
    }
    return result as T;
  }
  if (typeof defaults === "string") return (typeof raw === "string" ? raw : defaults) as T;
  if (typeof defaults === "number") return (typeof raw === "number" && Number.isFinite(raw) ? raw : defaults) as T;
  if (typeof defaults === "boolean") return (typeof raw === "boolean" ? raw : defaults) as T;
  return (raw ?? defaults) as T;
}

export const getHomeHero = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<HomeHero>("home", "hero", lang, {
    badge: "MANUFACTURING & LOGISTICS CONSULTING",
    title: [
      "Experts in integrated",
      "improvement of",
      "manufacturing and logistics.",
    ],
    subtitle:
      "Process improvement, automation, digital transformation, and operational reengineering.",
    cta_primary: "Contact us",
    cta_primary_href: "/contact",
    cta_secondary: "View services",
    cta_secondary_href: "/services",
    info_cards: [
      { title: "45+ years", text: "Combined experience delivering results" },
      { title: "International reach", text: "Projects across Europe, Americas & Asia" },
      { title: "Measurable impact", text: "Data-driven solutions that scale" },
    ],
    stat_impact: {
      title: "Operational impact",
      value: "+27%",
      label: "Average productivity increase",
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
      value: "98%",
      label: "On-time & on-scope delivery",
    },
    global_delivery: {
      title: "Global project delivery",
      text: "Delivering value across industries and borders.",
    },
  }, reader);

export const getHomePartners = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<HomePartners>("home", "partners", lang, {
    badge: "OUR EXPERT NETWORK",
    title: "Partners driving operational excellence.",
    description: [
      "Our network of senior specialists combines deep industry experience with a hands-on approach to deliver measurable results.",
      "Trusted advisors. Proven operators. Real impact.",
    ],
    purpose: {
      badge: "OUR PURPOSE",
      title: ["Mission, Vision", "and Values"],
    },
    items: [
      {
        name: "Elmar A. Beckord",
        slug: "Logistics Manager",
        logo: "/uploads/elmar.png",
        description: [
          "Logistics Manager, Engineer, Trainer.",
          "Project management and process improvement",
          "across global manufacturing operations.",
        ],
        tags: ["Project Management", "Logistics Engineering"],
      },
      {
        name: "Maria Concepcion Lona",
        slug: "Manager & Marketing",
        logo: "/uploads/cony.png",
        description: [
          "Manager, Marketing, Accountant, HR.",
          "Sales, business administration and",
          "project & product marketing.",
        ],
        tags: ["HR Management", "Marketing"],
      },
      {
        name: "Eduardo Benitez",
        slug: "Quality & Process",
        logo: "/uploads/eduardo.png",
        description: [
          "Quality management and process mining.",
          "Contracting, management control and",
          "coaching across industrial projects.",
        ],
        tags: ["Quality", "Process Mining"],
      },
      {
        name: "Wissam El Khoury",
        slug: "Co-Founder ALS",
        logo: "/uploads/wissam-20260205-211612-ad8261.png",
        description: [
          "Co-Founder ALS, warehouse constructions.",
          "Integrated logistics systems and automation",
          "for airports and distribution.",
        ],
        tags: ["Automation", "Warehouse Systems"],
      },
    ],
    cards: [
      {
        title: "mission",
        text: "Build efficient communication bridges between people and industrial infrastructure, helping clients reach their goals through consulting, innovative solutions and quality process automation services focused on fast, results-centered competitiveness.",
      },
      {
        title: "vision",
        text: "Guide our clients toward a successful future through our passion for process automation.",
        image: "/showroom.webp",
      },
      {
        title: "values",
        items: [
          "Customer satisfaction focus",
          "Trust / reliability",
          "Commitment",
          "Flexibility / multidisciplinarity",
          "Service and management quality",
        ],
      },
    ],
    stats: [
      { icon: "FiUsers", value: "30+", label: "Senior experts" },
      { icon: "CiGlobe", value: "12+", label: "Countries covered" },
      { icon: "PiSuitcaseSimpleDuotone", value: "200+", label: "Projects delivered" },
      { icon: "GrLineChart", value: "98%", label: "Client satisfaction" },
    ],
    footer: { text: "Looking for a specific expertise?", cta: "Let's connect" },
  }, reader);

export const getHomeGlobalReach = (lang: Lang, reader: ContentReader = getContent) =>
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
      { icon: "CiGlobe", value: "35+", label: "Countries served", text: "Projects successfully delivered across five continents." },
      { icon: "FiUsers", value: "250+", label: "Global expert network", text: "Engineers, consultants, and specialists worldwide." },
      { icon: "IoChatboxEllipsesOutline", value: "12+", label: "Languages supported", text: "Multilingual teams ensuring clear communication everywhere." },
      { icon: "AiOutlineTruck", value: "100+", label: "Cross-border projects", text: "End-to-end delivery across complex global operations." },
    ],
    cta: "Explore our global capabilities",
    nodes: DEFAULT_GLOBAL_REACH_NODES,
  }, reader);

export const getHomeRoles = (lang: Lang, reader: ContentReader = getContent) =>
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
    groups: expertiseGroups,
    stats: [
      { icon: "GrGroup", value: "500+", label: "Vetted experts", text: "Senior professionals with real-world industrial experience." },
      { icon: "BiTargetLock", value: "Tailored matching", label: "Right expert for your challenge", text: "We match expertise to your industry, context and goals." },
      { icon: "IoRocketOutline", value: "Measurable impact", label: "Results that move the needle", text: "Experts focused on delivering outcomes that matter." },
    ],
  }, reader);

export const getHomeFinalCta = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<HomeFinalCta>("home", "final_cta", lang, {
    title: "Let's create impact together",
    text: "Partner with us to transform your engineering and operations.",
    cta: "Contact us",
    href: "/contact",
  }, reader);

export const getHomeTrustBand = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<HomeTrustBand>("home", "trust_band", lang, {
    caption: {
      en: "Trusted across industries",
      es: "Confianza en distintas industrias",
      de: "Branchenübergreifendes Vertrauen",
    }[lang],
    logos: [],
    show_logos: true,
  }, reader);

export const getHomeFillingBanner = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<HomeFillingBanner>("home", "filling_banner", lang, {
    badge: "FILLING & PACKAGING TECHNOLOGIES",
    title: "Field-proven filling & packaging expertise",
    text: "Explore experience across installation, commissioning, ramp-up, modernization and production performance.",
    cta: "Explore Filling & Packaging",
    href: "/filling-packaging",
    image: "/filling-packaging/linea_produccion.png",
  }, reader);

export const getAboutFirst = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<AboutFirst>("about", "first", lang, {
    badge: "| ABOUT XPERT.AGENCY",
    title: "Who we are",
    heading: [
      "Experts in integrated improvement of",
      "manufacturing and logistics.",
    ],
    text: [
      "At Xpert.agency, we help organizations transform how they operate. We combine deep industry knowledge with digital solutions, automation and process excellence to design smarter, more connected and more efficient operations.",
    ],
    features: [
      { icon: "FaChartLine", title: "Industry expertise", text: "Deep understanding of manufacturing, logistics and supply chain." },
      { icon: "IoIosSettings", title: "Smart operations", text: "Automation, digitization and data-driven decision making." },
      { icon: "GrGroup", title: "End-to-end approach", text: "From strategy and design to implementation and continuous improvement." },
      { icon: "RiTargetLine", title: "Results that last", text: "Measurable impact, sustainable solutions and long-term partnerships." },
    ],
    stats: [
      { icon: "IoShieldCheckmarkOutline", value: "45+", label: "Years of experience", text: "Delivering measurable results." },
      { icon: "CiGlobe", value: "20+", label: "Countries", text: "Projects across Europe, Americas & Asia" },
      { icon: "FaChartLine", value: "150+", label: "Successful projects", text: "Across industries and company sizes" },
      { icon: "GrGroup", value: "30+", label: "Cross-functional experts", text: "Engineers, analysts and project leaders" },
    ],
    right_card: {
      title: ["Global perspective.", "Local understanding."],
      text: "We work side by side with our clients to deliver value that transcends borders.",
    },
  }, reader);

export const getAboutSecond = (lang: Lang, reader: ContentReader = getContent) =>
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
    steps: [
      {
        number: "01",
        icon: "IoIosSearch",
        title: "Diagnose operations",
        text: ["We analyze your processes, data and performance to uncover opportunities, bottlenecks and risks."],
        bullets: ["Process & data assessment", "KPI baseline & benchmarking", "Root cause analysis"],
      },
      {
        number: "02",
        icon: "IoMdClipboard",
        title: "Design improvement roadmap",
        text: ["We co-create a tailored roadmap with prioritized initiatives and clear business impact."],
        bullets: ["Solution & process design", "Business case & prioritization", "Change & risk planning"],
      },
      {
        number: "03",
        icon: "HiOutlineCog6Tooth",
        title: "Implement and coordinate",
        text: ["We execute with precision, coordinating people, technology and processes for results."],
        bullets: ["Project & program management", "Technology & integration", "Training & change enablement"],
      },
      {
        number: "04",
        icon: "FiBarChart",
        title: "Measure and optimize",
        text: ["We track results in real time and continuously optimize for long-term value."],
        bullets: ["Performance tracking (KPI)", "Continuous improvement", "Scalability & innovation"],
      },
    ],
    footer_card: {
      title: "Continuous improvement cycle",
      text: "We learn, adapt and evolve — driving sustained impact across your organization.",
    },
    rbe_bar: {
      icon: "BiSolidShield",
      title: "RBE™ — Ramp-up & Risk Mitigation",
      text: "Explore our approach to managing critical ramp-up phases, project risks and operational transitions.",
      cta: "Explore RBE™",
      href: "/rbe",
    },
    stats: [
      { icon: "IoShieldCheckmarkOutline", value: "45+ years", label: "Of combined experience delivering results" },
      { icon: "CiGlobe", value: "Global perspective", label: "Projects across Europe, Americas & Asia" },
      { icon: "FaChartLine", value: "Measurable impact", label: "Data-driven solutions that scale" },
      { icon: "FiUsers", value: "Client partnership", label: "Collaborative approach focused on your success" },
    ],
  }, reader);

export const getServicesPage = (lang: Lang, reader: ContentReader = getContent) =>
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
    groups: serviceGroups,
    footer: {
      title: "Need a tailored approach?",
      text: "Let's discuss how our experts can help you achieve your goals.",
      cta: "Contact us",
    },
  }, reader);

export const getIndustriesPage = (lang: Lang, reader: ContentReader = getContent) =>
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
      { icon: "PiFactoryLight", title: "Industrial Operations", text: "Improving asset performance, safety, and sustainability with data-driven operations." },
    ],
    marquee_logos: [],
    info_card: {
      title: "Cross-industry expertise. Measurable results.",
      text: "We bring proven frameworks and deep industry knowledge to every engagement — delivering solutions that scale.",
      cta: "View all services",
      cta_href: "/services",
    },
  }, reader);

const CASE_STUDY_IDS_BY_TITLE: Record<string, string> = {
  "Pistor AG - Swiss (CH).": "pistor-ag-swiss",
  "Almarai - KSA.": "almarai-ksa",
  "FENIX Outdoor Supply": "fenix-outdoor-supply",
  "Schuh Schmid": "schuh-schmid",
  "Birkenstock e-commerce hub.": "birkenstock-ecommerce-hub",
  "Landmark channel distribution": "landmark-channel-distribution",
  "Landmark channel distribution.": "landmark-channel-distribution",
  "HYMMEN flooring": "hymmen-flooring",
  "HYMMEN Flooring": "hymmen-flooring",
  "XOX Snacks": "xox-snacks",
  "Giesecke+Devrient (G+D)": "giesecke-devrient-gd",
  "Zeitfracht Medien": "zeitfracht-medien",
  "Weig-Karton": "weig-karton",
  "Kymmene Papier": "kymmene-papier",
  "Semiconductor - Logistics 2030": "infineon-logistics-2030",
  "Car Electronics Manufacturing Supply": "continental-car-electronics-supply",
  "Semiconductor Manufacturing Supply": "rohde-schwarz-semiconductor-supply",
};

const toCaseStudyId = (title: string, index: number) =>
  CASE_STUDY_IDS_BY_TITLE[title] ??
  (title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "case-study-" + (index + 1));

const adaptLegacyCaseStudy = (item: Record<string, unknown>, index: number): CaseStudy => {
  const title = typeof item.title === "string" ? item.title : "Case study " + (index + 1);
  const project = typeof item.project === "string" ? item.project : undefined;
  return {
    id: toCaseStudyId(title, index),
    client: typeof item.company === "string" ? item.company : title,
    title,
    industry: typeof item.industry === "string" ? item.industry : undefined,
    summary: project,
    description: project,
    logo: typeof item.image === "string" ? item.image : undefined,
    project,
    knowhow: typeof item.knowhow === "string" ? item.knowhow : undefined,
    bullets: Array.isArray(item.bullets) ? item.bullets.filter((entry): entry is string => typeof entry === "string") : undefined,
    results: Array.isArray(item.results) ? item.results.filter((entry): entry is string => typeof entry === "string") : undefined,
  };
};

/* Casos destacados de Elmar (SELECTED PROJECT EXPERIENCE).
 * Van debajo de los featured existentes. Logos placeholder en /public/logos/
 * hasta que Cony pase los oficiales. Trilingüe EN/ES/DE. */
const ELMAR_FEATURED_CASES: Record<Lang, CaseStudy[]> = {
  en: [
    {
      id: "infineon-logistics-2030",
      client: "Infineon",
      title: "Semiconductor - Logistics 2030",
      industry: "Semiconductor Logistics",
      country: "Germany · Austria · China (D-A-CN)",
      logo: "/logos/infineon.webp",
      project:
        "Developing logistics concept for inbound & outbound automation, mandatory for all location developments in Europe and China.",
      results: [
        "Inbound material handling from reception to warehouse",
        "Production supply from warehouse to cleanroom manufacturing",
        "Outbound from cleanroom to shipping buffer",
      ],
      featured: true,
    },
    {
      id: "continental-car-electronics-supply",
      client: "Continental Automotive",
      title: "Car Electronics Manufacturing Supply",
      industry: "Automotive Electronics Manufacturing",
      country: "Regensburg DE · Toulouse FR",
      logo: "/logos/continental.webp",
      project:
        "Developing & realization of automated factory material supply — 2 manufacturing centers / 2 concepts. Planning & project management.",
      results: [
        "Fully automated warehouse Regensburg with direct connection to production floors, line supply < 30' from order to launch, return flows included",
        "Central warehouse Toulouse supplying 3 surrounding plants, direct connection to material buffer (pick to drawer)",
      ],
      featured: true,
    },
    {
      id: "rohde-schwarz-semiconductor-supply",
      client: "Rohde & Schwarz",
      title: "Semiconductor Manufacturing Supply",
      industry: "Semiconductor Manufacturing Supply",
      country: "Memmingen DE",
      logo: "/logos/rohde-schwarz.svg",
      project:
        "Developing & realization of automated factory material supply, new factory automatization concept. Planning & project management.",
      results: [
        "Material handover to small bin carousel storage",
        "Overhead connection to satellite buffers and manufacturing/testing lines",
        "SMD lines and testing stations supplied directly from buffers",
      ],
      featured: true,
    },
  ],
  es: [
    {
      id: "infineon-logistics-2030",
      client: "Infineon",
      title: "Semiconductores - Logística 2030",
      industry: "Logística de semiconductores",
      country: "Alemania · Austria · China (D-A-CN)",
      logo: "/logos/infineon.webp",
      project:
        "Desarrollo del concepto logístico para automatización inbound y outbound, obligatorio para todos los desarrollos de planta en Europa y China.",
      results: [
        "Manejo de material inbound desde recepción hasta almacén",
        "Abastecimiento a producción desde almacén hasta manufactura en sala limpia",
        "Salida desde sala limpia hasta buffer de embarque",
      ],
      featured: true,
    },
    {
      id: "continental-car-electronics-supply",
      client: "Continental Automotive",
      title: "Suministro para manufactura de electrónica automotriz",
      industry: "Manufactura de electrónica automotriz",
      country: "Regensburg DE · Toulouse FR",
      logo: "/logos/continental.webp",
      project:
        "Desarrollo y realización del suministro automatizado de material a fábrica — 2 centros / 2 conceptos. Planeación y gerencia de proyecto.",
      results: [
        "Almacén totalmente automatizado en Regensburg con conexión directa a pisos de producción, suministro a línea < 30' del pedido al lanzamiento, con retornos incluidos",
        "Almacén central en Toulouse que abastece a 3 plantas cercanas, conexión directa al buffer de material (pick to drawer)",
      ],
      featured: true,
    },
    {
      id: "rohde-schwarz-semiconductor-supply",
      client: "Rohde & Schwarz",
      title: "Suministro para manufactura de semiconductores",
      industry: "Suministro para manufactura de semiconductores",
      country: "Memmingen DE",
      logo: "/logos/rohde-schwarz.svg",
      project:
        "Desarrollo y realización del suministro automatizado de material a fábrica, nuevo concepto de automatización. Planeación y gerencia de proyecto.",
      results: [
        "Entrega de material a almacén carrusel de contenedores pequeños",
        "Conexión elevada a buffers satélite y líneas de manufactura/pruebas",
        "Líneas SMD y estaciones de prueba abastecidas directo desde buffers",
      ],
      featured: true,
    },
  ],
  de: [
    {
      id: "infineon-logistics-2030",
      client: "Infineon",
      title: "Halbleiter – Logistik 2030",
      industry: "Halbleiter-Logistik",
      country: "Deutschland · Österreich · China (D-A-CN)",
      logo: "/logos/infineon.webp",
      project:
        "Entwicklung des Logistikkonzepts für Inbound- und Outbound-Automatisierung, verbindlich für alle Standortentwicklungen in Europa und China.",
      results: [
        "Wareneingang und Materialhandling bis zum Lager",
        "Produktionsversorgung vom Lager bis zur Reinraumfertigung",
        "Ausgang vom Reinraum bis zum Versandpuffer",
      ],
      featured: true,
    },
    {
      id: "continental-car-electronics-supply",
      client: "Continental Automotive",
      title: "Materialversorgung Kfz-Elektronikfertigung",
      industry: "Automobilelektronik-Fertigung",
      country: "Regensburg DE · Toulouse FR",
      logo: "/logos/continental.webp",
      project:
        "Entwicklung und Realisierung der automatisierten Fabrik-Materialversorgung — 2 Werke / 2 Konzepte. Planung und Projektmanagement.",
      results: [
        "Vollautomatisches Lager Regensburg mit direkter Anbindung an die Produktion, Linienversorgung < 30' vom Auftrag bis zur Bereitstellung, inkl. Rückflüsse",
        "Zentrallager Toulouse versorgt 3 umliegende Werke, direkte Anbindung an den Materialpuffer (Pick to Drawer)",
      ],
      featured: true,
    },
    {
      id: "rohde-schwarz-semiconductor-supply",
      client: "Rohde & Schwarz",
      title: "Materialversorgung Halbleiterfertigung",
      industry: "Materialversorgung Halbleiterfertigung",
      country: "Memmingen DE",
      logo: "/logos/rohde-schwarz.svg",
      project:
        "Entwicklung und Realisierung der automatisierten Fabrik-Materialversorgung, neues Fabrik-Automatisierungskonzept. Planung und Projektmanagement.",
      results: [
        "Materialübergabe an Kleinteile-Karusselllager",
        "Hängende Anbindung an Satellitenpuffer sowie Fertigungs- und Prüflinien",
        "SMD-Linien und Prüfstationen direkt aus Puffern versorgt",
      ],
      featured: true,
    },
  ],
};

export const getCasesStudies = async (lang: Lang, reader: ContentReader = getContent): Promise<CasesStudies> => {
  const mergeElmar = (items: CaseStudy[]): CaseStudy[] => {
    const ids = new Set(items.map((item) => item.id));
    const missing = (ELMAR_FEATURED_CASES[lang] ?? ELMAR_FEATURED_CASES.en).filter(
      (item) => !ids.has(item.id)
    );
    // Debajo de los featured existentes, como pidió Cony.
    return [...items, ...missing];
  };

  const studies = await reader("cases", "studies", lang);
  if (studies && Array.isArray(studies.items)) {
    const items = studies.items as unknown as CaseStudy[];
    return { items: studies.include_default_cases === false ? items : mergeElmar(items) };
  }

  const legacy = await reader("cases", "items", lang);
  if (legacy && Array.isArray(legacy.items)) {
    return {
      items: mergeElmar(
        legacy.items
          .filter((item): item is Record<string, unknown> => item !== null && typeof item === "object" && !Array.isArray(item))
          .map(adaptLegacyCaseStudy)
      ),
    };
  }

  return { items: mergeElmar([]) };
};

export const getCasesClients = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<CasesClients>("cases", "clients", lang, { items: [] }, reader);

export const getCasesPage = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<CasesPage>("cases", "page", lang, {
    header: {
      badge: "CASES",
      title: "Proven impact across industries and challenges.",
      text: "We partner with organizations worldwide to solve complex operational challenges through integrated improvement, automation, and logistics solutions.",
    },
    featured_title: { en: "Featured case studies", es: "Casos de éxito destacados", de: "Ausgewählte Fallstudien" }[lang],
    studies_title: { en: "More case studies", es: "Más casos de éxito", de: "Weitere Fallstudien" }[lang],
    clients_title: { en: "Clients / Experience", es: "Clientes / Experiencia", de: "Kunden / Erfahrung" }[lang],
    items: [
      {
        title: "NOVENTIS",
        slug: "Advanced Manufacturing",
        description: "Streamlined production and quality control across multi-site operations.",
        stats: [
          { icon: "FaRegChartBar", value: "28%", text: "increase in overall equipment effectiveness" },
          { icon: "FaRegClock", value: "22%", text: "reduction in cycle time" },
          { icon: "IoShieldCheckmarkOutline", value: "99.2%", text: "quality compliance achieved" },
        ],
      },
      {
        title: "LUMINA LOGISTICS",
        slug: "Logistics & Supply Chain",
        description: "Designed and implemented an end-to-end supply chain optimization program.",
        stats: [
          { icon: "FaRegChartBar", value: "31%", text: "reduction in logistics costs" },
          { icon: "FaRegClock", text: "On-time delivery improved to 98%" },
          { icon: "IoShieldCheckmarkOutline", text: "Real-time visibility across 4 regions" },
        ],
      },
      {
        title: "NEXORA ENERGY",
        slug: "Energy & Utilities",
        description: "Integrated reliability and maintenance systems to improve asset performance.",
        stats: [
          { icon: "FaRegChartBar", value: "18%", text: "reduction in unplanned downtime" },
          { icon: "FaRegClock", value: "25%", text: "improvement in maintenance efficiency" },
          { icon: "IoShieldCheckmarkOutline", value: "$4.2M", text: "annual savings realized" },
        ],
      },
      {
        title: "VERIDIAN LABS",
        slug: "Life Sciences",
        description: "Modernized operations and ensured regulatory compliance at scale.",
        stats: [
          { icon: "FaRegChartBar", value: "300%", text: "increase in production throughput" },
          { icon: "FaRegClock", value: "100%", text: "regulatory audit compliance" },
          { icon: "IoShieldCheckmarkOutline", value: "15+", text: "reduction in operational costs" },
        ],
      },
      {
        title: "MARITEX GROUP",
        slug: "Marine & Shipping",
        description: "Optimized fleet operations and predictive maintenance capabilities.",
        stats: [
          { icon: "FaRegChartBar", value: "20%", text: "improvement in fleet utilization" },
          { icon: "FaRegClock", value: "35%", text: "reduction in maintenance incidents" },
          { icon: "IoShieldCheckmarkOutline", value: "$2.1M", text: "annual fuel savings" },
        ],
      },
      {
        title: "ALTRAX DISTRIBUTION",
        slug: "Retail & Distribution",
        description: "Automated warehouse operations and optimized inventory flow.",
        stats: [
          { icon: "FaRegChartBar", value: "40%", text: "increase in order fulfillment rate" },
          { icon: "FaRegClock", value: "26%", text: "reduction in picking time" },
          { icon: "IoShieldCheckmarkOutline", value: "99.5%", text: "inventory accuracy achieved" },
        ],
      },
    ],
  }, reader);

export const getContactPage = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<ContactPage>("contact", "page", lang, {
    badge: "LET'S BUILD WHAT'S NEXT",
    title: "Ready to improve your operations?",
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
  }, reader);

const isRegionalContact = (value: unknown): value is ContactTeams["items"][number]["contacts"][number] =>
  Boolean(
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as { id?: unknown }).id === "string" &&
    typeof (value as { name?: unknown }).name === "string"
  );

const normalizeContactTeams = (value: unknown): ContactTeams | undefined => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const items = (value as { items?: unknown }).items;
  if (!Array.isArray(items)) return undefined;

  const title = typeof (value as { title?: unknown }).title === "string" ? (value as { title: string }).title : undefined;
  const isGrouped = items.every(
    (item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof (item as { id?: unknown }).id === "string" &&
      typeof (item as { region?: unknown }).region === "string" &&
      Array.isArray((item as { contacts?: unknown }).contacts) &&
      (item as { contacts: unknown[] }).contacts.every(isRegionalContact)
  );

  if (isGrouped) return { title, items: items as ContactTeams["items"] };

  const isLegacyFlat = items.every(
    (item) =>
      isRegionalContact(item) &&
      typeof (item as { region?: unknown }).region === "string"
  );
  if (!isLegacyFlat) return undefined;

  const groups = new Map<string, ContactTeams["items"][number]>();
  (items as Array<ContactTeams["items"][number]["contacts"][number] & { region: string }>).forEach((contact) => {
    const regionId = contact.recipientKey || contact.region.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const group = groups.get(regionId) ?? { id: regionId, region: contact.region, contacts: [] };
    const { region: _region, ...contactWithoutRegion } = contact;
    group.contacts.push(contactWithoutRegion);
    groups.set(regionId, group);
  });

  return { title, items: Array.from(groups.values()) };
};

export const getContactTeams = async (lang: Lang, reader: ContentReader = getContent): Promise<ContactTeams> => {
  const teams = await reader("contact", "teams", lang);
  const normalizedTeams = normalizeContactTeams(teams);
  if (normalizedTeams) return normalizedTeams;

  if (lang !== FALLBACK_LANG) {
    const fallback = await reader("contact", "teams", FALLBACK_LANG);
    const normalizedFallback = normalizeContactTeams(fallback);
    if (normalizedFallback) return normalizedFallback;
  }

  return { items: [] };
};

export const getRbeFirst = async (lang: Lang, reader: ContentReader = getContent): Promise<RbeFirst> => {
  const d = await getTyped<RbeFirst>("rbe", "first", lang, {
    badge: "Interim Management",
    title: ["Rapid Business Elevating <strong>RBE™</strong>"],
    subtitle: "Interim Management, elevate performance safe and quickly.",
    text: "RBE™ is Xpert.agency's proprietary framework for rapid ramp-up and business process elevation. We step in, stabilize operations, protect value and drive measurable performance improvement fast, safe and sustainable.",
    cta_primary: "See the approach",
    cta_primary_href: "/rbe#rbe-expectations",
    cta_secondary: "Explore the framework",
    cta_secondary_href: "/rbe",
    list: [
      { title: "Rapid ramp-up", text: "" },
      { title: "Business processes", text: "" },
      { title: "Elevating performance", text: "" },
    ],
    cards: [
      { number: "01", title: "PREPARING", text: "Plan and prepare for corrective actions." },
      { number: "02", title: "SAFEGUARDING", text: "Stabilize operations and protect value." },
      { number: "03", title: "PREFORMING", text: "Execute improvements and elevate performance." },
    ],
    image: "/rbe/panel-1.png",
  }, reader);
  return { ...d, image: resolveStorageUrl(d.image) ?? d.image };
};

export const getRbeSecond = async (lang: Lang, reader: ContentReader = getContent): Promise<RbeSecond> => {
  const d = await getTyped<RbeSecond>("rbe", "second", lang, {
    badge: "THE CHALLENGE",
    title: "What are we talking about?",
    text: "Every investor, responsible manager and entrepreneur world-wide is knowing and fearing the difficulties in projects, when business processes are going to change:",
    image: "/uploads/challenge.png",
    list: [
      {
        number: "01",
        text: "Project go-live is a milestone everybody knows as an inevitable source of preoccupation, in spite of all possible closeness in planning, cautiousness in execution and consequence in controlling.",
      },
      {
        number: "02",
        text: "The launch of a new system or automation solution, embedded into business processes, is interfacing to many stakeholder interests, at least to the customer's. Many projects are suffering - more or less in any way - after go-live.",
      },
      {
        number: "03",
        text: "It is always a risky phase, where investors are losing money, managers are losing jobs and - in worst case - entrepreneurs are losing business, customer and reputation.",
      },
    ],
    text_card:
      "It is not enough to get support for ramp-up from system supplier. As well, additional manpower in operations is not able to compensate awaited inefficiencies during ramp-up.",
    focus: {
      icon: "/rbe_icon.png",
      badge: "RBE focus",
      title: "Let us talk about ramp-up with RBE - our solution for risk mitigation.",
    },
  }, reader);
  // Resuelve rutas Storage (/uploads/…) a URL pública; lo demás pasa intacto.
  // Ya no se pisa el valor del CMS con un asset local.
  return { ...d, image: resolveStorageUrl(d.image) ?? d.image };
};

export const getRbeThird = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<RbeThird>("rbe", "third", lang, {
    title: "What can you expect from RBE Interim Management?",
    subtitle: "A well-structured, systematic management approach to success.",
    phases: [
      {
        icon: "FiClipboard",
        title: "Preparing phase",
        subtitle: ["Build clarity, assess risks and", "prepare the operation for ramp-up."],
        items: [
          "Check data and processes",
          "Check manpower plan",
          "Identify risks",
          "Calculate RBE proposal",
          "Settle the RBE team",
          "Perform “What-if” analysis and quantify risks",
          "Define and execute preventing actions",
          "Install alert system for corrective actions",
          "Evaluate supplier contracts regarding claims",
          "Check training, documentation, and plan",
          "Evaluate management training and plan",
          "Perform trainings (etc.)",
        ],
      },
      {
        icon: "MdWeb",
        title: "Safeguarding phase",
        subtitle: ["Stabilize operations, monitor KPIs", "and strengthen control during execution."],
        items: [
          "Check & monitor KPI",
          "Check alert system",
          "Execute corrective actions",
          "On-the-job training & coaching on all workstations",
          "Extend “What-if” analysis",
          "Adapt corrective actions",
          "Provide a comprehensive table to develop basis tool for improving processes and the system",
          "Develop strategies to improve operations and system",
          "Settle gamification",
          "Do process mining to measure progress (etc.)",
        ],
      },
      {
        icon: "PiUsersThree",
        title: "Performing phase",
        subtitle: ["Drive improvement waves, train teams", "and prepare long-term handover."],
        items: [
          "Check comprehensive table to define waves",
          "Establish improvement waves",
          "Provide collaborative team games",
          "Establish Progress visualization & reporting",
          "Train-the-trainer for on-the-job coaching",
          "Actualize improvement wave concept",
          "Train management to take over the wave concept",
          "Inform management permanently",
          "Handover to executives",
        ],
      },
    ],
    image: "/panel_3.png",
    footer_title: "RBE 3-PHASE MODEL",
    footer_text:
      "A structured management approach that drives rapid ramp-up, protects value, and delivers measurable impact - fast, safe and sustainable.",
  }, reader);

export const getRbeFour = async (lang: Lang, reader: ContentReader = getContent): Promise<RbeFour> => {
  const d = await getTyped<RbeFour>("rbe", "four", lang, {
    title: "10+1 Elements for ramp-up with RBE",
    subtitle:
      "A practical toolkit to stabilize operations fast, manage risks, and drive measurable performance improvements.",
    left: [
      { icon: "FaRegUser", number: "01", title: "RBE Survey", text: "Shaping individual concepts" },
      { icon: "LuUsers", number: "03", title: "Interim Management Team", text: "Core team • Specialists" },
      { icon: "IoShieldCheckmarkOutline", number: "05", title: "FMEA / What-If Analysis", text: "Described risks • Preventives • Correctives" },
      { icon: "FiTool", number: "07", title: "Embedded Tools", text: "Process mining • Gamification • Tutorials" },
      { icon: "IoSchoolOutline", number: "09", title: "Operations Training", text: "Shop floor based • Skill training • Skill coaching" },
    ],
    right: [
      { icon: "FaRegUser", number: "02", title: "Three Phase Model", text: "Preparing • Safeguarding • Performing" },
      { icon: "IoShieldCheckmarkOutline", number: "04", title: "Claim Management", text: "Requirements • Set claims • Defend claims" },
      { icon: "IoIosPulse", number: "06", title: "Comprehensive Tests", text: "Flow exerciser • System exerciser • etc." },
      { icon: "LuBrainCog", number: "08", title: "Systems Training", text: "Systems thinking • LEAN training • Coaching" },
      { icon: "BsBarChartLine", number: "10", title: "Visualization & Reporting", text: "KPI tracking • Gemba walks • Standard reports" },
    ],
    image: "/rbe/panel-4.png",
    extra: {
      number: "+1",
      title: "Improvement Waves",
      text: "Exec-program • Agile projects • Progress awards",
    },
  }, reader);
  return { ...d, image: resolveStorageUrl(d.image) ?? d.image };
};

export const getRbeFive = async (lang: Lang, reader: ContentReader = getContent): Promise<RbeFive> => {
  const d = await getTyped<RbeFive>("rbe", "five", lang, {
    title: "What does RBE mean?",
    subtitle: "A phased framework that stabilizes operations fast and drives measurable improvement.",
    image: "/rbe/panel-5.png",
    items: [
      {
        icon: "IoRocketOutline",
        letter: "R",
        title: "Rapid ramp-up",
        text: "Speed up operations to achieve expected performance within the planned timeframe.",
      },
      {
        icon: "PiUsersThree",
        letter: "B",
        title: "Business processes",
        text: "Strengthen people skills and process discipline to complement embedded technical systems for planning and execution.",
      },
      {
        icon: "BsBarChart",
        letter: "E",
        title: "Elevating performance",
        text: "Bring new business to best level - more than expected - stable and scalable to foster additional business.",
      },
    ],
    footer_text:
      "RBE closes the gap between planned performance and actual performance.",
  }, reader);
  return { ...d, image: resolveStorageUrl(d.image) ?? d.image };
};

export const getRbeFooter = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<RbeFooter>("rbe", "footer", lang, {
    title: "Contact",
    text: "For ramp-up support, interim management and operational stabilization.",
    contact_name: "Elmar A. Beckord",
    contact_phone: "+49 171 889 2788",
    contact_cta: "Contact Marc",
    contact_href: "/contact",
    cta: "Back to site",
    cta_href: "/",
    year: "2026 RBE",
  }, reader);

export const getFillingPackagingPage = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<FillingPackagingPage>("filling_packaging", "page", lang, {
    hero: {
      badge: "FILLING & PACKAGING",
      title: "Filling & Packaging Technologies",
      subtitle: "Field-proven expertise across installation, commissioning, modernization and production performance.",
      ctaPrimary: "Explore capabilities",
      ctaPrimaryHref: "#capabilities",
      ctaSecondary: "View project experience",
      ctaSecondaryHref: "#projects",
      facts: [
        { value: "12 Years", label: "Field Experience" },
        { value: "8", label: "Documented Project Clusters" },
      ],
      image: "",
    },
    glance: {
      badge: "EXPERIENCE AT A GLANCE",
      title: "Proven field experience, now advisory",
      metrics: [
        { value: "12", label: "Years in Installation & Service" },
        { value: "8", label: "Documented Project Clusters" },
        { value: "4", label: "Southeast Asian Markets" },
      ],
      timeline: {
        left: {
          range: "2008 – 2020",
          title: "Installation & Service",
          text: "Installation and service expertise at a global leader in filling and packaging technology.",
        },
        right: {
          range: "Since 2020",
          title: "Technical advisory",
          text: "Technical advisory and interim assignments in beverage and liquid-food production and supply chain.",
        },
      },
    },
    capabilities: {
      badge: "PROVEN SITE CAPABILITIES",
      title: "Field expertise across the production lifecycle",
      subtitle: "From installation and commissioning to ramp-up, performance improvement and downtime prevention.",
      steps: [
        { number: "01", title: "INSTALL", icon: "FiTool" },
        { number: "02", title: "COMMISSION", icon: "FiClipboard" },
        { number: "03", title: "RAMP UP", icon: "HiOutlineCog6Tooth" },
        { number: "04", title: "IMPROVE OEE", icon: "GrLineChart" },
        { number: "05", title: "PREVENT DOWNTIME", icon: "IoShieldCheckmarkOutline" },
      ],
      supporting: ["Construction", "Commissioning", "Modernization", "Quality", "Improvement"],
      image: "/filling-packaging/linea_produccion.png",
    },
    foundation: {
      badge: "EXPERIENCE FOUNDATION",
      title: "Experienced where line performance is won",
      left: { value: "12 YEARS", text: "Installation and service expertise at a global leader in filling and packaging technology." },
      right: { value: "SINCE 2020", text: "Technical advisory across beverages, liquid foods, production and supply chain." },
    },
    international: {
      badge: "SELECTED INTERNATIONAL EXPERIENCE",
      title: "Portfolio across greenfield, modernization and performance recovery",
      stats: [
        { value: "8", label: "Project Clusters" },
        { value: "5", label: "Regions" },
        { value: "10", label: "Year Portfolio Excerpt" },
      ],
      industries: ["Beverages", "Water", "Liquid Foods", "Pharma Labelling"],
      regions: ["South Africa", "Europe", "North America", "Saudi Arabia", "Southeast Asia"],
      nodes: [
        { country: "South Africa", label: "ZA", x: 55, y: 68, description: "South Africa" },
        { country: "Europe", label: "EU", x: 51, y: 28, description: "Europe" },
        { country: "North America", label: "NA", x: 14, y: 38, description: "North America" },
        { country: "Saudi Arabia", label: "SA", x: 66, y: 44, description: "Saudi Arabia" },
        { country: "Southeast Asia", label: "SEA", x: 88, y: 52, description: "Southeast Asia" },
      ],
    },
    cases: [
      {
        id: "heineken-za-01",
        number: "01",
        client: "Heineken",
        location: "South Africa",
        title: "GREENFIELD BREWERY CONSTRUCTION & COMMISSIONING",
        scope: "Supporting the construction, installation and commissioning of a new brewery plant with four production lines.",
        outcomes: [
          "Equipment delivered and incorporated from KRONES manufacturing (Germany); go-live and ramp-up aligned with client quality, safety and performance requirements.",
          "OEE improvement supported across all production lines.",
        ],
      },
      {
        id: "diageo-scotland-02",
        number: "02",
        client: "Diageo",
        location: "Scotland",
        title: "PRODUCTION EQUIPMENT REPLACEMENT & OEE IMPROVEMENT",
        scope: "On-site management services for replacement of equipment, commissioning and performance ramp-up.",
        outcomes: [
          "Equipment change delivered and new products launched successfully.",
          "Overall Equipment Effectiveness (OEE) improved by 10%.",
        ],
      },
      {
        id: "nestle-us-03",
        number: "03",
        client: "Nestlé",
        location: "United States",
        title: "QUALITY IMPROVEMENT & ROOT-CAUSE RESOLUTION",
        scope: "Production quality issues resolution.",
        outcomes: ["Quality issues identified and eliminated.", "Non-conforming goods output reduced by 20%."],
      },
      {
        id: "nova-ksa-04",
        number: "04",
        client: "Nova Water KSA",
        location: "Saudi Arabia",
        title: "NEW PRODUCTION LINE INSTALLATION & COMMISSIONING",
        scope: "New production line installation and production ramp-up services.",
        outcomes: [
          "Complete installation and go-live of all equipment in accordance with client specifications.",
          "Overall Equipment Effectiveness (OEE) improved by 10%.",
        ],
      },
      {
        id: "bayer-de-05",
        number: "05",
        client: "Bayer",
        location: "Germany",
        title: "PHARMACEUTICAL LABELLING ADAPTATION TO PRODUCTION LINE",
        scope: "Labelling equipment conversion to support a new product and label format.",
        outcomes: ["Labelling equipment replaced and production ramp-up supported in compliance with pharmaceutical quality requirements."],
      },
      {
        id: "abinbev-ru-06",
        number: "06",
        client: "Anheuser-Busch InBev",
        location: "Russia",
        title: "PRODUCTION LINE MODERNIZATION & CAPACITY EXPANSION",
        scope: "Removal of 30% of existing equipment during production operations, followed by installation and commissioning of reengineered lines.",
        outcomes: ["Managed and improved OEE by 10%.", "Expanded the product portfolio."],
      },
      {
        id: "heineken-sea-07",
        number: "07",
        client: "Heineken",
        location: "Malaysia, Thailand, Vietnam and Myanmar",
        title: "SOUTHEAST ASIA EQUIPMENT MODERNIZATION PROGRAM",
        scope: "Replacement of several machines across multiple production sites in Southeast Asia.",
        outcomes: [
          "Project management delivered on site with OEE focus.",
          "Production facilities modernized and expanded.",
          "Several new products enabled.",
        ],
      },
      {
        id: "predictive-08",
        number: "08",
        client: "Multiple clients",
        location: "Multiple countries",
        title: "PREDICTIVE MAINTENANCE DATA ANALYTICS",
        scope: "Data analytics with an internally developed tool to evaluate performance and quality issues using historical data and production-machinery interface messages.",
        outcomes: [
          "Maintenance needs and principal failure sources identified at machine, line and plant level.",
          "Production interruptions and plant or line downtime avoided.",
          "Improvement foundations provided with minimized effort.",
          "Incremental OEE improvements delivered.",
        ],
      },
    ],
    finalCta: {
      title: "Let’s build the next line.",
      text: "Bring proven filling, packaging and production-performance expertise to your next project.",
      cta: "Start a conversation",
      href: "/contact",
    },
  }, reader);

const NAV_DEFAULTS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/filling-packaging", label: "Filling & Packaging" },
  { href: "/cases", label: "Cases" },
  { href: "/rbe", label: "RBE" },
  { href: "/contact", label: "Contact us" },
];

export const getNav = async (lang: Lang, reader: ContentReader = getContent): Promise<NavItem[]> => {
  const saved = await reader("nav", "items", lang);
  // New editor saves explicitly own the list. Keep the legacy backfill below
  // only for older rows, so deliberate reordering and removal stay effective.
  if (saved && !Array.isArray(saved) && saved.editor_managed === true && Array.isArray(saved.items)) {
    return saved.items as NavItem[];
  }
  const raw = await getTyped<NavItem[]>("nav", "items", lang, NAV_DEFAULTS, reader);
  // Supabase may contain stale nav without Filling & Packaging and with hasDropdown — enforce architecture
  let items = Array.isArray(raw) ? [...raw] : [...NAV_DEFAULTS];
  const configuredFillingPackaging = items.find((it) => it.href === "/filling-packaging");
  // strip false chevrons
  items = items.map((it) => ({ ...it, hasDropdown: undefined } as NavItem));
  if (configuredFillingPackaging) return items;
  // re-inject at approved position: after Industries (or after Services if Industries missing)
  const idxIndustries = items.findIndex((it) => it.href === "/industries");
  const insertAt = idxIndustries >= 0 ? idxIndustries + 1 : items.findIndex((it) => it.href === "/cases");
  const fp: NavItem = configuredFillingPackaging ?? { href: "/filling-packaging", label: "Filling & Packaging" };
  if (insertAt >= 0) items.splice(insertAt, 0, fp);
  else items.splice(Math.max(0, items.length - 2), 0, fp); // before contact/rbe fallback
  // ensure contact stays last CTA (Navbar splits it)
  return items;
};

export const getSettings = (lang: Lang, reader: ContentReader = getContent) =>
  getTyped<Settings>("settings", "general", lang, {
    contact_email: "",
    whatsapp: "",
    facebook: "",
    linkedin: "https://www.linkedin.com/in/elmar-beckord-40680333/",
    instagram: "",
    twitter: "",
    theme: {},
    footer: {
      description: {
        en: "Experts for integrated manufacturing & logistics improvement",
        es: "Expertos en mejora integral de manufactura y logística",
        de: "Experten für integrierte Verbesserung von Fertigung und Logistik",
      }[lang],
      ...getUiCopy(lang).footer,
    },
    consent: getUiCopy(lang).consent,
  }, reader);
