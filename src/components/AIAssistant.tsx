import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  MapPin,
  RefreshCw,
  Minus,
  X,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Key,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { AIChatMessage, LocationPoint } from '../types';

interface AIAssistantProps {
  locations: LocationPoint[];
  onOpenLocationOnMap?: (locationId: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const INITIAL_GREETING: AIChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  text: 'Xin chào! Mình là trợ lý AI chuyên tìm hiểu về huyện Củ Chi trước đây. Bạn có thể hỏi mình về lịch sử, văn hóa, địa lý, địa đạo, các địa điểm tham quan, con người và nhiều chủ đề khác liên quan đến Củ Chi.',
  timestamp: 'Vừa xong',
  sources: ['Cổng thông tin UBND Huyện Củ Chi', 'Ban Quản lý Di tích Địa đạo Củ Chi']
};

const SUGGESTED_QUESTIONS = [
  'Củ Chi có lịch sử hình thành như thế nào?',
  'Địa đạo Củ Chi có ý nghĩa gì trong kháng chiến?',
  'Những địa điểm lịch sử nổi bật ở Củ Chi là gì?',
  'Văn hóa và đời sống của người dân Củ Chi có gì đặc trưng?',
  'Huyện Củ Chi trước đây đã thay đổi như thế nào về hành chính?',
  'Hãy giúp tôi soạn bài thuyết trình về Củ Chi.'
];

export const AIAssistant: React.FC<AIAssistantProps> = ({
  locations,
  onOpenLocationOnMap,
  onToggleOpen,
  isOpen
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([INITIAL_GREETING]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedQuestion, setLastFailedQuestion] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // Tự động căn chỉnh chiều cao ô nhập liệu
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputQuestion]);

