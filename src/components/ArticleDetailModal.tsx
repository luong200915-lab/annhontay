import React from "react";
import { Article } from "../types";
import { X, MapPin } from "lucide-react";

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  onViewOnMap?: (locationId: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onViewOnMap,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg shadow-2xl my-auto overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#243D2B] text-[#FAF6ED] px-4 py-3 flex items-center justify-between border-b border-[#243D2B]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C76B45] font-bold">
              {article.categoryName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#617A50] text-[#FAF6ED] transition-colors"
            aria-label="Đóng bài viết"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-4 md:p-8 space-y-6">
          {/* Article Header */}
          <div>
            <h1 className="font-heading text-3xl md:text-5xl text-[#243D2B] tracking-wide leading-tight mb-3">
              {article.title}
            </h1>

            {article.subtitle && (
              <div className="font-editorial text-lg md:text-xl italic text-[#C76B45] leading-relaxed mb-4">
                "{article.subtitle}"
              </div>
            )}
          </div>

          {/* Hero Cover Image & Caption */}
          <div className="rounded-lg overflow-hidden border border-[#243D2B]/20 bg-[#F2E8D5]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full max-h-[420px] object-cover"
            />
            <div className="p-3 text-xs text-[#352C24]/80 flex flex-col md:flex-row justify-between gap-1 border-t border-[#352C24]/10 bg-[#FAF6ED]">
              <span>
                <strong>Chú thích:</strong> {article.imageCaption}
              </span>
              <span className="text-[#617A50] font-mono">
                Nguồn ảnh: {article.imageCredit}
              </span>
            </div>
          </div>

          {/* Highlights Box */}
          {article.highlights && article.highlights.length > 0 && (
            <div className="bg-[#F2E8D5] border-l-4 border-[#C76B45] p-4 rounded-r shadow-sm">
              <h4 className="font-heading text-lg text-[#243D2B] tracking-wider mb-2 uppercase">
                Dữ Kiện Trọng Tâm
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#352C24]">
                {article.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C76B45] font-bold">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Paragraphs of content */}
          <div className="space-y-4 text-sm md:text-base text-[#352C24] leading-relaxed font-body">
            {article.content.map((p, idx) => (
              <p key={idx} className="indent-4 text-justify">
                {p}
              </p>
            ))}
          </div>

          {/* Location Callout if applicable */}
          {article.locationId && onViewOnMap && (
            <div className="bg-[#243D2B] text-[#FAF6ED] p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#617A50] rounded-full text-[#FAF6ED]">
                  <MapPin className="w-5 h-5 text-[#FAF6ED]" />
                </div>
                <div>
                  <h4 className="font-heading text-xl tracking-wider">
                    Xem Địa Điểm Này Trên Bản Đồ An Nhơn Tây
                  </h4>
                  <p className="text-xs text-[#FAF6ED]/75">
                    Khám phá tọa độ GPS, cách di chuyển, giờ mở cửa và giá vé
                    tham quan.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onViewOnMap(article.locationId!);
                }}
                className="bg-[#C76B45] hover:bg-[#C76B45]/90 text-[#FAF6ED] font-heading text-lg tracking-wider px-4 py-2 rounded shrink-0 transition-colors"
              >
                MỞ BẢN ĐỒ NGAY
              </button>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#352C24]/10">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-[#F2E8D5] text-[#352C24] px-2.5 py-1 rounded border border-[#352C24]/15 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
