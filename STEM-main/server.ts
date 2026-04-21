import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { fileURLToPath as fileUrlToPath } from 'url';
import dotenv from 'dotenv';
import apiRouter from './server/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // API proxy - Forward /api/* to backend server
  app.use('/api', express.json(), apiRouter);

  // Increase payload limit for base64 images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Routes - Direct (for development without separate backend)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Plant Diagnosis (Image Analysis)
  app.post('/api/diagnose', async (req, res) => {
    try {
      const { image, plantType, audioNote } = req.body;
      if (!image) return res.status(400).json({ error: 'Image is required' });

      // Dynamic import of GoogleGenAI to avoid SSR issues
      const { GoogleGenAI } = await import('@google/genai');
      const { Groq } = await import('groq-sdk');

      const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const prompt = `Bạn là chuyên gia nông nghiệp Việt Nam. Phân tích hình ảnh cây này. ${plantType ? `Đây là cây ${plantType}. ` : ''}${audioNote ? `Ghi chú: "${audioNote}". ` : ''}Xác định bệnh, nguyên nhân, mức độ, cách điều trị và phòng ngừa. Trả lời bằng tiếng Việt, ngắn gọn. Trả về JSON: {diseaseName, severity, cause, treatment, prevention}`;

      let reply = '';

      try {
        const response = await gemini.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: [prompt, { inlineData: { data: base64Data, mimeType } }],
          config: { responseMimeType: 'application/json' }
        });
        reply = response.text || '';
      } catch (geminiError) {
        console.warn('Gemini failed, using Groq fallback');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const groqResponse = await groq.chat.completions.create({
          messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: image } }] }],
          model: 'llama-3.2-90b-vision-preview',
          response_format: { type: 'json_object' }
        });
        reply = groqResponse.choices[0]?.message?.content || '';
      }

      const jsonMatch = reply.match(/{[\s\S]*}/);
      const result = JSON.parse(jsonMatch ? jsonMatch[0] : reply);

      res.json({ success: true, data: result });
    } catch (error: any) {
      console.error('Diagnosis error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // AI Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, image } = req.body;
      if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Messages required' });

      const { Groq } = await import('groq-sdk');
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      const systemPrompt = {
        role: 'system',
        content: `Bạn là trợ lý AI nông nghiệp thông minh. Trả lời b��ng tiếng Việt, ngắn gọn, thực tế.
        Sử dụng markdown. Chủ đề: chẩn đoán bệnh, thời tiết, giá nông sản, kỹ thuật canh tác.`
      };

      const groqMessages = [systemPrompt, ...messages];

      const response = await groq.chat.completions.create({
        messages: groqMessages,
        model: image ? 'llama-3.2-90b-vision-preview' : 'llama-3.3-70b-versatile',
      });

      res.json({ success: true, data: { reply: response.choices[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời.' } });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // IoT Sensor Data
  let sensorData = {
    temperature: 28.5,
    humidity: 65,
    soilMoisture: 42,
    ph: 6.2,
    nitrogen: 45,
    phosphorus: 30,
    potassium: 40,
    timestamp: new Date().toISOString()
  };

  app.get('/api/sensors', (req, res) => {
    res.json({ success: true, data: sensorData });
  });

  app.post('/api/sensors', (req, res) => {
    sensorData = { ...sensorData, ...req.body, timestamp: new Date().toISOString() };
    res.json({ success: true, data: sensorData });
  });

  app.post('/api/sensors/insight', async (req, res) => {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const data = req.body || sensorData;

      const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Dữ liệu cảm biến trang trại:
      - Nhiệt độ: ${data.temperature}°C
      - Độ ẩm: ${data.humidity}%
      - Độ ẩm đất: ${data.soilMoisture}%
      - pH: ${data.ph}
      - N-P-K: ${data.nitrogen}-${data.phosphorus}-${data.potassium} mg/kg

      Đưa ra 3 mẹo ngắn gọn để tối ưu năng suất. Trả lời tiếng Việt, dùng bullet points.`;

      const response = await gemini.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      res.json({ success: true, data: { insight: response.text || 'Không có dữ liệu.' } });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Market Prices (Mock)
  app.get('/api/market/prices', (req, res) => {
    const prices = [
      { crop: 'Gạo', price: '18,500 VNĐ/kg', trend: 'up', change: '+2.3%' },
      { crop: 'Cà phê', price: '95,000 VNĐ/kg', trend: 'up', change: '+1.5%' },
      { crop: 'Tiêu', price: '120,000 VNĐ/kg', trend: 'down', change: '-0.8%' },
      { crop: 'Sầu riêng', price: '45,000 VNĐ/kg', trend: 'stable', change: '0%' },
      { crop: 'Mang tiêu', price: '25,000 VNĐ/kg', trend: 'up', change: '+3.2%' },
    ];
    res.json({ success: true, data: prices });
  });

  // Market Prices Forecast (Mock)
  app.get('/api/market/forecast', (req, res) => {
    const forecast = [
      { day: 1, rice: 18500, coffee: 95000, pepper: 121000 },
      { day: 2, rice: 18600, coffee: 95200, pepper: 120500 },
      { day: 3, rice: 18450, coffee: 94800, pepper: 120000 },
    ];
    res.json({ success: true, data: forecast });
  });

  // Transcription (Mock - no actual STT)
  app.post('/api/transcribe', (req, res) => {
    res.json({ success: true, data: { text: req.body.text || 'Ghi chú mẫu' } });
  });

  // Error logging
  app.post('/api/log/error', (req, res) => {
    console.error('Client error:', req.body);
    res.json({ success: true });
  });

  app.post('/api/log/client', (req, res) => {
    console.log('Client log:', req.body);
    res.json({ success: true });
  });

  // Analytics
  app.post('/api/analytics', (req, res) => {
    res.json({ success: true, data: { events: [] } });
  });

  app.post('/api/logs/crash', (req, res) => {
    console.error('Crash log:', req.body);
    res.json({ success: true });
  });

  // Error handling
  app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Lỗi server' });
  });

  app.use('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({ success: false, error: 'Không tìm thấy' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 PlantCare AI Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints: /api/*`);
    console.log(`🌿 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
