import React from 'react';
import { CLASS_12A5_MEMBERS } from '../data/cuchiData';
import { ArrowUp, BookOpen, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1C3022] text-[#FAF6ED] border-t-4 border-[#617A50] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top 3-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Editorial Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-block px-2.5 py-0.5 rounded bg-[#617A50] text-[#FAF6ED] text-[11px] font-mono uppercase tracking-wider">
              Dự án học tập liên môn Lớp 12A5
            </div>

            <h3 className="font-heading text-2xl md:text-3xl text-[#FAF6ED] tracking-wider uppercase">
              AN NHƠN TÂY — VÙNG ĐẤT ANH HÙNG
            </h3>

            <p className="text-xs md:text-sm text-[#FAF6ED]/80 font-body leading-relaxed mb-4">
              Website là sản phẩm thuyết trình nghiên cứu lịch sử, văn hóa, làng nghề và bản đồ địa lý An Nhơn Tây. Toàn bộ hình ảnh, tọa độ và tài liệu đều được thẩm định minh bạch từ các cổng thông tin văn hóa chính thức của Thành phố Hồ Chí Minh.
            </p>

            <div className="text-xs font-mono text-[#FAF6ED]/70 space-y-1">
              <div>📍 Địa bàn nghiên cứu: Huyện An Nhơn Tây, TP. Hồ Chí Minh</div>
              <div>📅 Niên khóa: 2026 — 2027</div>
              <div>⭐ Phong cách: Retro Vintage kết hợp Editorial Magazine</div>
            </div>
          </div>

          {/* Col 2: Members list (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="font-heading text-xl text-[#C76B45] tracking-wider uppercase mb-3 border-b border-[#FAF6ED]/15 pb-1">
              Nhóm Tác Giả Lớp 12A5
            </h4>
            <div className="space-y-1.5">
              {CLASS_12A5_MEMBERS.map((m) => (
                <div key={m.id} className="text-xs py-0.5">
                  <span className="font-bold text-[#FAF6ED]">
                    0{m.id}. {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Fast Links & Sources (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xl text-[#C76B45] tracking-wider uppercase mb-3 border-b border-[#FAF6ED]/15 pb-1">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-[#C76B45] transition-colors"
                >
                  › Bản đồ tương tác An Nhơn Tây
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-[#C76B45] transition-colors"
                >
                  › Địa đạo Bến Dược & Bến Đình
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('culture')}
                  className="hover:text-[#C76B45] transition-colors"
                >
                  › Làng nghề bánh tráng Phú Hòa Đông
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cuisine')}
                  className="hover:text-[#C76B45] transition-colors"
                >
                  › Ẩm thực Bò tơ & Củ mì
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai')}
                  className="hover:text-[#C76B45] transition-colors"
                >
                  › Trợ lý Khám phá An Nhơn Tây (AI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sources')}
                  className="hover:text-[#C76B45] transition-colors"
                >
                  › Bảng kiểm chứng tư liệu
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-[#C76B45] font-bold hover:underline transition-colors flex items-center gap-1 mt-1"
                >
                  › Bảng quản trị CMS (Admin)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FAF6ED]/70 border-t border-[#FAF6ED]/10 pt-6">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 Dự án Nghiên cứu An Nhơn Tây — Thực hiện bởi Lớp 12A5 với tình yêu quê hương đất nước.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#617A50] hover:bg-[#617A50]/80 rounded text-[#FAF6ED] font-mono transition-colors"
            aria-label="Về đầu trang"
          >
            <span>Đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
