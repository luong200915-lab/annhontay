import React, { useState } from 'react';
import { ProjectEvaluation } from '../types';
import { calculatePresentationScore } from '../utils/rules';
import { Award, CheckCircle, Star, MessageSquare, Send, Sparkles, X, ChevronRight } from 'lucide-react';

interface PresentationModeProps {
  evaluations: ProjectEvaluation[];
  onAddEvaluation: (evaluation: ProjectEvaluation) => void;
  onNavigateSection: (sectionId: string) => void;
  onClose?: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  evaluations,
  onAddEvaluation,
  onNavigateSection,
  onClose
}) => {
  const [evaluatorName, setEvaluatorName] = useState('');
  const [role, setRole] = useState<'Giáo viên' | 'Học sinh' | 'Khách tham quan'>('Giáo viên');
  const [scores, setScores] = useState({
    content: 9.5,
    design: 9.5,
    features: 9.5,
    presentation: 9.5
  });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculatedTotal = calculatePresentationScore(scores);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatorName.trim()) return;

    const newEval: ProjectEvaluation = {
      id: `eval-${Date.now()}`,
      evaluatorName: evaluatorName.trim(),
      role,
      scores,
      comment: comment.trim() || 'Dự án hoàn thành xuất sắc các tiêu chí đề ra.',
      createdAt: new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    onAddEvaluation(newEval);
    setSubmitted(true);
    setComment('');
  };

  const PRESENTATION_STOPS = [
    { id: 'hero', label: '1. Khái quát & Đất Thép', target: 'hero' },
    { id: 'map', label: '2. Bản đồ tương tác An Nhơn Tây', target: 'map' },
    { id: 'articles', label: '3. Địa đạo & Làng nghề', target: 'articles' },
    { id: 'ai', label: '4. Trợ lý AI Khám phá', target: 'ai' },
    { id: 'gallery', label: '5. Thư viện tư liệu ảnh', target: 'gallery' },
    { id: 'sources', label: '6. Nguồn dẫn & Kiểm chứng', target: 'sources' },
    { id: 'team', label: '7. Nhóm học sinh 12A5', target: 'team' }
  ];

  return (
    <div className="w-full bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg p-5 md:p-8 shadow-lg">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#243D2B]/20 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C76B45] text-[#FAF6ED] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
            <Award className="w-4 h-4" />
            Hỗ Trợ Báo Cáo Chuyên Đề & Chấm Điểm
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-[#243D2B] tracking-wide">
            KHUNG THUYẾT TRÌNH & ĐÁNH GIÁ DỰ ÁN 12A5
          </h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED]"
            aria-label="Đóng chế độ thuyết trình"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Presentation Fast-Track Jump Buttons */}
      <div className="mb-8 bg-[#F2E8D5] p-4 rounded-lg border border-[#352C24]/15">
        <div className="text-xs font-mono uppercase tracking-wider text-[#243D2B] font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C76B45]" />
          Lộ trình trình chiếu trước lớp (Bấm để nhảy nhanh đến nội dung):
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESENTATION_STOPS.map((stop) => (
            <button
              key={stop.id}
              onClick={() => onNavigateSection(stop.target)}
              className="bg-[#FAF6ED] hover:bg-[#243D2B] hover:text-[#FAF6ED] text-[#243D2B] text-xs font-mono font-medium px-3 py-1.5 rounded border border-[#243D2B]/20 transition-all flex items-center gap-1"
            >
              <span>{stop.label}</span>
              <ChevronRight className="w-3 h-3 text-[#C76B45]" />
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Rubric & Form on Left, Previous Reviews on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-[#FAF6ED] border border-[#243D2B]/20 p-5 rounded-lg">
          <h3 className="font-heading text-2xl text-[#243D2B] mb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#C76B45]" />
            Phiếu Đánh Giá Chuyên Môn (Thang Điểm 10)
          </h3>
          <p className="text-xs text-[#352C24]/80 mb-4 font-body">
            Dành cho quý Thầy/Cô bộ môn và các bạn học sinh chấm điểm sản phẩm theo chuẩn ma trận đánh giá năng lực học sinh lớp 12.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                  Họ tên người đánh giá *
                </label>
                <input
                  type="text"
                  required
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  placeholder="Ví dụ: Thầy Nguyễn Văn A..."
                  className="w-full bg-[#F2E8D5] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24] focus:outline-none focus:border-[#243D2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                  Vai trò *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#F2E8D5] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24] focus:outline-none focus:border-[#243D2B]"
                >
                  <option value="Giáo viên">Giáo viên chấm điểm</option>
                  <option value="Học sinh">Học sinh / Bạn học lớp khác</option>
                  <option value="Khách tham quan">Khách tham quan chuyên môn</option>
                </select>
              </div>
            </div>

            {/* Score Sliders */}
            <div className="bg-[#F2E8D5] p-3.5 rounded border border-[#352C24]/10 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>1. Nội dung & Tính xác thực (Trọng số 40%):</span>
                  <span className="font-bold text-[#243D2B]">{scores.content} / 10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.5"
                  value={scores.content}
                  onChange={(e) =>
                    setScores({ ...scores, content: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#243D2B]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>2. Thẩm mỹ Retro Editorial (Trọng số 25%):</span>
                  <span className="font-bold text-[#243D2B]">{scores.design} / 10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.5"
                  value={scores.design}
                  onChange={(e) =>
                    setScores({ ...scores, design: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#617A50]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>3. Tính năng Bản đồ số & AI (Trọng số 20%):</span>
                  <span className="font-bold text-[#243D2B]">{scores.features} / 10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.5"
                  value={scores.features}
                  onChange={(e) =>
                    setScores({ ...scores, features: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#C76B45]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>4. Trình bày & Sáng tạo (Trọng số 15%):</span>
                  <span className="font-bold text-[#243D2B]">{scores.presentation} / 10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.5"
                  value={scores.presentation}
                  onChange={(e) =>
                    setScores({ ...scores, presentation: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#352C24]"
                />
              </div>

              <div className="pt-2 border-t border-[#352C24]/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-[#243D2B]">
                  Tổng điểm quy đổi trung bình:
                </span>
                <span className="font-heading text-3xl text-[#C76B45] font-bold">
                  {calculatedTotal} / 10
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                Nhận xét & Góp ý chi tiết cho nhóm 12A5
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhận xét về bố cục, tính chuẩn xác lịch sử, tính tương tác của bản đồ và trợ lý AI..."
                className="w-full bg-[#F2E8D5] border border-[#352C24]/20 rounded p-2.5 text-xs text-[#352C24] focus:outline-none focus:border-[#243D2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] font-heading text-lg tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              GỬI PHIẾU ĐÁNH GIÁ CHẤM ĐIỂM
            </button>

            {submitted && (
              <div className="p-3 bg-[#617A50]/20 border border-[#617A50] rounded text-xs text-[#243D2B] font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#617A50]" />
                Cảm ơn Thầy/Cô và các bạn! Phiếu đánh giá đã được lưu vào hệ thống hồ sơ của nhóm 12A5.
              </div>
            )}
          </form>
        </div>

        {/* Right: Recorded Evaluations Log (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-2xl text-[#243D2B] mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#617A50]" />
              Nhật Ký Đánh Giá Đã Ghi Nhận ({evaluations.length})
            </h3>
            <p className="text-xs text-[#352C24]/75 mb-4 font-body">
              Dữ liệu phản hồi thực tế từ giáo viên bộ môn và các thành viên tham dự buổi báo cáo.
            </p>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {evaluations.map((evalItem) => {
                const totalScore = calculatePresentationScore(evalItem.scores);
                return (
                  <div
                    key={evalItem.id}
                    className="p-3.5 bg-[#F2E8D5] border border-[#352C24]/15 rounded-lg text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="font-bold text-[#243D2B] text-sm">
                        {evalItem.evaluatorName}
                      </div>
                      <span className="font-heading text-xl text-[#C76B45] font-bold">
                        {totalScore} / 10
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#352C24]/70 mb-2">
                      <span className="bg-[#FAF6ED] px-1.5 py-0.5 rounded border border-[#352C24]/10 font-bold text-[#617A50]">
                        {evalItem.role}
                      </span>
                      <span>{evalItem.createdAt}</span>
                    </div>

                    <p className="text-[#352C24] leading-relaxed italic bg-[#FAF6ED] p-2 rounded border border-[#352C24]/10">
                      "{evalItem.comment}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
