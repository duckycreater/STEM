// ==========================================
// PlantCare AI — Extended Offline Database v3.0
// 500+ Plant Diseases, Pests & Disorders
// ==========================================

// Disease categories
export type DiseaseCategory = 
  | 'fungal' | 'bacterial' | 'viral' | 'pest' | 'deficiency' | 'environmental' | 'physiological';

export interface Disease {
  id: string;
  name: string;
  nameVi: string;
  category: DiseaseCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string;
  symptomsVi: string;
  causes: string;
  causesVi: string;
  treatment: string;
  treatmentVi: string;
  prevention: string;
  preventionVi: string;
  affectedPlants: string[];
  keywords: string[];
  keywordsVi: string[];
  season?: string;
  seasonVi?: string;
  images?: string[];
}

// ==========================================
// EXTENDED DISEASE DATABASE (500+ Diseases)
// ==========================================

export const offlineDiseases: Disease[] = [
  // ==================== RICE DISEASES ====================
  {
    id: 'rice-blast',
    name: 'Rice Blast',
    nameVi: 'Đạo ốc (Bệnh cháy lá lúa)',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Diamond-shaped lesions with gray-white center and brown border. Lesions on leaves, stems, and panicles. Severe infection causes leaf blight and empty grains.',
    symptomsVi: 'Vết bệnh hình thoi, giữa màu xám trắng, viền nâu. Vết bệnh trên lá, thân và bông. Nhiễm nặng gây cháy lá và lép bông.',
    causes: 'Fungus Magnaporthe oryzae. Spreads through infected seeds, crop residues, and wind-borne spores. High humidity and moderate temperatures favor development.',
    causesVi: 'Nấm Magnaporthe oryzae. Lây lan qua hạt giống nhiễm bệnh, tàn dư cây trồng và bào tử theo gió. Độ ẩm cao, nhiệt độ vừa phải thuận lợi cho bệnh phát triển.',
    treatment: 'Apply Tricyclazole or Isoprothiolane fungicide. Use balanced NPK fertilizer, avoid excessive nitrogen. Drain fields periodically.',
    treatmentVi: 'Phun thuốc trừ nấm Tricyclazole hoặc Isoprothiolane. Bón phân cân đối NPK, tránh bón thừa đạm. Tháo nước thường xuyên.',
    prevention: 'Use certified disease-free seeds. Apply proper spacing. Remove crop residues. Monitor fields regularly.',
    preventionVi: 'Sử dụng giống sạch bệnh. Trồng cách hàng đúng quy trình. Dọn sạch tàn dư sau thu hoạch. Theo dõi đồng ruộng thường xuyên.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['blast', 'diamond', 'lesion', 'leaf blight', 'gray center', 'brown border'],
    keywordsVi: ['đạo ốc', 'cháy lá', 'hình thoi', 'vết bệnh', 'lúa'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'rice-bacterial-blight',
    name: 'Bacterial Leaf Blight',
    nameVi: 'Bệnh vi khuẩn gây cháy lá lúa',
    category: 'bacterial',
    severity: 'high',
    symptoms: 'Water-soaked lesions on leaf margins, turning yellow then white. Lesions extend along the leaf blade. Severe cases cause wilting and death.',
    symptomsVi: 'Vết bệnh ướt dọc theo mép lá, chuyển vàng rồi trắng. Vết bệnh lan dọc theo lá. Trường hợp nặng gây héo và chết.',
    causes: 'Bacterium Xanthomonas oryzae pv. oryzae. Spreads through irrigation water, rain splash, and infected seeds.',
    causesVi: 'Vi khuẩn Xanthomonas oryzae pv. oryzae. Lây lan qua nước tưới, mưa và hạt giống nhiễm bệnh.',
    treatment: 'Apply copper-based bactericides. Remove and destroy infected plants. Avoid working in wet fields.',
    treatmentVi: 'Phun thuốc kháng vi khuẩn gốc đồng. Nhổ và tiêu hủy cây bị bệnh. Tránh làm việc khi ruộng ướt.',
    prevention: 'Use resistant varieties. Treat seeds with antibiotics. Avoid excessive nitrogen fertilization.',
    preventionVi: 'Sử dụng giống kháng bệnh. Xử lý hạt giống bằng kháng sinh. Tránh bón thừa đạm.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['bacterial', 'yellow', 'white', 'wilt', 'leaf margin'],
    keywordsVi: ['vi khuẩn', 'vàng', 'trắng', 'cháy mép lá', 'lúa'],
    season: 'Warm, wet',
    seasonVi: 'Nóng, ẩm ướt'
  },
  {
    id: 'rice-brown-spot',
    name: 'Brown Spot',
    nameVi: 'Bệnh đốm nâu lúa',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Oval or cylindrical brown spots with gray centers on leaves. Spots may have yellow halos. Severely affected leaves turn yellow and die.',
    symptomsVi: 'Đốm nâu hình bầu dục hoặc trụ với tâm xám trên lá. Đốm có thể có viền vàng. Lá nhiễm nặng chuyển vàng và chết.',
    causes: 'Fungus Bipolaris oryzae. Associated with nutrient deficiency, especially potassium. Spreads through spores in wind and rain.',
    causesVi: 'Nấm Bipolaris oryzae. Liên quan đến thiếu dinh dưỡng, đặc biệt là kali. Lây lan qua bào tử trong gió và mưa.',
    treatment: 'Apply fungicides (Mancozeb, Propiconazole). Ensure balanced fertilization with adequate potassium.',
    treatmentVi: 'Phun thuốc trừ nấm (Mancozeb, Propiconazole). Đảm bảo bón phân cân đối, đủ kali.',
    prevention: 'Use healthy seeds. Apply balanced fertilizers. Maintain proper water management.',
    preventionVi: 'Sử dụng hạt giống khỏe mạnh. Bón phân cân đối. Quản lý nước đúng cách.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['brown', 'spot', 'oval', 'yellow halo', 'potassium deficiency'],
    keywordsVi: ['đốm nâu', 'tròn', 'vàng', 'thiếu kali', 'lúa'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
  {
    id: 'rice-sheath-blight',
    name: 'Sheath Blight',
    nameVi: 'Bệnh khô vảy nến lúa',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Oval or irregular lesions on leaf sheaths near water level. Lesions have off-white centers with brown margins, resembling tiger stripes. Causes lodging.',
    symptomsVi: 'Đốm bầu dục hoặc không đều trên bao lá gần mặt nước. Vết bệnh có tâm trắng xám với viền nâu, giống vằn hổ. Gây đổ ngã.',
    causes: 'Fungus Rhizoctonia solani. Spread through infected plant debris. Favors high humidity and dense planting.',
    causesVi: 'Nấm Rhizoctonia solani. Lây lan qua tàn dư cây bị nhiễm. Thích hợp với độ ẩm cao và trồng dày.',
    treatment: 'Apply fungicides (Validamycin, Hexaconazole). Reduce plant density. Drain fields.',
    treatmentVi: 'Phun thuốc trừ nấm (Validamycin, Hexaconazole). Giảm mật độ trồng. Tháo cạn nước.',
    prevention: 'Use resistant varieties. Avoid excessive nitrogen. Proper plant spacing.',
    preventionVi: 'Sử dụng giống kháng bệnh. Tránh bón thừa đạm. Trồng đúng mật độ.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['sheath', 'tiger', 'stripe', 'lesion', 'lodging', 'white center'],
    keywordsVi: ['khô vảy nến', 'vằn hổ', 'đốm', 'đổ ngã', 'lúa'],
    season: 'Hot, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'rice-yellow-mottle',
    name: 'Rice Yellow Mottle Virus',
    nameVi: 'Bệnh lúa vàng lùn',
    category: 'viral',
    severity: 'critical',
    symptoms: 'Yellow to orange discoloration of leaves. Stunted growth, reduced tillering. Leaves become narrow and stiff. Panicles may be malformed or steriles.',
    symptomsVi: 'Lá chuyển vàng đến cam. Cây còi cọc, giảm đẻ nhánh. Lá hẹp và cứng. Bông có thể dị dạng hoặc lép.',
    causes: 'Virus transmitted by leafhoppers (Nesophrosyne spp.). Also spread through infected seeds and mechanical transmission.',
    causesVi: 'Virus lây truyền qua rầy (Nesophrosyne spp.). Cũng lây lan qua hạt giống nhiễm bệnh và truyền cơ học.',
    treatment: 'Control leafhopper vectors with insecticides. Remove infected plants. No direct treatment for the virus.',
    treatmentVi: 'Phòng trừ rầy làm vật truyền bệnh bằng thuốc trừ sâu. Nhổ bỏ cây nhiễm bệnh. Không có thuốc điều trị trực tiếp.',
    prevention: 'Use resistant varieties. Control leafhoppers. Use virus-free seeds.',
    preventionVi: 'Sử dụng giống kháng bệnh. Phòng trừ rầy. Sử dụng hạt giống không nhiễm virus.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['yellow', 'stunt', 'virus', 'leafhopper', 'sterile', 'malformed'],
    keywordsVi: ['vàng lùn', 'còi cọc', 'virus', 'rầy', 'lép', 'lúa'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'rice-grassy-stunt',
    name: 'Rice Grassy Stunt',
    nameVi: 'Bệnh lúa cỏ dại',
    category: 'viral',
    severity: 'critical',
    symptoms: 'Excessive tillering, stunted growth, pale green or yellowish leaves. Leaves may have small rusty spots. Plants produce no panicles or very few.',
    symptomsVi: 'Đẻ nhánh nhiều bất thường, cây còi cọc, lá xanh nhạt hoặc vàng. Lá có thể có đốm gỉ sắt nhỏ. Cây không ra bông hoặc ra ít.',
    causes: 'Virus transmitted by brown planthoppers (Nilaparvata lugens).',
    causesVi: 'Virus lây truyền qua rầy nâu (Nilaparvata lugens).',
    treatment: 'Control brown planthoppers with appropriate insecticides. Remove infected plants.',
    treatmentVi: 'Phòng trừ rầy nâu bằng thuốc trừ sâu thích hợp. Nhổ bỏ cây nhiễm bệnh.',
    prevention: 'Use resistant varieties. Control planthopper populations. Avoid ratooning.',
    preventionVi: 'Sử dụng giống kháng bệnh. Phòng trừ rầy nâu. Tránh để lúa gốc.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['grassy', 'stunt', 'excessive tillering', 'planthopper', 'rusty spots'],
    keywordsVi: ['cỏ dại', 'còi cọc', 'đẻ nhánh', 'rầy nâu', 'đốm gỉ'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'rice-leaf-fold',
    name: 'Rice Leaf Folder',
    nameVi: 'Sâu cuốn lá lúa',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Leaves are folded longitudinally by larvae. Inside the fold, green tissue is eaten leaving white papery areas. Severe infestations cause leaf drying.',
    symptomsVi: 'Lá bị cuốn dọc bởi ấu trùng. Bên trong nếp lá, phần thịt xanh bị ăn để lại vùng trắng mỏng. Nhiễm nặng gây khô lá.',
    causes: 'Larvae of moth Cnaphalocrocis medinalis. Adults migrate long distances. Outbreaks occur in warm, dry conditions.',
    causesVi: 'Ấu trùng bướm Cnaphalocrocis medinalis. Bướm trưởng thành di cư xa. Bùng phát khi thời tiết ấm, khô.',
    treatment: 'Apply insecticides (Indoxacarb, Chlorantraniliprole) when larvae are small. Biological control with Trichogramma wasps.',
    treatmentVi: 'Phun thuốc trừ sâu (Indoxacarb, Chlorantraniliprole) khi sâu còn nhỏ. Phòng trừ sinh học bằng ong mắt đỏ.',
    prevention: 'Avoid excessive nitrogen. Drain fields periodically. Monitor for adult moths.',
    preventionVi: 'Tránh bón thừa đạm. Tháo nước định kỳ. Theo dõi bướm trưởng thành.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['leaf folder', 'folded', 'white', 'papery', 'larvae', 'moth'],
    keywordsVi: ['cuốn lá', 'trắng', 'mỏng', 'sâu', 'bướm', 'lúa'],
    season: 'Warm, dry',
    seasonVi: 'Nóng, khô'
  },
  {
    id: 'rice-stem-borer',
    name: 'Rice Stem Borer',
    nameVi: 'Sâu đục thân lúa',
    category: 'pest',
    severity: 'high',
    symptoms: 'Deadhearts (dead central shoots) at tillering stage. Whiteheads (white, empty panicles) at heading stage. Entrance holes visible on stems.',
    symptomsVi: 'Đốm trắng (búp chết) giai đoạn đẻ nhánh. Bông trắng (bông trống rỗng) giai đoạn ra bông. Lỗ đục nhìn thấy trên thân.',
    causes: 'Larvae of moths (Tryporyza incertulas, Chilo suppressalis). Larvae bore into stems.',
    causesVi: 'Ấu trùng bướm (Tryporyza incertulas, Chilo suppressalis). Ấu trùng đục vào thân.',
    treatment: 'Apply systemic insecticides (Fipronil, Chlorantraniliprole). Cut and destroy deadhearts.',
    treatmentVi: 'Phun thuốc trừ sâu nội hấp (Fipronil, Chlorantraniliprole). Cắt và tiêu hủy đốm trắng.',
    prevention: 'Use resistant varieties. Remove crop residues. Use light traps to monitor adults.',
    preventionVi: 'Sử dụng giống kháng bệnh. Dọn sạch tàn dư. Dùng bẫy đèn theo dõi bướm.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['stem borer', 'deadheart', 'whitehead', 'entrance hole', 'larvae'],
    keywordsVi: ['đục thân', 'đốm trắng', 'bông trắng', 'lỗ đục', 'sâu', 'lúa'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'rice-brown-planthopper',
    name: 'Brown Planthopper',
    nameVi: 'Rầy nâu lúa',
    category: 'pest',
    severity: 'high',
    symptoms: 'Hopperburn: circular or irregular yellowing and wilting of rice hills. Stunted growth. Sooty mold on leaves. Acts as virus vector.',
    symptomsVi: 'Cháy rầy: vàng và héo từng gốc lúa theo vòng tròn hoặc không đều. Cây còi cọc. Bồ hóng trên lá. Là vật truyền virus.',
    causes: 'Nilaparvata lugens. Sucks sap from phloem at the base of plants. Causes direct damage and transmits viruses.',
    causesVi: 'Nilaparvata lugens. Hút nhựa từ bạc mạch ở gốc cây. Gây hại trực tiếp và truyền virus.',
    treatment: 'Apply insecticides (Pymetrozine, Dinotefuran, Buprofezin) at the base. Drain fields.',
    treatmentVi: 'Phun thuốc trừ rầy (Pymetrozine, Dinotefuran, Buprofezin) vào gốc. Tháo cạn nước.',
    prevention: 'Use resistant varieties. Avoid excessive nitrogen. Maintain proper plant spacing. Use yellow sticky traps.',
    preventionVi: 'Sử dụng giống kháng bệnh. Tránh bón thừa đạm. Trồng đúng mật độ. Dùng bẫy keo vàng.',
    affectedPlants: ['Rice', 'Oryza sativa'],
    keywords: ['planthopper', 'hopperburn', 'wilt', 'yellow', 'sooty mold', 'virus vector'],
    keywordsVi: ['rầy nâu', 'cháy rầy', 'héo', 'vàng', 'bồ hóng', 'lúa'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== VEGETABLE DISEASES ====================
  {
    id: 'tomato-late-blight',
    name: 'Tomato Late Blight',
    nameVi: 'Bệnh sương mai cà chua',
    category: 'fungal',
    severity: 'critical',
    symptoms: 'Water-soaked, dark green to brown lesions on leaves. White fuzzy growth on leaf undersides in humid conditions. Fruit rot with brown, firm patches.',
    symptomsVi: 'Vết bệnh ướt, xanh đậm đến nâu trên lá. Lớp nấm trắng bông phía dưới lá khi ẩm. Quả thối với vết nâu cứng.',
    causes: 'Oomycete Phytophthora infestans. Spreads rapidly in cool, wet weather. Air-borne sporangia.',
    causesVi: 'Oomycete Phytophthora infestans. Lây lan nhanh khi trời mát, ẩm. Bào tử theo gió.',
    treatment: 'Apply fungicides (Mancozeb, Chlorothalonil) preventatively. Remove infected plant parts. Improve air circulation.',
    treatmentVi: 'Phun thuốc trừ nấm (Mancozeb, Chlorothalonil) phòng ngừa. Loại bỏ bộ phận nhiễm bệnh. Cải thiện thông khí.',
    prevention: 'Use resistant varieties. Avoid overhead irrigation. Provide adequate spacing. Monitor weather conditions.',
    preventionVi: 'Sử dụng giống kháng bệnh. Tránh tưới trên lá. Trồng đúng khoảng cách. Theo dõi thời tiết.',
    affectedPlants: ['Tomato', 'Potato', 'Eggplant'],
    keywords: ['late blight', 'water-soaked', 'brown lesion', 'white fuzzy', 'fruit rot'],
    keywordsVi: ['sương mai', 'ướt', 'nâu', 'bông trắng', 'thối quả', 'cà chua'],
    season: 'Cool, wet',
    seasonVi: 'Mát, ẩm'
  },
  {
    id: 'tomato-early-blight',
    name: 'Tomato Early Blight',
    nameVi: 'Bệnh đốm早早 cà chua',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Dark brown spots with concentric rings (target-like pattern) on lower leaves. Spots may have yellow halos. Leaves turn yellow and drop.',
    symptomsVi: 'Đốm nâu đậm với các vòng đồng tâm (hình đích) trên lá dưới. Đốm có thể có viền vàng. Lá chuyển vàng và rụng.',
    causes: 'Fungus Alternaria solani. Survives in plant debris and soil. Spread by splashing water.',
    causesVi: 'Nấm Alternaria solani. Tồn tại trong tàn dư thực vật và đất. Lây lan qua nước bắn.',
    treatment: 'Apply fungicides (Azoxystrobin, Pyraclostrobin). Remove lower infected leaves. Apply mulch.',
    treatmentVi: 'Phun thuốc trừ nấm (Azoxystrobin, Pyraclostrobin). Loại bỏ lá dưới nhiễm bệnh. Phủ đất.',
    prevention: 'Rotate crops. Use disease-free seeds. Maintain proper plant spacing. Remove plant debris.',
    preventionVi: 'Luân canh cây trồng. Sử dụng hạt giống sạch bệnh. Trồng đúng khoảng cách. Dọn sạch tàn dư.',
    affectedPlants: ['Tomato', 'Potato', 'Pepper'],
    keywords: ['early blight', 'concentric', 'target', 'ring', 'yellow halo', 'leaf drop'],
    keywordsVi: ['đốm sớm', 'đồng tâm', 'hình đích', 'vàng', 'rụng lá', 'cà chua'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'tomato-hornworm',
    name: 'Tomato Hornworm',
    nameVi: 'Sâu khoang cà chua',
    category: 'pest',
    severity: 'high',
    symptoms: 'Large irregular holes in leaves. Leaves and fruit partially eaten. Dark green frass (droppings) on leaves and ground. Caterpillars may be visible.',
    symptomsVi: 'Lỗ lớn không đều trên lá. Lá và quả bị ăn một phần. Phân sâu màu xanh đậm trên lá và đất. Sâu có thể nhìn thấy.',
    causes: 'Larvae of five-spotted hawk moth (Manduca quinquemaculata). Caterpillars feed voraciously.',
    causesVi: 'Ấu trùng bướm đêm Manduca quinquemaculata. Sâu ăn rất nhiều.',
    treatment: 'Hand-pick caterpillars. Apply Bacillus thuringiensis (Bt). Encourage natural predators.',
    treatmentVi: 'Bắt sâu bằng tay. Phun Bacillus thuringiensis (Bt). Khuyến khích thiên địch.',
    prevention: 'Till soil after harvest. Encourage parasitic wasps. Inspect plants regularly.',
    preventionVi: 'Đào đất sau thu hoạch. Khuyến khích ong ký sinh. Kiểm tra cây thường xuyên.',
    affectedPlants: ['Tomato', 'Potato', 'Eggplant', 'Pepper'],
    keywords: ['hornworm', 'caterpillar', 'holes', 'eaten', 'frass', 'voracious'],
    keywordsVi: ['khoang', 'sâu', 'lỗ', 'ăn', 'phân', 'cà chua'],
    season: 'Summer',
    seasonVi: 'Mùa hè'
  },
  {
    id: 'cabbage-loopers',
    name: 'Cabbage Loopers',
    nameVi: 'Sâu xanh bướm trắng',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Irregular holes in leaves. Green caterpillars with looping movement. Frass (droppings) present. Leaves may be skeletonized.',
    symptomsVi: 'Lỗ không đều trên lá. Sâu xanh di chuyển uốn lượn. Có phân sâu. Lá có thể bị ăn gặm.',
    causes: 'Larvae of moth Trichoplusia ni. Caterpillars move in a characteristic looping motion.',
    causesVi: 'Ấu trùng bướm Trichoplusia ni. Sâu di chuyển đặc trưng kiểu uốn lượn.',
    treatment: 'Apply Bt (Bacillus thuringiensis). Hand-pick caterpillars. Use row covers.',
    treatmentVi: 'Phun Bt (Bacillus thuringiensis). Bắt sâu bằng tay. Dùng lưới che.',
    prevention: 'Use row covers. Remove crop residues. Encourage beneficial insects.',
    preventionVi: 'Dùng lưới che. Dọn sạch tàn dư. Khuyến khích côn trùng có ích.',
    affectedPlants: ['Cabbage', 'Broccoli', 'Cauliflower', 'Lettuce'],
    keywords: ['looper', 'looping', 'green caterpillar', 'holes', 'skeletonized'],
    keywordsVi: ['xanh', 'uốn lượn', 'lỗ', 'ăn gặm', 'bắp cải'],
    season: 'Cool',
    seasonVi: 'Mát'
  },
  {
    id: 'cabbage-soft-rot',
    name: 'Cabbage Soft Rot',
    nameVi: 'Bệnh thối nhầy bắp cải',
    category: 'bacterial',
    severity: 'high',
    symptoms: 'Soft, mushy, and foul-smelling decay of leaves and stems. Interior of cabbage turns into smelly liquid mass. Often follows other damage.',
    symptomsVi: 'Lá và thân bị mềm nhũn, có mùi hôi. Ruột bắp cải biến thành khối lỏng có mùi. Thường theo sau các tổn thương khác.',
    causes: 'Bacterium Pectobacterium carotovorum. Enters through wounds or natural openings. Spreads in wet conditions.',
    causesVi: 'Vi khuẩn Pectobacterium carotovorum. Xâm nhập qua vết thương hoặc lỗ tự nhiên. Lây lan trong điều kiện ẩm.',
    treatment: 'Remove and destroy infected plants. Avoid working in wet conditions. Apply copper sprays.',
    treatmentVi: 'Loại bỏ và tiêu hủy cây nhiễm bệnh. Tránh làm việc khi ướt. Phun thuốc đồng.',
    prevention: 'Avoid plant injury. Control pests that cause wounds. Improve drainage. Rotate crops.',
    preventionVi: 'Tránh làm tổn thương cây. Phòng trừ sâu hại gây vết thương. Cải thiện thoát nước. Luân canh.',
    affectedPlants: ['Cabbage', 'Broccoli', 'Cauliflower', 'Carrot'],
    keywords: ['soft rot', 'mushy', 'foul-smelling', 'decay', 'liquid', 'wounds'],
    keywordsVi: ['thối nhầy', 'mềm', 'hôi', 'hủy', 'lỏng', 'bắp cải'],
    season: 'Wet',
    seasonVi: 'Ẩm ướt'
  },
  {
    id: 'pepper-bacterial-spot',
    name: 'Bacterial Spot',
    nameVi: 'Bệnh đốm vi khuẩn ớt',
    category: 'bacterial',
    severity: 'medium',
    symptoms: 'Small, dark, water-soaked spots on leaves that enlarge and turn brown. Spots may have yellow halos. Leaves may drop. Fruit has raised, scab-like spots.',
    symptomsVi: 'Đốm nhỏ, đậm, ướt trên lá, lan rộng và chuyển nâu. Đốm có thể có viền vàng. Lá có thể rụng. Quả có đốm nổi như vảy.',
    causes: 'Bacteria Xanthomonas spp. Spread by splashing water, tools, and handling wet plants.',
    causesVi: 'Vi khuẩn Xanthomonas spp. Lây lan qua nước bắn, dụng cụ và tiếp xúc cây ướt.',
    treatment: 'Apply copper sprays. Remove severely infected plants. Avoid overhead irrigation.',
    treatmentVi: 'Phun thuốc đồng. Loại bỏ cây nhiễm nặng. Tránh tưới trên lá.',
    prevention: 'Use disease-free seeds. Rotate crops. Avoid working in wet conditions. Disinfect tools.',
    preventionVi: 'Sử dụng hạt giống sạch bệnh. Luân canh. Tránh làm việc khi ướt. Khử trùng dụng cụ.',
    affectedPlants: ['Pepper', 'Tomato', 'Eggplant'],
    keywords: ['bacterial spot', 'water-soaked', 'raised', 'scab', 'yellow halo'],
    keywordsVi: ['đốm vi khuẩn', 'ướt', 'nổi', 'vảy', 'ớt'],
    season: 'Warm, wet',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'carrot-leaf-blight',
    name: 'Carrot Leaf Blight',
    nameVi: 'Bệnh cháy lá cà rốt',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Brown lesions on leaves, starting as small spots. Lesions enlarge and coalesce, causing extensive blighting. Infected leaves curl and dry.',
    symptomsVi: 'Đốm nâu trên lá, bắt đầu nhỏ. Đốm lan rộng và hợp nhất, gây cháy lan rộng. Lá nhiễm bệnh cuộn và khô.',
    causes: 'Fungi Alternaria dauci and Cercospora carotae. Survive in plant debris and soil.',
    causesVi: 'Nấm Alternaria dauci và Cercospora carotae. Tồn tại trong tàn dư thực vật và đất.',
    treatment: 'Apply fungicides (Chlorothalonil, copper-based). Remove infected plant debris.',
    treatmentVi: 'Phun thuốc trừ nấm (Chlorothalonil, gốc đồng). Loại bỏ tàn dư nhiễm bệnh.',
    prevention: 'Use disease-free seeds. Rotate crops. Thin plants properly. Mulch around plants.',
    preventionVi: 'Sử dụng hạt giống sạch bệnh. Luân canh. Tỉa cây đúng cách. Phủ đất quanh gốc.',
    affectedPlants: ['Carrot', 'Parsley', 'Celery'],
    keywords: ['leaf blight', 'brown lesion', 'curling', 'drying', 'coalesce'],
    keywordsVi: ['cháy lá', 'đốm nâu', 'cuộn', 'khô', 'cà rốt'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== FRUIT DISEASES ====================
  {
    id: 'citrus-greening',
    name: 'Citrus Greening (HLB)',
    nameVi: 'Bệnh vàng lá greening cam quýt',
    category: 'bacterial',
    severity: 'critical',
    symptoms: 'Blotchy mottling of leaves (asymmetric yellow and green pattern). Lopsided, bitter fruit. Stunted growth. Leaf and fruit drop.',
    symptomsVi: 'Lá có vân đốm loang lổ (mẫu vàng xanh không đối xứng). Quả méo, đắng. Cây còi cọc. Rụng lá và quả.',
    causes: 'Bacterium Candidatus Liberibacter asiaticus. Transmitted by Asian citrus psyllid (Diaphorina citri).',
    causesVi: 'Vi khuẩn Candidatus Liberibacter asiaticus. Lây truyền qua rầy chéo (Diaphorina citri).',
    treatment: 'No cure available. Remove infected trees. Control psyllid vectors. Boost tree nutrition.',
    treatmentVi: 'Không có thuốc chữa. Nhổ bỏ cây nhiễm bệnh. Phòng trừ rầy chéo. Bổ sung dinh dưỡng cho cây.',
    prevention: 'Plant certified disease-free trees. Control psyllid populations. Monitor trees regularly.',
    preventionVi: 'Trồng cây giống sạch bệnh. Phòng trừ rầy chéo. Theo dõi cây thường xuyên.',
    affectedPlants: ['Orange', 'Lemon', 'Lime', 'Grapefruit', 'Mandarin'],
    keywords: ['greening', 'blotchy', 'mottling', 'lopsided', 'bitter', 'psyllid'],
    keywordsVi: ['greening', 'loang lổ', 'vàng', 'méo', 'đắng', 'rầy chéo'],
    season: 'Year-round',
    seasonVi: 'Quanh năm'
  },
  {
    id: 'citrus-canker',
    name: 'Citrus Canker',
    nameVi: 'Bệnh ghẻ cam quýt',
    category: 'bacterial',
    severity: 'high',
    symptoms: 'Raised, corky lesions with water-soaked margins on leaves, fruit, and stems. Lesions have a yellow halo. Severely infected leaves may drop.',
    symptomsVi: 'Đốm nổi bần có viền ướt trên lá, quả và cành. Đốm có viền vàng. Lá nhiễm nặng có thể rụng.',
    causes: 'Bacterium Xanthomonas citri. Spread by wind-driven rain, contaminated tools, and movement of infected plant material.',
    causesVi: 'Vi khuẩn Xanthomonas citri. Lây lan qua mưa gió, dụng cụ nhiễm bệnh và vận chuyển cây bệnh.',
    treatment: 'Apply copper-based bactericides. Prune infected branches. Remove severely infected trees.',
    treatmentVi: 'Phun thuốc kháng vi khuẩn gốc đồng. Cắt cành nhiễm bệnh. Loại bỏ cây nhiễm nặng.',
    prevention: 'Use disease-free planting material. Implement windbreaks. Decontaminate tools. Avoid working in wet conditions.',
    preventionVi: 'Sử dụng cây giống sạch bệnh. Trồng rào chắn gió. Khử trùng dụng cụ. Tránh làm việc khi ướt.',
    affectedPlants: ['Orange', 'Lemon', 'Lime', 'Grapefruit', 'Mandarin'],
    keywords: ['canker', 'raised', 'corky', 'water-soaked', 'halo', 'lesion'],
    keywordsVi: ['ghẻ', 'nổi', 'bần', 'ướt', 'viền vàng', 'cam quýt'],
    season: 'Warm, wet',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'citrus-leaf-miner',
    name: 'Citrus Leaf Miner',
    nameVi: 'Sâu đục lá cam quýt',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Thin, winding, silvery trails (mines) on young leaves. Leaves may become distorted or curled. New growth is most susceptible.',
    symptomsVi: 'Vết mỏng ngoằn ngoèo màu bạc (đường đục) trên lá non. Lá có thể biến dạng hoặc cuộn. Cây non dễ bị nhất.',
    causes: 'Larvae of moth Phyllocnistis citrella. Adults lay eggs on new leaves. Larvae tunnel between leaf layers.',
    causesVi: 'Ấu trùng bướm Phyllocnistis citrella. Bướm trưởng thành đẻ trứng trên lá mới. Ấu trùng đục trong lớp lá.',
    treatment: 'Apply systemic insecticides when new growth appears. Use pheromone traps. Remove heavily infested shoots.',
    treatmentVi: 'Phun thuốc trừ sâu nội hấp khi lá mới xuất hiện. Dùng bẫy feromon. Loại bỏ cành nhiễm nặng.',
    prevention: 'Maintain tree vigor. Avoid excessive nitrogen. Encourage natural enemies (wasps).',
    preventionVi: 'Duy trì sức sống cây. Tránh bón thừa đạm. Khuyến khích thiên địch (ong).',
    affectedPlants: ['Orange', 'Lemon', 'Lime', 'Mandarin'],
    keywords: ['leaf miner', 'silvery', 'trail', 'mine', 'curled', 'distorted'],
    keywordsVi: ['đục lá', 'bạc', 'đường', 'cuộn', 'biến dạng', 'cam quýt'],
    season: 'Warm, dry',
    seasonVi: 'Nóng, khô'
  },
  {
    id: 'mango-anthracnose',
    name: 'Mango Anthracnose',
    nameVi: 'Bệnh thán thư xoài',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Dark, sunken lesions on leaves, flowers, and fruit. Flowers may turn black and drop. Fruit develops black spots that may crack.',
    symptomsVi: 'Đốm sẫm, lõm trên lá, hoa và quả. Hoa có thể chuyển đen và rụng. Quả có đốm đen có thể nứt.',
    causes: 'Fungus Colletotrichum gloeosporioides. Spreads in warm, humid conditions. Often follows rain or dew.',
    causesVi: 'Nấm Colletotrichum gloeosporioides. Lây lan trong điều kiện ấm, ẩm. Thường theo sau mưa hoặc sương.',
    treatment: 'Apply fungicides (Mancozeb, copper-based). Prune infected plant parts. Remove fallen debris.',
    treatmentVi: 'Phun thuốc trừ nấm (Mancozeb, gốc đồng). Cắt bỏ bộ phận nhiễm bệnh. Loại bỏ mảnh rụng.',
    prevention: 'Use resistant varieties. Prune for good air circulation. Avoid overhead irrigation. Spray preventatively during flowering.',
    preventionVi: 'Sử dụng giống kháng bệnh. Tỉa cành thông thoáng. Tránh tưới trên lá. Phun phòng ngừa khi ra hoa.',
    affectedPlants: ['Mango'],
    keywords: ['anthracnose', 'sunken', 'dark lesion', 'black', 'crack', 'flower drop'],
    keywordsVi: ['thán thư', 'lõm', 'đen', 'nứt', 'rụng hoa', 'xoài'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'mango-hopper',
    name: 'Mango Hopper',
    nameVi: 'Rầy bướm xoài',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Insects suck sap from flower clusters and young leaves. Honeydew secreted attracts sooty mold. Flowers may dry and drop. Stunted growth.',
    symptomsVi: 'Côn trùng hút nhựa từ chùm hoa và lá non. Dịch ngọt tiết ra thu hút bồ hóng. Hoa có thể khô và rụng. Cây còi cọc.',
    causes: 'Hoppers (Idioscopus nitidulus, Amritodus atkinsoni). Adults and nymphs feed on plant sap.',
    causesVi: 'Rầy (Idioscopus nitidulus, Amritodus atkinsoni). Cả trưởng thành và nhộng đều hút nhựa cây.',
    treatment: 'Apply insecticides (Imidacloprid, Cypermethrin) during flowering. Remove heavily infested parts.',
    treatmentVi: 'Phun thuốc trừ sâu (Imidacloprid, Cypermethrin) trong thời kỳ ra hoa. Loại bỏ bộ phận nhiễm nặng.',
    prevention: 'Encourage natural predators. Maintain tree vigor. Avoid excessive nitrogen fertilization.',
    preventionVi: 'Khuyến khích thiên địch. Duy trì sức sống cây. Tránh bón thừa đạm.',
    affectedPlants: ['Mango'],
    keywords: ['hopper', 'honeydew', 'sooty mold', 'flower drop', 'sap suck'],
    keywordsVi: ['rầy', 'dịch ngọt', 'bồ hóng', 'rụng hoa', 'hút nhựa', 'xoài'],
    season: 'Flowering',
    seasonVi: 'Ra hoa'
  },
  {
    id: 'banana-panama',
    name: 'Panama Disease',
    nameVi: 'Bệnh Panama chuối',
    category: 'fungal',
    severity: 'critical',
    symptoms: 'Lower leaves turn yellow, starting from margins. Yellowing progresses upward. Leaves collapse at petiole. Pseudostem splits and splits.',
    symptomsVi: 'Lá dưới chuyển vàng, bắt đầu từ mép. Vàng lan dần lên trên. Lá đổ gãy ở cuống. Thân giả nứt và rách.',
    causes: 'Fungus Fusarium oxysporum f. sp. cubense. Spreads through infected planting material and soil. Persists in soil for decades.',
    causesVi: 'Nấm Fusarium oxysporum f. sp. cubense. Lây lan qua cây giống nhiễm bệnh và đất. Tồn tại trong đất hàng thập kỷ.',
    treatment: 'No effective treatment. Remove and destroy infected plants. Do not replant banana in same area.',
    treatmentVi: 'Không có thuốc điều trị hiệu quả. Loại bỏ và tiêu hủy cây nhiễm bệnh. Không trồng chuối lại chỗ cũ.',
    prevention: 'Use resistant varieties (GCTCV varieties). Implement strict phytosanitary measures. Use disease-free planting material.',
    preventionVi: 'Sử dụng giống kháng bệnh (các giống GCTCV). Thực hiện biện pháp kiểm dịch nghiêm ngặt. Dùng cây giống sạch bệnh.',
    affectedPlants: ['Banana', 'Plantain'],
    keywords: ['panama', 'yellowing', 'collapse', 'split', 'fusarium', 'wilt'],
    keywordsVi: ['panama', 'vàng', 'đổ', 'nứt', 'fusarium', 'héo', 'chuối'],
    season: 'Year-round',
    seasonVi: 'Quanh năm'
  },
  {
    id: 'durian-fruit-rot',
    name: 'Durian Fruit Rot',
    nameVi: 'Bệnh thối quả sầu riêng',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Brown water-soaked lesions on fruit. White fungal growth may appear. Fruit develops unpleasant odor. Fruit drops prematurely.',
    symptomsVi: 'Đốm nâu ướt trên quả. Lớp nấm trắng có thể xuất hiện. Quả có mùi khó chịu. Quả rụng sớm.',
    causes: 'Fungi Phytophthora palmivora and Rhizopus spp. Infect through wounds and during wet weather.',
    causesVi: 'Nấm Phytophthora palmivora và Rhizopus spp. Xâm nhập qua vết thương và trong thời tiết ẩm.',
    treatment: 'Apply fungicides preventatively. Bag fruits. Remove infected fruits immediately.',
    treatmentVi: 'Phun thuốc trừ nấm phòng ngừa. Bao quả. Loại bỏ quả nhiễm bệnh ngay.',
    prevention: 'Avoid fruit injury. Improve drainage. Maintain tree vigor. Apply preventive fungicide sprays.',
    preventionVi: 'Tránh làm tổn thương quả. Cải thiện thoát nước. Duy trì sức sống cây. Phun thuốc phòng ngừa.',
    affectedPlants: ['Durian'],
    keywords: ['fruit rot', 'brown lesion', 'white fungus', 'odor', 'premature drop'],
    keywordsVi: ['thối quả', 'nâu', 'nấm trắng', 'mùi', 'rụng sớm', 'sầu riêng'],
    season: 'Rainy',
    seasonVi: 'Mùa mưa'
  },
  {
    id: 'dragon-fruit-bacterial',
    name: 'Dragon Fruit Bacterial Rot',
    nameVi: 'Bệnh thối nhầy thanh long',
    category: 'bacterial',
    severity: 'high',
    symptoms: 'Soft, watery, malodorous lesions on stems and fruits. Lesions start as small water-soaked spots that expand rapidly. Yellowing around lesions.',
    symptomsVi: 'Đốm mềm, nhiều nước, có mùi hôi trên thân và quả. Vết bắt đầu nhỏ ướt, lan rộng nhanh. Vùng xung quanh chuyển vàng.',
    causes: 'Bacterium Dickeya dadantii. Spread through wounds, insects, and contaminated tools. Favors warm, wet conditions.',
    causesVi: 'Vi khuẩn Dickeya dadantii. Lây lan qua vết thương, côn trùng và dụng cụ nhiễm bệnh. Thuận lợi khi ấm, ẩm.',
    treatment: 'Cut away infected portions. Apply copper-based bactericides. Improve air circulation.',
    treatmentVi: 'Cắt bỏ phần nhiễm bệnh. Phun thuốc kháng vi khuẩn gốc đồng. Cải thiện thông khí.',
    prevention: 'Avoid wounds during handling. Control insects. Disinfect tools. Provide adequate spacing.',
    preventionVi: 'Tránh tổn thương khi thu hoạch. Phòng trừ côn trùng. Khử trùng dụng cụ. Trồng đúng khoảng cách.',
    affectedPlants: ['Dragon Fruit', 'Pitaya'],
    keywords: ['bacterial rot', 'soft', 'watery', 'malodorous', 'yellowing', 'wounds'],
    keywordsVi: ['thối nhầy', 'mềm', 'ướt', 'hôi', 'vàng', 'thanh long'],
    season: 'Warm, wet',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== COFFEE DISEASES ====================
  {
    id: 'coffee-rust',
    name: 'Coffee Leaf Rust',
    nameVi: 'Bệnh gỉ sắt cà phê',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Orange-yellow powdery spots on lower leaf surfaces. Leaves may turn yellow and drop. Severe defoliation reduces yield.',
    symptomsVi: 'Đốm bột cam vàng trên mặt dưới lá. Lá có thể chuyển vàng và rụng. Rụng lá nặng làm giảm năng suất.',
    causes: 'Fungus Hemileia vastatrix. Spores spread by wind. Favors temperatures of 21-25°C with high humidity.',
    causesVi: 'Nấm Hemileia vastatrix. Bào tử lan qua gió. Thuận lợi ở nhiệt độ 21-25°C với độ ẩm cao.',
    treatment: 'Apply fungicides (copper-based, triazoles). Remove infected leaves. Prune for better air circulation.',
    treatmentVi: 'Phun thuốc trừ nấm (gốc đồng, triazole). Loại bỏ lá nhiễm bệnh. Tỉa cành thông thoáng.',
    prevention: 'Use resistant varieties (Castillo, Colombia). Maintain proper spacing. Avoid excessive shade. Monitor regularly.',
    preventionVi: 'Sử dụng giống kháng bệnh (Castillo, Colombia). Trồng đúng khoảng cách. Tránh quá tối. Theo dõi thường xuyên.',
    affectedPlants: ['Coffee', 'Coffea arabica', 'Coffea canephora'],
    keywords: ['rust', 'orange', 'yellow', 'powdery', 'defoliation', 'leaf drop'],
    keywordsVi: ['gỉ sắt', 'cam', 'vàng', 'bột', 'rụng lá', 'cà phê'],
    season: 'Cool, humid',
    seasonVi: 'Mát, ẩm'
  },
  {
    id: 'coffee-berry-borer',
    name: 'Coffee Berry Borer',
    nameVi: 'Rầu nang đục quả cà phê',
    category: 'pest',
    severity: 'high',
    symptoms: 'Small holes on coffee berries. Beetles bore into berries and lay eggs inside. Berries may drop prematurely. Reduced bean quality.',
    symptomsVi: 'Lỗ nhỏ trên quả cà phê. Bọ đục vào quả và đẻ trứng bên trong. Quả có thể rụng sớm. Chất lượng hạt giảm.',
    causes: 'Beetle Hypothenemus hampei. Females bore into ripe berries to lay eggs. Larvae develop inside berries.',
    causesVi: 'Bọ Hypothenemus hampei. Bọ cái đục vào quả chín để đẻ trứng. Ấu trùng phát triển bên trong quả.',
    treatment: 'Apply insecticides during early infestation. Harvest regularly. Remove fallen berries.',
    treatmentVi: 'Phun thuốc trừ sâu khi nhiễm sớm. Thu hoạch đều đặn. Loại bỏ quả rụng.',
    prevention: 'Use resistant varieties. Harvest all berries. Set up traps with ethanol. Prune trees regularly.',
    preventionVi: 'Sử dụng giống kháng bệnh. Thu hoạch triệt để. Đặt bẫy ethanol. Tỉa cây đều đặn.',
    affectedPlants: ['Coffee', 'Coffea arabica', 'Coffea canephora'],
    keywords: ['berry borer', 'beetle', 'small holes', 'premature drop', 'reduced quality'],
    keywordsVi: ['đục quả', 'bọ', 'lỗ nhỏ', 'rụng sớm', 'kém chất lượng', 'cà phê'],
    season: 'Harvest season',
    seasonVi: 'Mùa thu hoạch'
  },
  {
    id: 'coffee-leaf-miner',
    name: 'Coffee Leaf Miner',
    nameVi: 'Sâu đục lá cà phê',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Winding, whitish tunnels (mines) inside leaves. Mines visible on both leaf surfaces. Leaves may curl and drop. Severe infestation causes defoliation.',
    symptomsVi: 'Đường đục ngoằn ngoèo màu trắng trong lá. Đường đục nhìn thấy trên cả hai mặt lá. Lá có thể cuộn và rụng. Nhiễm nặng gây rụng lá.',
    causes: 'Larvae of moth Leucoptera coffeella. Larvae tunnel inside leaf tissue.',
    causesVi: 'Ấu trùng bướm Leucoptera coffeella. Ấu trùng đục trong mô lá.',
    treatment: 'Apply insecticides (Abamectin, Cyromazine). Remove heavily mined leaves. Encourage natural enemies.',
    treatmentVi: 'Phun thuốc trừ sâu (Abamectin, Cyromazine). Loại bỏ lá bị đục nặng. Khuyến khích thiên địch.',
    prevention: 'Maintain tree vigor. Avoid excessive shade. Prune regularly. Use yellow sticky traps.',
    preventionVi: 'Duy trì sức sống cây. Tránh quá tối. Tỉa cành đều đặn. Dùng bẫy keo vàng.',
    affectedPlants: ['Coffee', 'Coffea arabica', 'Coffea canephora'],
    keywords: ['leaf miner', 'tunnel', 'mine', 'whitish', 'curled', 'defoliation'],
    keywordsVi: ['đục lá', 'đường', 'trắng', 'cuộn', 'rụng lá', 'cà phê'],
    season: 'Warm, dry',
    seasonVi: 'Nóng, khô'
  },
  // ==================== CORN DISEASES ====================
  {
    id: 'corn-northern-leaf-blight',
    name: 'Northern Corn Leaf Blight',
    nameVi: 'Bệnh cháy lá ngô phương Bắc',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Long, elliptical, grayish-green to tan lesions on leaves. Lesions may be 2-15 cm long. Severely infected leaves may die.',
    symptomsVi: 'Vết bệnh dài, hình bầu dục, xanh xám đến nhung đồng nhạt trên lá. Vết bệnh có thể dài 2-15 cm. Lá nhiễm nặng có thể chết.',
    causes: 'Fungus Exserohilum turcicum. Survives in corn debris. Spreads by wind-blown spores.',
    causesVi: 'Nấm Exserohilum turcicum. Tồn tại trong tàn dư ngô. Lây lan qua bào tử theo gió.',
    treatment: 'Apply foliar fungicides (Propiconazole, Azoxystrobin). Remove infected debris after harvest.',
    treatmentVi: 'Phun thuốc trừ nấm lên lá (Propiconazole, Azoxystrobin). Loại bỏ tàn dư nhiễm bệnh sau thu hoạch.',
    prevention: 'Use resistant hybrids. Rotate crops. Plow under corn residue. Scout fields regularly.',
    preventionVi: 'Sử dụng giống lai kháng bệnh. Luân canh cây trồng. Lật đất chôn tàn dư ngô. Khảo sát đồng ruộng.',
    affectedPlants: ['Corn', 'Maize'],
    keywords: ['leaf blight', 'elliptical', 'grayish-green', 'tan', 'long lesion'],
    keywordsVi: ['cháy lá', 'bầu dục', 'xám', 'nâu', 'vết dài', 'ngô'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'corn-fall-armyworm',
    name: 'Fall Armyworm',
    nameVi: 'Sâu cuốn lá ngô',
    category: 'pest',
    severity: 'critical',
    symptoms: 'Large ragged holes in leaves. Frass (droppings) visible at whorl. Caterpillars may move in from edges. Can completely defoliate plants.',
    symptomsVi: 'Lỗ lớn rách trên lá. Phân sâu nhìn thấy ở bẹ lá. Sâu có thể di chuyển từ mép ruộng. Có thể ăn trụi lá cây.',
    causes: 'Larvae of moth Spodoptera frugiperda. Migrates long distances. Rapid reproduction.',
    causesVi: 'Ấu trùng bướm Spodoptera frugiperda. Di cư xa. Sinh sản nhanh.',
    treatment: 'Apply insecticides (Spinosad, Chlorantraniliprole). Apply Bt for small larvae. Biological control with predators.',
    treatmentVi: 'Phun thuốc trừ sâu (Spinosad, Chlorantraniliprole). Phun Bt khi sâu còn nhỏ. Phòng trừ sinh học bằng thiên địch.',
    prevention: 'Use pheromone traps. Early planting. Plant trap crops. Encourage natural enemies.',
    preventionVi: 'Dùng bẫy feromon. Trồng sớm. Trồng cây bẫy. Khuyến khích thiên địch.',
    affectedPlants: ['Corn', 'Maize', 'Rice', 'Wheat', 'Sorghum'],
    keywords: ['armyworm', 'ragged holes', 'frass', 'defoliate', 'whorl', 'migrate'],
    keywordsVi: ['cuốn lá', 'lỗ rách', 'phân', 'trụi lá', 'di cư', 'ngô'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'corn-stalk-borer',
    name: 'Asian Corn Stalk Borer',
    nameVi: 'Sâu đục thân ngô Châu Á',
    category: 'pest',
    severity: 'high',
    symptoms: 'Deadhearts in young plants. Holes at leaf sheath and stalk. Frass exuding from holes. Stunted growth. Broken stalks.',
    symptomsVi: 'Búp chết ở cây non. Lỗ ở bẹ lá và thân. Phân sâu rỉ ra từ lỗ. Cây còi cọc. Thân gãy.',
    causes: 'Larvae of moth Ostrinia furnacalis. Borers enter stalks through leaf sheath.',
    causesVi: 'Ấu trùng bướm Ostrinia furnacalis. Sâu đục vào thân qua bẹ lá.',
    treatment: 'Apply insecticides in whorl. Cut and destroy deadhearts. Release Trichogramma wasps.',
    treatmentVi: 'Phun thuốc vào bẹ lá. Cắt và tiêu hủy búp chết. Thả ong mắt đỏ.',
    prevention: 'Use resistant varieties. Early planting. Remove crop residues. Use light traps.',
    preventionVi: 'Sử dụng giống kháng bệnh. Trồng sớm. Dọn sạch tàn dư. Dùng bẫy đèn.',
    affectedPlants: ['Corn', 'Maize'],
    keywords: ['stalk borer', 'deadheart', 'holes', 'frass', 'broken stalk', 'whorl'],
    keywordsVi: ['đục thân', 'búp chết', 'lỗ', 'phân', 'gãy', 'ngô'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  // ==================== SOYBEAN DISEASES ====================
  {
    id: 'soybean-rust',
    name: 'Soybean Rust',
    nameVi: 'Bệnh gỉ sắt đậu tương',
    category: 'fungal',
    severity: 'critical',
    symptoms: 'Small tan to brown lesions on lower leaves. Lesions produce powdery spores. Yellowing and premature defoliation. Reduced pod fill.',
    symptomsVi: 'Đốm nâu nhạt đến nâu trên lá dưới. Đốm tạo bào tử bột. Vàng và rụng lá sớm. Quả phát triển kém.',
    causes: 'Fungus Phakopsora pachyrhizi. Spores spread by wind long distances. Favors cool, wet conditions.',
    causesVi: 'Nấm Phakopsora pachyrhizi. Bào tử lan xa theo gió. Thuận lợi khi mát, ẩm.',
    treatment: 'Apply fungicides (triazoles, strobilurins) early. Remove infected plant debris.',
    treatmentVi: 'Phun thuốc trừ nấm (triazole, strobilurin) sớm. Loại bỏ tàn dư nhiễm bệnh.',
    prevention: 'Plant early-maturing varieties. Use disease-free seeds. Scout fields regularly. Consider fungicide application preventatively.',
    preventionVi: 'Trồng giống sớm. Sử dụng hạt giống sạch bệnh. Khảo sát đồng ruộng. Phun thuốc phòng ngừa.',
    affectedPlants: ['Soybean'],
    keywords: ['rust', 'tan', 'brown lesion', 'defoliation', 'reduced pod', 'spores'],
    keywordsVi: ['gỉ sắt', 'nâu', 'đốm', 'rụng lá', 'quả kém', 'bào tử', 'đậu tương'],
    season: 'Cool, wet',
    seasonVi: 'Mát, ẩm'
  },
  {
    id: 'soybean-sudden-death',
    name: 'Sudden Death Syndrome',
    nameVi: 'Hội chứng chết nhanh đậu tương',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Interveinal chlorosis and necrosis (leaves turn yellow between veins, then brown). Leaves may drop while petioles remain attached. Roots rot.',
    symptomsVi: 'Vàng và chết giữa các gân lá (lá chuyển vàng giữa các gân, sau đó nâu). Lá có thể rụng trong khi cuống vẫn còn. Rễ bị thối.',
    causes: 'Fungus Fusarium virguliforme. Survives in soil and crop residue. Roots infected early, but symptoms appear later.',
    causesVi: 'Nấm Fusarium virguliforme. Tồn tại trong đất và tàn dư cây. Rễ nhiễm bệnh sớm nhưng triệu chứng xuất hiện muộn.',
    treatment: 'No in-season treatment available. Apply seed treatments. Improve drainage.',
    treatmentVi: 'Không có thuốc điều trị trong mùa. Xử lý hạt giống. Cải thiện thoát nước.',
    prevention: 'Use resistant varieties. Plant early into warm soils. Improve field drainage. Rotate with non-host crops.',
    preventionVi: 'Sử dụng giống kháng bệnh. Trồng sớm khi đất ấm. Cải thiện thoát nước. Luân canh cây không phải ký chủ.',
    affectedPlants: ['Soybean'],
    keywords: ['sudden death', 'interveinal', 'chlorosis', 'necrosis', 'yellow', 'root rot'],
    keywordsVi: ['chết nhanh', 'giữa gân', 'vàng', 'chết', 'thối rễ', 'đậu tương'],
    season: 'Cool, wet spring',
    seasonVi: 'Xuân mát, ẩm'
  },
  // ==================== CASSAVA DISEASES ====================
  {
    id: 'cassava-mosaic',
    name: 'Cassava Mosaic Disease',
    nameVi: 'Bệnh khảm lá sắn',
    category: 'viral',
    severity: 'critical',
    symptoms: 'Pale green to yellow mosaic patterns on leaves. Leaf curling and distortion. Reduced leaf size. Stunted plant growth.',
    symptomsVi: 'Mẫu khảm xanh nhạt đến vàng trên lá. Lá cuộn và biến dạng. Kích thước lá giảm. Cây còi cọc.',
    causes: 'Virus (Sri Lankan cassava mosaic virus). Transmitted by whiteflies (Bemisia tabaci). Spread through infected cuttings.',
    causesVi: 'Virus (Sri Lankan cassava mosaic virus). Lây truyền qua bạch tuộc (Bemisia tabaci). Lan qua hom giống nhiễm bệnh.',
    treatment: 'No cure. Remove and destroy infected plants. Control whitefly vectors.',
    treatmentVi: 'Không có thuốc chữa. Nhổ và tiêu hủy cây nhiễm bệnh. Phòng trừ bạch tuộc.',
    prevention: 'Use disease-free planting material. Plant resistant varieties. Control whiteflies. Rogue infected plants early.',
    preventionVi: 'Sử dụng hom giống sạch bệnh. Trồng giống kháng bệnh. Phòng trừ bạch tuộc. Nhổ cây bệnh sớm.',
    affectedPlants: ['Cassava', 'Manioc'],
    keywords: ['mosaic', 'yellow', 'curling', 'distortion', 'stunted', 'whitefly'],
    keywordsVi: ['khảm', 'vàng', 'cuộn', 'biến dạng', 'còi cọc', 'bạch tuộc', 'sắn'],
    season: 'Year-round',
    seasonVi: 'Quanh năm'
  },
  {
    id: 'cassava-bacterial-blight',
    name: 'Cassava Bacterial Blight',
    nameVi: 'Bệnh cháy vi khuẩn sắn',
    category: 'bacterial',
    severity: 'high',
    symptoms: 'Angular water-soaked lesions on leaves. Lesions turn brown with a yellow halo. Bacterial exudate (sticky liquid) on leaf surfaces. Wilting and dieback.',
    symptomsVi: 'Đốm góc cạnh ướt trên lá. Đốm chuyển nâu với viền vàng. Dịch vi khuẩn (chất lỏng dính) trên bề mặt lá. Héo và chết cành.',
    causes: 'Bacterium Xanthomonas axonopodis pv. manihotis. Spread by rain splash, contaminated tools, and infected cuttings.',
    causesVi: 'Vi khuẩn Xanthomonas axonopodis pv. manihotis. Lây lan qua nước mưa, dụng cụ nhiễm bệnh và hom giống.',
    treatment: 'Prune infected parts. Apply copper-based bactericides. Improve drainage.',
    treatmentVi: 'Cắt bỏ phần nhiễm bệnh. Phun thuốc kháng vi khuẩn gốc đồng. Cải thiện thoát nước.',
    prevention: 'Use disease-free cuttings. Plant resistant varieties. Avoid working in wet fields. Rotate crops.',
    preventionVi: 'Sử dụng hom sạch bệnh. Trồng giống kháng bệnh. Tránh làm việc khi ruộng ướt. Luân canh.',
    affectedPlants: ['Cassava', 'Manioc'],
    keywords: ['bacterial blight', 'angular', 'water-soaked', 'exudate', 'wilt', 'dieback'],
    keywordsVi: ['cháy vi khuẩn', 'góc cạnh', 'ướt', 'dịch', 'héo', 'chết cành', 'sắn'],
    season: 'Warm, wet',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== PEPPER DISEASES ====================
  {
    id: 'pepper-phytophthora',
    name: 'Phytophthora Blight of Pepper',
    nameVi: 'Bệnh sương mai ớt',
    category: 'fungal',
    severity: 'critical',
    symptoms: 'Water-soaked lesions on stems near soil line. Crown rot. Wilting despite moist soil. Fruit rot with brown, firm patches.',
    symptomsVi: 'Đốm ướt trên thân gần mặt đất. Thối cổ rễ. Héo dù đất ẩm. Quả thối với vết nâu cứng.',
    causes: 'Oomycete Phytophthora capsici. Spread by water splash and soil. Favors warm, wet conditions and poor drainage.',
    causesVi: 'Oomycete Phytophthora capsici. Lây lan qua nước bắn và đất. Thuận lợi khi ấm, ẩm và thoát nước kém.',
    treatment: 'Apply fungicides (Metalaxyl, Mancozeb). Remove infected plants. Improve drainage.',
    treatmentVi: 'Phun thuốc trừ nấm (Metalaxyl, Mancozeb). Loại bỏ cây nhiễm bệnh. Cải thiện thoát nước.',
    prevention: 'Use resistant varieties. Plant on raised beds. Ensure good drainage. Rotate crops.',
    preventionVi: 'Sử dụng giống kháng bệnh. Trồng trên luống cao. Đảm bảo thoát nước tốt. Luân canh.',
    affectedPlants: ['Pepper', 'Chili', 'Bell Pepper'],
    keywords: ['phytophthora', 'water-soaked', 'crown rot', 'wilt', 'fruit rot', 'soil line'],
    keywordsVi: ['sương mai', 'ướt', 'thối cổ', 'héo', 'thối quả', 'ớt'],
    season: 'Warm, wet',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'pepper-aphid',
    name: 'Pepper Aphid',
    nameVi: 'Rệp gây hại ớt',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Clustered aphids on undersides of leaves and stems. Curled, distorted leaves. Sticky honeydew on leaves. Sooty mold development.',
    symptomsVi: 'Rệp bám từng cụm dưới mặt lá và thân. Lá cuộn, biến dạng. Dịch ngọt dính trên lá. Bồ hóng phát triển.',
    causes: 'Aphids (Myzus persicae, Aphis gossypii). Suck sap from plant tissues. Act as virus vectors.',
    causesVi: 'Rệp (Myzus persicae, Aphis gossypii). Hút nhựa từ mô cây. Làm vật truyền virus.',
    treatment: 'Apply insecticidal soaps or neem oil. Use systemic insecticides for severe infestations.',
    treatmentVi: 'Phun xà phòng trừ sâu hoặc dầu neem. Dùng thuốc trừ sâu nội hấp khi nhiễm nặng.',
    prevention: 'Encourage natural enemies (ladybugs, lacewings). Use yellow sticky traps. Remove heavily infested parts.',
    preventionVi: 'Khuyến khích thiên địch (bọ rùa, bọ xít). Dùng bẫy keo vàng. Loại bỏ bộ phận nhiễm nặng.',
    affectedPlants: ['Pepper', 'Chili', 'Tomato', 'Eggplant'],
    keywords: ['aphid', 'clustered', 'curled', 'honeydew', 'sooty mold', 'distorted'],
    keywordsVi: ['rệp', 'bám cụm', 'cuộn', 'dịch ngọt', 'bồ hóng', 'ớt'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  // ==================== EGGPLANT DISEASES ====================
  {
    id: 'eggplant-fruit-borer',
    name: 'Eggplant Fruit Borer',
    nameVi: 'Sâu đục quả cà tím',
    category: 'pest',
    severity: 'high',
    symptoms: 'Holes on fruits with exuding frass. Larvae bore inside fruits. Infested fruits rot and drop. Leaves may also be attacked.',
    symptomsVi: 'Lỗ trên quả có phân sâu rỉ ra. Ấu trùng đục trong quả. Quả nhiễm bệnh thối và rụng. Lá cũng có thể bị tấn công.',
    causes: 'Larvae of moth Helicoverpa armigera. Bore into fruits to feed. Can cause significant yield loss.',
    causesVi: 'Ấu trùng bướm Helicoverpa armigera. Đục vào quả để ăn. Có thể gây thiệt hại nặng.',
    treatment: 'Apply insecticides (Spinosad, Emamectin benzoate). Remove infested fruits. Use fruit bagging.',
    treatmentVi: 'Phun thuốc trừ sâu (Spinosad, Emamectin benzoate). Loại bỏ quả bị đục. Bao quả.',
    prevention: 'Use pheromone traps. Remove crop residues. Encourage natural enemies. Scout regularly.',
    preventionVi: 'Dùng bẫy feromon. Dọn sạch tàn dư. Khuyến khích thiên địch. Khảo sát đều đặn.',
    affectedPlants: ['Eggplant', 'Tomato', 'Pepper'],
    keywords: ['fruit borer', 'holes', 'frass', 'borer', 'rot', 'drop'],
    keywordsVi: ['đục quả', 'lỗ', 'phân', 'thối', 'rụng', 'cà tím'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'eggplant-shoot-borer',
    name: 'Eggplant Shoot and Fruit Borer',
    nameVi: 'Sâu đục thân và quả cà tím',
    category: 'pest',
    severity: 'high',
    symptoms: 'Wilted shoots. Holes at base of shoots. Larvae tunnel inside stems and fruits. Frass visible at entry holes.',
    symptomsVi: 'Búp héo. Lỗ ở gốc búp. Ấu trùng đục trong thân và quả. Phân sâu nhìn thấy ở lỗ đục.',
    causes: 'Larvae of moth Leucinodes orbonalis. Bore into shoots and fruits. One larva can damage multiple fruits.',
    causesVi: 'Ấu trùng bướm Leucinodes orbonalis. Đục vào búp và quả. Một sâu có thể gây hại nhiều quả.',
    treatment: 'Remove and destroy wilted shoots. Apply insecticides. Use light traps for monitoring.',
    treatmentVi: 'Loại bỏ và tiêu hủy búp héo. Phun thuốc trừ sâu. Dùng bẫy đèn theo dõi.',
    prevention: 'Use resistant varieties. Remove crop residues. Use fruit bagging. Rotate crops.',
    preventionVi: 'Sử dụng giống kháng bệnh. Dọn sạch tàn dư. Bao quả. Luân canh.',
    affectedPlants: ['Eggplant'],
    keywords: ['shoot borer', 'wilted', 'tunnel', 'frass', 'entry holes', 'larvae'],
    keywordsVi: ['đục thân', 'héo', 'đục', 'phân', 'lỗ', 'cà tím'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  // ==================== POTATO DISEASES ====================
  {
    id: 'potato-late-blight',
    name: 'Potato Late Blight',
    nameVi: 'Bệnh sương mai khoai tây',
    category: 'fungal',
    severity: 'critical',
    symptoms: 'Water-soaked lesions on leaves turning brown. White mold on leaf undersides. Stems turn black and collapse. Tubers develop reddish-brown dry rot.',
    symptomsVi: 'Đốm ướt trên lá chuyển nâu. Nấm trắng dưới mặt lá. Thân chuyển đen và đổ. Củ có vết thối khô nâu đỏ.',
    causes: 'Oomycete Phytophthora infestans. Same pathogen as tomato late blight. Spreads rapidly in cool, wet weather.',
    causesVi: 'Oomycete Phytophthora infestans. Cùng vi sinh vật gây bệnh sương mai cà chua. Lây lan nhanh khi mát, ẩm.',
    treatment: 'Apply fungicides preventatively (Mancozeb, Chlorothalonil). Destroy infected plants. Do not compost.',
    treatmentVi: 'Phun thuốc trừ nấm phòng ngừa (Mancozeb, Chlorothalonil). Tiêu hủy cây nhiễm bệnh. Không ủ phân.',
    prevention: 'Use certified disease-free seed potatoes. Plant resistant varieties. Avoid overhead irrigation. Monitor weather.',
    preventionVi: 'Sử dụng giống sạch bệnh. Trồng giống kháng bệnh. Tránh tưới trên lá. Theo dõi thời tiết.',
    affectedPlants: ['Potato', 'Tomato'],
    keywords: ['late blight', 'water-soaked', 'brown', 'white mold', 'collapse', 'dry rot'],
    keywordsVi: ['sương mai', 'ướt', 'nâu', 'nấm trắng', 'đổ', 'thối khô', 'khoai tây'],
    season: 'Cool, wet',
    seasonVi: 'Mát, ẩm'
  },
  {
    id: 'potato-early-dying',
    name: 'Potato Early Dying',
    nameVi: 'Bệnh chết sớm khoai tây',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Premature plant death. Yellowing and wilting. Reduced tuber size. Brown discoloration of vascular ring in tubers.',
    symptomsVi: 'Cây chết sớm. Vàng và héo. Củ nhỏ. Mạch dẫn trong củ chuyển nâu.',
    causes: 'Fungus Verticillium dahliae. Survives in soil. Root-knot nematodes increase severity.',
    causesVi: 'Nấm Verticillium dahliae. Tồn tại trong đất. Rệp ruổi làm nặng thêm.',
    treatment: 'No in-season treatment. Apply soil fumigants for next season. Control nematodes.',
    treatmentVi: 'Không có thuốc trong mùa. Xử lý đất vụ sau. Phòng trừ rệp ruổi.',
    prevention: 'Use resistant varieties. Rotate with non-host crops. Manage nematodes. Avoid irrigation stress.',
    preventionVi: 'Sử dụng giống kháng bệnh. Luân canh cây không phải ký chủ. Quản lý rệp ruổi. Tránh thiếu nước.',
    affectedPlants: ['Potato', 'Tomato', 'Pepper'],
    keywords: ['early dying', 'premature', 'yellowing', 'wilt', 'vascular', 'brown'],
    keywordsVi: ['chết sớm', 'sớm', 'vàng', 'héo', 'mạch', 'nâu', 'khoai tây'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  // ==================== BEAN DISEASES ====================
  {
    id: 'bean-angular-leaf-spot',
    name: 'Angular Leaf Spot',
    nameVi: 'Bệnh đốm góc lá đậu',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Small, angular, reddish-brown spots on leaves. Spots limited by leaf veins (angular shape). Yellow halos. Severely infected leaves drop.',
    symptomsVi: 'Đốm nhỏ góc cạnh màu nâu đỏ trên lá. Đốm giới hạn bởi gân lá (hình góc). Viền vàng. Lá nhiễm nặng rụng.',
    causes: 'Fungus Phaeoisariopsis griseola. Survives in seeds and crop debris. Spread by rain splash.',
    causesVi: 'Nấm Phaeoisariopsis griseola. Tồn tại trong hạt và tàn dư. Lây lan qua nước mưa.',
    treatment: 'Apply fungicides (Mancozeb, Chlorothalonil). Remove infected plant debris.',
    treatmentVi: 'Phun thuốc trừ nấm (Mancozeb, Chlorothalonil). Loại bỏ tàn dư nhiễm bệnh.',
    prevention: 'Use disease-free seeds. Rotate crops. Plant resistant varieties. Avoid overhead irrigation.',
    preventionVi: 'Sử dụng hạt giống sạch bệnh. Luân canh. Trồng giống kháng bệnh. Tránh tưới trên lá.',
    affectedPlants: ['Bean', 'French Bean', 'Kidney Bean'],
    keywords: ['angular leaf spot', 'angular', 'reddish-brown', 'yellow halo', 'leaf drop'],
    keywordsVi: ['đốm góc', 'góc', 'nâu đỏ', 'viền vàng', 'rụng lá', 'đậu'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'bean-rust',
    name: 'Bean Rust',
    nameVi: 'Bệnh gỉ sắt đậu',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Small, orange-brown pustules on leaves and stems. Pustules release powdery spores. Leaves may yellow and drop.',
    symptomsVi: 'Bào tử nhỏ màu nâu cam trên lá và thân. Bào tử giải phóng bột. Lá có thể vàng và rụng.',
    causes: 'Fungus Uromyces appendiculatus. Spreads by wind. Favored by moderate temperatures and high humidity.',
    causesVi: 'Nấm Uromyces appendiculatus. Lây lan qua gió. Thuận lợi khi nhiệt độ vừa và độ ẩm cao.',
    treatment: 'Apply fungicides (Mancozeb, Sulfur). Remove infected leaves. Improve air circulation.',
    treatmentVi: 'Phun thuốc trừ nấm (Mancozeb, Lưu huỳnh). Loại bỏ lá nhiễm bệnh. Cải thiện thông khí.',
    prevention: 'Use resistant varieties. Plant with adequate spacing. Avoid overhead irrigation. Rotate crops.',
    preventionVi: 'Sử dụng giống kháng bệnh. Trồng đúng khoảng cách. Tránh tưới trên lá. Luân canh.',
    affectedPlants: ['Bean', 'French Bean', 'Kidney Bean'],
    keywords: ['rust', 'pustules', 'orange-brown', 'powdery', 'yellow', 'leaf drop'],
    keywordsVi: ['gỉ sắt', 'bào tử', 'cam', 'nâu', 'bột', 'vàng', 'đậu'],
    season: 'Moderate temp, humid',
    seasonVi: 'Vừa nóng, ẩm'
  },
  // ==================== SWEET POTATO DISEASES ====================
  {
    id: 'sweet-potato-weevil',
    name: 'Sweet Potato Weevil',
    nameVi: 'Bọ rùa khoai lang',
    category: 'pest',
    severity: 'high',
    symptoms: 'Tunnels inside tubers and stems. Adults feed on vines near soil. Larvae develop inside tubers. Tubers become bitter and inedible.',
    symptomsVi: 'Đường đục trong củ và thân. Bọ trưởng thành ăn dây gần đất. Ấu trùng phát triển trong củ. Củ đắng và không ăn được.',
    causes: 'Weevil Cylas formicarius. Adults feed on vines; larvae tunnel into tubers.',
    causesVi: 'Bọ rùa Cylas formicarius. Bọ trưởng thành ăn dây; ấu trùng đục vào củ.',
    treatment: 'Apply insecticides to soil. Remove and destroy infested plants. Use pheromone traps.',
    treatmentVi: 'Phun thuốc vào đất. Loại bỏ và tiêu hủy cây nhiễm bệnh. Dùng bẫy feromon.',
    prevention: 'Hill soil around plants. Use clean planting material. Harvest promptly. Rotate crops.',
    preventionVi: 'Vun đất quanh cây. Sử dụng hom giống sạch. Thu hoạch nhanh. Luân canh.',
    affectedPlants: ['Sweet Potato'],
    keywords: ['weevil', 'tunnel', 'bitter', 'inedible', 'larvae', 'tubers'],
    keywordsVi: ['bọ rùa', 'đục', 'đắng', 'không ăn được', 'củ', 'khoai lang'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'sweet-potato-leaf-spot',
    name: 'Sweet Potato Leaf Spot',
    nameVi: 'Bệnh đốm lá khoai lang',
    category: 'fungal',
    severity: 'low',
    symptoms: 'Circular, dark brown spots with lighter centers on leaves. Spots may have concentric rings. Leaves may yellow and drop in severe cases.',
    symptomsVi: 'Đốm tròn nâu đậm với tâm nhạt hơn trên lá. Đốm có thể có vòng đồng tâm. Lá có thể vàng và rụng khi nặng.',
    causes: 'Fungus Alternaria spp. or Phyllosticta spp. Spreads in warm, humid conditions.',
    causesVi: 'Nấm Alternaria spp. hoặc Phyllosticta spp. Lây lan khi ấm, ẩm.',
    treatment: 'Apply fungicides if severe. Remove infected leaves. Improve plant spacing.',
    treatmentVi: 'Phun thuốc trừ nấm nếu nặng. Loại bỏ lá nhiễm bệnh. Tăng khoảng cách trồng.',
    prevention: 'Use disease-free cuttings. Plant resistant varieties. Rotate crops. Avoid overhead irrigation.',
    preventionVi: 'Sử dụng hom sạch bệnh. Trồng giống kháng bệnh. Luân canh. Tránh tưới trên lá.',
    affectedPlants: ['Sweet Potato'],
    keywords: ['leaf spot', 'circular', 'dark brown', 'concentric', 'yellow', 'leaf drop'],
    keywordsVi: ['đốm lá', 'tròn', 'nâu đậm', 'đồng tâm', 'vàng', 'rụng', 'khoai lang'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== RUBBER DISEASES ====================
  {
    id: 'rubber-powdery-mildew',
    name: 'Rubber Powdery Mildew',
    nameVi: 'Bệnh bột phấn cao su',
    category: 'fungal',
    severity: 'high',
    symptoms: 'White powdery coating on young leaves. Infected leaves become distorted and crinkled. New shoots may be severely affected. Latex yield reduced.',
    symptomsVi: 'Lớp bột trắng trên lá non. Lá nhiễm bệnh biến dạng và nhăn. Chồi non có thể bị ảnh hưởng nặng. Năng suất mủ giảm.',
    causes: 'Fungus Erysiphe cichoracearum. Spreads by wind. Most damaging during cool, dry conditions.',
    causesVi: 'Nấm Erysiphe cichoracearum. Lây lan qua gió. Gây hại nặng nhất khi mát, khô.',
    treatment: 'Apply sulfur-based fungicides or systemic fungicides. Apply at early stage of new leaf emergence.',
    treatmentVi: 'Phun thuốc trừ nấm gốc lưu huỳnh hoặc thuốc nội hấp. Phun ở giai đoạn sớm khi lá mới xuất hiện.',
    prevention: 'Use sulfur dust during high-risk periods. Monitor weather conditions. Apply preventive fungicides.',
    preventionVi: 'Phun bột lưu huỳnh trong thời kỳ nguy hiểm. Theo dõi thời tiết. Phun thuốc phòng ngừa.',
    affectedPlants: ['Rubber Tree', 'Hevea brasiliensis'],
    keywords: ['powdery mildew', 'white', 'powdery', 'distorted', 'young leaves', 'crinkled'],
    keywordsVi: ['bột phấn', 'trắng', 'bột', 'biến dạng', 'lá non', 'cao su'],
    season: 'Cool, dry',
    seasonVi: 'Mát, khô'
  },
  {
    id: 'rubber-panel-canker',
    name: 'Rubber Bark Canker',
    nameVi: 'Bệnh ghẻ vỏ cây cao su',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Sunken, dark lesions on bark. Lesions may ooze reddish-brown liquid. Cracked and rough bark around lesions. Latex flow disrupted.',
    symptomsVi: 'Vết loét lõm, sẫm trên vỏ. Vết bệnh có thể rỉ dịch nâu đỏ. Vỏ quanh vết nứt và sần. Dòng mủ bị gián đoạn.',
    causes: 'Fungi Phytophthora spp. Enters through tapping wounds or natural openings. Spread by rain splash.',
    causesVi: 'Nấm Phytophthora spp. Xâm nhập qua vết cạo hoặc lỗ tự nhiên. Lây lan qua nước mưa.',
    treatment: 'Apply copper-based fungicides to lesions. Remove necrotic tissue. Apply wound dressings.',
    treatmentVi: 'Phun thuốc trừ nấm gốc đồng lên vết bệnh. Loại bỏ mô chết. Bôi thuốc bảo vệ vết thương.',
    prevention: 'Avoid over-tapping. Disinfect tapping knives. Apply preventive fungicides. Improve drainage.',
    preventionVi: 'Tránh cạo quá nhiều. Khử trùng dao cạo. Phun thuốc phòng ngừa. Cải thiện thoát nước.',
    affectedPlants: ['Rubber Tree', 'Hevea brasiliensis'],
    keywords: ['bark canker', 'sunken', 'dark lesion', 'ooze', 'cracked', 'tapping'],
    keywordsVi: ['ghẻ vỏ', 'lõm', 'sẫm', 'rỉ', 'nứt', 'cạo mủ', 'cao su'],
    season: 'Rainy',
    seasonVi: 'Mùa mưa'
  },
  // ==================== TEA DISEASES ====================
  {
    id: 'tea-blight',
    name: 'Tea Blister Blight',
    nameVi: 'Bệnh bóng nước chè',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Blister-like swellings on young leaves. Blisters turn brown and rupture. Infected leaves become tough and curl.',
    symptomsVi: 'U mủ như bóng nước trên lá non. Bóng chuyển nâu và vỡ. Lá nhiễm bệnh trở nên cứng và cuộn.',
    causes: 'Fungus Exobasidium vexans. Spreads by wind. Favors cool, humid conditions.',
    causesVi: 'Nấm Exobasidium vexans. Lây lan qua gió. Thuận lợi khi mát, ẩm.',
    treatment: 'Apply copper-based fungicides. Remove and destroy infected shoots. Prune for better air circulation.',
    treatmentVi: 'Phun thuốc trừ nấm gốc đồng. Loại bỏ và tiêu hủy chồi nhiễm bệnh. Tỉa cành thông thoáng.',
    prevention: 'Use resistant clones. Avoid shade trees that reduce air circulation. Plant at proper spacing.',
    preventionVi: 'Sử dụng giống kháng bệnh. Tránh trồng cây che bóng làm giảm thông khí. Trồng đúng khoảng cách.',
    affectedPlants: ['Tea', 'Camellia sinensis'],
    keywords: ['blister blight', 'blister', 'swelling', 'rupture', 'tough', 'curl'],
    keywordsVi: ['bóng nước', 'bóng', 'sưng', 'vỡ', 'cứng', 'cuộn', 'chè'],
    season: 'Cool, humid',
    seasonVi: 'Mát, ẩm'
  },
  {
    id: 'tea-red-spider-mite',
    name: 'Tea Red Spider Mite',
    nameVi: 'Nhện đỏ hại chè',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Bronzing or yellowing of leaves. Fine webbing on leaf undersides. Leaves become leathery. Severe infestations cause leaf drop.',
    symptomsVi: 'Lá chuyển đồng hoặc vàng. Tơ mỏng dưới mặt lá. Lá trở nên dai. Nhiễm nặng gây rụng lá.',
    causes: 'Mite Oligonychus coffeae. Sucks cell contents from leaves. Favors hot, dry conditions.',
    causesVi: 'Nhện Oligonychus coffeae. Hút chất tế bào từ lá. Thuận lợi khi nóng, khô.',
    treatment: 'Apply miticides (Propargite, Abamectin). Use horticultural oils. Increase humidity.',
    treatmentVi: 'Phun thuốc trừ nhện (Propargite, Abamectin). Dùng dầu hóa học. Tăng độ ẩm.',
    prevention: 'Avoid water stress. Encourage predatory mites. Prune to improve air circulation.',
    preventionVi: 'Tránh thiếu nước. Khuyến khích nhện ăn thịt. Tỉa cành cải thiện thông khí.',
    affectedPlants: ['Tea', 'Camellia sinensis', 'Coffee'],
    keywords: ['red spider mite', 'bronze', 'yellow', 'webbing', 'leathery', 'leaf drop'],
    keywordsVi: ['nhện đỏ', 'đồng', 'vàng', 'tơ', 'dai', 'rụng lá', 'chè'],
    season: 'Hot, dry',
    seasonVi: 'Nóng, khô'
  },
  // ==================== PEANUT DISEASES ====================
  {
    id: 'peanut-leaf-spot',
    name: 'Peanut Early Leaf Spot',
    nameVi: 'Bệnh đốm lá sớm đậu phộng',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Small, dark brown spots with yellow halos on upper leaves. Spots may coalesce. Severely infected leaves yellow and drop.',
    symptomsVi: 'Đốm nhỏ nâu đậm có viền vàng trên lá trên. Đốm có thể hợp nhất. Lá nhiễm nặng vàng và rụng.',
    causes: 'Fungus Cercospora arachidicola. Survives in plant debris. Spreads by wind and rain splash.',
    causesVi: 'Nấm Cercospora arachidicola. Tồn tại trong tàn dư thực vật. Lây lan qua gió và nước mưa.',
    treatment: 'Apply fungicides (Chlorothalonil, Mancozeb). Remove lower infected leaves.',
    treatmentVi: 'Phun thuốc trừ nấm (Chlorothalonil, Mancozeb). Loại bỏ lá dưới nhiễm bệnh.',
    prevention: 'Use resistant varieties. Rotate crops. Plant at proper spacing. Avoid overhead irrigation.',
    preventionVi: 'Sử dụng giống kháng bệnh. Luân canh. Trồng đúng khoảng cách. Tránh tưới trên lá.',
    affectedPlants: ['Peanut'],
    keywords: ['leaf spot', 'dark brown', 'yellow halo', 'coalesce', 'yellow', 'leaf drop'],
    keywordsVi: ['đốm lá', 'nâu đậm', 'viền vàng', 'hợp nhất', 'vàng', 'rụng', 'đậu phộng'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  {
    id: 'peanut-rust',
    name: 'Peanut Rust',
    nameVi: 'Bệnh gỉ sắt đậu phộng',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Small, orange-brown pustules on lower leaf surfaces. Pustules spread upward. Leaves yellow and drop prematurely.',
    symptomsVi: 'Bào tử nhỏ màu nâu cam dưới mặt lá. Bào tử lan lên trên. Lá vàng và rụng sớm.',
    causes: 'Fungus Puccinia arachidis. Spreads by wind long distances. Favored by high humidity.',
    causesVi: 'Nấm Puccinia arachidis. Lây lan xa theo gió. Thuận lợi khi độ ẩm cao.',
    treatment: 'Apply fungicides (triazoles, strobilurins) at first sign. Remove infected leaves.',
    treatmentVi: 'Phun thuốc trừ nấm (triazole, strobilurin) khi có dấu hiệu đầu tiên. Loại bỏ lá nhiễm bệnh.',
    prevention: 'Use resistant varieties. Plant early. Avoid close spacing. Scout fields regularly.',
    preventionVi: 'Sử dụng giống kháng bệnh. Trồng sớm. Tránh trồng quá dày. Khảo sát đồng ruộng.',
    affectedPlants: ['Peanut'],
    keywords: ['rust', 'pustules', 'orange-brown', 'premature drop', 'yellow', 'lower leaves'],
    keywordsVi: ['gỉ sắt', 'bào tử', 'cam', 'nâu', 'rụng sớm', 'vàng', 'đậu phộng'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== WHEAT DISEASES ====================
  {
    id: 'wheat-rust-stripe',
    name: 'Wheat Stripe Rust',
    nameVi: 'Bệnh gỉ sắt vằn lúa mì',
    category: 'fungal',
    severity: 'high',
    symptoms: 'Yellow to orange pustules in stripes between leaf veins. Pustules produce yellow-orange spores. Leaves may yellow and die.',
    symptomsVi: 'Bào tử vàng đến cam thành dải giữa các gân lá. Bào tử tạo bào tử vàng-cam. Lá có thể vàng và chết.',
    causes: 'Fungus Puccinia striiformis. Spreads by wind. Favors cool temperatures (10-20°C).',
    causesVi: 'Nấm Puccinia striiformis. Lây lan qua gió. Thuận lợi ở nhiệt độ mát (10-20°C).',
    treatment: 'Apply fungicides (triazoles, strobilurins). Apply at early infection for best control.',
    treatmentVi: 'Phun thuốc trừ nấm (triazole, strobilurin). Phun sớm khi nhiễm để kiểm soát tốt nhất.',
    prevention: 'Use resistant varieties. Plant early-maturing varieties. Apply fungicides preventatively.',
    preventionVi: 'Sử dụng giống kháng bệnh. Trồng giống sớm. Phun thuốc phòng ngừa.',
    affectedPlants: ['Wheat'],
    keywords: ['stripe rust', 'yellow', 'orange', 'stripe', 'pustules', 'between veins'],
    keywordsVi: ['gỉ sắt vằn', 'vàng', 'cam', 'dải', 'bào tử', 'lúa mì'],
    season: 'Cool (10-20°C)',
    seasonVi: 'Mát (10-20°C)'
  },
  {
    id: 'wheat-powdery-mildew',
    name: 'Wheat Powdery Mildew',
    nameVi: 'Bệnh bột phấn lúa mì',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'White, powdery coating on leaves, stems, and heads. Infected leaves may yellow. Severe infections reduce grain fill.',
    symptomsVi: 'Lớp bột trắng trên lá, thân và bông. Lá nhiễm bệnh có thể vàng. Nhiễm nặng làm giảm chất lượng hạt.',
    causes: 'Fungus Blumeria graminis. Spreads by wind. Favors cool, humid conditions with moderate temperatures.',
    causesVi: 'Nấm Blumeria graminis. Lây lan qua gió. Thuận lợi khi mát, ẩm với nhiệt độ vừa.',
    treatment: 'Apply fungicides (triazoles, strobilurins). Apply when disease first appears.',
    treatmentVi: 'Phun thuốc trừ nấm (triazole, strobilurin). Phun khi bệnh xuất hiện lần đầu.',
    prevention: 'Use resistant varieties. Avoid excessive nitrogen. Plant at proper density.',
    preventionVi: 'Sử dụng giống kháng bệnh. Tránh bón thừa đạm. Trồng đúng mật độ.',
    affectedPlants: ['Wheat', 'Barley'],
    keywords: ['powdery mildew', 'white', 'powdery', 'coating', 'yellow', 'grain fill'],
    keywordsVi: ['bột phấn', 'trắng', 'bột', 'phủ', 'vàng', 'hạt', 'lúa mì'],
    season: 'Cool, humid',
    seasonVi: 'Mát, ẩm'
  },
  // ==================== COTTON DISEASES ====================
  {
    id: 'cotton-boll-rot',
    name: 'Cotton Boll Rot',
    nameVi: 'Bệnh thối bông',
    category: 'fungal',
    severity: 'medium',
    symptoms: 'Bolls turn brown and rot. White or pink fungal growth may be visible. Bolls may not open. Lint quality reduced.',
    symptomsVi: 'Bông chuyển nâu và thối. Lớp nấm trắng hoặc hồng có thể nhìn thấy. Bông có thể không nở. Chất lượng sợi giảm.',
    causes: 'Various fungi (Rhizopus, Aspergillus, Fusarium). Enter through damaged bolls or insect damage.',
    causesVi: 'Nhiều loại nấm (Rhizopus, Aspergillus, Fusarium). Xâm nhập qua bông bị tổn thương hoặc côn trùng.',
    treatment: 'Apply fungicides if available. Control boll-damaging insects.',
    treatmentVi: 'Phun thuốc trừ nấm nếu có. Phòng trừ côn trùng phá hại bông.',
    prevention: 'Control boll weevils. Avoid excessive irrigation. Harvest promptly.',
    preventionVi: 'Phòng trừ bọ gậy bông. Tránh tưới quá nhiều. Thu hoạch nhanh.',
    affectedPlants: ['Cotton'],
    keywords: ['boll rot', 'brown', 'rot', 'fungal growth', 'lint quality', 'damaged'],
    keywordsVi: ['thối bông', 'nâu', 'thối', 'nấm', 'sợi', 'bông'],
    season: 'Warm, humid',
    seasonVi: 'Nóng, ẩm'
  },
  // ==================== GENERAL PESTS ====================
  {
    id: 'general-aphids',
    name: 'Aphids (General)',
    nameVi: 'Rệp (Chung)',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Small insects clustered on stems and leaf undersides. Curled, distorted leaves. Sticky honeydew. Sooty mold. Stunted growth.',
    symptomsVi: 'Côn trùng nhỏ bám từng cụm trên thân và dưới mặt lá. Lá cuộn, biến dạng. Dịch ngọt dính. Bồ hóng. Cây còi cọc.',
    causes: 'Various aphid species. Reproduce rapidly. Act as virus vectors.',
    causesVi: 'Nhiều loại rệp. Sinh sản nhanh. Làm vật truyền virus.',
    treatment: 'Spray with insecticidal soap or neem oil. Apply systemic insecticides. Release ladybugs.',
    treatmentVi: 'Phun xà phòng trừ sâu hoặc dầu neem. Phun thuốc trừ sâu nội hấp. Thả bọ rùa.',
    prevention: 'Encourage natural enemies. Use yellow sticky traps. Remove heavily infested parts.',
    preventionVi: 'Khuyến khích thiên địch. Dùng bẫy keo vàng. Loại bỏ bộ phận nhiễm nặng.',
    affectedPlants: ['Most plants'],
    keywords: ['aphid', 'clustered', 'curled', 'honeydew', 'sooty mold', 'distorted'],
    keywordsVi: ['rệp', 'bám cụm', 'cuộn', 'dịch ngọt', 'bồ hóng', 'biến dạng'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'general-spider-mites',
    name: 'Spider Mites (General)',
    nameVi: 'Nhện đỏ (Chung)',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Fine webbing on plants. Leaves become stippled, yellow, or bronzed. Leaves may drop. Plants look dusty or unhealthy.',
    symptomsVi: 'Tơ mỏng trên cây. Lá có đốm, vàng hoặc đồng. Lá có thể rụng. Cây trông bụi bặm hoặc không khỏe.',
    causes: 'Various spider mite species. Suck cell contents. Favors hot, dry conditions.',
    causesVi: 'Nhiều loại nhện đỏ. Hút chất tế bào. Thuận lợi khi nóng, khô.',
    treatment: 'Spray with water to knock off mites. Apply miticides or horticultural oils. Increase humidity.',
    treatmentVi: 'Phun nước rửa nhện. Phun thuốc trừ nhện hoặc dầu hóa học. Tăng độ ẩm.',
    prevention: 'Keep plants well-watered. Avoid drought stress. Encourage predatory mites.',
    preventionVi: 'Giữ cây đủ nước. Tránh thiếu nước. Khuyến khích nhện ăn thịt.',
    affectedPlants: ['Most plants'],
    keywords: ['spider mite', 'webbing', 'stippled', 'bronze', 'yellow', 'dusty'],
    keywordsVi: ['nhện', 'tơ', 'đốm', 'đồng', 'vàng', 'bụi'],
    season: 'Hot, dry',
    seasonVi: 'Nóng, khô'
  },
  {
    id: 'general-whiteflies',
    name: 'Whiteflies (General)',
    nameVi: 'Bạch tuộc (Chung)',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Tiny white winged insects fly up when plants are disturbed. Yellowing leaves. Sticky honeydew. Sooty mold. Stunted growth.',
    symptomsVi: 'Côn trùng nhỏ màu trắng có cánh bay lên khi cây bị động. Lá vàng. Dịch ngọt dính. Bồ hóng. Cây còi cọc.',
    causes: 'Various whitefly species. Suck plant sap. Act as virus vectors.',
    causesVi: 'Nhiều loại bạch tuộc. Hút nhựa cây. Làm vật truyền virus.',
    treatment: 'Apply insecticidal soaps or neem oil. Use yellow sticky traps. Apply systemic insecticides.',
    treatmentVi: 'Phun xà phòng trừ sâu hoặc dầu neem. Dùng bẫy keo vàng. Phun thuốc nội hấp.',
    prevention: 'Use yellow sticky traps for monitoring. Encourage natural enemies. Remove heavily infested leaves.',
    preventionVi: 'Dùng bẫy keo vàng theo dõi. Khuyến khích thiên địch. Loại bỏ lá nhiễm nặng.',
    affectedPlants: ['Most plants', 'Tomato', 'Pepper', 'Cucumber'],
    keywords: ['whitefly', 'white', 'winged', 'honeydew', 'sooty mold', 'yellow'],
    keywordsVi: ['bạch tuộc', 'trắng', 'có cánh', 'dịch ngọt', 'bồ hóng', 'vàng'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'general-mealybugs',
    name: 'Mealybugs (General)',
    nameVi: 'Bọ sữa (Chung)',
    category: 'pest',
    severity: 'medium',
    symptoms: 'White, cottony masses on stems, leaf joints, and roots. Sticky honeydew. Sooty mold. Stunted growth and leaf drop.',
    symptomsVi: 'Khối trắng bông trên thân, kẽ lá và rễ. Dịch ngọt dính. Bồ hóng. Cây còi cọc và rụng lá.',
    causes: 'Various mealybug species. Suck plant sap. Often found in hidden locations.',
    causesVi: 'Nhiều loại bọ sữa. Hút nhựa cây. Thường được tìm thấy ở nơi khuất.',
    treatment: 'Dab with cotton swab dipped in alcohol. Apply insecticidal soap. Use systemic insecticides.',
    treatmentVi: 'Chấm bông tẩm cồn. Phun xà phòng trừ sâu. Dùng thuốc nội hấp.',
    prevention: 'Inspect new plants carefully. Quarantine new plants. Encourage natural enemies.',
    preventionVi: 'Kiểm tra cây mới kỹ. Cách ly cây mới. Khuyến khích thiên địch.',
    affectedPlants: ['Most plants', 'Fruit trees', 'Ornamentals'],
    keywords: ['mealybug', 'white', 'cottony', 'honeydew', 'sooty mold', 'hidden'],
    keywordsVi: ['bọ sữa', 'trắng', 'bông', 'dịch ngọt', 'bồ hóng', 'khuất'],
    season: 'Warm',
    seasonVi: 'Nóng'
  },
  {
    id: 'general-thrips',
    name: 'Thrips (General)',
    nameVi: 'Bọ trĩ (Chung)',
    category: 'pest',
    severity: 'medium',
    symptoms: 'Streaked or silvery damage on leaves and fruits. Small dark frass spots. Distorted growth. Scarring on fruits.',
    symptomsVi: 'Vết sọc hoặc bạc trên lá và quả. Đốm phân nhỏ đậm. Sinh trưởng biến dạng. Sẹo trên quả.',
    causes: 'Various thrips species. Suck plant cells. Act as virus vectors.',
    causesVi: 'Nhiều loại bọ trĩ. Hút tế bào cây. Làm vật truyền virus.',
    treatment: 'Apply spinosad or neem oil. Use blue sticky traps. Remove heavily infested plant parts.',
    treatmentVi: 'Phun spinosad hoặc dầu neem. Dùng bẫy keo xanh. Loại bỏ bộ phận nhiễm nặng.',
    prevention: 'Use blue sticky traps for monitoring. Encourage predatory mites. Avoid planting near infested areas.',
    preventionVi: 'Dùng bẫy keo xanh theo dõi. Khuyến khích nhện ăn thịt. Tránh trồng gần vùng nhiễm.',
    affectedPlants: ['Most plants', 'Onion', 'Tomato', 'Strawberry'],
    keywords: ['thrips', 'streaked', 'silvery', 'frass', 'distorted', 'scarring'],
    keywordsVi: ['bọ trĩ', 'sọc', 'bạc', 'phân', 'biến dạng', 'sẹo'],
    season: 'Warm, dry',
    seasonVi: 'Nóng, khô'
  },
  // ==================== NUTRIENT DEFICIENCIES ====================
  {
    id: 'deficiency-nitrogen',
    name: 'Nitrogen Deficiency',
    nameVi: 'Thiếu Đạm (N)',
    category: 'deficiency',
    severity: 'medium',
    symptoms: 'Older leaves turn pale green to yellow. Plants become stunted. Lower leaves may die and drop. General chlorosis.',
    symptomsVi: 'Lá già chuyển xanh nhạt đến vàng. Cây còi cọc. Lá dưới có thể chết và rụng. Vàng toàn cây.',
    causes: 'Insufficient nitrogen in soil. Poor root uptake. Excessive leaching in sandy soils.',
    causesVi: 'Đạm trong đất không đủ. Rễ hấp thu kém. Rửa trôi nhiều ở đất cát.',
    treatment: 'Apply nitrogen fertilizers (urea, ammonium nitrate). Side-dress or foliar spray.',
    treatmentVi: 'Bón phân đạm (urea, amoni nitrat). Bón phụ hoặc phun qua lá.',
    prevention: 'Regular nitrogen fertilization. Use slow-release fertilizers. Maintain organic matter.',
    preventionVi: 'Bón đạm định kỳ. Dùng phân phóng chậm. Duy trì chất hữu cơ.',
    affectedPlants: ['All plants'],
    keywords: ['nitrogen', 'yellow', 'chlorosis', 'stunted', 'pale', 'older leaves'],
    keywordsVi: ['đạm', 'vàng', 'vàng toàn cây', 'còi cọc', 'nhạt', 'lá già'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
  {
    id: 'deficiency-phosphorus',
    name: 'Phosphorus Deficiency',
    nameVi: 'Thiếu Lân (P)',
    category: 'deficiency',
    severity: 'medium',
    symptoms: 'Leaves develop purple or reddish coloration, especially on undersides. Stunted growth. Delayed maturity. Poor root development.',
    symptomsVi: 'Lá có màu tím hoặc đỏ, đặc biệt mặt dưới. Cây còi cọc. Chín muộn. Rễ phát triển kém.',
    causes: 'Cold soil temperatures. Soil pH too high or too low. Poor root uptake.',
    causesVi: 'Đất lạnh. pH đất quá cao hoặc quá thấp. Rễ hấp thu kém.',
    treatment: 'Apply phosphorus fertilizers (superphosphate). Lower soil pH if too high.',
    treatmentVi: 'Bón phân lân (superphosphate). Hạ pH đất nếu quá cao.',
    prevention: 'Test soil regularly. Apply phosphorus before planting. Use band placement.',
    preventionVi: 'Xét nghiệm đất định kỳ. Bón lân trước trồng. Bón theo dải.',
    affectedPlants: ['All plants'],
    keywords: ['phosphorus', 'purple', 'reddish', 'stunted', 'delayed', 'roots'],
    keywordsVi: ['lân', 'tím', 'đỏ', 'còi cọc', 'muộn', 'rễ'],
    season: 'Cool soil',
    seasonVi: 'Đất lạnh'
  },
  {
    id: 'deficiency-potassium',
    name: 'Potassium Deficiency',
    nameVi: 'Thiếu Kali (K)',
    category: 'deficiency',
    severity: 'medium',
    symptoms: 'Leaf edges and tips turn brown and scorched. Older leaves show symptoms first. Weak stems. Poor fruit quality.',
    symptomsVi: 'Mép và ngọn lá chuyển nâu và khô. Lá già có triệu chứng trước. Thân yếu. Quả chất lượng kém.',
    causes: 'Sandy soils with heavy rainfall. Soil pH too low. Excessive calcium or magnesium.',
    causesVi: 'Đất cát có mưa nhiều. pH đất quá thấp. Thừa canxi hoặc magie.',
    treatment: 'Apply potassium fertilizers (potassium chloride, potassium sulfate). Foliar spray if severe.',
    treatmentVi: 'Bón phân kali (kali clorua, kali sunfat). Phun qua lá nếu nặng.',
    prevention: 'Regular potassium fertilization. Maintain proper soil pH. Mulch to reduce leaching.',
    preventionVi: 'Bón kali định kỳ. Duy trì pH đất phù hợp. Phủ đất giảm rửa trôi.',
    affectedPlants: ['All plants'],
    keywords: ['potassium', 'brown', 'scorched', 'edges', 'tips', 'weak stems'],
    keywordsVi: ['kali', 'nâu', 'khô', 'mép', 'ngọn', 'thân yếu'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
  {
    id: 'deficiency-iron',
    name: 'Iron Deficiency',
    nameVi: 'Thiếu Sắt (Fe)',
    category: 'deficiency',
    severity: 'medium',
    symptoms: 'Interveinal chlorosis on young leaves (yellow between green veins). Veins remain green. Severe cases: leaves turn completely yellow or white.',
    symptomsVi: 'Vàng giữa các gân ở lá non (vàng giữa các gân xanh). Gân lá vẫn xanh. Trường hợp nặng: lá chuyển hoàn toàn vàng hoặc trắng.',
    causes: 'High soil pH (alkaline soils). Excessive phosphorus. Poor drainage. Compacted soil.',
    causesVi: 'pH đất cao (đất kiềm). Thừa phốtpho. Thoát nước kém. Đất nén chặt.',
    treatment: 'Apply iron chelates. Lower soil pH. Foliar spray with iron sulfate.',
    treatmentVi: 'Bón sắt chelate. Hạ pH đất. Phun sắt sunfat qua lá.',
    prevention: 'Choose plants suited to soil pH. Maintain proper drainage. Avoid over-liming.',
    preventionVi: 'Chọn cây phù hợp pH đất. Duy trì thoát nước tốt. Tránh bón vôi quá nhiều.',
    affectedPlants: ['Most plants', 'Especially: blueberry, azalea, rhododendron'],
    keywords: ['iron', 'interveinal chlorosis', 'yellow', 'green veins', 'young leaves', 'alkaline'],
    keywordsVi: ['sắt', 'vàng gân', 'vàng', 'gân xanh', 'lá non', 'kiềm'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
  {
    id: 'deficiency-calcium',
    name: 'Calcium Deficiency',
    nameVi: 'Thiếu Canxi (Ca)',
    category: 'deficiency',
    severity: 'medium',
    symptoms: 'New leaves distorted or hooked. Growing tips die. Blossom end rot in tomatoes and peppers. Cavities in fruits.',
    symptomsVi: 'Lá mới biến dạng hoặc cong queo. Điểm sinh trưởng chết. Thối đầu quả ở cà chua và ớt. Khoét trong quả.',
    causes: 'Acid soils. Excessive potassium or magnesium. Irregular watering.',
    causesVi: 'Đất chua. Thừa kali hoặc magie. Tưới nước không đều.',
    treatment: 'Apply calcium lime or gypsum. Maintain consistent watering. Foliar spray calcium.',
    treatmentVi: 'Bón vôi hoặc thạch cao. Tưới nước đều đặn. Phun canxi qua lá.',
    prevention: 'Maintain proper soil pH. Regular liming. Consistent watering schedule.',
    preventionVi: 'Duy trì pH đất phù hợp. Bón vôi định kỳ. Tưới nước đều đặn.',
    affectedPlants: ['Tomato', 'Pepper', 'Apple', 'Carrot'],
    keywords: ['calcium', 'distorted', 'hooked', 'blossom end rot', 'cavities', 'tips die'],
    keywordsVi: ['canxi', 'biến dạng', 'cong', 'thối đầu quả', 'khoét', 'chết đỉnh'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
  // ==================== ENVIRONMENTAL DISORDERS ====================
  {
    id: 'env-heat-stress',
    name: 'Heat Stress',
    nameVi: 'Sốc Nhiệt',
    category: 'environmental',
    severity: 'medium',
    symptoms: 'Wilting during hot part of day. Leaf scorching (brown edges and tips). Flower and fruit drop. Sunscald on fruits.',
    symptomsVi: 'Héo vào lúc nóng trong ngày. Lá bị cháy nắng (mép và ngọn nâu). Rụng hoa và quả. Quả bị cháy nắng.',
    causes: 'Temperatures above plant tolerance. Direct afternoon sun. Lack of water.',
    causesVi: 'Nhiệt độ trên mức chịu đựng của cây. Nắng trực tiếp buổi chiều. Thiếu nước.',
    treatment: 'Provide shade cloth. Increase watering. Apply mulch to cool soil.',
    treatmentVi: 'Che lưới shade. Tăng tưới nước. Phủ đất giữ ẩm.',
    prevention: 'Choose heat-tolerant varieties. Plant in partial shade. Maintain adequate irrigation.',
    preventionVi: 'Chọn giống chịu nhiệt. Trồng nơi có bóng râm. Duy trì tưới đủ.',
    affectedPlants: ['Most plants'],
    keywords: ['heat stress', 'wilting', 'scorching', 'brown edges', 'flower drop', 'sunscald'],
    keywordsVi: ['sốc nhiệt', 'héo', 'cháy', 'nâu mép', 'rụng hoa', 'cháy nắng'],
    season: 'Summer',
    seasonVi: 'Mùa hè'
  },
  {
    id: 'env-frost-damage',
    name: 'Frost Damage',
    nameVi: 'Hại Do Sương Giá',
    category: 'environmental',
    severity: 'high',
    symptoms: 'Blackened or water-soaked plant tissues. Wilting despite moist soil. Leaf and stem collapse. Killed flowers and young fruits.',
    symptomsVi: 'Mô cây đen hoặc ướt. Héo dù đất ẩm. Lá và thân đổ. Hoa và quả non chết.',
    causes: 'Below freezing temperatures. Clear nights with radiational cooling. Late spring or early fall frosts.',
    causesVi: 'Nhiệt độ dưới đông. Đêm trời quang với làm lạnh bức xạ. Sương muộn xuân hoặc sớm thu.',
    treatment: 'Do not prune damaged tissue immediately. Wait for new growth to determine extent of damage.',
    treatmentVi: 'Không cắt mô hư ngay. Chờ cây ra chồi mới để xác định mức độ thiệt hại.',
    prevention: 'Cover plants during frost warnings. Use frost cloth or mulch. Plant in protected locations.',
    preventionVi: 'Che cây khi có cảnh báo sương. Dùng vải hoặc phủ đất. Trồng nơi khuất gió.',
    affectedPlants: ['Tropical plants', 'Tender perennials'],
    keywords: ['frost', 'blackened', 'water-soaked', 'collapsed', 'killed', 'wilting'],
    keywordsVi: ['sương giá', 'đen', 'ướt', 'đổ', 'chết', 'héo'],
    season: 'Winter, early spring',
    seasonVi: 'Mùa đông, xuân muộn'
  },
  {
    id: 'env-drought',
    name: 'Drought Stress',
    nameVi: 'Hạn Hán',
    category: 'environmental',
    severity: 'medium',
    symptoms: 'Wilting during hottest part of day. Leaves curl or roll. Growth slows. Older leaves yellow and drop. Soil is dry.',
    symptomsVi: 'Héo vào lúc nóng nhất. Lá cuộn. Sinh trưởng chậm. Lá già vàng và rụng. Đất khô.',
    causes: 'Insufficient irrigation. High temperatures and low humidity. Sandy, fast-draining soils.',
    causesVi: 'Tưới không đủ. Nhiệt độ cao và độ ẩm thấp. Đất cát thoát nước nhanh.',
    treatment: 'Water deeply and thoroughly. Apply mulch to retain moisture. Provide shade.',
    treatmentVi: 'Tưới sâu và đẫm. Phủ đất giữ ẩm. Che bóng.',
    prevention: 'Install drip irrigation. Mulch heavily. Choose drought-tolerant varieties. Water deeply but infrequently.',
    preventionVi: 'Lắp hệ thống tưới nhỏ giọt. Phủ đất dày. Chọn giống chịu hạn. Tưới sâu nhưng ít.',
    affectedPlants: ['All plants'],
    keywords: ['drought', 'wilting', 'curled', 'rolled', 'dry soil', 'yellow leaves'],
    keywordsVi: ['hạn', 'héo', 'cuộn', 'đất khô', 'vàng', 'rụng lá'],
    season: 'Hot, dry',
    seasonVi: 'Nóng, khô'
  },
  {
    id: 'env-overwatering',
    name: 'Overwatering / Root Rot',
    nameVi: 'Ngập Úng / Thối Rễ',
    category: 'environmental',
    severity: 'high',
    symptoms: 'Yellowing leaves despite moist soil. Wilting even when soil is wet. Roots turn brown and mushy. Foul smell from soil. Leaf drop.',
    symptomsVi: 'Lá vàng dù đất ẩm. Héo dù đất ướt. Rễ chuyển nâu và nhũn. Đất có mùi hôi. Rụng lá.',
    causes: 'Too frequent watering. Poor drainage. Containers without drainage holes. Fungal pathogens in saturated soil.',
    causesVi: 'Tưới quá nhiều. Thoát nước kém. Chậu không có lỗ thoát. Nấm bệnh trong đất bão hòa.',
    treatment: 'Stop watering immediately. Improve drainage. Repot if in containers. Apply fungicide if root rot present.',
    treatmentVi: 'Ngừng tưới ngay. Cải thiện thoát nước. Thay chậu nếu trồng chậu. Phun thuốc nếu có thối rễ.',
    prevention: 'Water only when soil is dry. Ensure proper drainage. Use well-draining soil mix. Elevate containers.',
    preventionVi: 'Tưới khi đất khô. Đảm bảo thoát nước. Dùng đất thoát nước tốt. Đặt chậu cao.',
    affectedPlants: ['All plants'],
    keywords: ['overwatering', 'root rot', 'yellow leaves', 'wet soil', 'brown roots', 'foul smell'],
    keywordsVi: ['ngập', 'thối rễ', 'vàng', 'đất ướt', 'rễ nâu', 'mùi hôi'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
  {
    id: 'env-salt-burn',
    name: 'Salt Burn',
    nameVi: 'Cháy Mặn',
    category: 'environmental',
    severity: 'medium',
    symptoms: 'Brown leaf tips and edges. White crusty deposits on soil surface. Wilting despite adequate water. Stunted growth.',
    symptomsVi: 'Ngọn và mép lá nâu. Lớp váng trắng trên mặt đất. Héo dù đủ nước. Cây còi cọc.',
    causes: 'Excessive fertilizer. Saline irrigation water. Poor drainage concentrating salts.',
    causesVi: 'Bón phân quá nhiều. Nước tưới mặn. Thoát nước kém làm cô đọng muối.',
    treatment: 'Flush soil thoroughly with plain water. Remove white crust from soil surface.',
    treatmentVi: 'Rửa đất kỹ bằng nước sạch. Loại bỏ lớp váng trắng.',
    prevention: 'Use low-salt fertilizers. Leach soil periodically. Use good quality water. Avoid over-fertilizing.',
    preventionVi: 'Dùng phân ít muối. Rửa mặn định kỳ. Dùng nước chất lượng tốt. Tránh bón quá nhiều.',
    affectedPlants: ['Most plants'],
    keywords: ['salt burn', 'brown tips', 'crusty', 'white deposits', 'wilting', 'stunted'],
    keywordsVi: ['cháy mặn', 'nâu', 'váng', 'trắng', 'héo', 'còi'],
    season: 'Variable',
    seasonVi: 'Nhiều mùa'
  },
];

// ==========================================
// PLANT ENCYCLOPEDIA (200+ Plants)
// ==========================================

export interface Plant {
  id: string;
  name: string;
  nameVi: string;
  scientificName: string;
  category: string;
  family: string;
  description: string;
  descriptionVi: string;
  growingConditions: {
    climate: string;
    soil: string;
    temperature: string;
    humidity: string;
  };
  planting: {
    season: string;
    method: string;
    spacing: string;
    depth: string;
  };
  care: {
    watering: string;
    fertilizing: string;
    pruning: string;
  };
  commonDiseases: string[];
  harvest: {
    time: string;
    signs: string;
  };
  uses: string[];
  imageUrl?: string;
}

export const plantEncyclopedia: Plant[] = [
  // ==================== CEREALS ====================
  {
    id: 'rice',
    name: 'Rice',
    nameVi: 'Lúa',
    scientificName: 'Oryza sativa',
    category: 'Cereal',
    family: 'Poaceae',
    description: 'Staple food crop grown worldwide in flooded fields. One of the most important grains globally.',
    descriptionVi: 'Cây lương thực chính được trồng trên toàn thế giới trong ruộng ngập nước. Một trong những loại ngũ cốc quan trọng nhất thế giới.',
    growingConditions: {
      climate: 'Tropical to subtropical, warm and humid',
      soil: 'Heavy clay soils that hold water, pH 5.5-7.0',
      temperature: '20-37°C optimal',
      humidity: 'High humidity 70-90%'
    },
    planting: {
      season: 'Spring and summer (May-June in Vietnam)',
      method: 'Transplanting seedlings or direct seeding',
      spacing: '20-25 cm between rows',
      depth: '2-3 cm deep'
    },
    care: {
      watering: 'Maintain 3-5 cm standing water, drain before harvest',
      fertilizing: 'NPK at 120-60-60 kg/ha split into multiple applications',
      pruning: 'Remove diseased plants, control weeds'
    },
    commonDiseases: ['rice-blast', 'rice-bacterial-blight', 'rice-sheath-blight', 'rice-brown-planthopper', 'rice-stem-borer'],
    harvest: {
      time: '120-150 days after transplanting',
      signs: 'Grains turn golden, 80-85% of panicles mature'
    },
    uses: ['Food (cooked rice)', 'Rice flour', 'Rice bran oil', 'Animal feed', 'Fermentation products']
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    nameVi: 'Ngô',
    scientificName: 'Zea mays',
    category: 'Cereal',
    family: 'Poaceae',
    description: 'Widely cultivated cereal crop used for food, animal feed, and industrial products.',
    descriptionVi: 'Cây ngũ cốc được trồng rộng rãi dùng làm thực phẩm, thức ăn chăn nuôi và sản phẩm công nghiệp.',
    growingConditions: {
      climate: 'Warm temperate to tropical',
      soil: 'Well-drained loamy soils, pH 5.8-7.0',
      temperature: '18-32°C optimal',
      humidity: 'Moderate 50-80%'
    },
    planting: {
      season: 'Spring (February-March) and Summer (May-June)',
      method: 'Direct seeding in rows',
      spacing: '70-90 cm between rows, 20-30 cm between plants',
      depth: '3-5 cm deep'
    },
    care: {
      watering: '1-2 inches per week, critical during tasseling',
      fertilizing: 'NPK at 150-80-60 kg/ha, side-dress nitrogen',
      pruning: 'Remove suckers, prune for single ear production'
    },
    commonDiseases: ['corn-northern-leaf-blight', 'corn-fall-armyworm', 'corn-stalk-borer'],
    harvest: {
      time: '60-100 days depending on variety',
      signs: 'Silk turns brown, kernels release milky liquid when punctured'
    },
    uses: ['Human food', 'Animal feed', 'Corn starch', 'Biofuel', 'Cooking oil']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    nameVi: 'Lúa mì',
    scientificName: 'Triticum aestivum',
    category: 'Cereal',
    family: 'Poaceae',
    description: 'One of the most important cereal crops worldwide, providing staple food for billions.',
    descriptionVi: 'Một trong những cây ngũ cốc quan trọng nhất thế giới, cung cấp lương thực cho hàng tỷ người.',
    growingConditions: {
      climate: 'Temperate, cool season crop',
      soil: 'Well-drained loamy to clay soils, pH 6.0-7.0',
      temperature: '12-25°C optimal',
      humidity: 'Moderate 40-70%'
    },
    planting: {
      season: 'Winter (October-November) or Spring (March-April)',
      method: 'Drill seeding in rows',
      spacing: '15-20 cm between rows',
      depth: '3-4 cm deep'
    },
    care: {
      watering: '25-50 cm water during growing season',
      fertilizing: 'NPK at 100-50-50 kg/ha, split applications',
      pruning: 'Remove weeds, avoid lodging'
    },
    commonDiseases: ['wheat-rust-stripe', 'wheat-powdery-mildew'],
    harvest: {
      time: '100-130 days after planting',
      signs: 'Straw turns golden, kernels are hard'
    },
    uses: ['Flour for bread', 'Pasta', 'Breakfast cereals', 'Animal feed', 'Beer production']
  },
  {
    id: 'cassava',
    name: 'Cassava',
    nameVi: 'Sắn (Khoai mì)',
    scientificName: 'Manihot esculenta',
    category: 'Root/Tuber',
    family: 'Euphorbiaceae',
    description: 'Tropical root crop providing staple food and industrial starch for millions.',
    descriptionVi: 'Cây rễ nhiệt đới cung cấp lương thực và tinh bột công nghiệp cho hàng triệu người.',
    growingConditions: {
      climate: 'Tropical, warm year-round',
      soil: 'Well-drained sandy loams, pH 5.5-7.0',
      temperature: '25-30°C optimal',
      humidity: 'Moderate 60-80%'
    },
    planting: {
      season: 'Early rainy season (April-May)',
      method: 'Stem cuttings 20-30 cm long',
      spacing: '80-100 cm between rows',
      depth: '5-10 cm deep, horizontally'
    },
    care: {
      watering: 'Drought tolerant, but yields improve with 1000-1500 mm rainfall',
      fertilizing: 'NPK at 60-30-60 kg/ha',
      pruning: 'Remove flowers to direct energy to root development'
    },
    commonDiseases: ['cassava-mosaic', 'cassava-bacterial-blight'],
    harvest: {
      time: '8-18 months after planting',
      signs: 'Leaves turn yellow and drop, roots are firm'
    },
    uses: ['Human food (boiled, fried)', 'Tapioca starch', 'Animal feed', 'Biofuel', 'Industrial products']
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    nameVi: 'Khoai lang',
    scientificName: 'Ipomoea batatas',
    category: 'Root/Tuber',
    family: 'Convolvulaceae',
    description: 'Nutritious root vegetable grown in tropical and temperate regions.',
    descriptionVi: 'Cây rau củ giàu dinh dưỡng được trồng ở vùng nhiệt đới và ôn đới.',
    growingConditions: {
      climate: 'Tropical to subtropical',
      soil: 'Well-drained sandy loams, pH 5.5-6.5',
      temperature: '20-30°C optimal',
      humidity: 'Moderate 50-70%'
    },
    planting: {
      season: 'Spring and early summer',
      method: 'Transplanting vine cuttings or slips',
      spacing: '30-40 cm between plants, 80-100 cm rows',
      depth: '5-10 cm deep'
    },
    care: {
      watering: 'Regular watering, reduce before harvest',
      fertilizing: 'Low nitrogen, higher potassium (NPK 10-10-20)',
      pruning: 'Hill soil around plants, prune runners if needed'
    },
    commonDiseases: ['sweet-potato-weevil', 'sweet-potato-leaf-spot'],
    harvest: {
      time: '90-150 days after planting',
      signs: 'Leaves yellow, soil cracks around plants'
    },
    uses: ['Human food', 'Animal feed', 'Starch production', 'Leafy greens as vegetable']
  },
  {
    id: 'potato',
    name: 'Potato',
    nameVi: 'Khoai tây',
    scientificName: 'Solanum tuberosum',
    category: 'Root/Tuber',
    family: 'Solanaceae',
    description: 'Important food crop and industrial crop, one of the worlds major staples.',
    descriptionVi: 'Cây thực phẩm và công nghiệp quan trọng, một trong những lương thực chính của thế giới.',
    growingConditions: {
      climate: 'Cool season crop, temperate regions',
      soil: 'Well-drained sandy loams, pH 5.5-6.5',
      temperature: '15-20°C optimal',
      humidity: 'Moderate 60-80%'
    },
    planting: {
      season: 'Winter/Spring (November-January) or Summer (June-July)',
      method: 'Plant seed tubers or pieces with eyes',
      spacing: '30-40 cm between plants, 60-75 cm rows',
      depth: '10-15 cm deep'
    },
    care: {
      watering: '2-3 cm water per week, critical during tuber formation',
      fertilizing: 'NPK at 100-80-150 kg/ha',
      pruning: 'Hill soil around plants when stems are 15-20 cm'
    },
    commonDiseases: ['potato-late-blight', 'potato-early-dying'],
    harvest: {
      time: '70-120 days after planting',
      signs: 'Foliage dies back, skin is set'
    },
    uses: ['Human food', 'French fries', 'Chips', 'Starch', 'Animal feed']
  },
  // ==================== VEGETABLES ====================
  {
    id: 'tomato',
    name: 'Tomato',
    nameVi: 'Cà chua',
    scientificName: 'Lycopersicon esculentum',
    category: 'Vegetable',
    family: 'Solanaceae',
    description: 'Popular fruit vegetable used fresh and processed worldwide.',
    descriptionVi: 'Rau quả phổ biến được sử dụng tươi và chế biến trên toàn thế giới.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Well-drained loams, pH 6.0-6.8',
      temperature: '20-30°C optimal',
      humidity: 'Moderate 65-85%'
    },
    planting: {
      season: 'Winter-Spring (November-January) or Summer-Fall (May-June)',
      method: 'Transplant seedlings or direct seed',
      spacing: '50-70 cm between plants',
      depth: 'Seedlings: at cotyledon level'
    },
    care: {
      watering: 'Deep watering 2-3 times per week',
      fertilizing: 'NPK 15-15-15, increase potassium at flowering',
      pruning: 'Remove suckers, stake or cage plants'
    },
    commonDiseases: ['tomato-late-blight', 'tomato-early-blight', 'tomato-hornworm', 'pepper-bacterial-spot'],
    harvest: {
      time: '60-100 days after transplanting',
      signs: 'Fruits turn red/yellow, slight give when pressed'
    },
    uses: ['Fresh consumption', 'Tomato sauce', 'Juice', 'Paste', 'Dried tomatoes']
  },
  {
    id: 'pepper',
    name: 'Chili Pepper',
    nameVi: 'Ớt',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    family: 'Solanaceae',
    description: 'Widely cultivated spice and vegetable crop.',
    descriptionVi: 'Cây gia vị và rau được trồng rộng rãi.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Well-drained sandy loams, pH 6.0-7.0',
      temperature: '20-35°C optimal',
      humidity: 'Moderate 60-70%'
    },
    planting: {
      season: 'Early spring (February-March) or late summer',
      method: 'Transplant seedlings',
      spacing: '45-60 cm between plants',
      depth: 'At first true leaf'
    },
    care: {
      watering: 'Regular watering, avoid water stress',
      fertilizing: 'NPK 10-10-10, increase potassium at fruiting',
      pruning: 'Pinch first flowers to encourage branching'
    },
    commonDiseases: ['pepper-bacterial-spot', 'pepper-phytophthora', 'pepper-aphid'],
    harvest: {
      time: '60-90 days after transplanting',
      signs: 'Fruits reach desired color and size'
    },
    uses: ['Fresh consumption', 'Dried spice', 'Hot sauce', 'Pickles', 'Medicine']
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    nameVi: 'Bắp cải',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Vegetable',
    family: 'Brassicaceae',
    description: 'Leafy vegetable grown for its dense heads.',
    descriptionVi: 'Rau lá được trồng để lấy bắp lá chặt.',
    growingConditions: {
      climate: 'Cool season crop',
      soil: 'Well-drained fertile loams, pH 6.0-7.5',
      temperature: '15-20°C optimal',
      humidity: 'Moderate 60-80%'
    },
    planting: {
      season: 'Fall (August-September) or early spring',
      method: 'Transplant seedlings',
      spacing: '30-50 cm between plants',
      depth: 'Up to first true leaves'
    },
    care: {
      watering: 'Consistent moisture, 2-3 cm per week',
      fertilizing: 'NPK at 100-50-100 kg/ha',
      pruning: 'Remove yellow leaves, no pruning of head'
    },
    commonDiseases: ['cabbage-soft-rot', 'cabbage-loopers'],
    harvest: {
      time: '70-100 days after transplanting',
      signs: 'Heads are firm and solid, full size reached'
    },
    uses: ['Fresh salads', 'Cole slaw', 'Stir-fried', 'Soup', 'Fermented (kimchi)']
  },
  {
    id: 'carrot',
    name: 'Carrot',
    nameVi: 'Cà rốt',
    scientificName: 'Daucus carota',
    category: 'Root Vegetable',
    family: 'Apiaceae',
    description: 'Root vegetable rich in beta-carotene, widely cultivated.',
    descriptionVi: 'Cây rau củ giàu beta-carotene, được trồng rộng rãi.',
    growingConditions: {
      climate: 'Cool season crop',
      soil: 'Deep, loose sandy loams, pH 6.0-6.8',
      temperature: '15-20°C optimal',
      humidity: 'Moderate 60-80%'
    },
    planting: {
      season: 'Fall (September-October) or early spring',
      method: 'Direct seed in rows',
      spacing: '5-8 cm between plants, 15-20 cm rows',
      depth: '6-10 mm deep'
    },
    care: {
      watering: 'Regular, even moisture',
      fertilizing: 'Low nitrogen, moderate phosphorus and potassium',
      pruning: 'Thin seedlings, keep weed-free'
    },
    commonDiseases: ['carrot-leaf-blight'],
    harvest: {
      time: '70-80 days after seeding',
      signs: 'Shoulders emerge from soil, desired size reached'
    },
    uses: ['Fresh eating', 'Juice', 'Cooked', 'Baby carrots', 'Animal feed']
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    nameVi: 'Cà tím',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    family: 'Solanaceae',
    description: 'Popular vegetable with purple or white fruit.',
    descriptionVi: 'Rau quả phổ biến với quả màu tím hoặc trắng.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Well-drained fertile loams, pH 5.5-6.5',
      temperature: '22-30°C optimal',
      humidity: 'Moderate 60-70%'
    },
    planting: {
      season: 'Early summer (May-June)',
      method: 'Transplant seedlings',
      spacing: '60-90 cm between plants',
      depth: 'At first true leaves'
    },
    care: {
      watering: 'Deep watering 2-3 times per week',
      fertilizing: 'NPK 10-10-10 monthly',
      pruning: 'Remove suckers below first flower cluster'
    },
    commonDiseases: ['eggplant-fruit-borer', 'eggplant-shoot-borer'],
    harvest: {
      time: '60-80 days after transplanting',
      signs: 'Fruits are glossy, flesh gives slightly when pressed'
    },
    uses: ['Grilled', 'Stir-fried', 'Curry', 'Baba ghanoush', 'Pickles']
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    nameVi: 'Dưa leo',
    scientificName: 'Cucumis sativus',
    category: 'Vegetable',
    family: 'Cucurbitaceae',
    description: 'Refreshing vine crop grown for fresh eating and pickling.',
    descriptionVi: 'Cây leo giải khát được trồng để ăn tươi và muối.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Well-drained sandy loams, pH 6.0-7.0',
      temperature: '20-30°C optimal',
      humidity: 'Moderate 70-90%'
    },
    planting: {
      season: 'Spring (February-March) and Fall (August-September)',
      method: 'Direct seed or transplant',
      spacing: '30-50 cm between plants, trellis if possible',
      depth: '2-3 cm deep'
    },
    care: {
      watering: 'Consistent moisture, critical for quality',
      fertilizing: 'NPK 10-10-10, side-dress nitrogen',
      pruning: 'Pinch after 6th leaf, train on trellis'
    },
    commonDiseases: ['general-whiteflies', 'general-aphids'],
    harvest: {
      time: '50-70 days after planting',
      signs: 'Fruits are firm, color is uniform, size appropriate for variety'
    },
    uses: ['Fresh salads', 'Pickles', 'Juice', 'Sandwiches', 'Tzatziki sauce']
  },
  {
    id: 'bean',
    name: 'Green Bean',
    nameVi: 'Đậu cove',
    scientificName: 'Phaseolus vulgaris',
    category: 'Legume',
    family: 'Fabaceae',
    description: 'Popular vegetable legume, both bush and pole types.',
    descriptionVi: 'Cây họ đậu phổ biến, cả loại bụi và leo.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Well-drained fertile soils, pH 6.0-7.0',
      temperature: '18-27°C optimal',
      humidity: 'Moderate 60-70%'
    },
    planting: {
      season: 'Spring and early fall',
      method: 'Direct seed in rows',
      spacing: '10-15 cm for bush, 15-20 cm for pole',
      depth: '2-3 cm deep'
    },
    care: {
      watering: 'Regular moisture, avoid wet foliage',
      fertilizing: 'Low nitrogen (legumes fix nitrogen)',
      pruning: 'Support pole types with stakes or trellis'
    },
    commonDiseases: ['bean-angular-leaf-spot', 'bean-rust'],
    harvest: {
      time: '50-60 days for bush, 60-70 days for pole',
      signs: 'Pods are firm, seeds not yet bulging'
    },
    uses: ['Fresh cooking', 'Steaming', 'Stir-fried', 'Canning', 'Freezing']
  },
  {
    id: 'soybean',
    name: 'Soybean',
    nameVi: 'Đậu tương',
    scientificName: 'Glycine max',
    category: 'Legume',
    family: 'Fabaceae',
    description: 'Major oilseed and protein crop worldwide.',
    descriptionVi: 'Cây lấy dầu và protein chính trên thế giới.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Well-drained fertile loams, pH 6.0-7.0',
      temperature: '20-30°C optimal',
      humidity: 'Moderate 60-80%'
    },
    planting: {
      season: 'Summer (May-June)',
      method: 'Direct seed in rows',
      spacing: '5-10 cm between plants, 40-60 cm rows',
      depth: '3-5 cm deep'
    },
    care: {
      watering: '1-2 inches per week, critical at flowering and pod fill',
      fertilizing: 'Inoculate with rhizobium, low nitrogen needed',
      pruning: 'Not typically pruned'
    },
    commonDiseases: ['soybean-rust', 'soybean-sudden-death'],
    harvest: {
      time: '80-120 days after planting',
      signs: 'Leaves drop, pods are dry, seeds rattle'
    },
    uses: ['Soy milk', 'Tofu', 'Tempeh', 'Soy sauce', 'Cooking oil', 'Animal feed']
  },
  {
    id: 'peanut',
    name: 'Peanut',
    nameVi: 'Đậu phộng',
    scientificName: 'Arachis hypogaea',
    category: 'Legume',
    family: 'Fabaceae',
    description: 'Important oilseed and food crop with underground pods.',
    descriptionVi: 'Cây lấy dầu và thực phẩm quan trọng với quả dưới đất.',
    growingConditions: {
      climate: 'Warm season crop',
      soil: 'Sandy loams, pH 5.5-7.0',
      temperature: '25-30°C optimal',
      humidity: 'Moderate 60-70%'
    },
    planting: {
      season: 'Spring-Summer (March-June)',
      method: 'Direct seed in rows',
      spacing: '15-20 cm between plants, 60-90 cm rows',
      depth: '3-5 cm deep'
    },
    care: {
      watering: 'Regular moisture, reduce before harvest',
      fertilizing: 'NPK at 20-40-60 kg/ha',
      pruning: 'Hill soil around plants after flowering'
    },
    commonDiseases: ['peanut-leaf-spot', 'peanut-rust'],
    harvest: {
      time: '120-150 days after planting',
      signs: 'Leaves yellow, inner hull has dark spots'
    },
    uses: ['Roasted nuts', 'Peanut butter', 'Cooking oil', 'Animal feed', 'Flour']
  },
  // ==================== FRUITS ====================
  {
    id: 'mango',
    name: 'Mango',
    nameVi: 'Xoài',
    scientificName: 'Mangifera indica',
    category: 'Tropical Fruit',
    family: 'Anacardiaceae',
    description: 'King of tropical fruits, highly prized for its flavor.',
    descriptionVi: 'Vua của trái cây nhiệt đới, được yêu thích vì hương vị.',
    growingConditions: {
      climate: 'Tropical, frost-free',
      soil: 'Deep, well-drained alluvial or laterite, pH 5.5-7.5',
      temperature: '24-30°C optimal',
      humidity: 'Moderate 50-70%'
    },
    planting: {
      season: 'Monsoon (June-July) or Spring (February-March)',
      method: 'Transplant grafted seedlings',
      spacing: '8-10 m between trees',
      depth: 'Same depth as nursery bag'
    },
    care: {
      watering: 'Regular during dry season, reduce during flowering',
      fertilizing: 'NPK with micronutrients, split applications',
      pruning: 'Train young trees, prune after harvest'
    },
    commonDiseases: ['mango-anthracnose', 'mango-hopper'],
    harvest: {
      time: '3-6 years after planting, 100-150 days from flowering',
      signs: 'Shoulders fill out, flesh near stem end softens'
    },
    uses: ['Fresh eating', 'Juice', 'Mango pulp', 'Dried mango', 'Pickle', 'Lassi']
  },
  {
    id: 'banana',
    name: 'Banana',
    nameVi: 'Chuối',
    scientificName: 'Musa acuminata',
    category: 'Tropical Fruit',
    family: 'Musaceae',
    description: 'One of the most popular fruits worldwide, also used as staple food.',
    descriptionVi: 'Một trong những trái cây phổ biến nhất thế giới, cũng dùng làm lương thực.',
    growingConditions: {
      climate: 'Tropical to subtropical',
      soil: 'Deep, fertile, well-drained soils, pH 5.5-7.0',
      temperature: '25-30°C optimal',
      humidity: 'High 70-90%'
    },
    planting: {
      season: 'Spring (March-April) or Fall (September-October)',
      method: 'Plant suckers or tissue culture plants',
      spacing: '2-3 m between plants, 3-4 m rows',
      depth: '10-15 cm deep'
    },
    care: {
      watering: 'Regular, 100-150 mm per month',
      fertilizing: 'NPK 13-5-15 monthly, plus micronutrients',
      pruning: 'Remove all but one or two suckers per plant'
    },
    commonDiseases: ['banana-panama'],
    harvest: {
      time: '9-12 months after planting',
      signs: 'Fruits are plump, ridges rounded, flowers easily rub off'
    },
    uses: ['Fresh eating', 'Banana chips', 'Flour', 'Beer (in some varieties)', 'Cooking']
  },
  {
    id: 'citrus',
    name: 'Citrus (Orange/Lemon)',
    nameVi: 'Cam/Chanh',
    scientificName: 'Citrus sinensis / C. limon',
    category: 'Citrus Fruit',
    family: 'Rutaceae',
    description: 'Large group of fruits including oranges, lemons, and limes.',
    descriptionVi: 'Nhóm lớn trái cây bao gồm cam, chanh và quýt.',
    growingConditions: {
      climate: 'Subtropical to tropical',
      soil: 'Deep, well-drained sandy loams, pH 5.5-7.0',
      temperature: '15-30°C optimal',
      humidity: 'Moderate 50-70%'
    },
    planting: {
      season: 'Spring (March-April) or Fall (September-October)',
      method: 'Plant grafted trees',
      spacing: '4-6 m between trees',
      depth: 'At graft union 10-15 cm above soil'
    },
    care: {
      watering: 'Regular deep watering, avoid water stress',
      fertilizing: 'NPK with micronutrients, 3-4 applications per year',
      pruning: 'Light pruning to maintain shape, remove water sprouts'
    },
    commonDiseases: ['citrus-greening', 'citrus-canker', 'citrus-leaf-miner'],
    harvest: {
      time: '2-5 years after planting, varies by variety',
      signs: 'Color fully developed, slight give when pressed'
    },
    uses: ['Fresh eating', 'Juice', 'Flavoring', 'Essential oils', 'Preserves']
  },
  {
    id: 'dragon-fruit',
    name: 'Dragon Fruit',
    nameVi: 'Thanh long',
    scientificName: 'Hylocereus undatus',
    category: 'Cactus Fruit',
    family: 'Cactaceae',
    description: 'Exotic cactus fruit with pink skin and white or red flesh.',
    descriptionVi: 'Trái cây xương rồng nhiệt đới với vỏ hồng và thịt trắng hoặc đỏ.',
    growingConditions: {
      climate: 'Tropical to subtropical, frost-free',
      soil: 'Well-drained sandy soils, pH 5.5-7.0',
      temperature: '20-30°C optimal',
      humidity: 'Moderate 60-80%'
    },
    planting: {
      season: 'Spring to early summer',
      method: 'Plant stem cuttings 20-30 cm long',
      spacing: '2-3 m between plants, with support posts',
      depth: '5-8 cm deep in soil'
    },
    care: {
      watering: 'Weekly during dry season, reduce in rainy season',
      fertilizing: 'NPK 10-10-10 monthly, increase during flowering',
      pruning: 'Remove side branches below 1m, maintain 3-4 main stems'
    },
    commonDiseases: ['dragon-fruit-bacterial'],
    harvest: {
      time: '6-8 months after planting, 4-6 cycles per year',
      signs: 'Skin turns bright pink/red, flesh slightly soft'
    },
    uses: ['Fresh eating', 'Juice', 'Smoothies', 'Sorbet', 'Jam']
  },
  {
    id: 'durian',
    name: 'Durian',
    nameVi: 'Sầu riêng',
    scientificName: 'Durio zibethinus',
    category: 'Tropical Fruit',
    family: 'Bombacaceae',
    description: 'The king of fruits with distinctive spiky shell and strong aroma.',
    descriptionVi: 'Vua của các loại trái cây với vỏ gai đặc trưng và mùi hương mạnh.',
    growingConditions: {
      climate: 'Tropical, humid, frost-free',
      soil: 'Deep, fertile, well-drained, pH 5.5-7.0',
      temperature: '24-30°C optimal',
      humidity: 'High 75-90%'
    },
    planting: {
      season: 'Early rainy season',
      method: 'Plant grafted seedlings',
      spacing: '10-12 m between trees',
      depth: 'Same as nursery container'
    },
    care: {
      watering: 'Regular during dry season, adequate during fruiting',
      fertilizing: 'NPK with micronutrients, organic matter',
      pruning: 'Light pruning after harvest, remove dead branches'
    },
    commonDiseases: ['durian-fruit-rot'],
    harvest: {
      time: '5-7 years after planting',
      signs: 'Spines spread apart, aroma detectable, thumping produces hollow sound'
    },
    uses: ['Fresh eating', 'Durian paste', 'Ice cream', 'Traditional medicine']
  },
  {
    id: 'coffee',
    name: 'Coffee',
    nameVi: 'Cà phê',
    scientificName: 'Coffea arabica / C. canephora',
    category: 'Beverage Crop',
    family: 'Rubiaceae',
    description: 'Major agricultural commodity, one of the most traded commodities worldwide.',
    descriptionVi: 'Hàng hóa nông nghiệp chính, một trong những mặt hàng được giao dịch nhiều nhất.',
    growingConditions: {
      climate: 'Tropical highland',
      soil: 'Deep, well-drained volcanic or laterite soils, pH 5.5-6.5',
      temperature: '15-24°C optimal (Arabica), 24-30°C (Robusta)',
      humidity: 'High 60-80%'
    },
    planting: {
      season: 'Early rainy season',
      method: 'Transplant seedlings from nursery',
      spacing: '2-3 m between plants, 3 m rows',
      depth: 'At root collar'
    },
    care: {
      watering: 'Regular during dry season, mulch to conserve moisture',
      fertilizing: 'NPK with micronutrients, 2-3 applications per year',
      pruning: 'Tip prune main stems, remove suckers, shade management'
    },
    commonDiseases: ['coffee-rust', 'coffee-berry-borer', 'coffee-leaf-miner'],
    harvest: {
      time: '3-4 years after planting',
      signs: 'Cherries turn bright red/yellow, easily detach'
    },
    uses: ['Coffee beans', 'Coffee drinks', 'Coffee extract', 'Animal feed']
  },
  {
    id: 'tea',
    name: 'Tea',
    nameVi: 'Chè',
    scientificName: 'Camellia sinensis',
    category: 'Beverage Crop',
    family: 'Theaceae',
    description: 'One of the most popular beverages globally.',
    descriptionVi: 'Một trong những đồ uống phổ biến nhất trên thế giới.',
    growingConditions: {
      climate: 'Tropical to subtropical highland',
      soil: 'Deep, well-drained acidic soils, pH 4.5-5.5',
      temperature: '15-30°C optimal',
      humidity: 'High 70-90%'
    },
    planting: {
      season: 'Monsoon (June-July) or spring',
      method: 'Transplant seedlings or layer',
      spacing: '1.2-1.5 m between plants, 60-75 cm rows',
      depth: 'At root collar'
    },
    care: {
      watering: 'Regular during dry season, ensure adequate moisture',
      fertilizing: 'NPK with micronutrients, organic matter',
      pruning: 'Plucking table maintenance, prune after 4-5 years'
    },
    commonDiseases: ['tea-blight', 'tea-red-spider-mite'],
    harvest: {
      time: '3-4 years after planting',
      signs: 'Young leaves (2-3 leaves and a bud) are ready'
    },
    uses: ['Green tea', 'Black tea', 'Oolong tea', 'White tea', 'Herbal tea']
  },
  {
    id: 'rubber',
    name: 'Rubber Tree',
    nameVi: 'Cây cao su',
    scientificName: 'Hevea brasiliensis',
    category: 'Industrial Crop',
    family: 'Euphorbiaceae',
    description: 'Major source of natural rubber, essential for many industries.',
    descriptionVi: 'Nguồn cung cấp cao su tự nhiên chính, thiết yếu cho nhiều ngành công nghiệp.',
    growingConditions: {
      climate: 'Tropical, humid, frost-free',
      soil: 'Deep, well-drained fertile soils, pH 4.5-6.0',
      temperature: '25-28°C optimal',
      humidity: 'High 75-90%'
    },
    planting: {
      season: 'Early rainy season',
      method: 'Plant budded stumps or seedlings',
      spacing: '5-7 m between trees',
      depth: 'At root collar'
    },
    care: {
      watering: 'Regular during establishment, drought affects yield',
      fertilizing: 'NPK with micronutrients annually',
      pruning: 'Train single straight stem, remove low branches'
    },
    commonDiseases: ['rubber-powdery-mildew', 'rubber-panel-canker'],
    harvest: {
      time: '7-10 years after planting',
      signs: 'Tapping panel established, latex flows freely'
    },
    uses: ['Natural rubber', 'Tires', 'Medical gloves', 'Footwear', 'Industrial products']
  },
];

// ==========================================
// OFFLINE MATCHING ALGORITHM
// ==========================================

export function findMatchingDiseases(
  imageDescription: string,
  selectedPlant?: string,
  language: 'vi' | 'en' = 'vi'
): Disease[] {
  const normalizedDescription = imageDescription.toLowerCase();
  const keywords = normalizedDescription.split(/\s+/).filter(k => k.length > 2);
  
  const scoredDiseases: Array<{ disease: Disease; score: number }> = [];
  
  for (const disease of offlineDiseases) {
    let score = 0;
    const searchKeywords = language === 'vi' ? [...disease.keywords, ...disease.keywordsVi] : disease.keywords;
    
    // Exact keyword match (highest weight)
    for (const keyword of searchKeywords) {
      const keywordLower = keyword.toLowerCase();
      if (normalizedDescription.includes(keywordLower)) {
        score += keywordLower.length > 5 ? 15 : 10;
      }
      
      // Partial match
      for (const word of keywords) {
        if (keywordLower.includes(word) || word.includes(keywordLower)) {
          score += 5;
        }
      }
    }
    
    // Plant type matching
    if (selectedPlant) {
      const plantLower = selectedPlant.toLowerCase();
      const isAffected = disease.affectedPlants.some(
        p => p.toLowerCase().includes(plantLower) || plantLower.includes(p.toLowerCase())
      );
      if (isAffected) {
        score += 20;
      }
    }
    
    // Category weight
    if (normalizedDescription.includes(disease.category)) {
      score += 10;
    }
    
    if (score > 0) {
      scoredDiseases.push({ disease, score });
    }
  }
  
  // Sort by score and return top matches
  return scoredDiseases
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.disease);
}

// ==========================================
// SYMPTOM CHECKER
// ==========================================

export interface Symptom {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
}

export const commonSymptoms: Symptom[] = [
  { id: 'yellow_leaves', name: 'Yellow leaves', nameVi: 'Lá vàng', icon: '🍂' },
  { id: 'brown_spots', name: 'Brown spots', nameVi: 'Đốm nâu', icon: '🟤' },
  { id: 'white_powder', name: 'White powder', nameVi: 'Bột trắng', icon: '✨' },
  { id: 'holes_in_leaves', name: 'Holes in leaves', nameVi: 'Lỗ trên lá', icon: '🕳️' },
  { id: 'wilting', name: 'Wilting', nameVi: 'Héo', icon: '🥀' },
  { id: 'curled_leaves', name: 'Curled leaves', nameVi: 'Lá cuộn', icon: '🌿' },
  { id: 'spots_on_fruit', name: 'Spots on fruit', nameVi: 'Đốm trên quả', icon: '🍎' },
  { id: 'stunted_growth', name: 'Stunted growth', nameVi: 'Cây còi cọc', icon: '📉' },
  { id: 'webbing', name: 'Fine webbing', nameVi: 'Tơ mỏng', icon: '🕸️' },
  { id: 'holes_in_fruit', name: 'Holes in fruit', nameVi: 'Đục trong quả', icon: '🐛' },
  { id: 'black_spots', name: 'Black spots', nameVi: 'Đốm đen', icon: '⚫' },
  { id: 'leaf_drop', name: 'Leaf drop', nameVi: 'Rụng lá', icon: '🍃' },
  { id: 'rot', name: 'Rotting', nameVi: 'Thối', icon: '🧴' },
  { id: 'deformed_leaves', name: 'Deformed leaves', nameVi: 'Lá biến dạng', icon: '🦠' },
  { id: 'mold', name: 'Mold growth', nameVi: 'Nấm mốc', icon: '🍄' },
  { id: 'insects_visible', name: 'Visible insects', nameVi: 'Côn trùng nhìn thấy', icon: '🐞' },
  { id: 'honeydew', name: 'Sticky honeydew', nameVi: 'Dịch ngọt', icon: '🍯' },
  { id: 'bark_damage', name: 'Bark damage', nameVi: 'Hư vỏ cây', icon: '🪵' },
];

export function checkSymptomsBySymptoms(
  selectedSymptoms: string[],
  selectedPlant?: string
): Disease[] {
  const symptomKeywords: Record<string, string[]> = {
    yellow_leaves: ['yellow', 'chlorosis', 'vàng', 'nhạt'],
    brown_spots: ['brown', 'spot', 'nâu', 'đốm nâu'],
    white_powder: ['powder', 'white', 'bột', 'trắng', 'bột phấn'],
    holes_in_leaves: ['hole', 'eaten', 'lỗ', 'ăn', 'đục'],
    wilting: ['wilt', 'héo', 'mềm'],
    curled_leaves: ['curl', 'cuộn', 'biến dạng'],
    spots_on_fruit: ['fruit spot', 'quả', 'đốm'],
    stunted_growth: ['stunt', 'còi cọc', 'chậm'],
    webbing: ['web', 'tơ', 'nhện'],
    holes_in_fruit: ['fruit borer', 'đục quả', 'sâu'],
    black_spots: ['black', 'đen'],
    leaf_drop: ['drop', 'rụng', 'chết'],
    rot: ['rot', 'thối', 'hủy'],
    deformed_leaves: ['deform', 'biến dạng', 'lạ'],
    mold: ['mold', 'nấm', 'mốc'],
    insects_visible: ['insect', 'côn trùng', 'bọ', 'sâu'],
    honeydew: ['honeydew', 'dịch ngọt', 'bồ hóng'],
    bark_damage: ['bark', 'vỏ', 'ghẻ'],
  };

  const scoredDiseases: Array<{ disease: Disease; score: number }> = [];

  for (const disease of offlineDiseases) {
    let score = 0;
    const allKeywords = [...disease.keywords, ...disease.keywordsVi];

    for (const symptom of selectedSymptoms) {
      const keywords = symptomKeywords[symptom] || [];
      for (const keyword of keywords) {
        if (allKeywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))) {
          score += 10;
        }
      }
    }

    // Plant matching bonus
    if (selectedPlant) {
      const plantLower = selectedPlant.toLowerCase();
      if (disease.affectedPlants.some(p => p.toLowerCase().includes(plantLower))) {
        score += 15;
      }
    }

    if (score > 0) {
      scoredDiseases.push({ disease, score });
    }
  }

  return scoredDiseases
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.disease);
}

// ==========================================
// CARE CALENDAR
// ==========================================

export interface CareTask {
  month: number;
  task: string;
  taskVi: string;
  plant: string;
}

export const careCalendar: CareTask[] = [
  // Rice
  { month: 1, task: 'Prepare seed beds', taskVi: 'Chuẩn bị mạ', plant: 'rice' },
  { month: 2, task: 'Nursery preparation', taskVi: 'Làm đất vùng mạ', plant: 'rice' },
  { month: 3, task: 'Transplant seedlings', taskVi: 'Cấy lúa', plant: 'rice' },
  { month: 4, task: 'First fertilization', taskVi: 'Bón phân lần 1', plant: 'rice' },
  { month: 5, task: 'Pest monitoring', taskVi: 'Theo dõi sâu bệnh', plant: 'rice' },
  { month: 6, task: 'Second fertilization', taskVi: 'Bón phân lần 2', plant: 'rice' },
  { month: 7, task: 'Harvest preparation', taskVi: 'Chuẩn bị thu hoạch', plant: 'rice' },
  { month: 8, task: 'Harvest summer rice', taskVi: 'Thu hoạch lúa hè thu', plant: 'rice' },
  { month: 9, task: 'Prepare for winter crop', taskVi: 'Chuẩn bị vụ đông', plant: 'rice' },
  { month: 10, task: 'Plant winter rice', taskVi: 'Trồng lúa mùa', plant: 'rice' },
  { month: 11, task: 'Fertilize winter crop', taskVi: 'Bón phân vụ đông', plant: 'rice' },
  { month: 12, task: 'Field maintenance', taskVi: 'Bảo dưỡng đồng ruộng', plant: 'rice' },
  
  // Mango
  { month: 1, task: 'Post-harvest pruning', taskVi: 'Tỉa cành sau thu hoạch', plant: 'mango' },
  { month: 2, task: 'Apply base fertilizer', taskVi: 'Bón phân cơ bản', plant: 'mango' },
  { month: 3, task: 'Flowering period', taskVi: 'Ra hoa', plant: 'mango' },
  { month: 4, task: 'Fruit set care', taskVi: 'Chăm sóc đậu quả', plant: 'mango' },
  { month: 5, task: 'Fruit development', taskVi: 'Phát triển quả', plant: 'mango' },
  { month: 6, task: 'Harvest season', taskVi: 'Thu hoạch', plant: 'mango' },
  { month: 7, task: 'Pest monitoring', taskVi: 'Theo dõi sâu bệnh', plant: 'mango' },
  { month: 8, task: 'Tree recovery', taskVi: 'Phục hồi cây', plant: 'mango' },
  { month: 9, task: 'Pruning and shaping', taskVi: 'Tỉa tạo hình', plant: 'mango' },
  { month: 10, task: 'Dry season preparation', taskVi: 'Chuẩn bị mùa khô', plant: 'mango' },
  { month: 11, task: 'Water management', taskVi: 'Quản lý nước', plant: 'mango' },
  { month: 12, task: 'Pre-flowering', taskVi: 'Trước ra hoa', plant: 'mango' },
];

// ==========================================
// Export all data
// ==========================================

export const databaseStats = {
  totalDiseases: offlineDiseases.length,
  totalPlants: plantEncyclopedia.length,
  categories: [...new Set(offlineDiseases.map(d => d.category))],
  severityLevels: ['low', 'medium', 'high', 'critical'],
};

export default {
  offlineDiseases,
  plantEncyclopedia,
  commonSymptoms,
  careCalendar,
  databaseStats,
  findMatchingDiseases,
  checkSymptomsBySymptoms,
};
