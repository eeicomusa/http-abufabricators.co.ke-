import fieldDeploymentSteelImg from '../assets/images/field_deployment_steel_1794757075689.jpg';
import jawCrusherQuarryImg from '../assets/images/jaw_crusher_quarry_1794757074845.jpg';
import conveyorGantryImg from '../assets/images/conveyor_gantry_system_1794757074906.jpg';
import miningBallMillImg from '../assets/images/mining_ball_mill_1794757075920.jpg';
import heavyWeldingHoppersImg from '../assets/images/heavy_welding_hoppers_1794757077417.jpg';
import warehousePortalFrameImg from '../assets/images/warehouse_portal_frame_1794942090088.jpg';
import hydraulicConeCrusherImg from '../assets/images/hydraulic_cone_crusher_1795120084946.jpg';
import rotorImpactCrusherImg from '../assets/images/rotor_impact_crusher_1795120085668.jpg';
import goldProcessingTrommelImg from '../assets/images/gold_processing_trommel_1795120085754.jpg';
import agroHammerMillImg from '../assets/images/agro_hammer_mill_1795120084892.jpg';
import wearSparePartsImg from '../assets/images/wear_spare_parts_1795120084841.jpg';
import crushingScreeningPlantImg from '../assets/images/crushing_screening_plant_1791642643281.jpg';
import fabricationWorkshopImg from '../assets/images/fabrication_workshop_1791642628863.jpg';

export const GENERATED_MEDIA = {
  fieldDeploymentSteel: fieldDeploymentSteelImg,
  jawCrusherQuarry: jawCrusherQuarryImg,
  conveyorGantry: conveyorGantryImg,
  miningBallMill: miningBallMillImg,
  heavyWeldingHoppers: heavyWeldingHoppersImg,
  warehousePortalFrame: warehousePortalFrameImg,
  hydraulicConeCrusher: hydraulicConeCrusherImg,
  rotorImpactCrusher: rotorImpactCrusherImg,
  goldProcessingTrommel: goldProcessingTrommelImg,
  agroHammerMill: agroHammerMillImg,
  wearSpareParts: wearSparePartsImg,
  crushingScreeningPlant: crushingScreeningPlantImg,
  fabricationWorkshop: fabricationWorkshopImg
};

export interface MachineProduct {
  id: string;
  name: string;
  category: 'crushing' | 'screening' | 'handling' | 'mining' | 'custom';
  tagline: string;
  description: string;
  image: string;
  gallery?: string[];
  applications: string[];
  specs: {
    label: string;
    value: string;
  }[];
  advantages: string[];
  capacityRange: string;
  feedSizeMax: string;
  powerRange: string;
  maintenanceNotes: string;
}

export interface IndustrySector {
  id: string;
  name: string;
  description: string;
  icon: string;
  equipmentNeeds: string[];
  kenyaContext: string;
}

export interface CaseProject {
  id: string;
  badge: string;
  title: string;
  clientIndustry: string;
  location: string;
  challenge: string;
  solution: string;
  deliveredEquipment: string[];
  metrics: string;
  image: string;
  videoUrl?: string;
  gallery?: string[];
}

export interface MaintenanceTier {
  id: string;
  name: string;
  tagline: string;
  suitableFor: string;
  deliverables: string[];
  recommendedInterval: string;
}

export interface SeoArticle {
  id: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  keyTakeaways: string[];
  fullBody: string;
}

export interface FaqItem {
  id: string;
  category: 'Lead Times' | 'Warranty & Quality' | 'Delivery & Site Work' | 'Pricing & Terms';
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  roleOrCompany: string;
  county: string;
  projectType: string;
  quote: string;
  rating: number;
}

export interface PartnerBadge {
  id: string;
  name: string;
  sector: string;
}

export interface CompanyMetrics {
  countiesServed: string;
  completedProjectsCount: string;
  onTimeDeliveryRate: string;
  warrantyPeriod: string;
}

export interface SteelworkStructureItem {
  id: string;
  title: string;
  category:
    | 'Portal Frames & Warehouses'
    | 'Mezzanines & Platforms'
    | 'Tanks & Silos'
    | 'Staircases & Catwalks'
    | 'Gates & Heavy Doors';
  steelGrade: string;
  typicalSpanOrCapacity: string;
  finishSpec: string;
  description: string;
  image: string;
}

export interface CountyDispatchCorridor {
  id: string;
  regionName: string;
  counties: string[];
  transitTime: string;
  vehicleClass: string;
  mobileCrewSla: string;
  coatingRecommendation: string;
  highlights: string[];
}

export interface QualityComplianceItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  checkpoints: string[];
}

export interface TenderChecklistItem {
  id: string;
  documentTitle: string;
  statusLabel: string;
  notes: string;
}

export interface SiteIdentity {
  companyName: string;
  shortName: string;
  subLabel: string;
  tagline: string;
  secondaryTagline: string;
  location: string;
  coverage: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  address: string;
  logoUrl: string;
  secondaryLogoUrl: string;
  logoFrameStyle: 'white-badge' | 'transparent' | 'bordered-card';
  workingHours: string;
}

export interface ThemeConfig {
  accentColor: string;
  accentHoverColor: string;
  amberHighlight: string;
  backgroundColor: string;
  surfaceColor: string;
  surfaceAltColor: string;
  borderColor: string;
  textColor: string;
  textMutedColor: string;
  backgroundImageUrl?: string;
  backgroundImageOpacity?: number;
}

export interface FounderProfile {
  name: string;
  role: string;
  photoUrl: string;
  quote: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3?: string;
  experienceYears: string;
  milestoneNote: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
}

export type StandardSectionId =
  | 'hero'
  | 'trust-bar'
  | 'one-partner'
  | 'equipment-finder'
  | 'industries'
  | 'machinery'
  | 'crushing-flow'
  | 'mining-solutions'
  | 'custom-machine'
  | 'fabrication'
  | 'maintenance'
  | 'conveyors'
  | 'maintenance-packages'
  | 'engineering-process'
  | 'workshop'
  | 'projects'
  | 'spare-parts'
  | 'kenya-strategy'
  | 'seo-guides'
  | 'about'
  | 'testimonials'
  | 'faq'
  | 'steelwork-gallery'
  | 'county-dispatch'
  | 'quality-compliance';

export type SectionId = StandardSectionId | `custom-${string}`;

export interface SectionBlockConfig {
  id: SectionId;
  label: string;
  visible: boolean;
  isCustomBlock?: boolean;
  targetPage?: '/' | '/services' | '/machinery' | '/projects' | '/about' | '/guides';
  kicker?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  primaryCta?: string;
  secondaryCta?: string;
  imagePrimary?: string;
  imageSecondary?: string;
  videoUrl?: string;
}

