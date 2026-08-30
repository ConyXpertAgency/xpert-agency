// Datos PROVISIONALES para prototipo Services CATEGORÍAS → SERVICIOS
// No migrar a Supabase aún. Agrupación basada en listado real clienta (28 conceptos)

export interface ServiceItem {
  title: string
  icon: string
  text?: string
}

export interface ServiceGroup {
  id: string
  title: string
  icon: string
  services: ServiceItem[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "project-program",
    title: "Project & Program Management",
    icon: "FiClipboard",
    services: [
      { title: "Project Manager (PMI / IPMA)", icon: "FiClipboard", text: "Deliver projects on time, on scope, and on budget." },
      { title: "Program / Portfolio Manager", icon: "FiClipboard", text: "Deliver projects on time, on scope, and on budget." },
      { title: "RBE Manager", icon: "FaRegUser", text: "Experienced leaders to drive results during critical transitions." },
      { title: "Mergers & Outsourcing Manager", icon: "FaRegUser" },
      { title: "Consultant", icon: "FaRegUser" },
    ],
  },
  {
    id: "operations",
    title: "Operations & Process Excellence",
    icon: "HiOutlineCog",
    services: [
      { title: "Internal Operations Manager", icon: "FaRegUser" },
      { title: "Lean Management", icon: "PiFactory", text: "Eliminate waste and build a culture of continuous improvement." },
      { title: "Continuous Improvement", icon: "PiFactory", text: "Eliminate waste and build a culture of continuous improvement." },
      { title: "Process Auditing", icon: "HiOutlineCog", text: "Improve efficiency and reduce waste across your operations." },
      { title: "Process Simulation", icon: "HiOutlineCog" },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain & Logistics",
    icon: "AiOutlineTruck",
    services: [
      { title: "Supply Chain Consultant", icon: "AiOutlineTruck", text: "Strengthen supply chains for agility, resilience, and performance." },
      { title: "Supply Chain Optimization", icon: "AiOutlineTruck", text: "Strengthen supply chains for agility, resilience, and performance." },
      { title: "E-commerce & Logistics", icon: "AiOutlineTruck" },
      { title: "Logistics Sustainability", icon: "AiOutlineTruck" },
    ],
  },
  {
    id: "technology",
    title: "Technology & Automation",
    icon: "GiRobotGrab",
    services: [
      { title: "Systems Integrator", icon: "LuPuzzle", text: "Connect people, processes, and systems for seamless operations." },
      { title: "Systems Integration", icon: "LuPuzzle", text: "Connect people, processes, and systems for seamless operations." },
      { title: "Process Automation / RPA", icon: "GiRobotGrab", text: "Leverage automation and digital tools to boost productivity." },
      { title: "Preventive / Corrective Systems Maintenance", icon: "HiOutlineCog" },
      { title: "Technical Supervisor / Planner / Analyst", icon: "HiOutlineCog" },
    ],
  },
  {
    id: "data-performance",
    title: "Data & Performance",
    icon: "IoBarChartOutline",
    services: [
      { title: "Logistics Data Analyst", icon: "IoBarChartOutline" },
      { title: "Data Analysis / Business Intelligence", icon: "IoBarChartOutline" },
      { title: "KPI Development", icon: "IoBarChartOutline", text: "Define and track the metrics that drive meaningful results." },
      { title: "Testing & Solution Validation", icon: "IoShieldCheckmarkOutline", text: "Test, validate, and ensure solutions deliver real-world impact." },
      { title: "Claims & Risk Manager", icon: "IoShieldCheckmarkOutline" },
    ],
  },
  {
    id: "people-change",
    title: "People, Change & Training",
    icon: "RiGraduationCapLine",
    services: [
      { title: "Coaches / Trainers", icon: "RiGraduationCapLine", text: "Build capabilities and empower teams to excel." },
      { title: "Logistics / Supply Chain Training", icon: "RiGraduationCapLine", text: "Build capabilities and empower teams to excel." },
      { title: "Change Management", icon: "LuPuzzle" },
      { title: "Post-Implementation Support", icon: "HiOutlineCog" },
    ],
  },
]
