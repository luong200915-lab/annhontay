import React, { useState } from "react";
import { MediaItem } from "../types";
import {
  Image as ImageIcon,
  X,
  Eye,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MediaGalleryProps {
  media: MediaItem[];
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ media }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const categories = ["all", "Lịch sử", "Văn hóa", "Ẩm thực", "Thiên nhiên"];

  const filteredMedia = media.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory,
  );

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#FAF6ED] p-3 rounded border border-[#243D2B]/20">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#C76B45]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#243D2B] font-bold">
            Thư viện tư liệu ({filteredMedia.length} hình ảnh)
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 rounded font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#243D2B] text-[#FAF6ED]"
                  : "bg-[#F2E8D5] text-[#352C24] hover:bg-[#F2E8D5]/80 border border-[#352C24]/10"
              }`}
            >
              {cat === "all" ? "Tất cả" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="!pb-12"
        style={{ 
          overflow: "hidden",
          "--swiper-pagination-color": "#243D2B",          // Màu của chấm đang active (Xanh đậm)
          "--swiper-pagination-bullet-inactive-color": "#352C24", // Màu của các chấm chưa chọn
          "--swiper-pagination-bullet-inactive-opacity": "0.3",   // Độ mờ của chấm chưa chọn
        }as React.CSSProperties} 
      >
        {filteredMedia.map((item) => (
          <SwiperSlide
            key={item.id}
            onClick={() => setLightboxItem(item)}
            style={{ height: "auto", display: "flex", alignItems: "stretch" }}
            className="group cursor-pointer"
          >
            <div className="relative bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg overflow-hidden paper-shadow hover:paper-shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
            <div className="relative h-48 overflow-hidden bg-[#F2E8D5]">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs bg-[#FAF6ED] text-[#243D2B] font-mono px-3 py-1 rounded flex items-center gap-1 font-semibold">
                  <Eye className="w-3.5 h-3.5 text-[#C76B45]" /> Xem ảnh lớn
                </span>
              </div>
              <div className="absolute top-2 left-2 bg-[#243D2B]/90 text-[#FAF6ED] text-[10px] font-mono uppercase px-2 py-0.5 rounded">
                {item.category}
              </div>
            </div>

            <div className="p-3">
              <h4 className="font-heading text-lg text-[#243D2B] truncate group-hover:text-[#C76B45] transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-[#352C24]/80 line-clamp-2 mt-1 leading-snug">
                {item.caption}
              </p>
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-4xl w-full bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-[#243D2B] text-[#FAF6ED] px-4 py-3 flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C76B45] font-bold">
                Tư liệu ảnh An Nhơn Tây · {lightboxItem.category}
              </span>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-1 rounded hover:bg-[#617A50] text-[#FAF6ED]"
                aria-label="Đóng ảnh"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                className="w-full max-h-[60vh] object-contain rounded border border-[#243D2B]/20 mb-4 bg-black/10"
              />

              <h3 className="font-heading text-2xl text-[#243D2B] mb-2">
                {lightboxItem.title}
              </h3>
              <p className="text-sm text-[#352C24] leading-relaxed">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