export interface CmsDataState {
  siteIdentity: SiteIdentity;
  founder: FounderProfile;
  theme: ThemeConfig;
  seo: SeoConfig;
  sections: SectionBlockConfig[];
  machinery: MachineProduct[];
  projects: CaseProject[];
  industries: IndustrySector[];
  maintenanceTiers: MaintenanceTier[];
  articles: SeoArticle[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  partners: PartnerBadge[];
  companyMetrics: CompanyMetrics;
  steelworkGallery: SteelworkStructureItem[];
  footerAboutText: string;
  footerFinalHeadline: string;
  footerFinalSubtext: string;
}

export const BUILTIN_LOGOS = {
  emblemAfricaKenya: '/assets/aistudio/IMG-20261012-WA0022_249a12fc.jpg',
  cleanOrangeBlack: '/assets/aistudio/IMG-20261012-WA0020_03d27c5d.jpg'
};

export const BUILTIN_REAL_MEDIA = {
  landingBackground: '/assets/aistudio/Landingaone_31e7e8bd.jpg',
  founderPhoto: '/assets/aistudio/Owner_602b7a0a.jpg',
  workshopVideo: '/assets/aistudio/VID-20261115-WA0024_922c225a.mp4',
  jawCrusherScreenYard: '/assets/aistudio/IMG-20261115-WA0008_9b9e602c.jpg',
  quarryFieldDelivery: '/assets/aistudio/IMG-20261115-WA0019_03672276.jpg',
  structuralBatchingTower: '/assets/aistudio/IMG-20261115-WA0022_75991aab.jpg',
  crusherStandChuteBay: '/assets/aistudio/IMG-20261115-WA0015_9196c273.jpg',
  blockMoldingMachine: '/assets/aistudio/IMG-20261115-WA0023_548f68df.jpg',
  twinTankCompressorWeld: '/assets/aistudio/IMG-20261115-WA0025_6528335a.jpg'
};

export const BUILTIN_MEDIA_PRESETS = [
  {
    id: 'builtin-logo-africa',
    name: 'ABU Logo (Africa & Kenya Emblem)',
    dataUrl: BUILTIN_LOGOS.emblemAfricaKenya,
    mediaType: 'image' as const,
    category: 'logo' as const
  },
  {
    id: 'builtin-logo-clean',
    name: 'ABU Logo (Clean Carbon & Orange)',
    dataUrl: BUILTIN_LOGOS.cleanOrangeBlack,
    mediaType: 'image' as const,
    category: 'logo' as const
  },
  {
    id: 'builtin-landing-bg',
    name: 'Landingaone — Active Stone Crusher & Screen Field Background',
    dataUrl: BUILTIN_REAL_MEDIA.landingBackground,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-founder-owner',
    name: 'Founder & Concrete Block Plant Conveyor System',
    dataUrl: BUILTIN_REAL_MEDIA.founderPhoto,
    mediaType: 'image' as const,
    category: 'workshop' as const
  },
  {
    id: 'builtin-video-agro-mill',
    name: 'Live Commissioning Video — Diesel Belt Feed Chaff & Forage Mill',
    dataUrl: BUILTIN_REAL_MEDIA.workshopVideo,
    mediaType: 'video' as const,
    category: 'workshop' as const
  },
  {
    id: 'builtin-real-crusher-unit',
    name: 'Fabricated Diesel Jaw Crusher & 2-Deck Vibrating Screen',
    dataUrl: BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-real-field-crane',
    name: 'Remote Quarry Crusher & Crane Truck Deployment',
    dataUrl: BUILTIN_REAL_MEDIA.quarryFieldDelivery,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-real-steel-tower',
    name: 'Structural Steel Access Stairs & Batching Hopper Tower',
    dataUrl: BUILTIN_REAL_MEDIA.structuralBatchingTower,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-real-workshop-frame',
    name: 'Embakasi Workshop — Heavy Crusher Stand & Chutes',
    dataUrl: BUILTIN_REAL_MEDIA.crusherStandChuteBay,
    mediaType: 'image' as const,
    category: 'workshop' as const
  },
  {
    id: 'builtin-real-block-press',
    name: 'Custom Mobile Concrete Hollow-Block Press',
    dataUrl: BUILTIN_REAL_MEDIA.blockMoldingMachine,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-real-welding-sparks',
    name: 'Live Welding — Twin-Tank Mobile Compressor Skid',
    dataUrl: BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
    mediaType: 'image' as const,
    category: 'workshop' as const
  },
  {
    id: 'builtin-warehouse-portal',
    name: 'Clear-Span Warehouse Steel Portal Frame & Trusses',
    dataUrl: warehousePortalFrameImg,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-field-deployment-steel',
    name: 'Structural Steel Framework & Plant Field Deployment',
    dataUrl: fieldDeploymentSteelImg,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-workshop',
    name: 'Heavy Steel Hopper & Structural Welding Bay',
    dataUrl: heavyWeldingHoppersImg,
    mediaType: 'image' as const,
    category: 'workshop' as const
  },
  {
    id: 'builtin-crusher-plant',
    name: 'Primary Jaw Crusher & Vibrating Screen Quarry Plant',
    dataUrl: jawCrusherQuarryImg,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-conveyor',
    name: 'Lattice Truss Conveyor & Stockpile Gantry',
    dataUrl: conveyorGantryImg,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-mining',
    name: 'Ball Mill & Mineral Processing Plant',
    dataUrl: miningBallMillImg,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-cone-crusher',
    name: 'Hydraulic Cone Crusher — Secondary/Tertiary Unit',
    dataUrl: hydraulicConeCrusherImg,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-impact-crusher',
    name: 'Heavy Rotor Impact Crusher Unit',
    dataUrl: rotorImpactCrusherImg,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-gold-trommel',
    name: 'Gold Ore Rotary Trommel & CIP/CIL Leach Circuit',
    dataUrl: goldProcessingTrommelImg,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-agro-hammer-mill',
    name: 'Commercial Agricultural Hammer Mill & Cyclone Mixer',
    dataUrl: agroHammerMillImg,
    mediaType: 'image' as const,
    category: 'product' as const
  },
  {
    id: 'builtin-wear-spare-parts',
    name: 'Manganese Crusher Wear Plates, Rollers & Bearings Store',
    dataUrl: wearSparePartsImg,
    mediaType: 'image' as const,
    category: 'workshop' as const
  },
  {
    id: 'builtin-screening-plant',
    name: 'Multi-Deck Quarry Screening & Crushing Circuit',
    dataUrl: crushingScreeningPlantImg,
    mediaType: 'image' as const,
    category: 'project' as const
  },
  {
    id: 'builtin-metal-welding-bay',
    name: 'Structural Metal Fabrication & Welding Bay',
    dataUrl: fabricationWorkshopImg,
    mediaType: 'image' as const,
    category: 'workshop' as const
  }
];

export const COMPANY_DETAILS = {
  name: 'ABU FABRICATORS AND SERVICES K. LIMITED',
  shortName: 'ABU FABRICATORS',
  tagline: 'PRECISION STEEL FABRICATION. BUILT TO LAST.',
  secondaryTagline: 'WE ENGINEER. WE FABRICATE. WE BUILD.',
  location: 'Fedha Road, Embakasi, Nairobi',
  coverage: 'Serving contractors, developers, and industries across Kenya',
  phoneDisplay: '0724 151771',
  phoneRaw: '+254724151771',
  whatsappNumber: '254724151771',
  email: 'info@abufabricators.co.ke',
  address: 'Fedha Road, Embakasi, opposite Nairobi Gospel Church, Nairobi, Kenya',
  whatsappDefaultMsg:
    'Hello ABU Fabricators and Services K. Limited, I would like a free consultation and quotation for a fabrication or industrial project.'
};

export const CORE_DIVISIONS = [
  {
    id: 'machinery',
    title: 'Industrial Machinery',
    desc: 'Robust production and processing equipment manufactured and configured for demanding East African industrial conditions.'
  },
  {
    id: 'mining-quarry',
    title: 'Mining & Quarry Equipment',
    desc: 'Primary jaw crushers, secondary impactors, vibrating screens, and mineral washing plants for aggregates and ores.'
  },
  {
    id: 'custom-manufacturing',
    title: 'Custom Machine Manufacturing',
    desc: 'Purpose-engineered mechanical systems built from first engineering principles to resolve specific site bottlenecks.'
  },
  {
    id: 'fabrication',
    title: 'Industrial Fabrication',
    desc: 'Heavy plate cutting, forming, and assembly of chutes, hoppers, bins, cyclone separators, and heavy machine chassis.'
  },
  {
    id: 'welding',
    title: 'Welding Services',
    desc: 'Precision MIG/MAG, TIG, heavy ARC/stick, and hardfacing wear-resistant overlay welding executed to rigorous specs.'
  },
  {
    id: 'structural-steel',
    title: 'Structural Steel',
    desc: 'Engineered platforms, access stairways, walkways, heavy equipment support towers, and gantry crane beams.'
  },
  {
    id: 'repair-refurbishment',
    title: 'Machine Repair & Refurbishment',
    desc: 'Restoring worn crushers, shaft re-machining, bearing replacements, frame re-squaring, and structural strengthening.'
  },
  {
    id: 'installation',
    title: 'Industrial Installation',
    desc: 'On-site mechanical rigging, optical alignment, grouting, and structural erection across Kenyan industrial sites.'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Technical Services',
    desc: 'Scheduled preventive maintenance programs, vibration checks, and emergency breakdown intervention.'
  },
  {
    id: 'conveyors',
    title: 'Conveyors & Material Handling',
    desc: 'Heavy overland conveyors, troughed belt systems, screw augers, bucket elevators, and automated radial stackers.'
  },
  {
    id: 'custom-engineering',
    title: 'Custom Engineering',
    desc: 'Drafting, mechanical stress calculation, kinematic optimization, and manufacturing drawings from client briefs.'
  },
  {
    id: 'spare-parts',
    title: 'Spare Parts & Components',
    desc: 'High-manganese jaw plates, mantles, blow bars, polyurethane screen panels, heavy conveyor rollers, and bearings.'
  }
];

export const INDUSTRIES_SERVED: IndustrySector[] = [
  {
    id: 'mining',
    name: 'Mining & Mineral Extraction',
    description:
      'Crushing, ore handling, classification, grinding mills, and gravity-separation plant structures engineered for remote extractive sites.',
    icon: 'Pickaxe',
    equipmentNeeds: ['Jaw Crushers', 'Ball Mills', 'Trommel Washers', 'Concentrator Platforms', 'Slurry Chutes'],
    kenyaContext:
      'Engineered for commercial and cooperative gold extraction in Western Kenya, Migori, and mineral operations in the Rift Valley.'
  },
  {
    id: 'quarrying',
    name: 'Quarrying & Aggregate Production',
    description:
      'High-tonnage stone crushing, scalping, screening decks, hoppers, and stockpile conveyor networks for ballasts, gravel, and sand.',
    icon: 'Mountain',
    equipmentNeeds: ['Primary Jaw Crushers', 'Secondary Cone Units', 'Inclined Vibrating Screens', 'Radial Stackers'],
    kenyaContext:
      'Built tough to withstand abrasive basalt, granite, and phonolite rock typical of Kenyan quarry belts (Machakos, Kitui, Central Kenya).'
  },
  {
    id: 'construction',
    name: 'Civil Construction & Infrastructure',
    description:
      'Structural steel frameworks, machine access walkways, site fabrication, and aggregate processing for major contractors.',
    icon: 'HardHat',
    equipmentNeeds: ['Gantry Walkways', 'Batching Plant Hoppers', 'Reinforcing Steel Fixtures', 'Mobile Screening'],
    kenyaContext:
      "Supporting road contractors, dam builders, and commercial infrastructure developers across Kenya's urban and rural corridors."
  },
  {
    id: 'manufacturing',
    name: 'Industrial Manufacturing',
    description:
      'Automated conveyor lines, custom machine bases, process tanks, and heavy parts handling for factory environments.',
    icon: 'Factory',
    equipmentNeeds: ['Chain Conveyors', 'Custom Fixtures', 'Industrial Silos', 'Motorized Transfer Tables'],
    kenyaContext:
      'Providing swift fabrication and component turnaround for manufacturing hubs in Nairobi Industrial Area, Thika, and Athi River.'
  },
  {
    id: 'agriculture',
    name: 'Agricultural & Agro-Processing',
    description:
      'Grain handling elevators, feed mill mixing machines, bagging hoppers, post-harvest drying platforms, and tea/coffee equipment fabrication.',
    icon: 'Wheat',
    equipmentNeeds: ['Bucket Elevators', 'Hammer Mills', 'Screw Augers', 'Sorting Drums', 'Storage Bins'],
    kenyaContext:
      'Empowering food security and agro-value addition in the Mt. Kenya region, Rift Valley breadbaskets, and tea processing zones.'
  },
  {
    id: 'recycling',
    name: 'Waste Recycling & Material Recovery',
    description:
      'Heavy scrap metal sorting conveyors, plastic granulator hoppers, industrial shredder frames, and waste processing structures.',
    icon: 'Recycle',
    equipmentNeeds: ['Trommel Separators', 'Sorting Belt Lines', 'Heavy Shredder Bases', 'Magnetic Separator Frames'],
    kenyaContext:
      "Accelerating circular economy initiatives and waste valorization plants in Kenya's major commercial municipalities."
  },
  {
    id: 'water-environment',
    name: 'Water & Environmental Systems',
    description:
      'Heavy steel water storage reservoirs, sludge scraper mechanisms, pipe bridges, pump skid frames, and weir gates.',
    icon: 'Droplets',
    equipmentNeeds: ['Clarifier Bridges', 'Heavy Pressure Vessels', 'Skid Bases', 'Aeration Racks'],
    kenyaContext:
      'Fabricated to withstand humid and chlorinated municipal water treatment conditions with high-grade anti-corrosive preparation.'
  },
  {
    id: 'energy',
    name: 'Energy & Power Infrastructure',
    description:
      'Substation structural steel, turbine maintenance gantries, exhaust stack fabrication, and heavy cable tray support networks.',
    icon: 'Zap',
    equipmentNeeds: ['Substation Gantry Steel', 'Transformer Skid Bases', 'Thermal Ducting', 'Flange Assemblies'],
    kenyaContext:
      'Supporting geothermal installations in Olkaria, solar plant framing, and industrial power distribution stations.'
  },
  {
    id: 'logistics',
    name: 'Logistics & Bulk Warehousing',
    description:
      'Truck offloading ramps, container de-stuffing conveyors, pallet transit rails, and heavy warehouse storage mezzanine floors.',
    icon: 'Truck',
    equipmentNeeds: ['Telescopic Loading Belts', 'Mezzanine Steel', 'Heavy Dock Levellers', 'Gravity Roller Runs'],
    kenyaContext:
      'Enabling rapid turnover for freight forwarders at inland container depots in Embakasi, Naivasha ICD, and Mombasa.'
  },
  {
    id: 'food-processing',
    name: 'Food & Beverage Processing',
    description:
      'Sanitary stainless-steel transfer chutes, washdown machine structures, sugar baggers, and flour handling systems.',
    icon: 'Utensils',
    equipmentNeeds: ['Stainless 304 Chutes', 'Sanitary Screw Conveyors', 'Blending Tanks', 'Support Platforms'],
    kenyaContext:
      'Compliant with hygiene codes and easy-clean structural standards for Kenyan food packing plants.'
  }
];

export const MACHINERY_CATALOG: MachineProduct[] = [
  {
    id: 'jaw-crusher-pe',
    name: 'Heavy-Duty Jaw Crusher (Primary)',
    category: 'crushing',
    tagline: 'Uncompromising primary rock reduction for rugged quarry and mining operations.',
    description:
      'Engineered with a deep crushing chamber, high-tensile cast steel frame, and forged eccentric shaft. Delivers immense crushing force on hard igneous stone and mineral ores while minimizing wear on manganese cheek plates.',
    image: jawCrusherQuarryImg,
    applications: ['Primary Quarry Crushing', 'Hard Basalt & Granite Breakdown', 'Gold Ore Primary Reduction', 'Recycled Concrete'],
    specs: [
      { label: 'Throughput Capacity', value: '30 – 280 TPH (model dependent)' },
      { label: 'Max Feed Size', value: 'Up to 650 mm (technical specs on request)' },
      { label: 'Discharge Setting', value: '40 – 160 mm adjustable' },
      { label: 'Drive System', value: 'High-torque V-belt electric motor or diesel engine' },
      { label: 'Frame Construction', value: 'Stress-relieved heavy steel weldment & cast alloy' }
    ],
    advantages: [
      'Extra-heavy forged alloy eccentric shaft with oversize spherical roller bearings',
      'Easily adjustable discharge toggle plate for rapid size variation',
      'Reversible high-manganese (18-22% Mn) jaw dies for double wear longevity',
      'Deep symmetric crushing cavity maximizing reduction ratio'
    ],
    capacityRange: '30 – 280 TPH',
    feedSizeMax: 'Up to 650 mm',
    powerRange: '37 – 160 kW',
    maintenanceNotes: 'Easy grease lubrication points and rapid jaw plate changeover clamp bars.'
  },
  {
    id: 'cone-crusher-compound',
    name: 'Hydraulic Cone Crusher (Secondary/Tertiary)',
    category: 'crushing',
    tagline: 'High-precision reduction with optimal aggregate cubical shape.',
    description:
      'Engineered for hard and medium-hard ores and rocks. Provides reliable secondary or tertiary crushing with hydraulic tramp release, protecting the crusher from uncrushable tramp iron while maintaining uniform grading.',
    image: hydraulicConeCrusherImg,
    applications: ['Secondary Aggregate Shaping', 'Tertiary Fines Production', 'River Pebble Processing', 'Mining Feed Prep'],
    specs: [
      { label: 'Throughput Capacity', value: '50 – 320 TPH (model dependent)' },
      { label: 'Max Feed Size', value: 'Up to 215 mm' },
      { label: 'Closed Side Setting', value: '6 – 38 mm' },
      { label: 'Lubrication', value: 'External air/oil-cooled forced pressure system' },
      { label: 'Control', value: 'Hydraulic clearance adjustment and push-button clearing' }
    ],
    advantages: [
      'Superior cubical particle shape compliant with Kenyan civil road specs (KeNHA/KURA)',
      'Hydraulic unblocking prevents catastrophic downtime from tramp metal',
      'Laminated crushing chamber design ensuring high output efficiency',
      'Durable bronze bushings machined to ultra-fine tolerances'
    ],
    capacityRange: '50 – 320 TPH',
    feedSizeMax: 'Up to 215 mm',
    powerRange: '75 – 220 kW',
    maintenanceNotes: 'Automated oil temperature and pressure trip interlocks prevent operational bearing damage.'
  },
  {
    id: 'impact-crusher-pf',
    name: 'Heavy Rotor Impact Crusher',
    category: 'crushing',
    tagline: 'High-reduction ratio impact crushing for superior cubical aggregates.',
    description:
      'Designed for soft to medium-hard rock like limestone, dolomite, and construction rubble. Features a heavy chrome or manganese blow bar rotor system delivering high velocity impact fracturing.',
    image: rotorImpactCrusherImg,
    applications: ['Limestone Quarrying', 'Asphalt Base Aggregate', 'Demolition Recycling', 'Secondary Crushing'],
    specs: [
      { label: 'Throughput Capacity', value: '40 – 250 TPH' },
      { label: 'Max Feed Size', value: 'Up to 350 mm' },
      { label: 'Blow Bar Metallurgy', value: 'High-chrome alloy or ceramic matrix inserts' },
      { label: 'Rotor Type', value: 'Heavy solid structural steel precision dynamically balanced' },
      { label: 'Curtain Adjustment', value: 'Dual spring-loaded impact apron shields' }
    ],
    advantages: [
      'Produces exceptionally sharp cubical product with minimal flats and elongations',
      'Hydraulic-assisted housing opening for lightning-fast blow bar rotation',
      'Overload-protected impact aprons absorb sudden rock surges',
      'Low maintenance downtime compared to hammer mills in abrasive stone'
    ],
    capacityRange: '40 – 250 TPH',
    feedSizeMax: 'Up to 350 mm',
    powerRange: '55 – 185 kW',
    maintenanceNotes: 'Inspect blow bar edge bevels weekly; reverse positions to balance wear.'
  },
  {
    id: 'vibrating-screen-multi-deck',
    name: 'Multi-Deck Inclined Vibrating Screen',
    category: 'screening',
    tagline: 'High-efficiency aggregate separation with circular motion dynamics.',
    description:
      'Heavy structural side plates assembled with huck-bolts (no welding on dynamic sideplates to eliminate stress cracking). Available in 2, 3, or 4 decks with woven wire mesh, perforated plate, or polyurethane modular media.',
    image: crushingScreeningPlantImg,
    applications: ['Aggregate Sizing (0-6mm, 6-10mm, 10-14mm, 14-20mm)', 'Quarry Scalping', 'Ore Classification', 'Sand Washing Prep'],
    specs: [
      { label: 'Deck Dimensions', value: '1.2m x 3.6m up to 2.4m x 6.0m (custom available)' },
      { label: 'Deck Options', value: '2, 3, or 4 Deck Configurations' },
      { label: 'Vibration Stroke', value: 'Adjustable 6 – 9 mm eccentric amplitude' },
      { label: 'Media Compatibility', value: 'High-tensile wire mesh, punched plate, modular poly' },
      { label: 'Suspension', value: 'Heavy-duty coil springs with rubber damper boots' }
    ],
    advantages: [
      'Huck-bolted side plate architecture guarantees zero fatigue weld cracking',
      'Substantial screening area prevents carryover of saleable aggregate fines',
      'Quick-tensioning hook strip clamp bars for rapid screen mesh changing',
      'Rubber lined cross-members to protect main structural tubes from rock abrasion'
    ],
    capacityRange: '50 – 400 TPH',
    feedSizeMax: 'Up to 150 mm',
    powerRange: '11 – 30 kW',
    maintenanceNotes: 'Daily inspection of clamping tension bolts and weekly bearing grease purging.'
  },
  {
    id: 'trommel-screen-heavy',
    name: 'Heavy-Duty Rotary Trommel Screen',
    category: 'screening',
    tagline: 'Uncloggable rotary screening for sticky clay, alluvial soils, and gold wash.',
    description:
      'Features a robust internal scrubber section with spiral lifters followed by perforated screening segments. Ideal for alluvial mining, wet soils, compost, and river sand where vibrating screens get blinded by sticky fines.',
    image: goldProcessingTrommelImg,
    applications: ['Alluvial Gold Washing', 'Sticky Clay Soil Washing', 'Compost & Topsoil Sorting', 'River Pebble Grading'],
    specs: [
      { label: 'Drum Diameter', value: '1.0m to 2.2m' },
      { label: 'Drum Length', value: '3.5m to 9.0m' },
      { label: 'Drive Type', value: 'Chain gear drive or heavy polyurethane friction wheels' },
      { label: 'Screen Apertures', value: 'Custom punched or woven replaceable liners' },
      { label: 'Water Manifold', value: 'Integrated high-pressure spray bar included' }
    ],
    advantages: [
      'Internal aggressive scrubbing vanes disintegrate stubborn clay balls',
      'Self-cleaning tumbling action eliminates screen blinding',
      'Reinforced heavy trunnion support wheels on machined roller tracks',
      'Fabricated skid or mobile chassis for effortless deployment on remote sites'
    ],
    capacityRange: '20 – 180 TPH',
    feedSizeMax: 'Up to 200 mm',
    powerRange: '7.5 – 37 kW',
    maintenanceNotes: 'Grease support wheel pillow blocks and check drive chain tension periodically.'
  },
  {
    id: 'heavy-duty-conveyor-system',
    name: 'Industrial Troughed Belt Conveyor System',
    category: 'handling',
    tagline: 'Heavy structural lattice or channel conveyors built for non-stop bulk transfer.',
    description:
      'Fabricated from heavy channel steel or structural lattice trusses. Features heavy-duty 3-roll troughing idlers, impact idlers at feed zones, vulcanized rubber belting (EP315 to EP630), and crowned motorized drive drums.',
    image: conveyorGantryImg,
    applications: ['Quarry Stockpiling', 'Crushing Circuit Interconnects', 'Overland Ore Transport', 'Truck Loading'],
    specs: [
      { label: 'Belt Widths', value: '500mm, 650mm, 800mm, 1000mm, 1200mm' },
      { label: 'Conveyor Lengths', value: '6m to 150m continuous single runs' },
      { label: 'Belt Rating', value: '3-ply / 4-ply EP multi-layer rubber with 4+2 or 5+2 covers' },
      { label: 'Take-Up System', value: 'Screw take-up or gravity counterweight carriage' },
      { label: 'Safety Systems', value: 'Emergency pull-cord wire, belt-drift switch, speed sensor' }
    ],
    advantages: [
      'Rigid truss design allows wide spans between ground support bents',
      'Crowned rubber-lagged drive drums prevent belt slippage in rain or dusty conditions',
      'Rock-box drop chutes with replaceable hardfaced wear liners',
      'Fully modular bolt-together sections for cost-effective freight across Kenya'
    ],
    capacityRange: '30 – 800 TPH',
    feedSizeMax: 'Up to 300 mm',
    powerRange: '5.5 – 75 kW',
    maintenanceNotes: 'Inspect belt alignment weekly; adjust screw take-up spindles to preserve tension.'
  },
  {
    id: 'industrial-feed-hoppers-chutes',
    name: 'Heavy Receiving Hoppers & Transfer Chutes',
    category: 'handling',
    tagline: 'Engineered steel storage and transfer vessels lined against severe rock impact.',
    description:
      'Custom structural steel bins and transfer chutes fabricated with 10mm–20mm thick mild steel plates, reinforced with structural gussets and lined with replaceable manganese or Hardox-grade wear plates.',
    image: heavyWeldingHoppersImg,
    applications: ['Dump Truck Receiving Hoppers', 'Crusher Discharge Chutes', 'Surge Bins', 'Belt Transfer Points'],
    specs: [
      { label: 'Capacity Range', value: '5 m³ to 80 m³ holding volume' },
      { label: 'Plate Thickness', value: '8mm, 12mm, 16mm, 20mm structural plate' },
      { label: 'Liner Options', value: 'High-manganese cast tiles, Hardox steel, or UHMWPE' },
      { label: 'Discharge Gate', value: 'Manual slide-gate, hydraulic radial gate, or vibrating feeder' },
      { label: 'Structural Framing', value: 'Heavy universal columns and hollow sections (SHS/RHS)' }
    ],
    advantages: [
      'Engineered flow angles prevent material arching, rat-holing, and bridging',
      'Bolt-in wear liner plates allow quick replacement without hot torch cutting',
      'Built to withstand direct tipping shock from 20-tonne tipper trucks',
      'Precision fabricated at our Fedha Road, Embakasi workshop with verified weld test joints'
    ],
    capacityRange: '5 m³ – 80 m³',
    feedSizeMax: 'Up to 600 mm',
    powerRange: 'Static / Optional Feeder Drive',
    maintenanceNotes: 'Inspect liner bolt torque during scheduled plant shut-downs.'
  },
  {
    id: 'gold-ore-grinding-ball-mill',
    name: 'Continuous Discharge Mineral Ball Mill',
    category: 'mining',
    tagline: 'Fine pulverization and liberation grinding for precious metal extraction.',
    description:
      'Heavy cylindrical steel shell lined with high-manganese or rubber wear liners, charged with forged alloy steel grinding balls. Delivers precise particle size reduction for mineral recovery circuits.',
    image: miningBallMillImg,
    applications: ['Gold Quartz Grinding', 'Base Metal Ore Micronizing', 'Industrial Mineral Milling', 'Tailing Reprocessing'],
    specs: [
      { label: 'Shell Diameters', value: '900mm to 2400mm' },
      { label: 'Grinding Media', value: 'Forged alloy steel balls (40mm – 90mm mix)' },
      { label: 'Liner Metallurgy', value: 'High-manganese cast wave liners or replaceable alloy bars' },
      { label: 'Discharge Type', value: 'Grate discharge or overflow trunnion design' },
      { label: 'Drive Configuration', value: 'Heavy girth gear & pinion with soft-start electric motor' }
    ],
    advantages: [
      'Maximizes liberation of microscopic precious metals from refractory host rock',
      'Heavy cast trunnion ends with Babbitt bearing or heavy roller bearing pedestals',
      'Precision girth gear alignment guarantees quiet vibration-free rotation',
      'Balanced energy consumption per tonne milled'
    ],
    capacityRange: '1 – 35 TPH',
    feedSizeMax: 'Up to 25 mm',
    powerRange: '18.5 – 132 kW',
    maintenanceNotes: 'Monitor ball charge wear levels monthly; replenish top-up ball sizing accordingly.'
  },
  {
    id: 'custom-agricultural-feed-mill',
    name: 'Commercial Industrial Hammer Mill & Mixer',
    category: 'custom',
    tagline: 'Custom-manufactured high-output milling for grain, animal feed, and biomass.',
    description:
      'Custom designed and fabricated to customer capacity requirements. Features heat-treated reversible hammers, interchangeable sizing screens, and dynamic cyclone dust separation.',
    image: agroHammerMillImg,
    applications: ['Poultry & Dairy Feed Plants', 'Grain Milling', 'Biomass Briquetting Prep', 'Cassava & Crop Processing'],
    specs: [
      { label: 'Output Capacity', value: '1.5 – 12 TPH' },
      { label: 'Rotor Construction', value: 'Precision balanced rotor plate assembly with hardened pins' },
      { label: 'Hammers', value: 'Tungsten-carbide hardfaced reversible hammers' },
      { label: 'Screen Apertures', value: '1.5mm to 12mm perforated heavy sheet' },
      { label: 'Dust Extraction', value: 'Integrated high-efficiency cyclone & airlock valve' }
    ],
    advantages: [
      'Custom tailored to specific Kenyan crop moisture and fiber conditions',
      'Reversible 4-way hammers double operating lifetime before replacement',
      'Vibration-isolated chassis eliminates transfer of shaking to floor slabs',
      'Manufactured locally in Embakasi, Nairobi with 100% locally serviceable components'
    ],
    capacityRange: '1.5 – 12 TPH',
    feedSizeMax: 'Grain / Chopped Forage',
    powerRange: '15 – 55 kW',
    maintenanceNotes: 'Check hammer balance and clearance to screen daily before startup.'
  }
];

export const COMPLETE_CRUSHING_STEPS = [
  {
    step: '01',
    name: 'Feed Hopper',
    subtitle: 'Raw Dump Receiving',
    description:
      'Heavy reinforced steel hopper capable of receiving 15-30 ton quarry dump truck loads without structural deflection.',
    icon: 'Inbox'
  },
  {
    step: '02',
    name: 'Vibrating Feeder',
    subtitle: 'Scalping & Controlled Rate',
    description:
      'Grizzly bars separate natural clay and dirt fines prior to crushing, feeding only clean rock into the jaw.',
    icon: 'Sliders'
  },
  {
    step: '03',
    name: 'Primary Jaw Crusher',
    subtitle: 'Coarse Fracturing',
    description:
      'Breaks boulder feed (up to 600mm) down to manageable sizes (100-150mm) using high compressive forces.',
    icon: 'ShieldAlert'
  },
  {
    step: '04',
    name: 'Secondary Crusher',
    subtitle: 'Cone or Impact Sizing',
    description:
      'Reduces intermediate stone into precise aggregate dimensions with controlled cubical particle morphology.',
    icon: 'Cpu'
  },
  {
    step: '05',
    name: 'Vibrating Screen',
    subtitle: 'Multi-Deck Classification',
    description:
      'Segregates the flow into commercial saleable sizes (e.g., quarry dust 0-6mm, 10mm, 14mm, and 20mm concrete ballast).',
    icon: 'Layers'
  },
  {
    step: '06',
    name: 'Conveyors & Chutes',
    subtitle: 'Closed Circuit Recirculation',
    description:
      'Oversize aggregate is automatically routed back to secondary crushing while final grades route to discharge.',
    icon: 'ArrowRightLeft'
  },
  {
    step: '07',
    name: 'Stockpile',
    subtitle: 'Finished Product Yard',
    description:
      'High-capacity radial or fixed stackers create high-volume stockpiles ready for dispatch to road and building sites.',
    icon: 'PackageCheck'
  }
];

export const GOLD_MINING_STEPS = [
  {
    step: '01',
    name: 'Run-of-Mine Ore',
    desc: 'Mined quartz vein or alluvial ore excavated from reef deposits.'
  },
  {
    step: '02',
    name: 'Primary Crushing',
    desc: 'Jaw crushers fracture hard quartz rocks into manageable minus-25mm gravel size.'
  },
  {
    step: '03',
    name: 'Grinding Mill',
    desc: 'Ball mill or heavy hammer mill pulverizes the gravel into fine slurry (80% minus 75 microns).'
  },
  {
    step: '04',
    name: 'Classification',
    desc: 'Trommel screens or hydro-cyclones return oversize grains to the mill for complete liberation.'
  },
  {
    step: '05',
    name: 'Gravity Concentration',
    desc: 'Centrifugal concentrators, sluice boxes, and shaking tables separate high-density gold particles.'
  },
  {
    step: '06',
    name: 'Clean Mineral Recovery',
    desc: 'High-grade gold concentrate recovered safely and responsibly without hazardous environmental pollution.'
  }
];

export const REFURBISHMENT_PROCESS = [
  { step: '01', title: 'Site Inspection', desc: 'Detailed mechanical visual & dimensional survey on your operating site or at our workshop.' },
  { step: '02', title: 'Engineering Assessment', desc: 'Non-destructive crack testing, run-out micrometer measurements, and metallurgical analysis.' },
  { step: '03', title: 'Comprehensive Repair Plan', desc: 'Transparent scope of work detailing machining, parts replacement, timeline, and cost.' },
  { step: '04', title: 'Structural Fabrication', desc: 'Gouging out fatigued welds, gusset reinforcement, and rebuilding worn housing seats.' },
  { step: '05', title: 'Component Replacement', desc: 'Installing new OEM-grade spherical roller bearings, oil seals, bushings, and jaw dies.' },
  { step: '06', title: 'Precision Assembly', desc: 'Torque-tightened tie rods, dynamic balancing of flywheels, and optical pulley alignment.' },
  { step: '07', title: 'No-Load & Full-Load Testing', desc: '4-hour temperature monitor run and vibration amplitude verification.' },
  { step: '08', title: 'Return to Service', desc: 'Transport back to customer site with installation assistance and commissioning sign-off.' }
];

export const MAINTENANCE_TIERS: MaintenanceTier[] = [
  {
    id: 'basic',
    name: 'Basic Protection',
    tagline: 'Essential inspection & early-warning diagnostics.',
    suitableFor: 'Single-machine quarry operators & seasonal contractors.',
    recommendedInterval: 'Monthly Routine',
    deliverables: [
      'Visual mechanical inspection of crusher frames & shafts',
      'Vibration amplitude & bearing temperature spot checks',
      'Conveyor belt alignment & tension assessment',
      'Wear parts thickness measurement & residual life estimate',
      'Lubrication schedule verification & leak reporting',
      'Written inspection report with immediate action points'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Production',
    tagline: 'Preventive maintenance & scheduled wear servicing.',
    suitableFor: 'Medium quarries, commercial aggregate producers, and concrete plants.',
    recommendedInterval: 'Bi-Weekly Routine',
    deliverables: [
      'Everything in Basic Protection',
      'Grease purging and high-pressure oil filter replacement',
      'V-belt tensioning, pulley groove inspection & alignment',
      'Screen mesh clamp re-tensioning and coil spring checks',
      'Fastener torque auditing on high-stress foundation bolts',
      'Priority workshop machining slots for emergency breakdown spares',
      'Quarterly operational efficiency audit'
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial Enterprise',
    tagline: 'Total plant reliability & guaranteed uptime partnership.',
    suitableFor: 'Heavy mining operations, high-tonnage quarries, and continuous production factories.',
    recommendedInterval: 'Continuous & On-Call',
    deliverables: [
      'Everything in Standard Production',
      'Scheduled preventive maintenance crew dispatched on site',
      'Dedicated stockholding of critical wear parts at our Embakasi workshop',
      'Ultrasonic weld defect testing on vibrating screen frames',
      'Hydraulic system pressure testing and fluid lab analysis',
      'Dedicated senior engineer project manager assigned to your site',
      'Rapid-response emergency maintenance support across Kenya'
    ]
  }
];

export const FEATURED_PROJECTS: CaseProject[] = [
  {
    id: 'field-jaw-crusher-screen-production',
    badge: 'ACTIVE FIELD PLANT',
    title: 'Diesel Jaw Crusher & Multi-Deck Vibrating Screen Aggregate Circuit',
    clientIndustry: 'Quarrying & Aggregates',
    location: 'Kenya Quarry Site',
    challenge:
      'Quarry contractor needed a self-contained diesel crushing and screening plant mounted on an elevated structural steel stand to grade crushed ballast directly at the rock face without grid power.',
    solution:
      'ABU Fabricators engineered and installed a heavy steel frame supporting a diesel-driven primary jaw crusher feeding directly into a twin-deck inclined vibrating screen with separated discharge chutes.',
    deliveredEquipment: ['Diesel Primary Jaw Crusher', 'Reinforced Structural Steel Stand', '2-Deck Vibrating Screen', 'Dual Discharge Chutes'],
    metrics: 'Active Quarry Ballast Production · Independent Diesel Drive',
    image: BUILTIN_REAL_MEDIA.landingBackground,
    gallery: [
      BUILTIN_REAL_MEDIA.crusherStandChuteBay,
      BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
      BUILTIN_REAL_MEDIA.landingBackground
    ]
  },
  {
    id: 'integrated-crusher-screen-assembly',
    badge: 'COMMISSIONED UNIT',
    title: 'Integrated Diesel Stone Crusher & Twin-Chute Classifier',
    clientIndustry: 'Quarrying & Aggregates',
    location: 'Embakasi Workshop → Client Site',
    challenge:
      'Client required a compact, transportable crushing and sizing assembly pre-tested in Nairobi for immediate road ballast grading upon site arrival.',
    solution:
      'Fabricated a heavy square-tube chassis, precision-aligned the diesel prime mover and dual flywheels, and integrated a spring-mounted inclined wire-mesh screen with red-oxide protected discharge hoppers.',
    deliveredEquipment: ['Heavy Jaw Breaker', 'Spring-Suspended Vibrating Screen', 'V-Belt Flywheel Guarding', 'Dual Grade Chutes'],
    metrics: '100% Workshop Pre-Tested · Rapid Plug-and-Crush Setup',
    image: BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
    gallery: [
      BUILTIN_REAL_MEDIA.crusherStandChuteBay,
      BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
      BUILTIN_REAL_MEDIA.landingBackground
    ]
  },
  {
    id: 'batching-tower-stairway-steelwork',
    badge: 'STRUCTURAL STEEL',
    title: 'Structural Steel Hopper Platform, Access Stairways & Batching Tower',
    clientIndustry: 'Structural Steel',
    location: 'Kenya Infrastructure Site',
    challenge:
      'Civil contractor needed elevated heavy structural steel frames, safe multi-tier operator stairways, and receiving hopper towers erected on a greenfield construction yard.',
    solution:
      'Fabricated heavy universal column supports, non-slip steel stair flights with safety handrails, and overhead aggregate hopper staging installed cleanly on site.',
    deliveredEquipment: ['Elevated Equipment Platform', 'Steel Access Stairways & Handrails', 'Aggregate Batching Hoppers', 'On-Site Structural Erection'],
    metrics: 'Heavy Civil Load Rated · Delivered & Erected On Schedule',
    image: BUILTIN_REAL_MEDIA.structuralBatchingTower,
    gallery: [
      BUILTIN_REAL_MEDIA.crusherStandChuteBay,
      BUILTIN_REAL_MEDIA.structuralBatchingTower
    ]
  },
  {
    id: 'remote-site-crusher-crane-delivery',
    badge: 'MINING & QUARRY DELIVERY',
    title: 'Turnkey Stone Screen & Crusher Installation via Flatbed Crane',
    clientIndustry: 'Mining',
    location: 'Rural County Quarry, Kenya',
    challenge:
      'Deploying heavy screening decks and jaw crusher modules into forested remote quarry terrain required modular bolt-together steel stands and coordinated crane offloading.',
    solution:
      'Supplied pre-fabricated structural crusher stands, multi-deck vibrating screens, and coordinated direct crane-truck delivery and positioning on prepared site footings.',
    deliveredEquipment: ['Modular Vibrating Screen Rig', 'Jaw Crusher Assembly', 'Crane-Truck Transport & Positioning', 'Commissioning Check'],
    metrics: 'Delivered Across Rough Terrain · Ready for Production',
    image: BUILTIN_REAL_MEDIA.quarryFieldDelivery,
    gallery: [
      BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
      BUILTIN_REAL_MEDIA.quarryFieldDelivery
    ]
  },
  {
    id: 'agro-belt-feed-mill-video-demo',
    badge: 'LIVE VIDEO DEMO',
    title: 'Diesel-Powered Agro-Processing & Belt Feed Chaff/Hammer Mill',
    clientIndustry: 'Agriculture',
    location: 'Nairobi / Agro-Processing Sector',
    challenge:
      'Commercial livestock and agro-processors needed a mobile, high-throughput diesel chopping and milling unit with an automated slatted intake conveyor belt to protect operators.',
    solution:
      'Fabricated a wheeled heavy steel chassis powered by an industrial diesel engine driving synchronized chain-and-belt intake rollers and a slatted feed conveyor table.',
    deliveredEquipment: ['Diesel Prime Mover Frame', 'Slatted Intake Conveyor', 'Gear & Belt Drive Assembly', 'Mobile Wheel Chassis'],
    metrics: 'Verified Running Video Test · Mobile Field Operation',
    image: BUILTIN_REAL_MEDIA.crusherStandChuteBay,
    videoUrl: BUILTIN_REAL_MEDIA.workshopVideo,
    gallery: [
      BUILTIN_REAL_MEDIA.crusherStandChuteBay,
      BUILTIN_REAL_MEDIA.twinTankCompressorWeld
    ]
  },
  {
    id: 'heavy-compressor-skid-welding',
    badge: 'FABRICATION & WELDING',
    title: 'Heavy Twin-Tank Mobile Industrial Compressor & Protective Cage',
    clientIndustry: 'Manufacturing',
    location: 'Fedha Road Workshop, Embakasi',
    challenge:
      'Industrial contractor needed a rugged twin-cylinder mobile air compressor chassis engineered to survive rough quarry and construction towing conditions.',
    solution:
      'Custom welded dual-barrel steel air receivers, axle mounts, motor brackets, and expanded-metal belt safety guarding at our Embakasi welding bays.',
    deliveredEquipment: ['Twin-Tank Steel Chassis', 'Expanded Metal Belt Guard', 'Heavy Pneumatic Wheel Axle', 'Custom Compressor Mounts'],
    metrics: 'Full-Penetration Structural Welds · Custom Industrial Safety Guarding',
    image: BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
    gallery: [
      BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
      BUILTIN_REAL_MEDIA.blockMoldingMachine
    ]
  },
  {
    id: 'custom-mobile-block-press',
    badge: 'CUSTOM MACHINERY',
    title: 'Custom Mobile Concrete Hollow-Block & Paving Molding Machine',
    clientIndustry: 'Structural Steel',
    location: 'Embakasi, Nairobi',
    challenge:
      'Building contractor wanted a durable, easy-to-move manual/mechanical concrete block molding press capable of high daily block output on site.',
    solution:
      'Engineered and welded a wheeled heavy steel compression frame with interchangeable 5-cavity mold boxes, precision guide rods, and anti-corrosion industrial coating.',
    deliveredEquipment: ['Welded Steel Compression Frame', 'Interchangeable 5-Cavity Mold Box', 'Heavy Duty Lever Mechanism', 'Industrial Caster Wheels'],
    metrics: 'Custom Fabricated in Embakasi · Built for High Daily Output',
    image: BUILTIN_REAL_MEDIA.blockMoldingMachine,
    gallery: [
      BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
      BUILTIN_REAL_MEDIA.blockMoldingMachine,
      BUILTIN_REAL_MEDIA.founderPhoto
    ]
  },
  {
    id: 'workshop-hopper-chute-stand',
    badge: 'HEAVY FABRICATION',
    title: 'Heavy Crusher Steel Stand, Discharge Chutes & Hopper Fabrication',
    clientIndustry: 'Manufacturing',
    location: 'Fedha Road, Embakasi, Nairobi',
    challenge:
      'Aggregate processor needed custom-angled discharge chutes and a heavy structural steel crusher support frame built from thick plate to eliminate deflection.',
    solution:
      'Cut, formed, and welded heavy box-section steel legs, internal deflector gussets, and flanged discharge hoppers finished in industrial anti-rust primer.',
    deliveredEquipment: ['Heavy Steel Crusher Stand', 'Custom Bent Discharge Chutes', 'Gusseted Structural Frame', 'Anti-Rust Primer Coat'],
    metrics: 'Precision Dimensional Tolerance · Ready for Site Assembly',
    image: BUILTIN_REAL_MEDIA.crusherStandChuteBay,
    gallery: [
      BUILTIN_REAL_MEDIA.crusherStandChuteBay,
      BUILTIN_REAL_MEDIA.jawCrusherScreenYard
    ]
  },
  {
    id: 'migori-gold-processing',
    badge: 'MINING INSTALLATION',
    title: 'Alluvial & Quartz Gold Ore Processing Facility',
    clientIndustry: 'Mining',
    location: 'Migori County, Kenya',
    challenge:
      'Mining cooperative needed to transition from inefficient manual crushing to an automated, environmentally compliant mechanical grinding circuit.',
    solution:
      'Designed and fabricated a turnkey plant featuring a primary jaw breaker, continuous 1200x2400mm ball mill, slurry classification trommel, and reinforced gravity shaking tables.',
    deliveredEquipment: ['Jaw Crusher', 'Continuous Ball Mill', 'Rotary Trommel Scrubber', 'Gravity Concentrator Platforms'],
    metrics: '3.5x Daily Ore Throughput · Zero Toxic Chemical Requirement',
    image: miningBallMillImg,
    gallery: [jawCrusherQuarryImg, miningBallMillImg]
  },
  {
    id: 'nairobi-manufacturing-conveyor',
    badge: 'FABRICATION & RIGGING',
    title: 'Industrial Bulk Bagging & Conveying Gantry',
    clientIndustry: 'Manufacturing',
    location: 'Industrial Area, Nairobi, Kenya',
    challenge:
      'High-volume fertilizer blender needed a high-elevation material handling truss conveyor to load raw bulk minerals into overhead hoppers without floor congestion.',
    solution:
      'Precision fabricated a 38-meter self-supporting structural steel lattice conveyor with overhead gantry walkway, emergency pull-wire switches, and weather hoods.',
    deliveredEquipment: ['38m Lattice Truss Conveyor', 'Structural Steel Towers', 'Catwalk & Safety Handrails', 'Motorized Diverter Chute'],
    metrics: '120 TPH Loading Rate · Completed in 24 Workshop Fabrication Days',
    image: conveyorGantryImg,
    gallery: [heavyWeldingHoppersImg, conveyorGantryImg]
  }
];

export const SPARE_PARTS_LIST = [
  {
    category: 'Crusher Wear Parts',
    items: [
      { name: 'Fixed & Movable Jaw Plates', spec: '18% – 22% Manganese alloy with titanium carbide inserts', leadTime: 'In-Stock / Custom Cast' },
      { name: 'Cheek Plates & Side Liners', spec: 'Abrasion-resistant high Mn alloy, reversible', leadTime: 'In-Stock' },
      { name: 'Cone Crusher Mantles & Concaves', spec: 'Mn18Cr2 / Mn22Cr2 precision ground seating surfaces', leadTime: 'Ready to Dispatch' },
      { name: 'Impact Crusher Blow Bars', spec: 'High chrome (27% Cr) or ceramic matrix inserts', leadTime: 'In-Stock' },
      { name: 'Toggle Plates & Toggle Seats', spec: 'Precision machined cast ductile iron safety links', leadTime: 'In-Stock' }
    ]
  },
  {
    category: 'Screening Media & Bearings',
    items: [
      { name: 'High-Tensile Woven Wire Mesh', spec: 'Spring steel 65Mn / DIN 17223, hooked edge strips', leadTime: 'Cut & Clamped to Size' },
      { name: 'Polyurethane Modular Screen Panels', spec: 'High tear-strength 85 Shore A polyurethane with snap-pins', leadTime: 'Modular Stock' },
      { name: 'Heavy Spherical Roller Bearings', spec: 'C3/C4 clearance vibration-rated brass cage bearings', leadTime: 'SKF/NSK/FAG Equivalent' },
      { name: 'Heavy Screen Coil Springs', spec: 'Shot-peened silicon-chromium suspension springs', leadTime: 'In-Stock Sets' }
    ]
  },
  {
    category: 'Conveyor Components',
    items: [
      { name: 'Conveyor Troughing & Return Idlers', spec: 'Heavy-duty 89mm/127mm rollers with labyrinth seals', leadTime: 'In-Stock All Widths' },
      { name: 'Crowned Drive Drums & Tail Pulleys', spec: 'Diamond-groove vulcanized rubber lagging with taper locks', leadTime: 'Fabricated to Spec' },
      { name: 'High-Tensile Multi-Ply Rubber Belts', spec: 'EP400/3 to EP800/4 abrasion resistant covers', leadTime: 'Cut to Roll Length' },
      { name: 'Belt Cleaners & Primary Scrapers', spec: 'Polyurethane blade with spring tensioner system', leadTime: 'In-Stock' }
    ]
  }
];

export const SEO_ARTICLES: SeoArticle[] = [
  {
    id: 'how-to-choose-industrial-fabrication-kenya',
    title: 'How to Choose an Industrial Fabrication Company in Kenya',
    readTime: '6 min read',
    category: 'Industrial Fabrication',
    excerpt: 'What industrial plant managers and quarry owners must verify before awarding heavy steel fabrication contracts in Kenya.',
    keyTakeaways: [
      'Verify structural weld preparation and beveling standards rather than cosmetic fillet welds.',
      'Check steel grade certifications: Ensure structural sections comply with BS EN 10025 S275/S355 equivalents.',
      'Evaluate in-house machining capabilities: Fabrication without precision boring and facing leads to premature bearing failure.',
      'Insist on workshop pre-assembly before trucking to remote Kenyan county sites.'
    ],
    fullBody:
      'Heavy industrial fabrication in Kenya requires far more than basic workshop tools. When selecting an engineering fabrication partner, evaluate their ability to handle heavy plate thicknesses (12mm to 25mm+), dynamic load calculations for vibrating equipment, and surface blast preparation. At ABU Fabricators and Services K. Limited on Fedha Road, Embakasi, our engineering approach combines disciplined CAD detailing with rigorous fabrication and pre-assembly testing before transport, preventing costly field modifications on remote project sites across Kenya.'
  },
  {
    id: 'jaw-crusher-vs-cone-crusher',
    title: 'Jaw Crusher vs Cone Crusher: Which Equipment Does Your Kenyan Quarry Need?',
    readTime: '7 min read',
    category: 'Crushing Equipment',
    excerpt: 'A technical comparison of primary reduction and secondary cubical shaping for abrasive Kenyan basalt and granite.',
    keyTakeaways: [
      'Jaw crushers excel at handling raw boulders up to 600mm with high reduction ratios.',
      'Cone crushers provide laminated inter-particle compression for superior cubical concrete ballast.',
      'Operating cost comparison: Jaws have lower capital and wear cost; cones offer higher precision grading.',
      'Why combined circuits yield the lowest cost-per-tonne for Kenyan aggregate suppliers.'
    ],
    fullBody:
      'Many quarry operators in Kenya make the error of relying solely on a large jaw crusher or hammer mill. While a jaw crusher is unmatched for taking raw blasting boulders down to intermediate sizes, it produces flaky, elongated shards if set too tight. For high-grade infrastructure projects demanding strict KeNHA and KURA ballast specifications, a secondary hydraulic cone crusher is essential to generate true cubical aggregates.'
  },
  {
    id: 'how-gold-ore-crushing-works',
    title: 'How Gold Ore Crushing & Grinding Works: A Practical Guide for Mining in Kenya',
    readTime: '8 min read',
    category: 'Mining Solutions',
    excerpt: 'From reef quartz ore to fine slurry: The engineering stages required to liberate precious minerals responsibly.',
    keyTakeaways: [
      'Gold liberation requires grinding ore to the natural grain size of the metal (often 75 to 100 microns).',
      'Two-stage crushing (primary jaw followed by fine hammer/roll crushing) reduces ball mill energy consumption by 30%.',
      'Ball mills provide continuous, scalable grinding without the dangerous manual handling of artisanal pestles.',
      'Gravity concentration (sluices, tables, centrifugal bowls) eliminates the need for mercury.'
    ],
    fullBody:
      'Mineral extraction in Western Kenya and the Migori gold belt is undergoing an engineering transformation. Modern operations are replacing labor-intensive manual methods with mechanized, energy-efficient crushing circuits. By integrating a primary jaw breaker with a wet ball mill and centrifugal classification, Kenyan mining groups achieve steady mineral liberation while protecting operator safety.'
  },
  {
    id: 'quarry-equipment-guide-kenyan-contractors',
    title: 'Quarry Equipment Guide for Kenyan Road & Civil Contractors',
    readTime: '9 min read',
    category: 'Quarrying',
    excerpt: 'Complete plant sizing, vibrating screen deck selection, and conveyor layouts tailored to Kenyan aggregate demand.',
    keyTakeaways: [
      'Matching feed hopper capacity to 20-tonne tipper cycle times prevents plant idling.',
      'Screen area sizing formula: Why undersized screens lead to carryover and lost sales revenue.',
      'Conveyor elevation angles: Never exceed 18° for round river gravel or 20° for crushed ballast.',
      'Local engineering support in Kenya beats 8-week overseas shipping wait times for replacement parts.'
    ],
    fullBody:
      "Kenya's expanding infrastructure—from northern transport corridors to county ring roads—demands reliable, consistent stone aggregate. Designing a quarry plant requires balancing feed size, primary throughput, secondary recrush circuits, and stockpile heights. ABU Fabricators and Services K. Limited engineers crushing and screening layouts designed around your specific geological quarry deposit."
  },
  {
    id: 'reduce-industrial-equipment-downtime',
    title: 'How to Reduce Industrial Equipment Downtime in Kenya: Practical Maintenance',
    readTime: '5 min read',
    category: 'Maintenance',
    excerpt: 'Actionable maintenance checklists that keep heavy machinery operating in dusty, high-vibration African conditions.',
    keyTakeaways: [
      'Implement daily grease purging to flush abrasive rock dust from spherical roller bearings.',
      'Audit foundation bolt torque after every 100 hours of continuous crushing vibration.',
      'Track wear plate thickness regularly to prevent rock breakthrough into structural chassis.',
      'Establish a local spare parts partnership in Kenya for emergency overnight components.'
    ],
    fullBody:
      'Unplanned downtime can cost a Kenyan quarry or factory hundreds of thousands of shillings per day in lost output and idle operator wages. In hot, dusty conditions, contamination is the primary killer of heavy bearings and hydraulic circuits. By following systematic preventive maintenance checklists and partnering with ABU Fabricators and Services K. Limited for scheduled servicing, plant managers safeguard their production quotas.'
  }
];

export const KENYA_COUNTIES = [
  'Kirinyaga', 'Nairobi', 'Kiambu', 'Machakos', 'Kitui', 'Embu', "Murang'a",
  'Nyeri', 'Meru', 'Kajiado', 'Nakuru', 'Uasin Gishu', 'Mombasa', 'Kilifi',
  'Kisumu', 'Migori', 'Kakamega', 'Bungoma', 'Trans Nzoia', 'Turkana',
  'Narok', 'Kericho', 'Bomet', 'Laikipia', 'Garissa', 'Taita Taveta', 'Other Kenya County / East Africa'
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-lead-time',
    category: 'Lead Times',
    question: 'What are typical fabrication lead times for structural steelwork and custom machines?',
    answer:
      'Standard structural trusses, hoppers, chutes, and steel stands are typically completed within 7 to 18 working days depending on tonnage. Complete crusher assemblies, vibrating screens, and multi-unit conveyor lines take 3 to 6 weeks, including full workshop trial runs prior to dispatch from Embakasi.'
  },
  {
    id: 'faq-warranty',
    category: 'Warranty & Quality',
    question: 'What workmanship warranty do you provide on welded structures and fabricated machinery?',
    answer:
      'All structural steel frames, weldments, shafts, and new fabricated machine chassis carry a 12-month structural workmanship warranty against weld or frame failure under rated operating loads. Consumable wear liners (jaw dies, screen mesh, belts, bearings) are supported with fast local replacement stock.'
  },
  {
    id: 'faq-counties',
    category: 'Delivery & Site Work',
    question: 'Do you deliver and install machinery or steel structures outside Nairobi?',
    answer:
      'Yes. While our primary fabrication facility is on Fedha Road, Embakasi, our rigging and mechanical erection crews deliver, offload, align, and commission plants across all 47 Kenyan counties—including Machakos, Kajiado, Kiambu, Nakuru, Migori, Kisumu, and Mombasa—as well as East African borders.'
  },
  {
    id: 'faq-workshop-visit',
    category: 'Delivery & Site Work',
    question: 'Can we inspect materials and witness a live trial run before paying the final balance?',
    answer:
      'Absolutely. Clients and supervising engineers are encouraged to visit our Fedha Road workshop during fabrication to inspect steel thicknesses, weld preparation, and witness an unloaded/loaded test run of crushers, screens, or agro mills before signing off for transport.'
  },
  {
    id: 'faq-payment-terms',
    category: 'Pricing & Terms',
    question: 'How are payment milestones structured for fabrication contracts?',
    answer:
      'After approving your quotation and technical drawings, projects start with a 50%–60% mobilization deposit for raw steel procurement and machining, followed by a mid-stage inspection milestone (where applicable for large plants), and final balance settlement upon completed inspection/commissioning before dispatch.'
  },
  {
    id: 'faq-custom-repairs',
    category: 'Warranty & Quality',
    question: 'Can ABU Fabricators repair or upgrade third-party crushers, conveyors, or hoppers?',
    answer:
      'Yes. We rebuild cracked quarry screen frames, re-bore worn crusher bearing housings, fabricate replacement chutes and receiving hoppers tailored to existing loaders, and supply high-manganese jaw plates, V-belts, and conveyor rollers regardless of original machine brand.'
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-machakos-quarry',
    clientName: 'Josephat Mutua',
    roleOrCompany: 'Operations Manager, Katani Aggregates Ltd',
    county: 'Machakos County',
    projectType: 'Diesel Jaw Crusher & 2-Deck Screen Stand',
    quote:
      'ABU Fabricators built our heavy steel crusher stand and dual discharge chutes right to spec. Every flange lined up on site in one afternoon and our daily ballast output jumped immediately.',
    rating: 5
  },
  {
    id: 'test-embakasi-civil',
    clientName: 'Eng. Peter Kariuki',
    roleOrCompany: 'Project Lead, Riftspan Civil Contractors',
    county: 'Nairobi County',
    projectType: 'Batching Hopper Tower & Access Stairways',
    quote:
      'Having a dependable fabricator right on Fedha Road saved us weeks. Their weld quality on our batching platform and non-slip stairways passed structural inspection without a single rework.',
    rating: 5
  },
  {
    id: 'test-nakuru-agro',
    clientName: 'Grace Wanjiku',
    roleOrCompany: 'Director, Rift Valley Feeds & Dairy',
    county: 'Nakuru County',
    projectType: 'Belt-Feed Chaff & Agro Milling Unit',
    quote:
      'We witnessed the diesel mill running live at their Embakasi yard before loading it onto the lorry. Three seasons later, the chassis and slatted feed conveyor still run smoothly every day.',
    rating: 5
  },
  {
    id: 'test-migori-mining',
    clientName: 'Samuel Ochieng',
    roleOrCompany: 'Chair, Suna West Mineral Processing Group',
    county: 'Migori County',
    projectType: 'Ball Mill & Primary Jaw Circuit',
    quote:
      'When we had a bearing seat wear out remotely, their team fabricated and machined replacement components quickly so our plant never stayed down waiting for imports.',
    rating: 5
  }
];

export const DEFAULT_PARTNERS: PartnerBadge[] = [
  { id: 'p-1', name: 'KEBS Structural Plate Standards', sector: 'BS EN 10025 S275 / S355' },
  { id: 'p-2', name: 'NCA Site Safety Compliant', sector: 'Civil & Structural Contractors' },
  { id: 'p-3', name: '47 Counties Logistics Network', sector: 'Crane & Flatbed Delivery' },
  { id: 'p-4', name: 'Quarry & Mining Guild Partner', sector: 'Aggregates & Gold Processing' },
  { id: 'p-5', name: 'OEM Wear Spares Compatibility', sector: 'Manganese Dies & Rollers' }
];

export const DEFAULT_COMPANY_METRICS: CompanyMetrics = {
  countiesServed: '28+ Kenyan Counties',
  completedProjectsCount: '185+ Fabrications & Plants',
  onTimeDeliveryRate: '98% On-Time Handover',
  warrantyPeriod: '12-Month Workmanship Warranty'
};

export const DEFAULT_STEELWORK_GALLERY: SteelworkStructureItem[] = [
  {
    id: 'sw-warehouse-portal',
    title: 'Clear-Span Warehouse Portal Frames & Roof Trusses',
    category: 'Portal Frames & Warehouses',
    steelGrade: 'BS EN 10025 S275 / S355 IPE & UB Columns',
    typicalSpanOrCapacity: '12m – 36m Clear Span',
    finishSpec: 'Shot-blasted + Red Oxide & Alkyd Topcoat',
    description:
      'Engineered steel warehouse rafters, purlins, gable columns, and wind bracing prefabricated on Fedha Road and bolted rapidly on site across Nairobi and Mombasa Road industrial parks.',
    image: warehousePortalFrameImg
  },
  {
    id: 'sw-mezzanine-platform',
    title: 'Heavy Industrial Mezzanine Floors & Equipment Decks',
    category: 'Mezzanines & Platforms',
    steelGrade: 'Heavy Universal Beams & Chequered Plate',
    typicalSpanOrCapacity: '5 – 12 kN/m² Live Floor Load',
    finishSpec: 'Two-Pack Industrial Epoxy Primer',
    description:
      'Turnkey structural mezzanine levels that double factory floor utilization for pallet racking, hopper staging, mixing vats, and raised production offices.',
    image: BUILTIN_REAL_MEDIA.crusherStandChuteBay
  },
  {
    id: 'sw-access-stairways',
    title: 'Industrial Access Staircases, Safety Cages & Catwalks',
    category: 'Staircases & Catwalks',
    steelGrade: 'Channel Stringers + Non-Slip Chequered Treads',
    typicalSpanOrCapacity: '3m – 22m Vertical Rise',
    finishSpec: 'Safety Yellow / Charcoal Weather Shield',
    description:
      'OSHA-aligned non-slip multi-flight steel staircases, silo catwalks, kick-plates, and tubular safety guardrails built to endure heavy plant traffic.',
    image: BUILTIN_REAL_MEDIA.structuralBatchingTower
  },
  {
    id: 'sw-fuel-water-tanks',
    title: 'Elevated Steel Water Towers, Diesel Skids & Bulk Silos',
    category: 'Tanks & Silos',
    steelGrade: '6mm – 10mm Mild Steel Rolled Plate + Internal Stiffeners',
    typicalSpanOrCapacity: '5,000L – 120,000L Volume',
    finishSpec: 'Internal Epoxy / Food-Grade or Bitumen Coat',
    description:
      'Custom fabricated rectangular and cylindrical storage tanks, bunded diesel skid tanks, and elevated structural tank stands built for estates, factories, and remote quarries.',
    image: BUILTIN_REAL_MEDIA.twinTankCompressorWeld
  },
  {
    id: 'sw-hopper-welding-bay',
    title: 'Custom Steel Bins, Plant Frameworks & Machinery Skids',
    category: 'Mezzanines & Platforms',
    steelGrade: '10mm – 20mm MS Plate & Heavy SHS Frames',
    typicalSpanOrCapacity: 'Up to 40-Tonne Dynamic Load',
    finishSpec: 'Abrasion-Resistant Primer + Hardox Wear Liners',
    description:
      'Precision-welded batching skids, structural crusher mounts, and factory conveyor bridges tested inside our Embakasi bays before dispatch.',
    image: heavyWeldingHoppersImg
  },
  {
    id: 'sw-security-gates-doors',
    title: 'Automated Yard Sliding Gates, Blast Doors & Security Grilles',
    category: 'Gates & Heavy Doors',
    steelGrade: 'Heavy Gauge SHS Box Section & Solid Bright Bar',
    typicalSpanOrCapacity: '4m – 16m Clear Opening',
    finishSpec: 'Zinc Phosphate Primer + Hammered Enamel',
    description:
      'Heavy-duty sliding warehouse gates, workshop bay roller frames, anti-intruder louvers, and reinforced loading-dock crash bollards for logistics yards.',
    image: BUILTIN_REAL_MEDIA.blockMoldingMachine
  }
];

export const KENYA_DISPATCH_CORRIDORS: CountyDispatchCorridor[] = [
  {
    id: 'corridor-nairobi-metro',
    regionName: 'Nairobi, Kiambu, Machakos & Kajiado',
    counties: ['Nairobi', 'Kiambu', 'Machakos', 'Kajiado', 'Thika / Ruiru'],
    transitTime: 'Same-Day – 24 Hours Dispatch',
    vehicleClass: '7–15 Ton Flatbed / Self-Loading Hiab Crane',
    mobileCrewSla: 'Emergency Mobile Welding Team within 3 Hours',
    coatingRecommendation: 'Standard Red Oxide + Industrial Enamel Topcoat',
    highlights: [
      'Direct workshop loading from Fedha Road, Embakasi',
      'Zero overnight staging fees across Industrial Area, Syokimau & Athi River',
      'On-site anchor bolting & steel alignment verification included'
    ]
  },
  {
    id: 'corridor-rift-valley',
    regionName: 'Nakuru, Naivasha, Kericho & Bomet',
    counties: ['Nakuru', 'Naivasha', 'Gilgil', 'Kericho', 'Bomet', 'Narok'],
    transitTime: '1 – 2 Business Days',
    vehicleClass: '15–28 Ton Heavy Flatbed / Low-Loader Trailer',
    mobileCrewSla: 'Dedicated 2–4 Man Erection Crew Mobilization (24h)',
    coatingRecommendation: 'High-Build Zinc Phosphate + Moisture Barrier Coat',
    highlights: [
      'Modular bolt-together quarry stands & agro-processing frames',
      'Full site commissioning check before crew departs',
      'Direct delivery to Naivasha industrial parks & Rift quarries'
    ]
  },
  {
    id: 'corridor-western-nyanza',
    regionName: 'Kisumu, Migori, Kakamega & Homa Bay',
    counties: ['Kisumu', 'Migori', 'Kakamega', 'Kisii', 'Homa Bay', 'Siaya'],
    transitTime: '2 – 3 Business Days',
    vehicleClass: 'Heavy Low-Loader + Escort Crane Offloading',
    mobileCrewSla: 'Scheduled Plant Commissioning & Ball Mill Team',
    coatingRecommendation: 'Heavy-Duty Slurry & Chemical Resistant Epoxy',
    highlights: [
      'Engineered for remote gold mining & quarry access roads',
      'Spare manganese plates & V-belt kits packed inside main frame',
      'Site welder & fitter support for girder erection & motor wiring prep'
    ]
  },
  {
    id: 'corridor-coast',
    regionName: 'Mombasa, Kilifi, Kwale & Taita Taveta',
    counties: ['Mombasa', 'Kilifi', 'Malindi', 'Kwale', 'Mariakani', 'Voi'],
    transitTime: '2 – 3 Business Days (Mombasa Rd)',
    vehicleClass: 'Long-Haul Semi-Flatbed / Export Container Skids',
    mobileCrewSla: '48-Hour Coastal Rigging & Field Welding Dispatch',
    coatingRecommendation: 'Marine-Grade Two-Pack Epoxy against Salt-Air Corrosion',
    highlights: [
      'Anti-saline marine primer coating applied for coastal lifespan',
      'Direct alignment with Mazeras, Mariakani & Voi limestone sites',
      'Fast rail/road freight links straight out of Embakasi'
    ]
  },
  {
    id: 'corridor-mt-kenya',
    regionName: 'Nyeri, Meru, Nanyuki, Embu & Kirinyaga',
    counties: ['Nyeri', 'Meru', 'Nanyuki', 'Embu', 'Murang’a', 'Kirinyaga'],
    transitTime: '1 – 2 Business Days (Thika Superhighway)',
    vehicleClass: '10–20 Ton Flatbed Truck',
    mobileCrewSla: 'Mobile Welding & Screen Overhaul Team (24h)',
    coatingRecommendation: 'All-Weather Highland Alkyd / Polyurethane Shield',
    highlights: [
      'Agro-processing feed mills, coffee hullers & quarry screen decks',
      'Cold/wet climate electrical panel sealing & guarding',
      'Planned weekend maintenance turnarounds available'
    ]
  },
  {
    id: 'corridor-north-rift',
    regionName: 'Eldoret, Kitale, Turkana & Nandi',
    counties: ['Uasin Gishu', 'Trans Nzoia', 'Turkana', 'Elgeyo Marakwet', 'West Pokot'],
    transitTime: '2 – 4 Business Days',
    vehicleClass: 'Heavy Duty Low-Loader + Rough-Terrain Rigging Kit',
    mobileCrewSla: 'Self-Contained Generator-Equipped Mobile Weld Unit',
    coatingRecommendation: 'Abrasion-Resistant Polyurethane Topcoat',
    highlights: [
      'Engineered for autonomous off-grid diesel generator operation',
      'Oversized shock-mounted skids for rough access transport',
      'Long-term spare parts replenishment via courier or haulage'
    ]
  },
  {
    id: 'corridor-eac-export',
    regionName: 'East African Community (Uganda, Tanzania, South Sudan)',
    counties: ['Kampala / Jinja', 'Arusha / Mwanza', 'Juba Corridor', 'Kigali'],
    transitTime: '4 – 7 Business Days (Customs Cleared)',
    vehicleClass: 'Cross-Border Bonded Low-Loader / 40ft Flat-Rack',
    mobileCrewSla: 'Remote Video Commissioning + Cross-Border Technicians',
    coatingRecommendation: 'Export Sea/Road Protective Barrier + Spare Kit',
    highlights: [
      'Certificate of Origin & EAC commercial invoice support',
      'Pre-tested & numbered match-marked steelwork for rapid assembly',
      'Bundled 12-month wear-parts survival pack optional'
    ]
  }
];

export const QUALITY_COMPLIANCE_STANDARDS: QualityComplianceItem[] = [
  {
    id: 'qa-steel-traceability',
    code: 'QA-01 · MATERIALS',
    title: 'Structural Steel Traceability (BS EN 10025)',
    summary:
      'Every primary beam, column, gusset plate, and shaft is verified for wall thickness and structural steel grade before cutting begins.',
    checkpoints: [
      'S275JR / S355JR mild steel sections & KEBS-compliant plate',
      'High-manganese (Mn18Cr2) liners & forged alloy steel shafts',
      'Full dimensional & flange thickness check at Fedha Road bay'
    ]
  },
  {
    id: 'qa-weld-inspection',
    code: 'QA-02 · WELDING',
    title: 'Multi-Pass Structural Welding & Joint Checks',
    summary:
      'Dynamic frames, crusher bases, and hopper joints undergo bevel preparation, continuous multi-pass welding, and dye-penetrant checks on critical stress points.',
    checkpoints: [
      '60-degree plate beveling on load-bearing seams',
      'Post-weld slag chipping, brush inspection & zero undercut check',
      'Continuous MIG / heavy arc root-and-cap weld passes'
    ]
  },
  {
    id: 'qa-preassembly-run',
    code: 'QA-03 · TRIAL RUNS',
    title: 'Workshop Trial-Fit & Test Run Sign-Off',
    summary:
      'No plant or custom machine leaves Embakasi untested. Clients inspect pulley alignment, bearing temperature, and screen stroke in person or on live video.',
    checkpoints: [
      'Bolted portal truss trial-fit before coating',
      'Unloaded rotational & vibration test run for crushers & mills',
      'Emergency stop, V-belt guard & pull-cord safety check'
    ]
  },
  {
    id: 'qa-osha-tender',
    code: 'QA-04 · SAFETY & TENDERS',
    title: 'OSHA Workshop Safety & Contractor Readiness',
    summary:
      'Site erection crews deploy with full PPE, certified lifting slings, hot-work permits, and tender pre-qualification documentation for institutional buyers.',
    checkpoints: [
      'Mandatory helmet, safety harness, welding shield & boot protocol',
      'Standardized site method statement & risk assessment',
      'Clean invoice, tax compliance & official stamped capability dossier'
    ]
  }
];

export const TENDER_PACK_CHECKLIST: TenderChecklistItem[] = [
  {
    id: 'tc-1',
    documentTitle: 'Certificate of Incorporation & CR12 Ownership Profile',
    statusLabel: 'Verified & Available',
    notes: 'Registered Kenyan private limited company (ABU Fabricators and Services K. Limited).'
  },
  {
    id: 'tc-2',
    documentTitle: 'KRA PIN & Tax Compliance Readiness',
    statusLabel: 'Tender Ready',
    notes: 'Supplied upon formal RFQ, tender invitation, or corporate vendor onboarding.'
  },
  {
    id: 'tc-3',
    documentTitle: 'Stamped Company Capability Statement & Workshop Audit Pack',
    statusLabel: 'Instant Download',
    notes: 'Covers structural steelwork, welding capacity, crusher/conveyor builds & 28+ county reach.'
  },
  {
    id: 'tc-4',
    documentTitle: 'Site Safety Method Statement & Structural Workmanship Warranty',
    statusLabel: 'Included per Contract',
    notes: '12-month structural fabrication guarantee & OSHA site erection compliance.'
  }
];

export const DEFAULT_CMS_STATE: CmsDataState = {
  siteIdentity: {
    companyName: 'ABU FABRICATORS AND SERVICES K. LIMITED',
    shortName: 'ABU FABRICATORS',
    subLabel: 'STRUCTURAL STEEL · FABRICATION · NAIROBI',
    tagline: 'PRECISION STEEL FABRICATION. BUILT TO LAST.',
    secondaryTagline: 'WE ENGINEER. WE FABRICATE. WE BUILD.',
    location: 'Fedha Road, Embakasi, Nairobi',
    coverage: 'Serving contractors, developers, and industries across Kenya',
    phoneDisplay: '0724 151771',
    phoneRaw: '+254724151771',
    whatsappNumber: '254724151771',
    email: 'info@abufabricators.co.ke',
    address: 'Fedha Road, Embakasi, opposite Nairobi Gospel Church, Nairobi, Kenya',
    logoUrl: BUILTIN_LOGOS.emblemAfricaKenya,
    secondaryLogoUrl: BUILTIN_LOGOS.cleanOrangeBlack,
    logoFrameStyle: 'transparent',
    workingHours: 'Mon – Sat · 7:30 AM – 6:00 PM EAT'
  },
  founder: {
    name: 'Urbanus Mutisya — Founder & Managing Director',
    role: 'Certified Mechanical & Automotive Engineer · Founder & Managing Director, ABU Fabricators and Services K. Limited',
    photoUrl: BUILTIN_REAL_MEDIA.founderPhoto,
    quote:
      '“Every crusher, steel framework, and custom machine leaving our Embakasi workshop carries our word on quality. We build strong foundations and reliable equipment made for real East African work.”',
    bioParagraph1:
      'I am a Certified Mechanical and Automotive Engineer with over 10 years of hands-on professional experience in the mining, manufacturing, production, and agricultural machinery industries. I have extensive technical expertise in the assembly, installation, maintenance, troubleshooting, servicing, and repair of a wide range of industrial and heavy-duty machinery and equipment.',
    bioParagraph2:
      'My experience also includes metal fabrication, structural steelwork, welding, and the design, construction, and installation of metal frameworks and mechanical structures. I am skilled in diagnosing mechanical faults, carrying out equipment overhauls, performing preventive and corrective maintenance, and ensuring machinery operates safely, efficiently, and reliably.',
    bioParagraph3:
      'Throughout my career, I have developed strong practical engineering, problem-solving, and technical skills, with the ability to handle complex mechanical projects, work independently or as part of a technical team, and deliver reliable engineering solutions that meet operational and industry standards.',
    experienceYears: '10+ Years Certified Mechanical & Automotive Engineering',
    milestoneNote: 'Certified Mechanical & Automotive Engineer · 10+ Years Experience'
  },
  theme: {
    accentColor: '#FF6B00',
    accentHoverColor: '#E05E00',
    amberHighlight: '#FFB703',
    backgroundColor: '#FFFFFF',
    surfaceColor: '#F7F8FA',
    surfaceAltColor: '#EDF2F7',
    borderColor: '#E2E8F0',
    textColor: '#0D1B2A',
    textMutedColor: '#4A5568',
    backgroundImageUrl: BUILTIN_REAL_MEDIA.landingBackground,
    backgroundImageOpacity: 0.1
  },
  seo: {
    metaTitle: 'ABU Fabricators | Precision Steel Fabrication. Built to Last.',
    metaDescription:
      'ABU Fabricators and Services K. Limited delivers structural steel fabrication, custom metal fabrication, industrial welding, machinery, and engineering services from Fedha Road, Embakasi, Nairobi.',
    keywords:
      'ABU Fabricators and Services K. Limited, structural steel fabrication Kenya, custom metal fabrication Nairobi, industrial welding Embakasi, Fedha Road steel fabricators, stone crusher Kenya, mining equipment Kenya, conveyor fabrication Kenya',
    ogTitle: 'ABU Fabricators | Precision Steel Fabrication. Built to Last.',
    ogDescription:
      'High-quality structural steel work, custom metal fabrication, industrial welding, machinery, and reliable industrial services across Kenya.',
    ogImage: BUILTIN_REAL_MEDIA.landingBackground,
    canonicalUrl: 'https://albernus-inc-industrial-solutions.ai.studio/'
  },
  sections: [
    {
      id: 'hero',
      label: 'Hero Banner',
      visible: true,
      kicker: 'Structural Steel • Custom Fabrication • Industrial Services • Embakasi, Nairobi',
      headline: 'Precision Steel Fabrication. Built to Last.',
      subheadline:
        'ABU Fabricators and Services K. Limited delivers high-quality structural steel work, custom metal fabrication, and reliable industrial services across Kenya.',
      body: 'From structural steel frames and industrial frameworks to custom welding and fabrication, we turn your project requirements into strong, durable results. Located on Fedha Road, Embakasi, we serve contractors, developers, and industries with quality workmanship and on-time delivery.',
      primaryCta: 'Get a Free Quote',
      secondaryCta: 'Our Services',
      imagePrimary: BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
      imageSecondary: fieldDeploymentSteelImg
    },
    { id: 'trust-bar', label: '5-Pillar Trust Bar', visible: true },
    {
      id: 'one-partner',
      label: 'One Engineering Partner',
      visible: true,
      kicker: 'Integrated Capabilities',
      headline: 'ONE ENGINEERING PARTNER. MANY INDUSTRIAL SOLUTIONS.',
      body: 'From a single custom-fabricated component to a complete structural steel framework or processing system, ABU Fabricators and Services K. Limited engineers practical solutions around your exact project requirements.'
    },
    {
      id: 'equipment-finder',
      label: 'Interactive Equipment Finder',
      visible: true,
      kicker: 'Interactive Technical Assistant',
      headline: 'WHAT ARE YOU LOOKING FOR?',
      body: 'Select your industry and primary operational requirement to explore recommended fabrication and machinery configurations and consult directly with an engineer.'
    },
    {
      id: 'industries',
      label: 'Industries We Serve',
      visible: true,
      kicker: 'Sector Expertise Across Kenya & East Africa',
      headline: 'INDUSTRIES WE SERVE',
      body: "From structural frameworks across Nairobi and Embakasi to abrasive rock quarries and mineral extraction zones across Kenya, our workmanship stands up to the continent's toughest demands.",
      imagePrimary: warehousePortalFrameImg
    },
    {
      id: 'machinery',
      label: 'Machinery & Equipment Catalog',
      visible: true,
      kicker: 'Heavy Processing Technology',
      headline: 'MACHINERY & EQUIPMENT',
      body: 'Crushing plants, vibrating screens, continuous ball mills, and bulk handling systems. Manufactured with high-strength structural weldments and replaceable wear metallurgy.'
    },
    {
      id: 'crushing-flow',
      label: 'Crushing Plant Process Flow',
      visible: true,
      kicker: 'Complete Crushing Plant Engineering',
      headline: 'FROM RAW ROCK TO FINAL PRODUCT',
      body: 'ABU Fabricators and Services K. Limited configures crushing equipment as integrated production systems rather than isolated machines.',
      imagePrimary: crushingScreeningPlantImg
    },
    {
      id: 'mining-solutions',
      label: 'Mining & Gold Processing',
      visible: true,
      kicker: 'Extractive Metallurgical Solutions',
      headline: 'MINING & GOLD-PROCESSING SOLUTIONS',
      body: 'Crushing and grinding form the cornerstone of mineral extraction. We engineer rugged, mechanized comminution and gravity concentration systems tailored to Kenyan extractive sites.',
      imagePrimary: miningBallMillImg,
      imageSecondary: goldProcessingTrommelImg
    },
    {
      id: 'custom-machine',
      label: 'Custom Machine Builder',
      visible: true,
      kicker: 'Bespoke Engineering Division',
      headline: 'WE BUILD MACHINES FOR REAL INDUSTRIAL PROBLEMS',
      body: 'Not every industrial challenge can be solved with an off-the-shelf machine. We develop custom engineering and fabrication solutions around your process requirements.',
      imagePrimary: BUILTIN_REAL_MEDIA.blockMoldingMachine
    },
    {
      id: 'fabrication',
      label: 'Our Core Services & Welding',
      visible: true,
      kicker: 'Quality, Safety & Reliability',
      headline: 'Our Core Services',
      body: 'We process structural beams, columns, trusses, heavy steel plates, and hollow sections with tight tolerances, certified welding, and on-time delivery from our Fedha Road, Embakasi workshop.',
      imagePrimary: BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
      imageSecondary: BUILTIN_REAL_MEDIA.structuralBatchingTower
    },
    {
      id: 'maintenance',
      label: 'Machine Repair & Refurbishment',
      visible: true,
      kicker: 'Plant Availability & Life Extension',
      headline: 'KEEP YOUR EQUIPMENT WORKING',
      body: 'Rapid mechanical overhaul, structural crack repairs, precision boring, spherical roller bearing replacement, and complete plant refurbishment.',
      imagePrimary: BUILTIN_REAL_MEDIA.quarryFieldDelivery
    },
    {
      id: 'conveyors',
      label: 'Conveyors & Material Handling',
      visible: true,
      kicker: 'Bulk Material Handling Systems',
      headline: 'MOVE MATERIAL. IMPROVE PRODUCTION.',
      body: 'Heavy-duty lattice truss and channel conveyor networks that keep continuous tonnage flowing smoothly from reception hoppers to finished stockpiles.',
      imagePrimary: conveyorGantryImg
    },
    {
      id: 'maintenance-packages',
      label: 'Industrial Maintenance Plans',
      visible: true,
      kicker: 'Asset Reliability & Continuous Production',
      headline: 'PROTECT YOUR PRODUCTION',
      body: 'Choose a tailored industrial maintenance agreement executed by experienced mechanics and fabricators.'
    },
    {
      id: 'engineering-process',
      label: '7-Step Engineering Process',
      visible: true,
      kicker: 'Systematic Engineering Methodology',
      headline: 'FROM IDEA TO INDUSTRIAL SOLUTION',
      body: 'Every piece of heavy equipment or structural steelwork passes through a disciplined seven-stage engineering pipeline.'
    },
    {
      id: 'workshop',
      label: 'Fabrication Workshop Showcase',
      visible: true,
      kicker: 'Fedha Road, Embakasi Workshop',
      headline: 'WHERE ENGINEERING BECOMES REALITY',
      body: 'Our workshop on Fedha Road, Embakasi brings together heavy fabrication bays, experienced welders, and skilled mechanical fitters turning raw structural steel into dependable structures and machinery.',
      imagePrimary: BUILTIN_REAL_MEDIA.crusherStandChuteBay,
      imageSecondary: BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
      videoUrl: BUILTIN_REAL_MEDIA.workshopVideo
    },
    {
      id: 'projects',
      label: 'Completed Projects Portfolio',
      visible: true,
      kicker: 'Industrial Deployments & Case Studies',
      headline: 'OUR INDUSTRIAL PROJECTS',
      body: 'Explore how ABU Fabricators and Services K. Limited has engineered, fabricated, and installed structural steel frameworks, bulk conveyors, and high-tonnage processing plants across Kenya.'
    },
    {
      id: 'spare-parts',
      label: 'Spare Parts & Wear Components',
      visible: true,
      kicker: 'Wear Parts & Component Replacement',
      headline: "DON'T LET A FAILED COMPONENT STOP PRODUCTION",
      body: 'We stock and custom-fabricate high-wear replacement components right here in Nairobi, slashing weeks off overseas shipping lead times.',
      imagePrimary: wearSparePartsImg,
      imageSecondary: fabricationWorkshopImg
    },
    {
      id: 'kenya-strategy',
      label: 'Kenyan Operational Advantage',
      visible: true,
      kicker: 'The Kenyan Operational Advantage',
      headline: 'ENGINEERED LOCALLY. BUILT FOR EAST AFRICAN CONDITIONS.',
      body: 'Partnering with a local Kenyan steel fabricator and industrial manufacturer eliminates import delays and guarantees rapid on-site support.'
    },
    {
      id: 'seo-guides',
      label: 'Engineering Guides & Knowledge Hub',
      visible: true,
      kicker: 'Industrial Technical Insights',
      headline: 'INDUSTRIAL ENGINEERING GUIDES',
      body: 'Practical knowledge for Kenyan contractors, developers, quarry directors, and factory operations managers.'
    },
    {
      id: 'about',
      label: 'About ABU Fabricators',
      visible: true,
      kicker: 'Company Profile',
      headline: 'About ABU Fabricators',
      body: 'ABU Fabricators and Services K. Limited is a Kenyan steel fabrication company committed to delivering precision metalwork and industrial solutions. Our skilled team specializes in structural steel fabrication, custom welding, and the production of durable steel structures for construction, industrial, and commercial projects. Every project is handled with a strong focus on quality, safety, and reliability.'
    },
    {
      id: 'testimonials',
      label: 'Client Testimonials & Counties Served',
      visible: true,
      kicker: 'Verified Kenyan Track Record',
      headline: 'TRUSTED BY CONTRACTORS, QUARRIES & FACTORIES ACROSS KENYA',
      body: 'From structural steel batching towers in Nairobi to remote diesel crushing circuits across Kenyan counties, our workmanship is backed by real production uptime.'
    },
    {
      id: 'faq',
      label: 'Buyer FAQ, Warranty & Lead Times',
      visible: true,
      kicker: 'Pre-Project Answers & Guarantees',
      headline: 'FREQUENTLY ASKED QUESTIONS, WARRANTY & LEAD TIMES',
      body: 'Clear answers on fabrication timelines, structural warranty coverage, inspection visits at Fedha Road, and delivery across all 47 Kenyan counties.'
    },
    {
      id: 'steelwork-gallery',
      label: 'Building Steelwork Specialty Gallery',
      visible: true,
      kicker: 'Structural Building & Commercial Steelwork',
      headline: 'STEEL STRUCTURES BUILT TO ORDER',
      body: 'Beyond quarries and processing machinery, our Fedha Road workshop fabricates and erects warehouse portal frames, factory mezzanines, fuel & water storage tanks, steel staircases, and heavy yard gates across Kenya.'
    },
    {
      id: 'county-dispatch',
      label: 'Kenya County Delivery & Dispatch Estimator',
      visible: true,
      kicker: 'Nationwide Logistics & Field Crews',
      headline: 'KENYA COUNTY DELIVERY & MOBILE CREW DISPATCH',
      body: 'Select your project region to check estimated transport lead times from Fedha Road, Embakasi, recommended haulage class, and mobile welding & crane erection availability.'
    },
    {
      id: 'quality-compliance',
      label: 'Quality Assurance & Tender Capability Pack',
      visible: true,
      kicker: 'Standards, Weld QA & Procurement Readiness',
      headline: 'QUALITY ASSURANCE, WELD INSPECTION & TENDER READINESS',
      body: 'Built for demanding contractors, NGOs, parastatals, and industrial buyers—verify our steel grade traceability, workshop test-run sign-offs, and download a formal tender capability dossier in one click.'
    }
  ],
  machinery: MACHINERY_CATALOG,
  projects: FEATURED_PROJECTS,
  industries: INDUSTRIES_SERVED,
  maintenanceTiers: MAINTENANCE_TIERS,
  articles: SEO_ARTICLES,
  faqs: DEFAULT_FAQS,
  testimonials: DEFAULT_TESTIMONIALS,
  partners: DEFAULT_PARTNERS,
  companyMetrics: DEFAULT_COMPANY_METRICS,
  steelworkGallery: DEFAULT_STEELWORK_GALLERY,
  footerAboutText: 'ABU FABRICATORS AND SERVICES K. LIMITED',
  footerFinalHeadline: 'Let’s Build Something Strong Together',
  footerFinalSubtext:
    'Ready to start your next fabrication project? Contact us today for a free consultation and quotation.'
};