  // Sao chép nội dung câu trả lời
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  // Làm mới cuộc trò chuyện
  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setErrorMessage(null);
    setLastFailedQuestion(null);
    setInputQuestion('');
  };

  // Gửi câu hỏi đến Trợ lý AI thực sự
  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || isLoading) return;

    setInputQuestion('');
    setErrorMessage(null);
    setLastFailedQuestion(null);

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // Gửi toàn bộ ngữ cảnh các lượt trước sang backend
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'CONFIG_REQUIRED') {
          setShowConfigGuide(true);
        }
        throw new Error(data.message || `Lỗi máy chủ (${response.status})`);
      }

      let relatedLoc: { name: string; id: string } | undefined;
      const answerText = data.reply || '';

      // Tự động nhận diện địa điểm trong câu trả lời để hiển thị nút xem trên bản đồ
      if (locations && locations.length > 0) {
        const matchedLoc = locations.find((l) =>
          answerText.toLowerCase().includes(l.name.toLowerCase())
        );
        if (matchedLoc) {
          relatedLoc = { name: matchedLoc.name, id: matchedLoc.id };
        }
      }

      const botMsg: AIChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        sources: Array.isArray(data.sources) && data.sources.length > 0 ? data.sources : ['Cơ sở dữ liệu Huyện Củ Chi'],
        relatedLocation: relatedLoc
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Lỗi khi gửi yêu cầu AI:', err);
      const errText = err?.message || 'Không thể kết nối đến máy chủ AI. Vui lòng kiểm tra lại mạng hoặc khóa API.';
      setErrorMessage(errText);
      setLastFailedQuestion(q);

      const errorMsg: AIChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **Không thể hoàn thành câu trả lời:**\n\n${errText}`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isDeclined: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý phím Enter và Shift+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onToggleOpen}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] rounded-full shadow-2xl border-2 border-[#FAF6ED]/30 hover:border-[#C76B45] transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Mở Trợ lý AI"
        >
          {/* Pulsing online indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C76B45] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C76B45]"></span>
          </span>

          <img
            src="/annhontay/assets/aistudio/logo.png"
            alt="Logo Lớp 12A5"
            className="h-7 w-auto object-contain group-hover:scale-105 transition-transform shrink-0"
          />

          <div className="text-left font-mono pr-1">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>Trợ lý AI</span>
            </div>
            <div className="text-[10px] text-[#FAF6ED]/70 leading-none">Mô hình AI Đất Thép</div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 w-[calc(100vw-1.5rem)] sm:w-[460px] md:w-[500px] h-[620px] max-h-[90vh] bg-[#FAF6ED] border-2 border-[#243D2B] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="bg-[#243D2B] text-[#FAF6ED] p-3 px-4 flex items-center justify-between border-b border-[#243D2B] select-none shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src="/annhontay/assets/aistudio/logo.png"
            alt="Logo Lớp 12A5"
            className="h-8 w-auto object-contain shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg md:text-xl tracking-wider uppercase leading-none">
                Trợ Lý AI
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#FAF6ED]/75">
              Mô hình trí tuệ nhân tạo • Lịch sử & Văn hóa
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Nút Cuộc trò chuyện mới */}
          <button
            onClick={handleResetChat}
            className="p-1.5 text-[#FAF6ED]/80 hover:text-[#FAF6ED] hover:bg-[#FAF6ED]/10 rounded transition-colors cursor-pointer"
            title="Bắt đầu cuộc trò chuyện mới"
            aria-label="Cuộc trò chuyện mới"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Nút Hướng dẫn cấu hình API */}
          <button
            onClick={() => setShowConfigGuide(!showConfigGuide)}
            className="p-1.5 text-[#FAF6ED]/80 hover:text-[#FAF6ED] hover:bg-[#FAF6ED]/10 rounded transition-colors cursor-pointer"
            title="Thông tin cấu hình API"
            aria-label="Thông tin cấu hình API"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* Thu nhỏ / Đóng */}
          <button
            onClick={onToggleOpen}
            className="p-1.5 text-[#FAF6ED]/80 hover:text-[#FAF6ED] hover:bg-[#FAF6ED]/10 rounded transition-colors cursor-pointer"
            title="Đóng cửa sổ"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Banner Hướng dẫn Cấu hình API nếu cần */}
      {showConfigGuide && (
        <div className="bg-[#243D2B]/95 text-[#FAF6ED] p-3 px-4 text-xs font-mono border-b border-[#FAF6ED]/20 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between font-bold text-[#C76B45]">
            <span className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              CẤU HÌNH KHÓA GEMINI_API_KEY
            </span>
            <button onClick={() => setShowConfigGuide(false)} className="text-[#FAF6ED]/60 hover:text-[#FAF6ED]">
              &times;
            </button>
          </div>
          <p className="text-[#FAF6ED]/85 leading-relaxed font-body">
            Trợ lý AI sử dụng mô hình ngôn ngữ lớn của Google Gemini. Để kích hoạt kết nối AI thực tế:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-[#FAF6ED]/90">
            <li>Nhận API Key miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#C76B45] underline font-bold">Google AI Studio</a>.</li>
            <li>Tạo file <code className="bg-black/30 px-1 rounded text-[#FAF6ED]">.env</code> tại thư mục dự án và thêm dòng:</li>
            <div className="bg-black/40 p-1.5 rounded select-all text-[#C76B45]">
              GEMINI_API_KEY=AIzaSy...
            </div>
            <li>Khởi động lại máy chủ (<code className="bg-black/30 px-1 rounded text-[#FAF6ED]">npm run dev</code>).</li>
          </ol>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF6ED]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`group relative max-w-[90%] sm:max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#243D2B] text-[#FAF6ED] rounded-tr-none shadow-md'
                  : msg.isDeclined
                  ? 'bg-[#FAF6ED] border-2 border-[#C76B45] text-[#352C24] rounded-tl-none shadow-sm'
                  : 'bg-[#F2E8D5] border border-[#352C24]/15 text-[#352C24] rounded-tl-none shadow-sm'
              }`}
            >
              {/* Message text with clear typography */}
              <div className="whitespace-pre-wrap font-body">
                {msg.text.split('\n').map((line, idx) => {
                  if (line.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="font-bold text-base text-[#243D2B] mt-2 mb-1">
                        {line.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (line.startsWith('• ') || line.startsWith('- ')) {
                    return (
                      <div key={idx} className="my-1 pl-2 font-medium flex items-start gap-1.5">
                        <span className="text-[#C76B45] font-bold">•</span>
                        <span>{line.replace(/^[•-]\s*/, '')}</span>
                      </div>
                    );
                  }
                  if (/^\d+\.\s/.test(line)) {
                    return (
                      <div key={idx} className="my-1 pl-2 font-medium">
                        {line}
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className={idx > 0 && line.trim() === '' ? 'h-2' : idx > 0 ? 'mt-1.5' : ''}>
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Related location on map action */}
              {msg.relatedLocation && onOpenLocationOnMap && (
                <div className="mt-3 pt-2 border-t border-[#352C24]/15 flex items-center justify-between">
                  <span className="text-xs text-[#243D2B] font-semibold flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#C76B45] shrink-0" />
                    <span className="truncate">{msg.relatedLocation.name}</span>
                  </span>
                  <button
                    onClick={() => onOpenLocationOnMap(msg.relatedLocation!.id)}
                    className="text-xs text-[#FAF6ED] bg-[#243D2B] hover:bg-[#617A50] px-2.5 py-1 rounded transition-colors font-mono shrink-0 ml-2 shadow-sm"
                  >
                    Xem vị trí ➔
                  </button>
                </div>
              )}

              {/* Source citations */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-[#352C24]/10 text-[11px] text-[#352C24]/75 font-mono">
                  <div className="font-bold text-[#617A50] mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C76B45]" />
                    <span>Nguồn dữ liệu kiểm chứng:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5">
                    {msg.sources.map((s, idx) => (
                      <li key={idx} className="truncate">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nút Sao chép câu trả lời */}
              {msg.sender === 'assistant' && (
                <div className="mt-2 pt-1 flex justify-end">
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#352C24]/60 hover:text-[#243D2B] transition-colors p-1 rounded hover:bg-black/5"
                    title="Sao chép câu trả lời"
                  >
                    {copiedMessageId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-700" />
                        <span className="text-green-700 font-bold">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <span className="text-[10px] text-[#352C24]/50 mt-1 px-1 font-mono">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-[#243D2B] font-mono bg-[#F2E8D5] p-3.5 rounded-2xl max-w-xs border border-[#243D2B]/10 shadow-sm animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-[#C76B45]" />
            <div className="flex flex-col">
              <span className="font-bold">Trợ lý AI đang xử lý...</span>
              <span className="text-[10px] text-[#352C24]/70">Tra cứu tri thức Củ Chi & tổng hợp ngôn ngữ</span>
            </div>
          </div>
        )}

        {/* Nút thử lại nếu câu trước bị lỗi */}
        {errorMessage && lastFailedQuestion && !isLoading && (
          <div className="flex justify-center">
            <button
              onClick={() => handleSend(lastFailedQuestion)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C76B45] text-[#FAF6ED] text-xs font-mono font-bold hover:bg-[#b05834] transition-colors shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Thử lại câu hỏi vừa rồi</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="bg-[#F2E8D5] px-3 py-2 border-t border-[#352C24]/10 overflow-x-auto flex gap-2 shrink-0 no-scrollbar">
        <span className="text-xs font-mono font-bold text-[#352C24] self-center shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-[#C76B45]" />
          <span>Gợi ý:</span>
        </span>
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="text-xs bg-[#FAF6ED] hover:bg-[#243D2B] hover:text-[#FAF6ED] text-[#352C24] border border-[#352C24]/20 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form with Shift+Enter Multiline Support */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#FAF6ED] border-t border-[#243D2B]/20 flex items-end gap-2 shrink-0"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi về lịch sử, địa đạo, địa lý, ẩm thực Huyện Củ Chi... (Enter để gửi, Shift+Enter xuống dòng)"
          disabled={isLoading}
          className="flex-1 bg-[#F2E8D5] border border-[#352C24]/20 rounded-xl px-3 py-2 text-sm text-[#352C24] focus:outline-none focus:border-[#243D2B] resize-none max-h-28 font-body disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuestion.trim()}
          className="bg-[#243D2B] hover:bg-[#617A50] disabled:opacity-40 text-[#FAF6ED] p-2.5 rounded-xl transition-all font-heading text-lg tracking-wider flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
          title="Gửi câu hỏi (Enter)"
          aria-label="Gửi câu hỏi"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
