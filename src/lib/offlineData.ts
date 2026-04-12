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
  }
];

export function searchOfflineDisease(query: string) {
  const lowerQuery = query.toLowerCase();
  return offlineDiseases.filter(d => 
    d.name.toLowerCase().includes(lowerQuery) || 
    d.keywords.some(k => lowerQuery.includes(k)) ||
    d.symptoms.toLowerCase().includes(lowerQuery)
  );
}
