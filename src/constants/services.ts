import {
  IconTree,
  IconScissors,
  IconWood,
  IconAlertTriangle,
  IconPlant2,
  IconLeaf,
  IconBug,
  IconDroplet,
  IconFlame,
  IconBuildingStore,
  IconBiohazard
} from "@tabler/icons-react";

export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  images: string[];
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  subservices: ServiceDetail[];
}

export const servicesData: Category[] = [
  {
    slug: "treefelling",
    title: "Treefelling",
    description: "Professional tree removal and maintenance services with over 4 years of experience.",
    icon: IconTree,
    color: "bg-[var(--primary)]",
    subservices: [
      {
        slug: "tree-felling",
        title: "Tree Felling",
        description: "Safe and professional tree felling services for trees of all sizes.",
        longDescription: "Safe and professional tree felling services for trees of all sizes. We ensure minimal disruption to your property and complete cleanup after the job is done.",
        benefits: ["Complete tree removal", "Sectional dismantling for confined spaces", "Hazardous tree removal", "Cleanup and waste removal", "Site restoration"],
        images: ["/images/placeholder-service.jpg"]
      },
      {
        slug: "trimming-pruning",
        title: "Tree Trimming & Pruning",
        description: "Expert tree trimming and pruning to maintain tree health and appearance.",
        longDescription: "Expert tree trimming and pruning to maintain tree health, improve appearance, and prevent potential hazards. Our skilled arborists know exactly how to shape your trees for optimal growth.",
        benefits: ["Crown thinning and reduction", "Deadwood removal", "Vista pruning", "Structural pruning", "Fruit tree pruning"],
        images: ["/images/placeholder-service.jpg"]
      },
      {
        slug: "high-risk",
        title: "High Risk Tree Felling",
        description: "Specialized removal of dangerous or hard-to-access trees near structures.",
        longDescription: "Specialized removal of dangerous or hard-to-access trees near structures, power lines, or confined spaces. Our team uses advanced techniques and equipment to ensure safety and precision.",
        benefits: ["Removal of hazardous trees", "Work near power lines or buildings", "Advanced rigging and climbing", "Confined space removals", "Safety-focused operations"],
        images: ["/images/placeholder-service.jpg"]
      },
      {
        slug: "emergency",
        title: "Emergency Tree Services",
        description: "24/7 emergency services for storm damage, fallen trees, or urgent situations.",
        longDescription: "24/7 emergency tree services for storm damage, fallen trees, or any urgent tree-related situations. We respond quickly to minimize damage and ensure safety.",
        benefits: ["Rapid response team", "Fallen tree removal", "Storm damage cleanup", "Hazard assessment", "Insurance claim assistance"],
        images: ["/images/placeholder-service.jpg"]
      },
      {
        slug: "palm-tree",
        title: "Palm Tree Maintenance",
        description: "Specialized palm tree trimming, cleaning, and maintenance services.",
        longDescription: "Specialized palm tree trimming, cleaning, and maintenance services to keep your palms healthy and beautiful. Our team has specific expertise in palm tree care.",
        benefits: ["Palm trimming and skinning", "Dead frond removal", "Disease treatment", "Fertilization", "Palm tree removal"],
        images: ["/images/placeholder-service.jpg"]
      },
      {
        slug: "green-waste",
        title: "Green Waste Removal",
        description: "Efficient removal and responsible disposal of all tree-related waste.",
        longDescription: "Efficient removal and responsible disposal of all tree-related waste. We ensure your property is left clean and tidy after any tree service.",
        benefits: ["Branch and log removal", "Mulching services", "Eco-friendly disposal", "Recycling of wood waste", "Site cleanup"],
        images: ["/images/placeholder-service.jpg"]
      },
      {
        slug: "custom",
        title: "Custom Tree Services",
        description: "Customized tree services tailored to your specific requirements.",
        longDescription: "Don't see exactly what you need? We offer customized tree services tailored to your specific requirements. Contact us to discuss your project.",
        benefits: ["Customized solutions", "Expert consultation", "Tailored to your needs"],
        images: ["/images/placeholder-service.jpg"]
      }
    ]
  },
  {
    slug: "greenhouse",
    title: "Greenhouse",
    description: "Quality shade and fruit trees cultivated for the South African climate.",
    icon: IconPlant2,
    color: "bg-[var(--primary-light)]",
    subservices: [
      {
        slug: "shade-trees",
        title: "Shade Trees",
        description: "Large, healthy trees perfect for creating cool, shaded areas in your garden.",
        longDescription: "We provide a variety of indigenous and exotic shade trees that are well-acclimatized to the local environment. Our experts can help you select the right species for your soil type and space requirements.",
        benefits: ["Natural cooling", "Increased property value", "Privacy screening"],
        images: ["/images/services/shade-1.jpg"]
      },
      {
        slug: "fruit-trees",
        title: "Fruit Trees",
        description: "Productive fruit trees to turn your garden into an edible landscape.",
        longDescription: "From citrus to stone fruits, our greenhouse offers healthy, grafted fruit trees ready for planting. We provide guidance on planting and maintenance to ensure a bountiful harvest.",
        benefits: ["Home-grown produce", "Beautiful blossoms", "Sustainable living"],
        images: ["/images/services/fruit-1.jpg"]
      }
    ]
  },
  {
    slug: "composting",
    title: "Composting",
    description: "Organic soil enhancers and mulch to keep your garden thriving.",
    icon: IconLeaf,
    color: "bg-[var(--earth-brown)]",
    subservices: [
      {
        slug: "compost",
        title: "Organic Compost",
        description: "Nutrient-rich organic compost to revitalize your soil.",
        longDescription: "Our high-quality compost is produced from organic waste, providing a slow-release source of nutrients for your plants. It improves soil structure, water retention, and microbial activity.",
        benefits: ["Enhanced soil fertility", "Better water retention", "100% Organic"],
        images: ["/images/services/compost-1.jpg"]
      },
      {
        slug: "mulch",
        title: "Garden Mulch",
        description: "Natural mulch to suppress weeds and retain soil moisture.",
        longDescription: "Protect your soil and roots with our organic mulch. It helps maintain consistent soil temperatures, reduces evaporation, and adds organic matter back into the soil as it decomposes.",
        benefits: ["Weed suppression", "Moisture conservation", "Soil protection"],
        images: ["/images/services/mulch-1.jpg"]
      }
    ]
  },
  {
    slug: "chips-and-bark",
    title: "Chips & Bark",
    description: "Decorative and functional ground covers for pathways and garden beds.",
    icon: IconScissors,
    color: "bg-[var(--accent-dark)]",
    subservices: [
      {
        slug: "wood-chips",
        title: "Wood Chips",
        description: "Versatile wood chips for landscaping, pathways, and ground cover.",
        longDescription: "Our wood chips are a byproduct of our tree felling services, recycled into a useful landscaping material. They are perfect for stabilizing soil on slopes or creating natural-looking paths.",
        benefits: ["Recycled material", "Erosion control", "Low maintenance"],
        images: ["/images/services/chips-1.jpg"]
      },
      {
        slug: "bark",
        title: "Decorative Bark",
        description: "Premium bark nuggets for a professional, clean finish in your garden beds.",
        longDescription: "Bark provides a more refined aesthetic for formal gardens while offering the same moisture-retention benefits as mulch. It breaks down slowly, providing long-lasting coverage.",
        benefits: ["Premium aesthetic", "Long-lasting", "Moisture retention"],
        images: ["/images/services/bark-1.jpg"]
      }
    ]
  },
  {
    slug: "wood",
    title: "Wood Sales",
    description: "Premium firewood and braai wood for every occasion.",
    icon: IconFlame,
    color: "bg-[var(--earth-dark)]",
    subservices: [
      {
        slug: "braai-hout",
        title: "Braai Hout",
        description: "Long-burning, high-heat wood perfect for the ultimate South African braai.",
        longDescription: "We supply hard woods that produce great coals and impart a wonderful flavor to your meat. Perfectly seasoned and ready to burn.",
        benefits: ["Long-lasting coals", "Great aroma", "Clean burning"],
        images: ["/images/services/braai-1.jpg"]
      },
      {
        slug: "brand-hout",
        title: "Brand Hout",
        description: "General purpose firewood for outdoor fire pits and social gatherings.",
        longDescription: "Good quality firewood that ignites easily and provides a bright, warming flame for your outdoor entertainment areas.",
        benefits: ["Easy to light", "Consistent burn", "Cost-effective"],
        images: ["/images/services/brand-1.jpg"]
      },
      {
        slug: "kaggel-hout",
        title: "Kaggel Hout",
        description: "Specially selected wood for indoor fireplaces that burns cleanly with minimal smoke.",
        longDescription: "Keep your home warm and cozy without the mess. Our fireplace wood is dried to the correct moisture content to prevent soot buildup and excessive smoke.",
        benefits: ["Minimal smoke", "High heat output", "Clean for indoors"],
        images: ["/images/services/kaggel-1.jpg"]
      }
    ]
  },
  {
    slug: "pest-and-weed-control",
    title: "Pest & Weed Control",
    description: "Safe and effective treatment for garden pests and invasive weeds.",
    icon: IconBiohazard,
    color: "bg-[var(--accent)]",
    subservices: [
      {
        slug: "pest-control",
        title: "Garden Pest Control",
        description: "Protect your plants and trees from harmful insects and diseases.",
        longDescription: "We offer targeted treatments for common garden pests while minimizing impact on beneficial insects. Our team can diagnose and treat various fungal and insect-related issues.",
        benefits: ["Plant protection", "Disease prevention", "Targeted treatments"],
        images: ["/images/services/pest-1.jpg"]
      },
      {
        slug: "weed-control",
        title: "Weed Control",
        description: "Professional management of invasive weeds and grass in garden beds and driveways.",
        longDescription: "Keep your property looking neat and tidy. We use effective methods to control stubborn weeds, preventing them from competing with your desired plants for nutrients and water.",
        benefits: ["Tidy appearance", "Nutrient conservation", "Long-term solutions"],
        images: ["/images/services/weed-1.jpg"]
      }
    ]
  }
];
