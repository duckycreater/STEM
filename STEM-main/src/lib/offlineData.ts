export const offlineDiseases = [
  {
    id: 'dao-on-lua',
    name: 'Rice Blast',
    symptoms: 'Lesions on leaves are diamond-shaped, with a gray-white center and reddish-brown border. Causes leaf blight and empty grains.',
    treatment: 'Use specific fungicides for rice blast (Tricyclazole, Isoprothiolane). Apply balanced fertilizer, avoid excess nitrogen.',
    keywords: ['blast', 'rice', 'diamond-shaped', 'leaf blight', 'empty grains']
  },
  {
    id: 'vang-lun-lua',
    name: 'Rice Grassy Stunt / Yellowing',
    symptoms: 'Stunted rice plants, leaves yellowing from the tip down, excessive tillering but fails to produce panicles.',
    treatment: 'Uproot diseased plants, spray insecticides to kill brown planthoppers (the vector).',
    keywords: ['yellowing', 'stunt', 'brown planthopper', 'stunted rice']
  },
  {
    id: 'sau-ve-bua',
    name: 'Citrus Leaf Miner',
    symptoms: 'Young leaves are eaten by larvae, creating silvery-white serpentine mines.',
    treatment: 'Spray systemic insecticides when new shoots appear. Prune diseased branches.',
    keywords: ['leaf miner', 'citrus', 'orange', 'lemon', 'serpentine']
  },
  {
    id: 'benh-tri',
    name: 'Thrips',
    symptoms: 'Young leaves curl tightly, leaf margins curl upwards, fruits develop russeting.',
    treatment: 'Spray specific insecticides for thrips (Imidacloprid, Spinetoram) in the early morning or late afternoon.',
    keywords: ['thrips', 'curl', 'russeting']
  },
  {
    id: 'thoi-nhun-bap-cai',
    name: 'Cabbage Soft Rot',
    symptoms: 'Cabbage becomes wet and rotten with a foul odor. Spreads quickly during rainy and humid weather.',
    treatment: 'Uproot diseased plants, apply lime powder. Spray copper-based fungicides or agricultural antibiotics.',
    keywords: ['soft rot', 'cabbage', 'foul odor', 'wet rot']
  },
  {
    id: 'ray-nau',
    name: 'Brown Planthopper',
    symptoms: 'Hoppers suck sap at the base of rice plants, causing them to dry up and wilt (hopperburn). Transmits grassy stunt virus.',
    treatment: 'Maintain appropriate water levels in the field. Spray specific insecticides for hoppers (Pymetrozine, Dinotefuran) at the base.',
    keywords: ['brown planthopper', 'hopperburn', 'rice', 'wilt']
  },
  {
    id: 'sau-cuon-la',
    name: 'Rice Leaf Folder',
    symptoms: 'Rice leaves are folded longitudinally, larvae eat the leaf tissue leaving only the white epidermis.',
    treatment: 'Spray insecticides (Indoxacarb, Chlorantraniliprole) when young larvae hatch.',
    keywords: ['leaf folder', 'rice', 'folded', 'white epidermis']
  },
  {
    id: 'benh-kho-van',
    name: 'Sheath Blight',
    symptoms: 'Tiger-skin-like lesions on leaf sheaths and leaves. Causes sheath rot and empty grains.',
    treatment: 'Apply balanced fertilizer, sow sparsely. Spray fungicides (Validamycin, Hexaconazole).',
    keywords: ['sheath blight', 'rice', 'tiger skin', 'sheath rot']
  },
  {
    id: 'sau-duc-than',
    name: 'Stem Borer',
    symptoms: 'Larvae bore into the rice stem causing deadhearts (tillering stage) or whiteheads (heading stage).',
    treatment: 'Cut off deadhearts, spray systemic insecticides (Fipronil, Chlorantraniliprole).',
    keywords: ['stem borer', 'rice', 'deadheart', 'whitehead']
  },
  {
    id: 'benh-thoi-re',
    name: 'Root Rot / Damping-off',
    symptoms: 'Seedlings rot at the base, wilt, and die. Roots turn dark brown.',
    treatment: 'Treat soil before planting. Drench the base with fungicides (Metalaxyl, Mancozeb).',
    keywords: ['root rot', 'damping-off', 'wilt', 'dark brown']
  },
  {
    id: 'nhen-do',
    name: 'Spider Mites',
    symptoms: 'Leaves lose their green color, turning pale yellow or silvery-gray, with a fine web on the underside.',
    treatment: 'Spray with high-pressure water. Use specific miticides (Propargite, Abamectin).',
    keywords: ['spider mites', 'yellow leaves', 'silvery-gray', 'fine web']
  },
  {
    id: 'ruoi-vang',
    name: 'Fruit Fly',
    symptoms: 'Fruits have small puncture marks, then rot and fall off. Maggots are found inside.',
    treatment: 'Bag fruits, use sweet-and-sour baits or pheromone traps. Spray insecticides for flies.',
    keywords: ['fruit fly', 'puncture', 'fruit rot', 'maggots']
  },
  {
    id: 'benh-suong-mai',
    name: 'Downy Mildew',
    symptoms: 'Yellow spots on the upper leaf surface, grayish-white fungal growth on the underside. Causes leaf drop and fruit rot.',
    treatment: 'Prune branches for better ventilation. Spray fungicides (Mancozeb, Metalaxyl).',
    keywords: ['downy mildew', 'yellow spots', 'grayish-white fungus', 'leaf drop']
  },
  {
    id: 'benh-phan-trang',
    name: 'Powdery Mildew',
    symptoms: 'White powdery coating on leaves, stems, and fruits. Plants become stunted, reducing yield.',
    treatment: 'Prune diseased parts. Spray fungicides (Hexaconazole, Difenoconazole).',
    keywords: ['powdery mildew', 'white powder', 'stunted']
  },
  {
    id: 'benh-gi-sat',
    name: 'Rust',
    symptoms: 'Small reddish-brown or orange-yellow spots resembling rust appear on leaves. Causes premature leaf drop.',
    treatment: 'Clean the field. Spray fungicides (Mancozeb, Propiconazole).',
    keywords: ['rust', 'reddish-brown', 'orange-yellow', 'leaf drop']
  },
  // ===== NEW DISEASES ADDED =====
  {
    id: 'coffee-rust',
    name: 'Coffee Leaf Rust',
    symptoms: 'Orange-yellow powdery spots on the underside of leaves. Leaves turn brown and fall off. Severe defoliation reduces yield by 50-80%.',
    treatment: 'Apply copper-based fungicides (Bordeaux mixture). Use resistant varieties. Maintain shade canopy management.',
    keywords: ['coffee', 'rust', 'orange spots', 'defoliation', 'yellow powder']
  },
  {
    id: 'coffee-berry-disease',
    name: 'Coffee Berry Disease',
    symptoms: 'Dark sunken lesions on green berries. Berries turn black and mummify on the branch. Most damaging during wet weather.',
    treatment: 'Spray fungicides at flowering stage. Remove mummified berries. Improve air circulation by pruning.',
    keywords: ['coffee', 'berry', 'black', 'mummified', 'sunken lesions']
  },
  {
    id: 'pepper-quick-wilt',
    name: 'Pepper Quick Wilt',
    symptoms: 'Sudden wilting and death of the entire vine within 7-15 days. Roots turn dark brown/black with foul smell.',
    treatment: 'Improve drainage urgently. Apply Trichoderma bio-fungicide to soil. Drench roots with Metalaxyl + Mancozeb.',
    keywords: ['pepper', 'quick wilt', 'sudden death', 'black roots', 'phytophthora']
  },
  {
    id: 'pepper-slow-decline',
    name: 'Pepper Slow Decline',
    symptoms: 'Gradual yellowing and wilting over months. Roots show nematode galls. Plant becomes unproductive over 1-2 years.',
    treatment: 'Apply nematicides (Carbofuran). Add organic matter. Use resistant rootstocks for new planting.',
    keywords: ['pepper', 'slow decline', 'nematode', 'yellowing', 'galls']
  },
  {
    id: 'durian-phytophthora',
    name: 'Durian Trunk/Root Rot',
    symptoms: 'Dark brown wet patches on trunk bark oozing sap. Leaves wilt and turn yellow. Can kill mature trees within months.',
    treatment: 'Scrape diseased bark and apply copper paste. Drench soil with Metalaxyl. Improve drainage around trunk.',
    keywords: ['durian', 'trunk rot', 'phytophthora', 'bark', 'oozing sap']
  },
  {
    id: 'durian-leaf-blight',
    name: 'Durian Leaf Blight',
    symptoms: 'Brown leaf tips expanding to cover entire leaves. Young shoots die back. Common during hot-wet transition season.',
    treatment: 'Prune and burn affected branches. Spray Mancozeb or Copper hydroxide preventively before rainy season.',
    keywords: ['durian', 'leaf blight', 'brown tips', 'dieback', 'rhizoctonia']
  },
  {
    id: 'dragon-fruit-stem-rot',
    name: 'Dragon Fruit Stem Rot',
    symptoms: 'Soft brown spots on stems expanding rapidly. Stems become mushy and collapse. Foul smell in advanced stages.',
    treatment: 'Cut infected stems 30cm below lesion. Apply fungicide paste to cut surface. Reduce watering.',
    keywords: ['dragon fruit', 'stem rot', 'soft brown', 'mushy', 'collapse']
  },
  {
    id: 'dragon-fruit-anthracnose',
    name: 'Dragon Fruit Anthracnose',
    symptoms: 'Circular brown-black spots on fruits with raised edges. Fruits crack and rot. Post-harvest losses up to 40%.',
    treatment: 'Spray Carbendazim during flowering. Handle fruits carefully during harvest. Store at 5-7°C.',
    keywords: ['dragon fruit', 'anthracnose', 'black spots', 'fruit rot', 'circular']
  },
  {
    id: 'tomato-late-blight',
    name: 'Tomato Late Blight',
    symptoms: 'Large dark water-soaked lesions on leaves expanding rapidly. White fuzzy mold underneath. Entire field can collapse in days.',
    treatment: 'Spray preventive fungicides (Mancozeb, Chlorothalonil) before rainy season. Remove infected plants immediately.',
    keywords: ['tomato', 'late blight', 'water-soaked', 'phytophthora', 'white mold']
  },
  {
    id: 'tomato-leaf-curl',
    name: 'Tomato Leaf Curl Virus',
    symptoms: 'Leaves curl upward and inward. Plants become stunted and bushy. Transmitted by whiteflies. Yields reduced 50-100%.',
    treatment: 'Control whiteflies with neem oil or Imidacloprid. Use resistant varieties. Remove and destroy infected plants.',
    keywords: ['tomato', 'leaf curl', 'virus', 'whitefly', 'stunted', 'curling']
  },
  {
    id: 'bacterial-wilt',
    name: 'Bacterial Wilt',
    symptoms: 'Rapid wilting of entire plant without yellowing. Cut stem shows brown discoloration in vascular tissue. Milky bacterial ooze in water test.',
    treatment: 'No chemical cure. Rotate crops for 3-4 years. Use resistant varieties. Apply lime to raise soil pH.',
    keywords: ['bacterial wilt', 'rapid wilting', 'ralstonia', 'brown vascular', 'ooze']
  },
  {
    id: 'fusarium-wilt',
    name: 'Fusarium Wilt',
    symptoms: 'One-sided yellowing and wilting of leaves. Vascular tissue shows brown streaks. Plants gradually die over weeks.',
    treatment: 'Soil solarization. Use resistant rootstocks. Apply Trichoderma bio-agent to soil. Crop rotation.',
    keywords: ['fusarium', 'one-sided', 'wilt', 'brown streaks', 'vascular']
  },
  {
    id: 'black-sigatoka',
    name: 'Black Sigatoka (Banana)',
    symptoms: 'Dark brown/black streaks on banana leaves parallel to veins. Leaves dry up from edges. Bunches ripen prematurely.',
    treatment: 'Remove and destroy infected leaves. Spray Propiconazole or Mancozeb. Maintain plant spacing for airflow.',
    keywords: ['banana', 'sigatoka', 'black streaks', 'premature ripening', 'leaf streak']
  },
  {
    id: 'panama-disease',
    name: 'Panama Disease (Banana TR4)',
    symptoms: 'Yellowing and wilting of oldest leaves first, progressing inward. Internal rhizome shows reddish-brown discoloration. Fatal with no cure.',
    treatment: 'NO CURE available. Strict quarantine measures. Do not replant bananas in infected soil for 20+ years. Use resistant varieties.',
    keywords: ['banana', 'panama', 'TR4', 'fusarium', 'fatal', 'no cure']
  },
  {
    id: 'mango-anthracnose',
    name: 'Mango Anthracnose',
    symptoms: 'Black irregular spots on flowers causing flower drop. Dark sunken spots on ripe fruits. Most severe during humid weather.',
    treatment: 'Spray Carbendazim + Mancozeb during flowering. Hot water treatment (52°C for 5 min) post-harvest. Cold storage at 13°C.',
    keywords: ['mango', 'anthracnose', 'flower drop', 'black spots', 'colletotrichum']
  },
  {
    id: 'mango-bacterial-canker',
    name: 'Mango Bacterial Canker',
    symptoms: 'Raised dark brown to black lesions on leaves, stems, and fruits. Cracks appear with gummy ooze. Fruit spots become corky.',
    treatment: 'Prune diseased branches during dry weather. Spray Copper oxychloride + Streptomycin. Avoid injuries during harvest.',
    keywords: ['mango', 'canker', 'bacterial', 'gummy ooze', 'corky spots']
  },
  {
    id: 'cassava-mosaic',
    name: 'Cassava Mosaic Disease',
    symptoms: 'Yellow-green mosaic pattern on leaves with leaf distortion. Stunted growth and reduced tuber yield up to 50-90%.',
    treatment: 'Use virus-free planting material. Select resistant varieties (e.g., KU50). Remove and destroy infected plants.',
    keywords: ['cassava', 'mosaic', 'virus', 'yellow-green', 'distortion', 'stunted']
  },
  {
    id: 'citrus-greening',
    name: 'Citrus Greening (HLB)',
    symptoms: 'Blotchy yellow mottling on leaves. Lopsided small bitter fruits with green unfilled sections. Tree decline over 3-5 years.',
    treatment: 'NO CURE. Control psyllid vector with systemic insecticides. Remove infected trees. Use certified disease-free nursery stock.',
    keywords: ['citrus', 'greening', 'HLB', 'huanglongbing', 'mottling', 'psyllid']
  },
  {
    id: 'coconut-bud-rot',
    name: 'Coconut Bud Rot',
    symptoms: 'Central spindle leaf turns pale yellow then brown. Pulling the spear leaf reveals rotting bud tissue with foul odor.',
    treatment: 'Remove affected palms. Apply Bordeaux paste to surrounding healthy palms. Improve drainage. Crown treatment with Metalaxyl.',
    keywords: ['coconut', 'bud rot', 'spindle', 'phytophthora', 'palm']
  },
  {
    id: 'rice-tungro',
    name: 'Rice Tungro',
    symptoms: 'Stunted plants with yellow-orange discoloration from leaf tips. Reduced tillers with delayed flowering. Transmitted by green leafhoppers.',
    treatment: 'Plant resistant varieties. Synchronize planting in the area. Control green leafhoppers early. Uproot infected plants.',
    keywords: ['rice', 'tungro', 'orange', 'leafhopper', 'stunted', 'virus']
  },
  {
    id: 'white-fly-infestation',
    name: 'Whitefly Infestation',
    symptoms: 'Tiny white flying insects under leaves. Honeydew secretion causing sooty mold. Transmits many plant viruses.',
    treatment: 'Install yellow sticky traps. Spray neem oil or Imidacloprid. Introduce natural predators (Encarsia formosa).',
    keywords: ['whitefly', 'white fly', 'sooty mold', 'honeydew', 'sticky']
  },
  {
    id: 'leaf-spot',
    name: 'Cercospora Leaf Spot',
    symptoms: 'Circular dark brown spots with gray centers on leaves. Spots may merge causing large dead areas. Common in warm humid weather.',
    treatment: 'Remove infected leaves. Apply Mancozeb or Chlorothalonil fungicides. Avoid overhead irrigation.',
    keywords: ['leaf spot', 'cercospora', 'circular', 'gray center', 'brown spots']
  }
];

export function searchOfflineDisease(query: string) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return offlineDiseases;
  
  const queryWords = lowerQuery.split(/\s+/);
  
  return offlineDiseases.filter(d => {
    // Direct name match (highest priority)
    if (d.name.toLowerCase().includes(lowerQuery)) return true;
    // Keyword match: any keyword contains query word or vice versa
    if (d.keywords.some(k => 
      k.toLowerCase().includes(lowerQuery) || lowerQuery.includes(k.toLowerCase())
    )) return true;
    // Symptom match: ALL query words must appear in symptoms
    if (queryWords.length > 0 && queryWords.every(w => 
      d.symptoms.toLowerCase().includes(w)
    )) return true;
    return false;
  });
}
