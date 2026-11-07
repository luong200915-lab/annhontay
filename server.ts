import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { aiService } from './server/aiService';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

// Health check & status endpoint for AI
app.get('/api/ai-status', (_req, res) => {
  res.json({
    configured: aiService.isConfigured(),
    provider: 'Google Gemini AI (Real LLM)',
    model: 'gemini-3.5-flash'
  });
});

// AI Assistant endpoint
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { question, history } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        error: 'INVALID_INPUT',
        message: 'Câu hỏi không hợp lệ hoặc bị trống.'
      });
    }

    if (!aiService.isConfigured()) {
      return res.status(503).json({
        error: 'CONFIG_REQUIRED',
        message:
          'Hệ thống chưa được cấu hình GEMINI_API_KEY. Vui lòng tạo file .env tại thư mục gốc của dự án và khai báo khóa API của bạn (ví dụ: GEMINI_API_KEY=AIzaSy...) để kích hoạt Trợ lý AI thực sự.'
      });
    }

    const result = await aiService.generateAnswer(question, history);
    return res.json(result);
  } catch (err: any) {
    console.error('Lỗi khi xử lý yêu cầu AI:', err?.message || err);

    const errorMessage = err?.message || 'Đã xảy ra lỗi không xác định khi kết nối với mô hình AI.';

    let statusCode = 500;
    let errorCode = 'API_ERROR';

    if (errorMessage.includes('RATE_LIMIT')) {
      statusCode = 429;
      errorCode = 'RATE_LIMIT';
    } else if (errorMessage.includes('TIMEOUT')) {
      statusCode = 504;
      errorCode = 'TIMEOUT';
    } else if (errorMessage.includes('INVALID_API_KEY')) {
      statusCode = 401;
      errorCode = 'INVALID_API_KEY';
    }

    return res.status(statusCode).json({
      error: errorCode,
      message: errorMessage
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
