// Datos PROVISIONALES para prototipo Hub & Spoke de dos niveles
// No migrar a Supabase aún. Agrupación basada en listado real del cliente (20 conceptos)
// Ver decisiones al final del archivo.

export interface ExpertiseGroup {
  id: string;
  title: string;
  shortLabel?: string;
  items: string[];
}

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: "operations",
    title: "Operations Excellence",
    items: [
      "Continuous Improvement",
      "Lean Management",
      "Factory Lean Improvement",
      "Process Simulation",
    ],
  },
  {
    id: "supply",
    title: "Supply Chain & Logistics",
    items: [
      "Supply Chain Optimization",
      "Supply Chain Consulting",
      "E-commerce & Logistics",
      "Logistics Sustainability",
    ],
  },
  {
    id: "technology",
    title: "Technology & Automation",
    items: [
      "Systems Integration",
      "Systems Automation",
      "Preventive and Corrective Systems Maintenance",
    ],
  },
  {
    id: "projects",
    title: "Projects & Change",
    items: [
      "Project Management",
      "Change Management",
      "Post-Implementation Support",
    ],
  },
  {
    id: "data",
    title: "Data & Performance",
    items: [
      "KPI Development",
      "Process Auditing",
      "Testing and Solution Validation",
    ],
  },
  {
    id: "people",
    title: "People & Capability",
    items: [
      "Training & Coaching",
      "Logistics and Supply Chain Training",
      "Internal Management",
    ],
  },
];

// Nota: algunos conceptos aparecen en más de una categoría de forma intencional para el prototipo
// (ej. Process Auditing está en Operations y Data, Internal Management en Projects y People).
// La lista real del cliente tenía duplicados/solapamientos que se reportan en la auditoría.

export const findGroup = (id: string) => expertiseGroups.find((g) => g.id === id);
