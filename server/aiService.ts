import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { searchKnowledgeBase, KnowledgeDocument } from './knowledgeBase';

dotenv.config();

export interface ChatMessageInput {
  sender: 'user' | 'assistant';
  text: string;
}

export interface AIResponseOutput {
  reply: string;
  sources: string[];
  modelUsed?: string;
  retrievedDocs?: { id: string; title: string; source: string }[];
}

export class AIService {
  private primaryModel = 'gemini-3.5-flash';
  private fallbackModel = 'gemini-3.5-flash-lite';
  private client: GoogleGenAI | null = null;

  public getApiKey(): string {
    return process.env.GEMINI_API_KEY || '';
  }

  public isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim() !== '' && key !== 'MY_GEMINI_API_KEY');
  }

  private getClient(): GoogleGenAI | null {
    const key = this.getApiKey();
    if (!key || key === 'MY_GEMINI_API_KEY') return null;
    if (!this.client) {
      try {
        this.client = new GoogleGenAI({ apiKey: key });
      } catch (e) {
        console.warn('Không thể khởi tạo GoogleGenAI SDK, sẽ dùng REST fallback:', e);
        return null;
      }
    }
    return this.client;
  }

  /**
   * Sinh câu trả lời thông minh dựa trên AI thực sự + RAG tri thức Củ Chi
   */
  public async generateAnswer(question: string, history: ChatMessageInput[] = []): Promise<AIResponseOutput> {
    if (!this.isConfigured()) {
      throw new Error(
        'Hệ thống AI chưa được kích hoạt: Chưa tìm thấy GEMINI_API_KEY hợp lệ. Vui lòng thêm khóa API vào file .env trên máy chủ.'
      );
    }

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      throw new Error('Câu hỏi trống không hợp lệ.');
    }

    // 1. RAG: Truy xuất các tài liệu kiểm chứng liên quan
    const contextDocs: KnowledgeDocument[] = searchKnowledgeBase(trimmedQuestion, 3);
    const contextText = contextDocs.length > 0
      ? `\n\n[TÀI LIỆU KIỂM CHỨNG VỀ HUYỆN CỦ CHI CŨ ĐƯỢC CUNG CẤP]:\n` +
        contextDocs
          .map(
            (d, idx) =>
              `--- TÀI LIỆU ${idx + 1}: ${d.title} (Nguồn: ${d.source}) ---\n${d.content}`
          )
          .join('\n\n')
      : '';

    // 2. Thiết lập System Prompt theo đúng tiêu chuẩn Mục 7 & 3
    const systemInstruction = `Bạn là trợ lý AI chuyên biệt về huyện Củ Chi trước khi có các thay đổi về đơn vị hành chính.

Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu sâu và đa dạng về lịch sử, địa lý, văn hóa, con người, du lịch, di tích, kinh tế, đời sống và sự phát triển của Củ Chi.

Bạn sử dụng khả năng suy luận và xử lý ngôn ngữ tự nhiên của mô hình AI để hiểu ý định, ngữ cảnh và câu hỏi của người dùng. Bạn không bị giới hạn trong danh sách câu hỏi hoặc câu trả lời mẫu cố định.

PHẠM VI BẮT BUỘC:
Chỉ trả lời câu hỏi có mối liên hệ thực chất với huyện Củ Chi cũ (hoặc Thành phố Hồ Chí Minh và các vùng lân cận khi có liên hệ cụ thể với Củ Chi). Có thể sử dụng kiến thức tổng quát để giải thích vấn đề về Củ Chi, nhưng tuyệt đối không được biến mình thành trợ lý đa năng cho các chủ đề không liên quan.

NGUYÊN TẮC XỬ LÝ:
1. Xác định ý định của người dùng trước khi trả lời.
2. Xem xét ngữ cảnh của những lượt hội thoại trước để hiểu các câu hỏi tiếp nối (ví dụ: đại từ "nó", "ở đó", "khi nào", "vai trò gì", v.v.).
3. Đánh giá xem câu hỏi có liên quan thực chất đến Củ Chi hay không.
4. Nếu liên quan, trả lời trực tiếp, đầy đủ, tự nhiên và phù hợp với mức độ chi tiết mà người dùng yêu cầu.
5. Nếu có tài liệu kiểm chứng được cung cấp bên dưới, ưu tiên sử dụng tài liệu phù hợp và dẫn nguồn chính xác.
6. Nếu thiếu thông tin hoặc số liệu chưa kiểm chứng, nêu rõ giới hạn: "Mình chưa tìm thấy nguồn đáng tin cậy để xác nhận thông tin này. Bạn có thể tham khảo thêm tài liệu từ cơ quan quản lý địa phương hoặc nguồn chính thức liên quan đến Củ Chi." Tuyệt đối không tự bịa dữ kiện, sự kiện hay con số.
7. XỬ LÝ CÂU HỎI NGOÀI PHẠM VI:
Nếu người dùng hỏi chủ đề hoàn toàn không liên quan đến Củ Chi (ví dụ: giải toán, viết code lập trình, thủ đô các nước, mua điện thoại, tin tức quốc tế, ẩm thực nơi khác...), bạn PHẢI TỪ CHỐI LỊCH SỰ, NGẮN GỌN và hướng người dùng quay lại chủ đề Củ Chi.
Ví dụ: "Mình là trợ lý AI chuyên cung cấp thông tin về huyện Củ Chi trước đây, nên chưa thể hỗ trợ câu hỏi ngoài phạm vi này. Bạn có thể hỏi mình về lịch sử, văn hóa, địa lý hoặc các địa điểm tham quan của Củ Chi nhé!"
8. Nếu câu hỏi mơ hồ hoặc chưa rõ liên quan, hãy hỏi lại người dùng để làm rõ thay vì từ chối máy móc.
9. Không từ chối một câu hỏi hợp lệ chỉ vì câu hỏi đó chưa từng xuất hiện trong dữ liệu mẫu.
10. Không tự nhận đã tìm kiếm Internet nếu chưa thực sự thực hiện.

TÍNH CHÍNH XÁC VỀ ĐỊA CHÍNH:
Phân biệt rõ thông tin về huyện Củ Chi trong quá khứ với các đơn vị hành chính hiện tại. Khi đề cập đến thay đổi hành chính, phải nêu rõ mốc thời gian và chỉ sử dụng thông tin đã được kiểm chứng.

PHONG CÁCH:
Trả lời bằng tiếng Việt tự nhiên, thân thiện, dễ hiểu, có cấu trúc rõ ràng (dùng gạch đầu dòng, danh sách hoặc tiêu đề khi cần). Không kéo dài câu trả lời một cách không cần thiết.
${contextText}`;

    // 3. Chuẩn bị lịch sử hội thoại (giữ tối đa 6 lượt gần nhất để tối ưu tốc độ và chi phí)
    const recentHistory = Array.isArray(history)
      ? history
          .filter((h) => h && h.text && h.sender)
          .slice(-6)
          .map((h) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          }))
      : [];

    // Tạo payload contents cho API
    const contents = [
      ...recentHistory,
      {
        role: 'user',
        parts: [{ text: trimmedQuestion }]
      }
    ];

    // 4. Gọi mô hình AI (thử primaryModel, nếu lỗi thử fallbackModel hoặc REST API)
    let replyText = '';
    let usedModel = this.primaryModel;

    try {
      replyText = await this.callGeminiAPI(this.primaryModel, systemInstruction, contents);
    } catch (primaryErr: any) {
      console.warn(`Gọi ${this.primaryModel} thất bại (${primaryErr?.message}), chuyển qua ${this.fallbackModel}...`);
      usedModel = this.fallbackModel;
      try {
        replyText = await this.callGeminiAPI(this.fallbackModel, systemInstruction, contents);
      } catch (fallbackErr: any) {
        console.error('Gọi cả 2 model thất bại:', fallbackErr);
        throw fallbackErr;
      }
    }

    // 5. Tổng hợp nguồn tham khảo
    const sources: string[] = contextDocs.map((d) => d.source);
    if (sources.length === 0) {
      sources.push('Cơ sở dữ liệu lịch sử & văn hóa Huyện Củ Chi');
    }

    return {
      reply: replyText,
      sources: Array.from(new Set(sources)),
      modelUsed: usedModel,
      retrievedDocs: contextDocs.map((d) => ({ id: d.id, title: d.title, source: d.source }))
    };
  }

  /**
   * Thực hiện gọi API thông qua SDK hoặc REST với thời gian chờ an toàn
   */
  private async callGeminiAPI(modelName: string, systemPrompt: string, contents: any[]): Promise<string> {
    const key = this.getApiKey();
    const client = this.getClient();

    // Thử qua SDK trước nếu có client
    if (client) {
      try {
        const response = await client.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [{ text: `[SYSTEM INSTRUCTION]\n${systemPrompt}` }]
            },
            ...contents
          ]
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (sdkError: any) {
        console.warn('GoogleGenAI SDK gọi lỗi, chuyển qua REST fetch:', sdkError?.message || sdkError);
      }
    }

    // Fallback qua Google Generative Language REST API trực tiếp
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 giây timeout

    try {
      const restResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: contents
        })
      });

      clearTimeout(timeoutId);

      if (!restResponse.ok) {
        const errorBody = await restResponse.text();
        if (restResponse.status === 429) {
          throw new Error('RATE_LIMIT_EXCEEDED: Quá giới hạn tần suất gọi API (429).');
        }
        if (restResponse.status === 400 || restResponse.status === 403) {
          throw new Error(`INVALID_API_KEY: Khóa API không hợp lệ hoặc bị từ chối (${restResponse.status}).`);
        }
        throw new Error(`API_ERROR (${restResponse.status}): ${errorBody}`);
      }

      const data = await restResponse.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('Mô hình không trả về nội dung hợp lệ.');
      }
      return candidateText;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('TIMEOUT: Quá thời gian chờ phản hồi từ máy chủ AI (20 giây).');
      }
      throw err;
    }
  }
}

export const aiService = new AIService();
