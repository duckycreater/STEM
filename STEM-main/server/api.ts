import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*' }));
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ==========================================
// API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ------------------------------------------
// PLANT DISEASE DIAGNOSIS (Image Analysis)
// ------------------------------------------
app.post('/api/diagnose', async (req: Request, res: Response) => {
  try {
    const { image, plantType, audioNote } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const prompt = `Bạn là chuyên gia nông nghiệp. Phân tích hình ảnh cây này. ${plantType ? `Đây là cây ${plantType}. ` : ''}${audioNote ? `Ghi chú thêm từ người dùng: "${audioNote}". ` : ''}Xác định tên bệnh, mức độ nghiêm trọng, nguyên nhân, cách điều trị và phòng ngừa. Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu. Trả về JSON với các trường: diseaseName, severity, cause, treatment, prevention.`;

    let reply = '';

    try {
      const response = await gemini.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          prompt,
          { inlineData: { data: base64Data, mimeType: mimeType } }
        ],
        config: { responseMimeType: 'application/json' }
      });
      reply = response.text || '';
    } catch (geminiError) {
      console.warn('Gemini vision failed, falling back to Groq:', geminiError);

      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });

      const groqResponse = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: image } }
            ]
          }
        ],
        model: 'llama-3.2-90b-vision-preview',
        response_format: { type: 'json_object' }
      });

      reply = groqResponse.choices[0]?.message?.content || '';
    }

    if (!reply) {
      throw new Error('No response from AI');
    }

    // Clean JSON response (sometimes AI adds markdown)
    const jsonMatch = reply.match(/```json\s*([\s\S]*?)\s*```/) || reply.match(/{[\s\S]*}/);
    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : reply;

    const result = JSON.parse(jsonStr);

    res.json({
      success: true,
      data: result,
      model: result.model || 'gemini-2.0-flash'
    });

  } catch (error: any) {
    console.error('Diagnosis error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to diagnose plant disease'
    });
  }
});

// ------------------------------------------
// AI CHATBOT
// ------------------------------------------
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, image } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const systemPrompt = {
      role: 'system',
      content: `Bạn là trợ lý AI nông nghiệp thông minh. Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu cho nông dân.
      Sử dụng markdown để định dạng: tiêu đề, bullet points, in đậm.
      Nếu có hình ảnh, hãy phân tích chi tiết.
      Chủ đề: chẩn đoán bệnh cây trồng, thời tiết & mẹo canh tác, giá nông sản, tư vấn kỹ thuật.`
    };

    const groqMessages = [systemPrompt, ...messages];

    let response;
    if (image) {
      response = await groq.chat.completions.create({
        messages: groqMessages,
        model: 'llama-3.2-90b-vision-preview',
      });
    } else {
      response = await groq.chat.completions.create({
        messages: groqMessages,
        model: 'llama-3.3-70b-versatile',
      });
    }

    const reply = response.choices[0]?.message?.content || 'Không thể xử lý yêu cầu.';

    res.json({
      success: true,
      data: { reply }
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat'
    });
  }
});

// ------------------------------------------
// OFFLINE DISEASE SEARCH
// ------------------------------------------
app.post('/api/disease-search', (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    // This will be populated from our offline database
    // For now, return mock data
    const diseases = [
      {
        id: 'dao-on-lua',
        name: 'Bệnh đạo ống lúa',
        symptoms: 'Lá có đốm hình thoi, trung tâm xám trắng, viền nâu đỏ. Gây chết lá và lép hạt.',
        treatment: 'Dùng thuốc trừ nấm chuyên dụng (Tricyclazole, Isoprothiolane). Bón cân bằng, tránh thừa đạm.'
      },
      // ... more diseases
    ];

    if (!query) {
      return res.json({ success: true, data: diseases });
    }

    const lowerQuery = query.toLowerCase().trim();
    const results = diseases.filter((d: any) =>
      d.name.toLowerCase().includes(lowerQuery) ||
      d.symptoms.toLowerCase().includes(lowerQuery)
    );

    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ------------------------------------------
// IOT SENSOR DATA (Real-time)
// ------------------------------------------
let currentSensorData = {
  temperature: 28.5,
  humidity: 65,
  soilMoisture: 42,
  ph: 6.2,
  nitrogen: 45,
  phosphorus: 30,
  potassium: 40,
  timestamp: new Date().toISOString()
};

// GET current sensor data
app.get('/api/sensors', (req: Request, res: Response) => {
  res.json({ success: true, data: currentSensorData });
});

// POST new sensor data (from IoT device)
app.post('/api/sensors', (req: Request, res: Response) => {
  const { temperature, humidity, soilMoisture, ph, nitrogen, phosphorus, potassium } = req.body;

  currentSensorData = {
    temperature: temperature ?? currentSensorData.temperature,
    humidity: humidity ?? currentSensorData.humidity,
    soilMoisture: soilMoisture ?? currentSensorData.soilMoisture,
    ph: ph ?? currentSensorData.ph,
    nitrogen: nitrogen ?? currentSensorData.nitrogen,
    phosphorus: phosphorus ?? currentSensorData.phosphorus,
    potassium: potassium ?? currentSensorData.potassium,
    timestamp: new Date().toISOString()
  };

  res.json({ success: true, data: currentSensorData });
});

// GET AI insights based on sensor data
app.post('/api/sensors/insight', async (req: Request, res: Response) => {
  try {
    const data = req.body || currentSensorData;

    const prompt = `Tôi có dữ liệu cảm biến từ trang trại:
    - Nhiệt độ: ${data.temperature}°C
    - Độ ẩm không khí: ${data.humidity}%
    - Độ ẩm đất: ${data.soilMoisture}%
    - pH đất: ${data.ph}
    - N-P-K: ${data.nitrogen}-${data.phosphorus}-${data.potassium} mg/kg

    Dựa trên dữ liệu trên, hãy đưa ra 3 mẹo ngắn gọn, thực tế để tối ưu hóa năng suất cây trồng ngay bây giờ. Trả lời bằng tiếng Việt, dùng bullet points.`;

    const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await gemini.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      data: { insight: response.text || 'Không thể phân tích dữ liệu.' }
    });

  } catch (error: any) {
    console.error('Insight error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ------------------------------------------
// MARKET PRICES (Mock - can integrate real API)
// ------------------------------------------
app.get('/api/market/prices', (req: Request, res: Response) => {
  // Mock data - integrate with real market API later
  const mockPrices = [
    { crop: 'Gạo', price: '18,500 VNĐ/kg', trend: 'up', change: '+2.3%' },
    { crop: 'Cà phê', price: '95,000 VNĐ/kg', trend: 'up', change: '+1.5%' },
    { crop: 'Tiêu', price: '120,000 VNĐ/kg', trend: 'down', change: '-0.8%' },
    { crop: 'Sầu riêng', price: '45,000 VNĐ/kg', trend: 'stable', change: '0%' },
    { crop: 'Mang tiêu', price: '25,000 VNĐ/kg', trend: 'up', change: '+3.2%' },
  ];

  res.json({ success: true, data: mockPrices });
});

// ==========================================
// ERROR HANDLING
// ==========================================
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PlantCare AI Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints ready at /api/*`);
});

export default app;
