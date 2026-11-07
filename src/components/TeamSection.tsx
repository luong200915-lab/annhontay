import React from "react";
import { CLASS_12A5_MEMBERS } from "../data/cuchiData";
import {
  Award,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Users,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TeamSectionProps {
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  isOpen,
  onToggleOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="overflow-y-auto relative w-full max-w-4xl bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg shadow-2xl my-auto overflow-hidden max-h-[92vh]  p-10">
        {/* Modal Sticky Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#243D2B] text-[#FAF6ED] text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-4 h-4 text-[#C76B45]" />
            Dự Án Nghiên Cứu Học Tập Địa Phương
          </div>
          <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-3xl md:text-4xl text-[#243D2B] tracking-wide mb-3">
            TẬP THỂ HỌC SINH LỚP 12A5
          </h2>
          <div className="font-['Playfair_Display',serif] text-lg italic text-[#C76B45] mb-4">
            "Đưa hào khí Đất Thép Thành Đồng đến gần hơn với thế hệ trẻ"
          </div>
          <p className="text-sm text-[#352C24]/85 leading-relaxed font-body">
            Website là công trình học tập liên môn Lịch Sử — Địa Lý — Giáo Dục
            Địa Phương và Công Nghệ Tin Học của nhóm học sinh lớp 12A5, hướng
            đến buổi báo cáo chuyên đề và đánh giá học tập.
          </p>
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#243D2B] font-bold text-xl rounded-full hover:bg-[#243D2B]/10 transition-colors"
            onClick={() => onToggleOpen()}
          >
            &times;
          </button>
        </div>

        {/* 5 Members Grid */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 1.8,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!pb-12"
          style={
            {
              overflow: "hidden",
              "--swiper-pagination-color": "#243D2B", // Màu của chấm đang active (Xanh đậm)
              "--swiper-pagination-bullet-inactive-color": "#352C24", // Màu của các chấm chưa chọn
              "--swiper-pagination-bullet-inactive-opacity": "0.3", // Độ mờ của chấm chưa chọn
            } as React.CSSProperties
          }
        >
          {CLASS_12A5_MEMBERS.map((member) => (
            <SwiperSlide
              key={member.id}
              style={{ height: "auto", display: "flex", alignItems: "stretch" }}
              className="h-auto"
            >
              <div
                className="member-card group relative w-full h-[400px] md:h-[420px] rounded-2xl overflow-hidden border-2 border-[#243D2B] bg-[#243D2B] paper-shadow hover:paper-shadow-lg transition-shadow flex flex-col justify-end"
                style={{ height: "400px" }}
              >
                {/* Layer 1: Background Image with Zoom & Hover Scale */}
                {member.img ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className={`w-full h-full object-cover ${
                        member.id === 1
                          ? "member-bg-img-center-subject"
                          : member.id === 2
                          ? "member-bg-img-nhi"
                          : member.id === 3
                          ? "member-bg-img-linh"
                          : member.id === 4
                          ? "member-bg-img-lam"
                          : member.id === 5
                          ? "member-bg-img-nhu"
                          : member.id === 6
                          ? "member-bg-img-anh"
                          : "member-bg-img"
                      }`}
                      style={{
                        objectPosition:
                          member.id === 1
                            ? "center 8%"
                            : member.id === 2
                            ? "center 16%"
                            : member.id === 3
                            ? "48% 68%"
                            : member.id === 4
                            ? "38% 30%"
                            : member.id === 5
                            ? "65% 65%"
                            : member.id === 6
                            ? "80% 55%"
                            : "center 25%",
                        transformOrigin:
                          member.id === 6
                            ? "75% 55%"
                            : member.id === 5
                            ? "65% 65%"
                            : member.id === 4
                            ? "38% 30%"
                            : member.id === 3
                            ? "48% 68%"
                            : "center 25%",
                      }}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#243D2B] via-[#1C3223] to-[#142319] flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-[#FAF6ED]/20 bg-[#FAF6ED]/5 flex items-center justify-center transition-transform duration-600 ease-[cubic-bezier(0.2,0.7,0.3,1)] scale-[1.0] group-hover:scale-[1.08]">
                      <Users className="w-12 h-12 text-[#FAF6ED]/40" />
                    </div>
                  </div>
                )}


                {/* Layer 3: Text Content & Footer Meta (relative z-10, stays stationary) */}
                <div className="relative z-10 p-4 pb-3 flex flex-col justify-end w-full">
                  {/* Member Name */}
                  <h3
                    className="font-bold text-lg md:text-xl text-white text-center mb-1.5 leading-tight tracking-normal break-words min-h-[3rem] flex items-center justify-center px-1"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)" }}
                  >
                    {member.name}
                  </h3>

                  {/* Horizontal Divider Line */}
                  <div className="w-full border-t border-white/30 mb-2.5" />

                  {/* Bottom Footer Row: Index Number on Left, Class Label on Right */}
                  <div className="flex items-center justify-between w-full">
                    <span className="bg-[#FAF6ED] text-[#C76B45] font-bold font-mono text-base px-2.5 py-0.5 rounded shadow-sm">
                      {member.id < 10 ? `0${member.id}` : member.id}
                    </span>
                    <span className="bg-[#243D2B]/90 text-[#FAF6ED] font-bold font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded border border-white/20 shadow-sm">
                      LỚP 12A5
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Header */}
    </div>
  );
};
